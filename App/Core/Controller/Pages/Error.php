<?php

namespace App\Core\Controller\Pages;

use App\Core\Controller\Components\Head;
use App\Utils\View;

class Error {

    public static function render($params = []) {
        
        http_response_code($params["code"]);

        $errorsDetails = [
            400 => "Requisição inválida: Verifique os parâmetros enviados.",
            401 => "Acesso não autorizado: Você não tem permissão para acessar esta página.",
            403 => "Acesso proibido: Você não possui permissão para visualizar esta página.",
            404 => "Página não encontrada: A URL solicitada não existe.",
            405 => "Método não permitido: O método HTTP usado não é permitido para este recurso.",
            406 => "Requisição em falta: O servidor não pode produzir uma resposta aceitável.",
            409 => "Conflito: A solicitação entra em conflito com o estado atual do recurso.",
            500 => "Erro interno do servidor: Houve um problema no servidor ao processar sua solicitação.",
            501 => "Não implementado: O servidor não suporta a funcionalidade necessária.",
            502 => "Gateway com erro: O servidor não pode obter uma resposta válida de um servidor upstream.",
            504 => "Tempo limite da solicitação: O servidor não pode receber uma resposta oportuna de um servidor upstream.",
            503 => "Serviço indisponível: O servidor está temporariamente indisponível.",
        ];

        echo View::render("pages/error", [
            "head" => Head::render([
                "links" => [
                    ["rel" => "stylesheet", "href" => URL_BASE."/assets/css/error.css"]
                ]
            ]),
            "code" => $params["code"],
            "details" => $errorsDetails[$params["code"]],
            "urlBase" => URL_BASE
        ]);

    }

}