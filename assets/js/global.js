import Utils from './utils.js'

const phrases = [
    'Parece que alguém está bisbilhotando o console. 👀',
    'Procurando segredos? Você é um verdadeiro detetive!',
    'Nada de interessante por aqui, exceto por você!',
    'Você encontrou um easter egg no console! 🥚',
    'Debugando a vida, um passo de cada vez.',
    'Console diz: "Hello, World!"',
    'Descobrindo o código secreto da existência...',
    'Navegando pelas entranhas do código, hein?',
    'Este console é uma caixa de surpresas! Ou não...',
    'Temos um espertinho entre nós!'
];

console.log(`%c${Utils.shuffle(phrases)[0]}`, 'font-size: 24pt;')