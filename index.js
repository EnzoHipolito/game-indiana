let des = document.getElementById('des').getContext('2d')
let canvas = document.getElementById('des')

let carroInimigo = new CarroInimigo(1300, 325, 60, 60, '/img/rock_image.png')
let carroInimigo2 = new CarroInimigo(1450, 125, 60, 60, '/img/rock_image.png')
let carroInimigo3 = new CarroInimigo(2030, 200, 60, 60, '/img/rock_image.png')
let carroInimigo4 = new CarroInimigo(1400, 500, 60, 60, '/img/rock_image.png')
let carroInimigo5 = new CarroInimigo(1700, 400, 60, 60, '/img/rock_image.png')
let artefato = new Artefato(1450, 625, 30, 30, '/img/artefact_image.png')
let artefato2 = new Artefato(2030, 300, 30, 30, '/img/artefact_image.png')
let artefato3 = new Artefato(1700, 625, 30, 30, '/img/artefact_image.png')
let heart = new Heart(1700, 500, 30, 30, '/img/heart.png')

let carro  = new Carro(100, 325, 60, 85, './img/indiana_001_bg.png')
let carro2 = new Carro(100, 500, 60, 85, './img/indiana_001_bg.png')

canvas.style.background = 'url(./img/jungle.png) center/cover'

let t1 = new Text()
let t2 = new Text()
let t3 = new Text()
let t4 = new Text()
let t5 = new Text()
let fase_txt = new Text()

let jogar = true
let fase = 1

// ── Controles ─────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
    // P1 — W / S
    if (e.key === 'w') {
        carro.dir = -10
    } else if (e.key === 's') {
        carro.dir = 10
    } else if (e.key === 'f') {
        carro.vida -= 1
    }
    // P2 — Setas
    if (e.key === 'ArrowUp') {
        carro2.dir = -10
    } else if (e.key === 'ArrowDown') {
        carro2.dir = 10
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') {
        carro.dir = 0
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        carro2.dir = 0
    }
})

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game_over() {
    if (carro.vida <= 0 && carro2.vida <= 0) {
        jogar = false
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                carro.vida  = 5
                carro2.vida = 5
                carro.pontos  = 0
                carro2.pontos = 0
                carro.x = 100
                carro2.x = 100

                jogar = true
                fase = 1
                carroInimigo.x  = 1300
                carroInimigo2.x = 1450
                carroInimigo3.x = 2030
                carroInimigo4.x = 1400
                carroInimigo5.x = 1700
                carroInimigo.vel  = 3
                carroInimigo2.vel = 3
                carroInimigo3.vel = 3
                carroInimigo4.vel = 3
                carroInimigo5.vel = 3
            }
        })
    }
}

function ver_fase() {
    if ((carro.pontos > 50 || carro2.pontos > 50) && fase == 1) {
        fase = 2
        carroInimigo.vel  = random(3, 6)
        carroInimigo2.vel = random(3, 6)
        carroInimigo3.vel = random(3, 6)
        carroInimigo4.vel = random(3, 6)
        carroInimigo5.vel = random(3, 6)
        canvas.style.background = 'url(./img/cave.png) center/cover'
    } else if ((carro.pontos > 100 || carro2.pontos > 100) && fase == 2) {
        fase = 3
        carroInimigo.vel  = random(7, 10)
        carroInimigo2.vel = random(7, 10)
        carroInimigo3.vel = random(7, 10)
        carroInimigo4.vel = random(7, 10)
        carroInimigo5.vel = random(7, 10)
        canvas.style.background = 'url(./img/desert.jpeg) center/cover'
    }
}

function coleta() {
    // Player 1
    if (carro.colid(artefato) || carro2.colid(artefato)) {
        if (carro.colid(artefato))  carro.pontos += 5
        if (carro2.colid(artefato)) carro2.pontos += 5
        artefato.recomeca()
    }
    if (carro.colid(artefato2) || carro2.colid(artefato2)) {
        if (carro.colid(artefato2))  carro.pontos += 5
        if (carro2.colid(artefato2)) carro2.pontos += 5
        artefato2.recomeca()
    }
    if (carro.colid(artefato3) || carro2.colid(artefato3)) {
        if (carro.colid(artefato3))  carro.pontos += 5
        if (carro2.colid(artefato3)) carro2.pontos += 5
        artefato3.recomeca()
    }
    if (carro.colid(heart) || carro2.colid(heart)) {
        if (carro.colid(heart))  carro.vida += 1
        if (carro2.colid(heart)) carro2.vida += 1
        heart.recomeca()
    }
}

function colisao() {
    // Player 1
    if (carro.colid(carroInimigo))  {  carroInimigo.recomeca();  carro.vida -= 1 }
    if (carro.colid(carroInimigo2)) {  carroInimigo2.recomeca(); carro.vida -= 1 }
    if (carro.colid(carroInimigo3)) {  carroInimigo3.recomeca(); carro.vida -= 1 }
    if (carro.colid(carroInimigo4)) {  carroInimigo4.recomeca(); carro.vida -= 1 }
    if (carro.colid(carroInimigo5)) {  carroInimigo5.recomeca(); carro.vida -= 1 }
    // Player 2
    if (carro2.colid(carroInimigo))  {  carroInimigo.recomeca();  carro2.vida -= 1 }
    if (carro2.colid(carroInimigo2)) {  carroInimigo2.recomeca(); carro2.vida -= 1 }
    if (carro2.colid(carroInimigo3)) {  carroInimigo3.recomeca(); carro2.vida -= 1 }
    if (carro2.colid(carroInimigo4)) {  carroInimigo4.recomeca(); carro2.vida -= 1 }
    if (carro2.colid(carroInimigo5)) {  carroInimigo5.recomeca(); carro2.vida -= 1 }
}

function pontuacao() {
    if (carro.point(carroInimigo) || carro2.point(carroInimigo)) {
        if (carro.point(carroInimigo))  carro.pontos += 1
        if (carro2.point(carroInimigo)) carro2.pontos += 1
        carroInimigo.recomeca()
    }
    if (carro.point(carroInimigo2) || carro2.point(carroInimigo2)) {
        if (carro.point(carroInimigo2))  carro.pontos += 1
        if (carro2.point(carroInimigo2)) carro2.pontos += 1
        carroInimigo2.recomeca()
    }
    if (carro.point(carroInimigo3) || carro2.point(carroInimigo3)) {
        if (carro.point(carroInimigo3))  carro.pontos += 1
        if (carro2.point(carroInimigo3)) carro2.pontos += 1
        carroInimigo3.recomeca()
    }
    if (carro.point(carroInimigo4) || carro2.point(carroInimigo4)) {
        if (carro.point(carroInimigo4))  carro.pontos += 1
        if (carro2.point(carroInimigo4)) carro2.pontos += 1
        carroInimigo4.recomeca()
    }
    if (carro.point(carroInimigo5) || carro2.point(carroInimigo5)) {
        if (carro.point(carroInimigo5))  carro.pontos += 1
        if (carro2.point(carroInimigo5)) carro2.pontos += 1
        carroInimigo5.recomeca()
    }
}

function desenha() {
    if (jogar) {
        carroInimigo.des_carro()
        carroInimigo2.des_carro()
        carroInimigo3.des_carro()
        carroInimigo4.des_carro()
        carroInimigo5.des_carro()
        artefato.des_carro()
        artefato2.des_carro()
        artefato3.des_carro()
        heart.des_carro()

        // HUD P1 — topo (idêntico ao original)
        t1.des_text('Pontos: ' + carro.pontos, 1000, 40, 'yellow', '26px Arial')
        t2.des_text('Vidas: '  + carro.vida,     40, 40, 'red',    '26px Arial')
        fase_txt.des_text('Fase: ' + fase,       550, 40, 'white',  '26px Arial')
        
        // HUD P2 — fundo (réplica exata, y=690)
        t4.des_text('Pontos: ' + carro2.pontos, 1000, 690, 'yellow', '26px Arial')
        t5.des_text('Vidas: '  + carro2.vida,     40, 690, 'red',    '26px Arial')
        
    } else {
        t1.des_text('GAME OVER',                                    400, 300, 'yellow', '60px Arial')
        t2.des_text('P1 - Pontuação Final: ' + carro.pontos,        430, 370, 'white',  '25px Arial')
        t3.des_text('P2 - Pontuação Final: ' + carro2.pontos,       430, 410, 'white',  '25px Arial')
        t4.des_text('Pressione ENTER para recomeçar o jogo!',        370, 470, 'white',  '25px Arial')
    }
}

function atualiza() {
    if (jogar) {
        if (carro.vida  > 0){
            carro.mov_car()
            carro.des_carro()
            t3.des_text('P1', carro.x  + 18, carro.y  - 8, '#4da6ff', 'bold 16px Arial')
        }else{
            carro.x = -300
        }
        if (carro2.vida > 0){
            carro2.mov_car()
            carro2.des_carro()
            t3.des_text('P2', carro2.x + 18, carro2.y - 8, '#ff6b6b', 'bold 16px Arial')
        }else{
            carro2.x = -300
        }
        if(artefato.vel == 0 && artefato2.vel == 0 && artefato3.vel == 0){
            artefato.vel = random(3, 6)
            artefato2.vel = random(3, 6)
            artefato3.vel = random(3, 6)
        }
        carroInimigo.mov_car()
        carroInimigo2.mov_car()
        carroInimigo3.mov_car()
        carroInimigo4.mov_car()
        carroInimigo5.mov_car()
        artefato.mov_art()
        artefato2.mov_art()
        artefato3.mov_art()
        heart.mov_heart()
        carro.anim('indiana_00')
        carro2.anim('indiana_00')
        colisao()
        pontuacao()
        ver_fase()
        game_over()
        coleta()
    }
}

function main() {
    des.clearRect(0, 0, 1200, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()