<?php

namespace App\Classes\Utils;

use App\Classes\Utils\Math;
use Exception;

class FileUploader {

    private $acceptedFormats;

    function __construct(array $acceptedFormats = []) {

        $this->acceptedFormats = $acceptedFormats;
        
    }

    public function upload(array $file, string $path, string|array $name, int $compressPercentage = 30) {

        if(is_array($name) && isset($name["name"]) && $name["encrypt"] === true){

            $encryptName = md5(uniqid($name["name"]));
            $name = $encryptName;

        }

        $tempName = $file["tmp_name"];
        $mime = mime_content_type($tempName);
        $extension = preg_replace("/.*\//", "", $mime);

        if(!empty($this->acceptedFormats) && !in_array($extension, $this->acceptedFormats)) throw new Exception("Tipo de mídia ($extension) não suportado", 415);

        if(str_contains($mime, "image/")){

            $imageCreateFunction = "imagecreatefrom$extension";
            $gdImage = $imageCreateFunction($tempName);
            $uploadFinalPath = "$path/$name.$extension";

            imagesavealpha($gdImage, true);
    
            $gdImageOpcionalParams = [
                "jpeg" => [
                    "quality" => intval(Math::minmax((100 - $compressPercentage), 0, 100)),
                ],
                "png" => [
                    "quality" => intval(Math::minmax((($compressPercentage / 100) * 9), 0, 100)),
                    "filter" => PNG_ALL_FILTERS
                ]
            ];

            $gdImageParams = [
                "gdImage" => $gdImage,
                "path" => $uploadFinalPath,
            ];

            if(isset($gdImageOpcionalParams[$extension])){

                $gdImageParams = array_merge($gdImageParams, $gdImageOpcionalParams[$extension]);

            }
    
            $upload = call_user_func("image$extension", ...array_values($gdImageParams));

            // imagepng / imagejpg 
    
            if(!$upload) throw new Exception("Falha ao enviar a imagem", 500);
    
            imagedestroy($gdImage);
    
            return $uploadFinalPath;

        }
        
        $finalPath = "$path/$name.$extension";
        
        $upload = move_uploaded_file($tempName, $finalPath);

        if($upload) return $finalPath;

    }

    public function uploadChunks(array $chunk, string $path, string|array $name, int $chunksLength, int $compressPercentage = 30) {

        $chunkInfos = pathinfo($chunk["name"]);
        $tempDir = "$path/temp_{$chunkInfos["filename"]}";
        
        if(!is_dir($tempDir)) mkdir($tempDir);
        
        $tempFiles = array_diff(scandir($tempDir, SCANDIR_SORT_ASCENDING), [".", ".."]);
        $tempFilePath = "$tempDir/{$chunkInfos["filename"]}.part.".count($tempFiles);

        $upload = move_uploaded_file($chunk["tmp_name"], $tempFilePath);
        $newTempFiles = array_diff(scandir($tempDir), [".", ".."]);

        sort($newTempFiles, SORT_NATURAL);

        if($upload && count($newTempFiles) == $chunksLength){

            if(is_array($name) && isset($name["name"]) && $name["encrypt"] === true){

                $encryptName = md5(uniqid($name["name"]));
                $name = $encryptName;
    
            }

            $extension = pathinfo($chunk["name"], PATHINFO_EXTENSION);
            $finalFilePath = "$path/$name.$extension";
            $finalFile = fopen($finalFilePath, "w");
    
            if(!$finalFile) return;
    
            foreach($newTempFiles as $tempFile){

                $chunkContent = file_get_contents("$tempDir/$tempFile");
                fwrite($finalFile, $chunkContent);
                unlink("$tempDir/$tempFile");

            }

            fclose($finalFile);
            rmdir($tempDir);
            
            return $finalFilePath;

        }

    }

}