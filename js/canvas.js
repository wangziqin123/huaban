$(function(){
    $(".meau li").on("click",function(){
        /*$(".xp").css("display","none");*/
        var index=$(this).index();
        $(".meau li").css({background:"#ccc",color:"#000"});
        $(this).css({background: "#1A321C",color:"#fff"});
        $(".xuanxiang .opation").css("display","none").eq(index).css("display","block");
        $(".opation li:first-child").addClass("opa-active");
        /*canvasObj.draw();*/
    })

    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var copy=document.getElementsByClassName("copy")[0];
    var xp=$(".xp")[0];
    var canvasObj=new shape(copy,cobj,xp);
    /*******绘制图形*******/
    $(".opation:nth-child(2) li").on("click",function(){
        $(".opation:nth-child(2) li").removeClass("opa-active");
        $(this).addClass("opa-active");
        canvasObj.type=$(this).attr("data-role");
        if($(this).attr("data-role")=="pen"){
            canvasObj.pen();
        }else{
            if($(this).attr("data-role")=="bian"){
                var bianshu=prompt("请输入需要绘制图形的边数","5");
                canvasObj.bianshu= bianshu;
            }
            if($(this).attr("data-role")=="jiao"){
                var jiaoshu=prompt("请输入需要绘制图形的角数","5");
                canvasObj.jiaoshu= jiaoshu;
            }
            canvasObj.draw();
        }

    });
    /*************绘制类型******************/
    $(".opation:nth-child(3) li").on("click",function(){
        $(".opation:nth-child(3) li").removeClass("opa-active");
        $(this).addClass("opa-active");
        canvasObj.style=$(this).attr("data-role");
        canvasObj.draw();
    });
    /****************线框宽度*******************/
    $(".opation:nth-child(4) input").on("change",function(){
        //console.log(this.value)
        canvasObj.lineWidth=this.value;
        canvasObj.draw();
    });
    /***************线框颜色**********************/
    $(".opation:nth-child(5) input").on("change",function(){
        canvasObj.strokeStyle=this.value;
        canvasObj.draw();
    });
    /****************填充颜色***********************/
    $(".opation:nth-child(6) input").on("change",function(){
        canvasObj.fillStyle=this.value;
        canvasObj.draw();
    });
    /*****************橡皮******************/
    $(".opation:nth-child(7) input").on("change",function(){
        canvasObj.xpsize=$(this).val();
    });
    $(".meau li:last-child").on("click",function(){
        //$(".copy").after("<div class='xp' style='display: none'></div>");
        canvasObj.clear();
    });
    //console.log(canvasObj)
    //****************返回*******************/
    $(".back").on("click",function(){
        if(canvasObj.history.length==0){
            cobj.clearRect(0,0,canvas.width,canvas.height);
            setTimeout(function(){
                alert("不能再返回");
            },10)
        }
        if(canvasObj.isback){
            if(canvasObj.history.length==1){
                canvasObj.history.pop();
                cobj.clearRect(0,0,canvas.width,canvas.height);
            }else{
                //console.log( canvasObj.history)
                canvasObj.history.pop();
                //console.log(aa)
                cobj.putImageData(canvasObj.history.pop(),0,0);
            }
        }else{
            cobj.putImageData(canvasObj.history.pop(),0,0);
        }
        canvasObj.isback=false;
    });

    /*************保存*********************/

    $(".file").on("click",function(){
        if(canvasObj.history.length>0){
            location.href=canvas.toDataURL().replace("image/png","stream/octet");
        }
    })


    /***********新建************************/
    $(".new").on("click",function(){
        if(canvasObj.history.length>0){
            var yes=confirm("是否保存");
            if(yes){
                location.href=canvas.toDataURL().replace("image/png","stream/octet");
            }else{
                canvasObj.history=[];
                cobj.clearRect(0,0,canvas.width,canvas.height)
            }
        }
    });

})