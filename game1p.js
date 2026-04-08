let des = document.getElementById('des').getContext('2d')
let canvas = document.getElementById('des')

let Inimigo = new Enemy(1300, 325, 60, 60, '/img/rock_image.png')
let Inimigo2 = new Enemy(1450, 125, 60, 60, '/img/rock_image.png')
let Inimigo3 = new Enemy(2030, 200, 60, 60, '/img/rock_image.png')
let Inimigo4 = new Enemy(1400, 500, 60, 60, '/img/rock_image.png')
let Inimigo5 = new Enemy(1700, 400, 60, 60, '/img/rock_image.png')
let artefato = new Artefato(1450, 625, 30, 30, '/img/artefact_image.png')
let artefato2 = new Artefato(2030, 300, 30, 30, '/img/artefact_image.png')
let artefato3 = new Artefato(1700, 625, 30, 30, '/img/artefact_image.png')
let heart = new Heart(1700, 500, 30, 30, '/img/heart.png')

let player = new Personagem(100, 325, 60, 85, './img/indiana_001_bg.png')

canvas.style.background = 'url(./img/jungle.png) center/cover'

let t1 = new Text()
let t2 = new Text()
let t3 = new Text()
let fase_txt = new Text()

let jogar = true
let fase = 1

document.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        player.dir = -10
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        player.dir = 10
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        player.dir = 0
    }
})

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game_over() {
    if (player.vida <= 0) {
        jogar = false
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                player.vida = 5
                player.pontos = 0
                player.x = 100

                jogar = true
                fase = 1
                Inimigo.x = 1300
                Inimigo2.x = 1450
                Inimigo3.x = 2030
                Inimigo4.x = 1400
                Inimigo5.x = 1700
                Inimigo.vel = 3
                Inimigo2.vel = 3
                Inimigo3.vel = 3
                Inimigo4.vel = 3
                Inimigo5.vel = 3
                canvas.style.background = 'url(./img/jungle.png) center/cover'
            }
        })
    }
}

function ver_fase() {
    if (player.pontos > 50 && fase == 1) {
        fase = 2
        Inimigo.vel = random(3, 6)
        Inimigo2.vel = random(3, 6)
        Inimigo3.vel = random(3, 6)
        Inimigo4.vel = random(3, 6)
        Inimigo5.vel = random(3, 6)
        canvas.style.background = 'url(./img/cave.png) center/cover'
    } else if (player.pontos > 100 && fase == 2) {
        fase = 3
        Inimigo.vel = random(7, 10)
        Inimigo2.vel = random(7, 10)
        Inimigo3.vel = random(7, 10)
        Inimigo4.vel = random(7, 10)
        Inimigo5.vel = random(7, 10)
        canvas.style.background = 'url(./img/desert.jpeg) center/cover'
    }
}

function coleta() {
    if (player.colid(artefato)) { player.pontos += 5; artefato.recomeca() }
    if (player.colid(artefato2)) { player.pontos += 5; artefato2.recomeca() }
    if (player.colid(artefato3)) { player.pontos += 5; artefato3.recomeca() }
    if (player.colid(heart)) { player.vida += 1; heart.recomeca() }
}

function colisao() {
    if (player.colid(Inimigo)) { Inimigo.recomeca(); player.vida -= 1 }
    if (player.colid(Inimigo2)) { Inimigo2.recomeca(); player.vida -= 1 }
    if (player.colid(Inimigo3)) { Inimigo3.recomeca(); player.vida -= 1 }
    if (player.colid(Inimigo4)) { Inimigo4.recomeca(); player.vida -= 1 }
    if (player.colid(Inimigo5)) { Inimigo5.recomeca(); player.vida -= 1 }
}

function pontuacao() {
    if (player.point(Inimigo)) { player.pontos += 1; Inimigo.recomeca() }
    if (player.point(Inimigo2)) { player.pontos += 1; Inimigo2.recomeca() }
    if (player.point(Inimigo3)) { player.pontos += 1; Inimigo3.recomeca() }
    if (player.point(Inimigo4)) { player.pontos += 1; Inimigo4.recomeca() }
    if (player.point(Inimigo5)) { player.pontos += 1; Inimigo5.recomeca() }
}

function desenha() {
    if (jogar) {
        Inimigo.des_personagem()
        Inimigo2.des_personagem()
        Inimigo3.des_personagem()
        Inimigo4.des_personagem()
        Inimigo5.des_personagem()
        artefato.des_personagem()
        artefato2.des_personagem()
        artefato3.des_personagem()
        heart.des_personagem()

        t1.des_text('Pontos: ' + player.pontos, 1000, 40, 'yellow', '26px Arial')
        t2.des_text('Vidas: ' + player.vida, 40, 40, 'red', '26px Arial')
        fase_txt.des_text('Fase: ' + fase, 550, 40, 'white', '26px Arial')
    } else {
        t1.des_text('GAME OVER', 400, 280, 'yellow', '60px Arial')
        t2.des_text('Pontuação Final: ' + player.pontos, 440, 360, 'white', '28px Arial')
        t3.des_text('Pressione ENTER para recomeçar!', 370, 430, 'white', '25px Arial')
    }
}

function atualiza() {
    if (jogar) {
        if (player.vida > 0) {
            player.mov_player()
            player.des_personagem()
        } else {
            player.x = -300
        }
        if (artefato.vel == 0 && artefato2.vel == 0 && artefato3.vel == 0) {
            artefato.vel = random(3, 6)
            artefato2.vel = random(3, 6)
            artefato3.vel = random(3, 6)
        }
        Inimigo.mov_enemy()
        Inimigo2.mov_enemy()
        Inimigo3.mov_enemy()
        Inimigo4.mov_enemy()
        Inimigo5.mov_enemy()
        artefato.mov_art()
        artefato2.mov_art()
        artefato3.mov_art()
        heart.mov_heart()
        player.anim('indiana_00')
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
