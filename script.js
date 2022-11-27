var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 20;
var criaMosquitoTempo = 1500;

var nivel = window.location.search
nivel = nivel.replace("?", "");

if(nivel === "normal") {
    criaMosquitoTempo = 1500;

} else if(nivel === "dificil") {
    criaMosquitoTempo = 1000;

} else if(nivel === "superdificil") {
    criaMosquitoTempo = 750;
}


function ajustaTamanhoPalcoJogo(){
    altura = window.innerHeight;
    largura = window.innerWidth;

    console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function() {
    tempo -= 1

    if(tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location.href = "vitoria.html";
    } else {
        document.getElementById("cronometro").innerHTML = tempo; //innerHTML para inserir um texto dentro da tag que contem o ID    
    }
}, 1000);

function posicaoAleatoria() {
    //remover mosquito antes de criar um novo para que um unico mosquito fique na tela;
    if(document.getElementById("mosquito")) {//teste para saber se antes de remover o elemento, ele existe, caso haja o retorno do elemento selecionado no navegador ele remove;
        document.getElementById("mosquito").remove();

        if(vidas > 3){
            window.location.href = "fim_de_jogo.html";
        } else {
            document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png";
            vidas++;
        }
    }

    //math.random() gera valores aleatórios que vão de 0 a 1;
    /*para criarmos valores que estejam entre os intervalos de largura e altura que foram identificados pela função ajustaTamanhoPalcoJogo(), no math.random() pegamos o valor produzido de forma aleatória e multiplicamos pela altura e largura,
    o resultado disso são valores aleatórios que vão de 0 até o respectivo valor da miltiplicação de altura e largura; */
    //a subtração de 90px serve para que na hora da criação de um valor aleatório a posição criada aleatoriamente seja 90px menor que o limite, fazendo com que a imagem caiba dentro da dimensão sem o estouro para fora da tela.
    var posicaoX = Math.floor(Math.random() * largura) - 90; 
    var posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    console.log(posicaoX, posicaoY);

    //criando o elemento html de forma dinâmica através do JS e na sequência adicionando esse elemento no body da página;
    var mosquito = document.createElement("img");
    mosquito.src = "imagens/mosquito.png";
    mosquito.className = tamanhoAleatorioImagem() + " " + ladoAleatorioImagem(); //atribuindo as classes criadas anteriormente no elemento html criado de forma programática;
    mosquito.style.left = posicaoX + "px"; //concatenado a string "px" para formar a coordenada em pixels;
    mosquito.style.top = posicaoY + "px";
    mosquito.style.position = "absolute"; //para que as coordenadas sejam aplicadas o elemento precisa ser absoluto;
    mosquito.id = "mosquito";
    mosquito.onclick = function() {
        this.remove();
    }

    document.body.appendChild(mosquito);
}

function tamanhoAleatorioImagem() {
    var classe = Math.floor(Math.random() * 3);

    switch(classe) {
        case 0:
            return "mosquito1";

        case 1:
            return "mosquito2";

        case 2:
            return "mosquito3";
    }
}

function ladoAleatorioImagem() {
    var classe = Math.floor(Math.random() * 2);

    switch(classe) {
        case 0:
            return "ladoA";

        case 1:
            return "ladoB";
    }
}

//criando mosquitos a cada ciclo de tempo;
var criaMosquito = setInterval(function() {
    posicaoAleatoria()}, criaMosquitoTempo);

document.getElementById("cronometro").innerHTML = tempo;