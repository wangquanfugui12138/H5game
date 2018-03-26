function Canvas(cv){
    this.ctx=cv.getContext('2d');
    this.width=this.ctx.canvas.offsetWidth;
    this.boxWidth=this.width*0.8*0.25;
    this.marginWidth=this.width*0.2*0.2;
    this.arr=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
}
Canvas.prototype= {
    init: function () {
        this.random();
        this.random();
        this.draw();
        this.listen();
    },
    draw: function () {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#f0d799";
        this.ctx.fillRect(0, 0, this.width, this.width);
        for (var i = 0, len1 = this.arr.length; i < len1; i++) {
            for (var j = 0, len2 = this.arr[i].length; j < len2; j++) {
                var color = "";
                if (this.arr[i][j] == 0) {
                    color = "#D7C184 ";
                }
                if (this.arr[i][j] == 2) {
                    color = "#f5bb82 ";
                }
                if (this.arr[i][j] == 4) {
                    color = "#DBB280 ";
                }
                if (this.arr[i][j] == 8) {
                    color = "#E1C57A ";
                }
                if (this.arr[i][j] == 16) {
                    color = "#E8B173 ";
                }
                if (this.arr[i][j] == 32) {
                    color = "#F2A769 ";
                }
                if (this.arr[i][j] == 64) {
                    color = "#e08931 ";
                }
                if (this.arr[i][j] == 128) {
                    color = "#f27f0c ";
                }
                if (this.arr[i][j] == 256) {
                    color = "#f76063 ";
                }
                if (this.arr[i][j] == 512) {
                    color = "#e84648 ";
                }
                if (this.arr[i][j] == 1024) {
                    color = "#b03133 ";
                }
                if (this.arr[i][j] >= 2048) {
                    color = "#fc080c ";
                }
                var x = this.marginWidth + j * (this.boxWidth + this.marginWidth),
                    y = this.marginWidth + i * (this.boxWidth + this.marginWidth);
                this.drawRadiusRect(x, y, color);
                this.drawNum(this.arr);
            }
        }
    },
    drawRadiusRect: function (x, y, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.moveTo(x, y);
        this.ctx.arcTo(x + this.boxWidth, y, x + this.boxWidth, y + this.marginWidth * 0.7, this.marginWidth * 0.7);
        this.ctx.arcTo(x + this.boxWidth, y + this.boxWidth, x + this.boxWidth - this.marginWidth * 0.7, y + this.boxWidth, this.marginWidth * 0.7);
        this.ctx.arcTo(x, y + this.boxWidth, x, y + this.boxWidth - this.marginWidth * 0.7, this.marginWidth * 0.7);
        this.ctx.arcTo(x, y, x + this.marginWidth * 0.7, y, this.marginWidth * 0.7);
        this.ctx.fill();
    },
    random: function () {
        var i = Math.floor(Math.random() * this.arr.length),
            j = Math.floor(Math.random() * this.arr[0].length);
        if (this.arr[i][j] == 0) {
            this.arr[i][j] = 2;
        } else {
            this.random();
        }
    },
    drawNum: function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.arr[i][j] > 0) {
                    this.ctx.beginPath();
                    this.ctx.textAlign = "center";
                    this.ctx.textBaseline = "middle";
                    this.ctx.fillStyle = "orange";
                    this.ctx.font = "40px Arial";
                    var x = this.marginWidth + j * (this.boxWidth + this.marginWidth) + this.boxWidth / 2,
                        y = this.marginWidth + i * (this.boxWidth + this.marginWidth) + this.boxWidth / 2;
                    this.ctx.fillText(this.arr[i][j], x, y);
                }
            }
        }
    },
    check: function (arr) {
        var flag=false;
        if (arr[0]==0&&arr[1]==0&&arr[2]==0&&arr[3]==0||
            arr[0]>0&&arr[1]==0&&arr[2]==0&&arr[3]==0||
            arr[0]>0&&arr[1]>0&&arr[2]==0&&arr[3]==0||
            arr[0]>0&&arr[1]>0&&arr[2]>0&&arr[3]==0||
            arr[0]>0&&arr[1]>0&&arr[2]>0&&arr[3]>0) {
            flag=true;
        }
        if (arr[0]==arr[1]&&arr[0]!=0||
            arr[1]==arr[2]&&arr[1]!=0||
            arr[2]==arr[3]&&arr[2]!=0){
            flag=false;
        }
        return flag;
    },
    checkRandB: function (arr) {
        var flag=false;
        if (arr[0]==0&&arr[1]==0&&arr[2]==0&&arr[3]==0||
            arr[0]==0&&arr[1]>0&&arr[2]>0&&arr[3]>0||
            arr[0]==0&&arr[1]==0&&arr[2]>0&&arr[3]>0||
            arr[0]==0&&arr[1]==0&&arr[2]==0&&arr[3]>0||
            arr[0]>0&&arr[1]>0&&arr[2]>0&&arr[3]>0) {
            flag=true;
        }
        if (arr[0]==arr[1]&&arr[0]!=0||
            arr[1]==arr[2]&&arr[1]!=0||
            arr[2]==arr[3]&&arr[2]!=0){
            flag=false;
        }
        return flag;
    },
    change: function (arr,direction) {
        var dir=direction;
        if(dir=='37'||dir=='38'){
            for (var i = 0; i < 3; i++) {
                if (arr[i] == 0) {
                    var temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                }
                if (arr[i] == arr[i + 1] && arr[i] != 0) {
                    arr[i] = arr[i] + arr[i + 1];
                    arr[i + 1] = 0;
                }
            }
            if(!this.check(arr)){
                return this.change(arr,dir)
            }else{
                return arr
            }
        }else{
            for (var i = 3; i > 0; i--) {
                if (arr[i] == 0) {
                    var temp = arr[i];
                    arr[i] = arr[i - 1];
                    arr[i - 1] = temp;
                }
                if (arr[i] == arr[i - 1] && arr[i] != 0) {
                    arr[i] = arr[i] + arr[i - 1];
                    arr[i - 1] = 0;
                }
            }
            if(!this.checkRandB(arr)){
                return this.change(arr,dir)
            }else{
                return arr
            }
        }
    },
    isOver:function(){
        var times=0;
        this.arr.forEach(function (ele) {
            ele.forEach(function(ele){
                if(ele==0)times++;
            })
        });
        if(times==0) {
            return false
        }else{
            return true
        }
    },
    listen: function () {
        var _this = this;
        document.onkeydown = function (event) {
            var e = event || window.event;

            switch (e.keyCode){
                case 37://左
                    for (var i = 0; i < 4; i++) {
                        var arr = [0,0,0,0];
                        arr[0] = _this.arr[i][0];
                        arr[1] = _this.arr[i][1];
                        arr[2] = _this.arr[i][2];
                        arr[3] = _this.arr[i][3];
                        if (!_this.check(arr)){
                            arr = _this.change(arr, e.keyCode);
                        }
                        _this.arr[i][0] = arr[0];
                        _this.arr[i][1] = arr[1];
                        _this.arr[i][2] = arr[2];
                        _this.arr[i][3] = arr[3];
                    }
                    if(!_this.isOver()){
                        _this.ctx.clearRect(0,0,_this.width,_this.width);
                        _this.ctx.beginPath();
                        _this.ctx.fillStyle = "black";
                        _this.ctx.fill();
                        _this.ctx.fillRect(0,0,_this.width,_this.width);

                        _this.ctx.beginPath();
                        _this.ctx.fillStyle = "white";
                        var x=_this.width/ 2;
                        _this.ctx.fillText('Game Over!',x,x);
                    }else{
                        _this.ctx.clearRect(0,0,_this.width,_this.width);
                        _this.random();
                        _this.drawNum();
                        _this.draw();
                    }
                    break;
                case 38://上
                    for (var i = 0; i < 4; i++) {
                        var arr = [0,0,0,0];
                        arr[0] = _this.arr[0][i];
                        arr[1] = _this.arr[1][i];
                        arr[2] = _this.arr[2][i];
                        arr[3] = _this.arr[3][i];
                        if (!_this.check(arr)){
                            arr = _this.change(arr, e.keyCode);
                        }
                        _this.arr[0][i] = arr[0];
                        _this.arr[1][i] = arr[1];
                        _this.arr[2][i] = arr[2];
                        _this.arr[3][i] = arr[3];
                    }
                    if(!_this.isOver()){
                        _this.ctx.clearRect(0,0,_this.width,_this.width);
                        _this.ctx.beginPath();
                        _this.ctx.fillStyle = "black";
                        _this.ctx.fill();
                        _this.ctx.fillRect(0,0,_this.width,_this.width);

                        _this.ctx.beginPath();
                        _this.ctx.fillStyle = "white";
                        var x=_this.width/ 2;
                        _this.ctx.fillText('Game Over!',x,x);
                    }else{
                        _this.ctx.clearRect(0,0,_this.width,_this.width);
                        _this.random();
                        _this.drawNum();
                        _this.draw();
                    }
                    break;
                case 39://右
                    for (var i = 0; i < 4; i++) {
                        var arr = [0,0,0,0];
                        arr[0] = _this.arr[i][0];
                        arr[1] = _this.arr[i][1];
                        arr[2] = _this.arr[i][2];
                        arr[3] = _this.arr[i][3];
                        if (!_this.checkRandB(arr)){
                            arr = _this.change(arr, e.keyCode);
                        }
                        _this.arr[i][0] = arr[0];
                        _this.arr[i][1] = arr[1];
                        _this.arr[i][2] = arr[2];
                        _this.arr[i][3] = arr[3];
                    }
                    if(!_this.isOver()){
                        _this.ctx.clearRect(0,0,_this.width,_this.width);
                        _this.ctx.beginPath();
                        _this.ctx.fillStyle = "black";
                        _this.ctx.fill();
                        _this.ctx.fillRect(0,0,_this.width,_this.width);

                        _this.ctx.beginPath();
                        _this.ctx.fillStyle = "white";
                        var x=_this.width/ 2;
                        _this.ctx.fillText('Game Over!',x,x);
                    }else{
                        _this.ctx.clearRect(0,0,_this.width,_this.width);
                        _this.random();
                        _this.drawNum();
                        _this.draw();
                    }
                    break;
                case 40://下
                    for (var i = 0; i < 4; i++) {
                        var arr = [0,0,0,0];
                        arr[0] = _this.arr[0][i];
                        arr[1] = _this.arr[1][i];
                        arr[2] = _this.arr[2][i];
                        arr[3] = _this.arr[3][i];
                        if (!_this.checkRandB(arr)){
                            arr = _this.change(arr, e.keyCode);
                        }
                        _this.arr[0][i] = arr[0];
                        _this.arr[1][i] = arr[1];
                        _this.arr[2][i] = arr[2];
                        _this.arr[3][i] = arr[3];
                    }
                    if(!_this.isOver()){
                        _this.ctx.clearRect(0,0,_this.width,_this.width);
                        _this.ctx.beginPath();
                        _this.ctx.fillStyle = "black";
                        _this.ctx.fill();
                        _this.ctx.fillRect(0,0,_this.width,_this.width);

                        _this.ctx.beginPath();
                        _this.ctx.fillStyle = "white";
                        var x=_this.width/ 2;
                        _this.ctx.fillText('Game Over!',x,x);
                    }else{
                        _this.ctx.clearRect(0,0,_this.width,_this.width);
                        _this.random();
                        _this.drawNum();
                        _this.draw();
                    }
                    break;
            }
            _this.getMax();
        }
    },
    getMax: function () {
        var maxArr=this.arr.join(",").split(",");//转化为一维数组
        var max=Math.max.apply(null,maxArr);
        var preMax=localStorage.getItem('score') ;
        if(preMax<max)localStorage.setItem('score',max) ;
    }
};



