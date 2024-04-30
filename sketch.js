let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

let velocidade_xBolinha = 6;
let velocidade_yBolinha = 6;

let xRaquete = 5;
let yRaquete = 150;
let comprimentoraquete = 10;
let alturaraquete = 90;

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeyOponente;
let chancedeerrar = 0;

let meuspontos = 0;
let oponentepontos = 0;

let raquetada;
let ponto;
let trilha;

let colidiu = false;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(255);
  mostrarBolinha();
  colisao_bolinha();
  mostrarraquete(xRaquete, yRaquete);
  mostrarraquete(xRaqueteOponente, yRaqueteOponente);
  moverraquete();
  colisao_raquete(xRaquete, yRaquete);
  colisao_raquete(xRaqueteOponente, yRaqueteOponente)
  moverraqueteOponente()
  placar();
  pontuar();
  bolinhapresa();
}

function mostrarBolinha() {
  fill("red")
  circle(xBolinha, yBolinha, diametro);
}
function colisao_bolinha() {
  xBolinha += velocidade_xBolinha;
  yBolinha += velocidade_yBolinha;
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidade_xBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidade_yBolinha *= -1;
  }
}
function mostrarraquete(x,y) {
  fill("purple")
  rect(x,y, comprimentoraquete, alturaraquete);
}
function moverraquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}
function colisao_raquete(x, y) {
  
  colidiu = collideRectCircle(
    x,
    y,
    comprimentoraquete,
    alturaraquete,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidade_xBolinha *= -1;
    raquetada.play();
  }
  
}
function moverraqueteOponente(){
  velocidadeyOponente = yBolinha - yRaqueteOponente - comprimentoraquete/2-30;
  yRaqueteOponente += velocidadeyOponente;
  calculaerro();
}
function placar(){
  textAlign(CENTER);
  textSize(20);
  fill("yellow");
  rect(180, 8, 40, 20);
  fill(0);
  text(meuspontos, 200, 26);
  fill("yellow")
  rect(380, 8, 40, 20);
  fill(0);
  text(oponentepontos, 400, 26);
  
}
function pontuar(){
  if(xBolinha < 10){
    oponentepontos += 1;
    ponto.play();
  }
  if(xBolinha > 590){
    meuspontos += 1;
    ponto.play();
  }
}
function bolinhapresa(){
  if(xBolinha - raio < 0){
    xBolinha = 23;
  }
}
function calculaerro(){
  if(oponentepontos > meuspontos){
    chancedeerrar += 1;
    if(chancedeerrar >= 39){
      chancedeerrar = 40;
    } else{
      chancedeerrar -= 1
      if(chancedeerrar <= 35){
        chancedeerrar = 35;
      }
    }
  }
}
