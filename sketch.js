let lixo = [];
let pontos = 0;
let tempoTotal = 30;

let peixes = [];
let nuvens = [];

function setup() {
  createCanvas(900, 500);

  // lixo variado
  for (let i = 0; i < 18; i++) {
    lixo.push({
      x: random(width),
      y: random(180, 340),
      tipo: floor(random(3)),
      removido: false
    });
  }

  // peixes
  for (let i = 0; i < 8; i++) {
    peixes.push({
      x: random(width),
      y: random(200, 340),
      vel: random(0.8, 1.8)
    });
  }

  // nuvens
  for (let i = 0; i < 5; i++) {
    nuvens.push({
      x: random(width),
      y: random(40, 120),
      vel: random(0.2, 0.6)
    });
  }
}

function draw() {
  drawSky();
  drawSun();

  drawNuvens();

  drawGround();
  drawRiver();

  drawTrees();
  drawFish();
  drawTrash();

  drawUI();

  checkWinLose();
}

// 🌌 céu com gradiente simples
function drawSky() {
  for (let y = 0; y < 180; y++) {
    stroke(lerpColor(color(120,200,255), color(200,240,255), y/180));
    line(0, y, width, y);
  }
  noStroke();
}

// ☀️ sol suave
function drawSun() {
  fill(255, 220, 120, 180);
  circle(750, 90, 90);

  fill(255, 230, 150, 80);
  circle(750, 90, 130);
}

// ☁️ nuvens lentas
function drawNuvens() {
  for (let n of nuvens) {
    fill(255, 255, 255, 220);
    noStroke();
    ellipse(n.x, n.y, 80, 40);
    ellipse(n.x + 30, n.y + 5, 60, 35);

    n.x += n.vel;
    if (n.x > width + 60) n.x = -60;
  }
}

// 🌱 chão
function drawGround() {
  noStroke();
  fill(70, 170, 80);
  rect(0, 340, width, 160);
}

// 🌊 rio mais realista
function drawRiver() {
  noStroke();
  for (let y = 170; y < 340; y += 5) {
    let wave = sin((frameCount + y) * 0.03) * 4;
    fill(30, 130, 220, 180);
    rect(0, y + wave, width, 6);
  }
}

// 🌳 árvores com sombra
function drawTrees() {
  for (let i = 0; i < 2; i++) {
    let x = i === 0 ? 100 : 780;

    // sombra
    fill(0, 0, 0, 50);
    ellipse(x + 10, 350, 80, 20);

    // tronco
    fill(110, 70, 30);
    rect(x, 280, 20, 80);

    // copa
    fill(40, 130, 60);
    circle(x + 10, 260, 80);
    circle(x + 35, 270, 60);
    circle(x - 15, 270, 60);
  }
}

// 🐟 peixes mais suaves
function drawFish() {
  for (let p of peixes) {
    fill(255, 140, 0);
    ellipse(p.x, p.y, 35, 18);

    triangle(p.x - 18, p.y,
             p.x - 30, p.y - 8,
             p.x - 30, p.y + 8);

    fill(0);
    circle(p.x + 8, p.y - 2, 3);

    p.x += p.vel;

    if (p.x > width + 20) {
      p.x = -20;
      p.y = random(200, 340);
    }
  }
}

// 🗑️ lixo realista simples
function drawTrash() {
  for (let l of lixo) {
    if (!l.removido) {

      if (l.tipo === 0) fill(200); // lata
      if (l.tipo === 1) fill(150, 150, 150); // plástico
      if (l.tipo === 2) fill(120); // saco

      rect(l.x, l.y, 18, 18, 3);
    }
  }
}

// 🖱️ clique para remover lixo
function mousePressed() {
  for (let l of lixo) {
    if (!l.removido &&
        dist(mouseX, mouseY, l.x, l.y) < 18) {
      l.removido = true;
      pontos++;
    }
  }
}

// 📊 interface limpa
function drawUI() {
  fill(0);
  textSize(18);
  textAlign(LEFT);
  text("🌱 Lixo removido: " + pontos, 20, 30);

  let tempo = max(0, tempoTotal - floor(millis() / 1000));
  text("⏱️ Tempo: " + tempo, 20, 55);
}

// 🏆 fim do jogo
function checkWinLose() {
  if (lixo.every(l => l.removido)) {
    fill(0, 180, 0);
    textAlign(CENTER);
    textSize(40);
    text("RIO RESTAURADO 🌿", width/2, height/2);
    noLoop();
  }

  let tempo = max(0, tempoTotal - floor(millis() / 1000));

  if (tempo <= 0 && !lixo.every(l => l.removido)) {
    fill(200, 0, 0);
    textAlign(CENTER);
    textSize(40);
    text("O RIO FOI PREJUDICADO", width/2, height/2);
    noLoop();
  }
}
