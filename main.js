var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
autoSetCanvasSize(canvas)
monitorUser(canvas)
var lineWidth = 5
var eraserEnabled = false
brush.onclick = () =>{ 
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
    context.strokeStyle = 'black'
}
eraser.onclick = () =>{
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
    var url = canvas.toDataURL('image/png')
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'myCanvas'
    a.target = '_blank'
    a.click()
}
red.onclick = function(){
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    green.classList.add('active')
    blue.classList.remove('active')
    red.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
}

thin.onclick = function(){
    lineWidth = 3
}
thick.onclick = function(){
    lineWidth = 7
}
/********************/
function autoSetCanvasSize(canvas){
    setCanvasSize()
    window.resize = function(){
    setCanvasSize()
    }
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}
function drewLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}
function monitorUser(canvas){
    var using = false
    var lastPoint = {x: undefined, y: undefined}
        //特性检测
        if(document.body.ontouchstart !== undefined){
            canvas.ontouchstart = function(start){
            using = true
            var x = start.touches[0].clientX
            var y = start.touches[0].clientY
            console.log(start)
            if(eraserEnabled){
                context.clearRect(x-10,y-10,20,20)
            }else{
                lastPoint = {'x': x, 'y': y}
            }
            }
            canvas.ontouchmove = function(move){
            if(!using){return}
            var x = move.touches[0].clientX
            var y = move.touches[0].clientY
            if(eraserEnabled){
                context.clearRect(x-10,y-10,20,20)
            }else{
                var newPoint = {'x': x, 'y': y}
                drewLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                lastPoint = newPoint
            }
            }
            canvas.ontouchend = function(end){
                using = false
            }
        }else{
            canvas.onmousedown = function(down){
                using = true                
                var x = down.clientX
                var y = down.clientY
                if(eraserEnabled){
                    context.clearRect(x-5,y-5,10,10)
                }else{
                    lastPoint = {'x': x, 'y':y}
                }
            }
            canvas.onmousemove = function(move){
                var x = move.clientX
                var y = move.clientY
                if(!using){return}
                if(eraserEnabled){
                    context.clearRect(x-5,y-5,10,10)
                }else{
                    var newPoint = {'x': x, 'y': y}
                    drewLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint = newPoint
                }
            }
            canvas.onmouseup = function(up){
                using = false
            }
        }
}
