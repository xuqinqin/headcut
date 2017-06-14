# headcut
<h3>用js实现图片剪切效果</h3>
<p>如何获取鼠标的坐标位置以及监听鼠标的按下(onmousedown)、拖动(onmousemove)、松开(onmouseup)等动作事件，从而实现拖动鼠标来改变图片大小。</p>
<p>在这里调用了cut.js这里是封装好的draggable函数
<pre>
 //实现鼠标放入截图区域的拖拽效果
 //使用 containment 选项来指定一个父级的 DOM 元素，不会超过这个区域
 //drag是指拖拽期间调用的函数
$("#main").draggable({containment:"parent",drag:setChoice});
 </pre></p>
<p>值得注意的是这里用到e.stopPropagation();避免子元素按下时，触发父元素的事件；
<pre>	//劫持开始选择事件和（或）鼠标按下、抬起事件。避免拖拽选区时候选中图片
	if(document.all){
    document.onselectstart= function(){return false;}; //for ie
}else{
    document.onmousedown= function(){return false;};
    document.onmouseup= function(){return true;};
}</pre>
</p>
