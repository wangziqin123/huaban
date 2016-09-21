/**
 * Created by Administrator on 2016/8/31 0031.
 */
function shape(copy,cobj,xp){
    this.copy=copy;
    this.cobj=cobj;
    this.xp=xp;
    this.canvasw=copy.offsetWidth;
    //alert(this.canvasw);
    this.canvash=copy.offsetHeight;
    //alert(this.canvash);
    this.fillStyle="#fff";
    this.strokeStyle="#fff";
    this.type="line";
    this.style="stroke";
    this.history=[];
    this.lineWidth=1;
    this.bianshu=5;
    this.jiaoshu=5;
    this.xpsize=10;
    this.isback=true;
}

shape.prototype={
    init:function(){
        this.cobj.fillStyle=this.fillStyle;
        this.cobj.strokeStyle=this.strokeStyle;
        this.cobj.lineWidth=this.lineWidth;
        this.xp.style.display="none";
    },
    draw:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            that.init();
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                var movex= e.offsetX;
                var movey= e.offsetY;
                that.cobj.clearRect(0,0,that.canvasw,that.canvash);
                if(that.history.length!=0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                that[that.type](startx,starty,movex,movey);
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasw,that.canvash));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;

            }
        }
    },
    pen:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            that.init();
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function(e){
                var movex= e.offsetX;
                var movey= e.offsetY;
                that.cobj.lineTo(movex,movey);
                that.cobj.stroke();
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasw,that.canvash));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;

            }
        }
    },
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
    },
    arc:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,Math.PI*2);
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var a=360/this.bianshu*Math.PI/180;
        for (var i=0;i<=this.bianshu;i++){
            this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i));
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        var a=360/(this.jiaoshu*2)*Math.PI/180;
        for (var i=0;i<=this.jiaoshu*2;i++){
            if(i%2==0){
                this.cobj.lineTo(x+r1*Math.cos(a*i),y+r1*Math.sin(a*i));
            }else{
                this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i));
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    clear:function(){
        var that=this;
        that.copy.onmousemove=function(e){
            var movex= e.offsetX;
            var movey= e.offsetY;
            //console.log(that.xp);
            var left=movex-that.xpsize/2;
            var top=movey-that.xpsize/2;
            if(left<0){
                left=0;
            }if(top<0){
                top=0;
            }if(left>that.canvasw-that.xpsize/2){
                left=that.canvasw-that.xpsize/2;
            }if(top>that.canvash-that.xpsize/2){
                top=that.canvash-that.xpsize/2;
            }
            that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";
        }
        that.copy.onmousedown=function(){
            that.copy.onmousemove=function(e){
                //alert(1)
                var movex= e.offsetX;
                var movey= e.offsetY;
                //console.log(that.xp);
                var left=movex-that.xpsize/2;
                var top=movey-that.xpsize/2;
                if(left<0){
                    left=0;
                }if(top<0){
                    top=0;
                }if(left>that.canvasw-that.xpsize/2){
                    left=that.canvasw-that.xpsize/2;
                }if(top>that.canvash-that.xpsize/2){
                    top=that.canvash-that.xpsize/2;
                }
                that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px";
                that.cobj.clearRect(left,top,that.xpsize,that.xpsize);
            }
            that.copy.onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvasw,that.canvash));
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.clear();
            }
        }

    }

}