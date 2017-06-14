window.onload=function(){
	//劫持开始选择事件和（或）鼠标按下、抬起事件。
	if(document.all){
    document.onselectstart= function(){return false;}; //for ie
}else{
    document.onmousedown= function(){return false;};
    document.onmouseup= function(){return true;};
}
document.onselectstart = new Function('event.returnValue=false;');
 //实现鼠标放入截图区域的拖拽效果
 //使用 containment 选项来指定一个父级的 DOM 元素，不会超过这个区域
 //drag是指拖拽期间调用的函数
 	$("#main").draggable({containment:"parent",drag:setChoice});
 	
 	var bigbox=document.getElementById("box");
	var rightDiv=document.getElementById("right");
	var upDiv=document.getElementById("up");
	var leftDiv=document.getElementById("left");
	var downDiv=document.getElementById("down");
	var leftupDiv=document.getElementById("left-up");
	var leftdownDiv=document.getElementById("left-down");
	var rightupDiv=document.getElementById("right-up");
	var rightdownDiv=document.getElementById("right-down");
	var mainDiv=document.getElementById("main");
	
	var ifKeyDown=false;//鼠标此时没有按下
	var contact="";//
	

//鼠标按下事件
rightDiv.onmousedown=function(e){
	e.stopPropagation();
	ifKeyDown=true;
	contact="right";
}
upDiv.onmousedown=function(e){
	e.stopPropagation();//阻止事件冒泡
	ifKeyDown=true;
	contact="up";
}
leftDiv.onmousedown=function(e){
	e.stopPropagation();
	ifKeyDown=true;
	contact="left";
}
downDiv.onmousedown=function(e){
	e.stopPropagation();
	ifKeyDown=true;
	contact="down";
}
leftupDiv.onmousedown=function(e){
	e.stopPropagation();
	ifKeyDown=true;
	contact="leftup";
}
leftdownDiv.onmousedown=function(e){
	e.stopPropagation();
	ifKeyDown=true;
	contact="leftdown";
}
rightupDiv.onmousedown=function(e){
	e.stopPropagation();
	ifKeyDown=true;
	contact="rightup";
}
rightdownDiv.onmousedown=function(e){
	e.stopPropagation();
	ifKeyDown=true;
	contact="rightdown";
}
//鼠标松开事件
window.onmouseup=function(e){
	ifKeyDown=false;
}
setChoice();

//鼠标移动事件
window.onmousemove=function(e){
	if(ifKeyDown==true){
		switch(contact){
			case "right":rightMove(e);break;
			case "up":upMove(e);break;
			case "left":leftMove(e);break;
			case "down":downMove(e);break;
			case "leftup":leftMove(e);upMove(e);break;
			case "leftdown":leftMove(e);downMove(e);break;
			case "rightup":rightMove(e);upMove(e);break;
			case "rightdown":rightMove(e);downMove(e);break;
		}
		setChoice();//因为调用每个上面的函数，高亮区域都要跟着移动，所以，放在最后面，每次调用都执行
		
	}
 }
//right移动
function rightMove(e){
			
			var x=e.clientX;//鼠标x的坐标
			if(x > getPosition(bigbox).left +bigbox.offsetWidth){
			x = getPosition(bigbox).left +bigbox.offsetWidth;
		}
			var widthBefore=mainDiv.offsetWidth-2;//选取框变化前的宽度
			var addWidth=x-getPosition(mainDiv).left-widthBefore-2;//鼠标移动后选取框增加的宽度
			mainDiv.style.width=addWidth+widthBefore+"px";
			
	        
}
function upMove(e){
	var y=e.clientY;//鼠标纵坐标
	if(y < getPosition(bigbox).top){
			y = getPosition(bigbox).top;
		}
	var addheight=getPosition(mainDiv).top-y;//增加的高度
	var heightBefore=mainDiv.offsetHeight-2;
	mainDiv.style.height=heightBefore+addheight+"px";
	mainDiv.style.top=mainDiv.offsetTop-addheight+"px";
}
function leftMove(e){
	var x1=e.clientX;
	if(x1 < getPosition(bigbox).left){
			x1 = getPosition(bigbox).left;
		}
	
	var addWidth1=getPosition(mainDiv).left-x1;
	var widthBefore=mainDiv.offsetWidth-2;
	mainDiv.style.width=addWidth1+widthBefore+"px";
	mainDiv.style.left=main.offsetLeft-addWidth1+"px";
}
function downMove(e){
	var y1=e.clientY;
	if(y1 > getPosition(bigbox).top + bigbox.offsetHeight){
			y1 = getPosition(bigbox).top + bigbox.offsetHeight;
		}
	var heightBefore=mainDiv.offsetHeight-2;
	var addheight1=y1-getPosition(mainDiv).top-heightBefore-2;
	mainDiv.style.height=heightBefore+addheight1+"px";
}
//设置选取区域高亮可见
function setChoice(){
	var top=mainDiv.offsetTop;
	var right=mainDiv.offsetLeft+mainDiv.offsetWidth;
	var left=mainDiv.offsetLeft;
	var down=mainDiv.offsetTop+mainDiv.offsetHeight;
	var img=document.getElementById("img2");
	img.style.clip="rect("+top+"px,"+right+"px,"+down+"px,"+left+"px)";
	setPreview();
}
//设置预览函数
function setPreview(){
	var top=mainDiv.offsetTop;
 	var right=mainDiv.offsetLeft+mainDiv.offsetWidth;
	var left=mainDiv.offsetLeft;
	var down=mainDiv.offsetTop+mainDiv.offsetHeight;
	var img3=document.getElementById("img3");
	img3.style.top=-top+"px";
	img3.style.left=-left+"px";
	img3.style.clip="rect("+top+"px,"+right+"px,"+down+"px,"+left+"px)";
}
}

function getPosition(node){
	//获取元素相对于屏幕左边的距离 利用offsetLeft
	var left=node.offsetLeft;//node相对于父元素的左边距
	var top=node.offsetTop;
	var parent=node.offsetParent;//node的父元素
	while(parent!=null){
		left+=parent.offsetLeft;
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return {"left":left,"top":top};
}
