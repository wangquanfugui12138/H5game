function pro() {
    var ctx,cwidth = 400,cheight = 600,
        birdIndex = 0, ver1 = 10,ver2,
        gravity = 2, pipe_height = 200, velocity = 10,
        tid, score = 0, isScore = false, birds = ["./images/0.gif","./images/1.gif","./images/2.gif"],
        back = new Background(0,0,400,600,"./images/bg.png"),
        up_pipe = new UpPipe(-100,0,100,200,"./images/pipe.png"),
        down_pipe = new DownPipe(-100,400,100,200,"./images/pipe.png"),
        ground = new Background(0,550,400,200,"./images/ground.png"),
        bird = new Bird(80,300,40,40,birds),
        objects = [back,up_pipe,down_pipe,ground,bird];

    function UpPipe(x,y,width,height,img_src){
        this.px = x;
        this.py = y;
        this.pwidth = width;
        this.pheight = height;
        this.img_src = img_src;
        this.draw = drawUpPipe;
    }
    function DownPipe(x,y,width,height,img_src){
        this.px = x;
        this.py = y;
        this.pwidth = width;
        this.pheight = height;
        this.img_src = img_src;
        this.draw = drawDownPipe;
    }
    function drawUpPipe(){
        var image = new Image();
        image.src = this.img_src;
        ctx.drawImage(image,150,500,150,800,this.px,this.py,this.pwidth,this.pheight);
    }
    function drawDownPipe(){
        var image = new Image();
        image.src = this.img_src;
        ctx.drawImage(image,0,500,150,500,this.px,this.py,this.pwidth,this.pheight);
    }
    function Background(x,y,width,height,img_src){
        this.bgx = x;
        this.bgy = y;
        this.bgwidth = width;
        this.bgheight = height;
        var image = new Image();
        image.src = img_src;
        this.img = image;
        this.draw = drawbg;
    }
    function drawbg(){
        ctx.drawImage(this.img,this.bgx,this.bgy,this.bgwidth,this.bgheight);
    }
    function Bird(x,y,width,height,img_srcs){
        this.bx = x;
        this.by = y;
        this.bwidth = width;
        this.bheight = height;
        this.imgs = img_srcs;
        this.draw = drawbird;
    }
    function drawbird(){
        birdIndex++;
        var image = new Image();
        image.src = this.imgs[birdIndex%3];
        ctx.drawImage(image,this.bx,this.by,this.bwidth,this.bheight);
    }
    function calculator(){
        if(bird.by+bird.bheight>ground.bgy ||
            ((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(    bird.by<up_pipe.py+up_pipe.pheight))||
            ((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(    bird.by<up_pipe.py+up_pipe.pheight))||
            ((bird.bx>down_pipe.px)&&(bird.by>down_pipe.py)&&(bird.bx<down_pipe.px+down_pipe.pwidth)&&(bird.by<down_pipe.py+down_pipe.pheight))||
            ((bird.bx>down_pipe.px)&&(bird.by+bird.bheight>down_pipe.py)&&(bird.bx<down_pipe.px+down_pipe.pwidth)&&(bird.by+bird.bheight<down_pipe.py+down_pipe.pheight))){
            clearInterval(tid);
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.font = "30px Accent";
            ctx.textAlign='center';
            ctx.fillText('你的得分是：'+score,200,300);
            return;
        }
        ver2 = ver1+gravity;
        bird.by += (ver2+ver1)*0.5;
        if(up_pipe.px+up_pipe.pwidth>0){
            up_pipe.px -= velocity;
            down_pipe.px -= velocity;
        }else{
            up_pipe.px = 400;
            down_pipe.px = 400;
            up_pipe.pheight = 100+Math.random()*200;
            down_pipe.py = up_pipe.pheight+pipe_height;
            down_pipe.pheight = 600-down_pipe.py;
            isScore = true;
        }
        if(isScore && bird.bx>up_pipe.px+up_pipe.pwidth){
            score += 1;
            isScore = false;
            if(score>0 && score%10 === 0){
                velocity++;
            }
        }
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "30px Accent";
        if(score>0){
            score%10!==0?ctx.fillText(score,200,100):ctx.fillText("开始加速咯!"+score,200,100);
        }
    }
    function drawall(){
        ctx.clearRect(0,0,cwidth,cheight);

        for(var i=0;i<objects.length;i++){
            objects[i].draw();
        }
        calculator();
    }
    function keyup(e){
        var e = e||event;
        var currKey = e.keyCode||e.which||e.charCode;
        switch (currKey){
            case 38:
                bird.by -= 80;
                break;
        }
    }
    function init(){
        ctx = document.getElementById('canvas').getContext('2d');
        document.onkeyup = keyup;
        drawall();
        tid = setInterval(drawall,80);
    }

    return {
        init:init
    }
};

