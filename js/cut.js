window.onload=function(){
	//�ٳֿ�ʼѡ���¼��ͣ�����갴�¡�̧���¼���
	if(document.all){
    document.onselectstart= function(){return false;}; //for ie
}else{
    document.onmousedown= function(){return false;};
    document.onmouseup= function(){return true;};
}
document.onselectstart = new Function('event.returnValue=false;');
 //ʵ���������ͼ�������קЧ��
 //ʹ�� containment ѡ����ָ��һ�������� DOM Ԫ�أ����ᳬ���������
 //drag��ָ��ק�ڼ���õĺ���
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
	
	var ifKeyDown=false;//����ʱû�а���
	var contact="";//
	

//��갴���¼�
rightDiv.onmousedown=function(e){
	e.stopPropagation();
	ifKeyDown=true;
	contact="right";
}
upDiv.onmousedown=function(e){
	e.stopPropagation();//��ֹ�¼�ð��
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
//����ɿ��¼�
window.onmouseup=function(e){
	ifKeyDown=false;
}
setChoice();

//����ƶ��¼�
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
		setChoice();//��Ϊ����ÿ������ĺ�������������Ҫ�����ƶ������ԣ���������棬ÿ�ε��ö�ִ��
		
	}
 }
//right�ƶ�
function rightMove(e){
			
			var x=e.clientX;//���x������
			if(x > getPosition(bigbox).left +bigbox.offsetWidth){
			x = getPosition(bigbox).left +bigbox.offsetWidth;
		}
			var widthBefore=mainDiv.offsetWidth-2;//ѡȡ��仯ǰ�Ŀ��
			var addWidth=x-getPosition(mainDiv).left-widthBefore-2;//����ƶ���ѡȡ�����ӵĿ��
			mainDiv.style.width=addWidth+widthBefore+"px";
			
	        
}
function upMove(e){
	var y=e.clientY;//���������
	if(y < getPosition(bigbox).top){
			y = getPosition(bigbox).top;
		}
	var addheight=getPosition(mainDiv).top-y;//���ӵĸ߶�
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
//����ѡȡ��������ɼ�
function setChoice(){
	var top=mainDiv.offsetTop;
	var right=mainDiv.offsetLeft+mainDiv.offsetWidth;
	var left=mainDiv.offsetLeft;
	var down=mainDiv.offsetTop+mainDiv.offsetHeight;
	var img=document.getElementById("img2");
	img.style.clip="rect("+top+"px,"+right+"px,"+down+"px,"+left+"px)";
	setPreview();
}
//����Ԥ������
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
	//��ȡԪ���������Ļ��ߵľ��� ����offsetLeft
	var left=node.offsetLeft;//node����ڸ�Ԫ�ص���߾�
	var top=node.offsetTop;
	var parent=node.offsetParent;//node�ĸ�Ԫ��
	while(parent!=null){
		left+=parent.offsetLeft;
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return {"left":left,"top":top};
}
