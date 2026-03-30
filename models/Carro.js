class Obj{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

    des_personagem(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    } 
}

class Personagem extends Obj{

    dir = 0
    vida = 5
    pontos = 0
    frame = 1
    tempo = 0

    mov_player(){
        this.y += this.dir
        if(this.y < 62){
            this.y = 62
        }else if(this.y > 607){
            this.y = 606
        }
    }

    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
          (this.x + this.w > objeto.x)&&
          (this.y < objeto.y + objeto.h)&&
          (this.y + this.h > objeto.y)){
            return true
        }else{
            return false
        }
    }

    point(objeto){
        if(objeto.x <= -100){
            return true
        }else{
            return false
        }
    }

    anim(nome){
        this.tempo +=1
        if(this.tempo > 20){
            this.tempo = 0
            this.frame +=1
        }
        if(this.frame>3){
            this.frame=1
        }
        this.a = "./img/"+nome+this.frame+"_bg.png"
    }


    
}

class Enemy extends Obj{

    vel = 3

    recomeca(){
        this.x = 1300
        this.y =  Math.floor(Math.random() * (638 - 62) + 62)
    }

    mov_enemy(){
        this.x -= this.vel
        if(this.x <= - 200){            
            this.recomeca()         
        }
    }
}

class Artefato extends Obj{

    vel = 0

    recomeca(){
        this.x = 1300
        this.y =  Math.floor(Math.random() * (638 - 62) + 62)
    }

    mov_art(){
        this.x -= this.vel
        if(this.x <= - 200){            
            this.recomeca()         
        }
    }
}

class Heart extends Obj{

    vel = 2

    recomeca(){
        this.x = 1300
        this.y =  Math.floor(Math.random() * (638 - 62) + 62)
    }

    mov_heart(){
        this.x -= this.vel
        if(this.x <= - 200){            
            this.recomeca()         
        }
    }
}

class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}
