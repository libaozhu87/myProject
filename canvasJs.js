// JavaScript Document

var CopyWayAs = function(){
	var LEGEND_FILE_PHP = './php/file.php';
	var OS_PC = "pc";
	var OS_IPHONE = "iPhone";
	var OS_IPOD = "iPod";
	var OS_IPAD = "iPad";
	var OS_ANDROID = "Android";
	var STR_ZERO = "0";
	var ON = "on";
	var E = "e";
	var NONE = "none";
	var SUPER = "super";
	var UNDEFINED = "undefined";
	var _LTweenLite = null;
	
    var	LEvent = function(){
		this.type="LEvent";
	};
	LEvent.INIT = "init",	
	LEvent.COMPLETE = "complete",
	LEvent.ENTER_FRAME = "enter_frame",
	LEvent.END_CONTACT = "endContact",
	LEvent.PRE_SOLVE = "preSolve",
	LEvent.POST_SOLVE = "postSolve",
	LEvent.BEGIN_CONTACT = "beginContact";
	LEvent.currentTarget = null;
	LEvent.addEventListener = function(node, type, fun,boo){
		if(boo == null)boo=false;
		if(node.addEventListener){
			node.addEventListener(type, fun, false);
		}else if(node.attachEvent){
			node[E + type + fun] = fun;
			node[type + fun] = function(){node[E + type + fun]();};
			node.attachEvent(ON + type, node[type + fun]);
		}
	};	
  
	/*
	 * LKeyboardEvent.js
	 **/
/*	var LKeyboardEvent = function (){this.type="LKeyboardEvent";};
	LKeyboardEvent.KEY_DOWN = "keydown";
	LKeyboardEvent.KEY_UP = "keyup";
	LKeyboardEvent.KEY_PASS = "keypass";
	
	var LMouseEvent = function (){this.type="LMouseEvent";};
	LMouseEvent.MOUSE_DOWN = "mousedown";
	LMouseEvent.MOUSE_UP = "mouseup";
	LMouseEvent.TOUCH_START = "touchstart";
	LMouseEvent.TOUCH_MOVE = "touchmove";
	LMouseEvent.TOUCH_END = "touchend";
	LMouseEvent.MOUSE_MOVE = "mousemove";
	LMouseEvent.MOUSE_OUT = "mouseout";
	*/
	/*
	 * LAccelerometerEvent.js
	 **/
/*	var LAccelerometerEvent = function (){this.type="LAccelerometerEvent";};
	LAccelerometerEvent.DEVICEMOTION = "devicemotion";*/
	
	/*
	 * LMath.js
	 **/
/*    var LMath = {
	trim:function (str){
		return str.replace(/(^\s*)|(\s*$)|(\n)/g, "");
	},
	leftTrim:function (str){
		return str.replace(/(^\s*)|(^\n)/g, "");
	},
	rightTrim:function (str){
		return str.replace(/(\s*$)|(\n$)/g, "");
	},
	numberFormat:function (source,length){
		if (!length || length < 1) {
	        length = 3;
	    }
	    source=String(source).split(".");
	    source[0]=source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
	    return source.join(".");
	},
	isString:function (s){
		var patrn=/^([a-z]|[A-Z])+$/;
		return patrn.exec(s); 
	},
	isNumber:function (s){
		var patrn=/^\d+\.\d+$/;
		return patrn.exec(s); 
	},
	isInt:function (s){
		var patrn=/^\d+$/;
		return patrn.exec(s); 
	}
};*/
   
/*canvas 舞台*/
var LGlobal = function (){};
	LGlobal.type = "LGlobal";
	LGlobal.traceDebug = false;
	LGlobal.script = null;
	LGlobal.stage = null;
	LGlobal.canvas = null;
	LGlobal.width = 0;
	LGlobal.height = 0;
	LGlobal.box2d = null;
	LGlobal.speed = 50;
	LGlobal.IS_MOUSE_DOWN = false;
	LGlobal.time = null;
	LGlobal.objectIndex = 0;
	LGlobal.preventDefault = true;
	LGlobal.childList = new Array();
	LGlobal.buttonList = new Array();
	LGlobal.stageScale = false;
	LGlobal.setDebug = function (value){
		LGlobal.traceDebug = value; 
	};
	LGlobal.setCanvas = function (id,width,height){
		LGlobal.canTouch = false;
		LGlobal.os = OS_PC;
		if (navigator.userAgent.indexOf(OS_IPHONE) > 0) {
			LGlobal.os = OS_IPHONE;
			LGlobal.canTouch = true;
		}else if (navigator.userAgent.indexOf(OS_IPOD) > 0) {
			LGlobal.os = OS_IPOD;
			LGlobal.canTouch = true;
		}else if (navigator.userAgent.indexOf(OS_IPAD) > 0) {
			LGlobal.os = OS_IPAD;
			LGlobal.canTouch = true;
		}else if (navigator.userAgent.indexOf(OS_ANDROID) > 0) {
			LGlobal.os = OS_ANDROID;
			LGlobal.canTouch = true;
		}
		LGlobal.id = id;
		LGlobal.window = window;
		LGlobal.object = document.createElement("div");
		LGlobal.object.id = id;
		LGlobal.parentContain = document.getElementById("zdCanvas");
		LGlobal.parentContain.appendChild(LGlobal.object);
		LGlobal.object.innerHTML='<div style="position:absolute;margin:0px 0px 0px 0px;width:'+width+'px;height:'+height+'px;z-index:20;"><canvas id="' + LGlobal.id + '_canvas">'+
		'<div id="noCanvas">'+
		"<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsofthates the Web and doesn't support HTML5 :(</p>"+ 
		'<p>'+ 
			'To play this game you need a good Browser, like'+ 
			'<a href="http://www.opera.com/">Opera</a>,'+ 
			'<a href="http://www.google.com/chrome">Chrome</a>,'+ 
			'<a href="http://www.mozilla.com/firefox/">Firefox</a> or'+ 
			'<a href="http://www.apple.com/safari/">Safari</a>.'+ 
		'</p>'+  
		'</div>'+  
		'</canvas></div>'+
		'<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0px 0px 0px 0px;z-index:10;display:none;"><textarea rows="1" id="' + LGlobal.id + '_InputTextBox" /></div>';
		
		LGlobal.canvasObj = document.getElementById(LGlobal.id+"_canvas");
		LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
		LGlobal.inputTextBox = document.getElementById(LGlobal.id + '_InputTextBox');
		LGlobal.inputTextField = null;
		if(width)LGlobal.canvasObj.width = width;
		if(height)LGlobal.canvasObj.height = height;
		LGlobal.width = LGlobal.canvasObj.width;
		LGlobal.height = LGlobal.canvasObj.height;
		LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
		LGlobal.offsetX = 0;
		LGlobal.offsetY = 0;
/*		if(LGlobal.canTouch){
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START,function(event){
				if(LGlobal.inputBox.style.display != NONE){
					LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
					LGlobal.inputBox.style.display = NONE;
				}
				var canvasX = parseInt(STR_ZERO+LGlobal.object.style.left);
				var canvasY = parseInt(STR_ZERO+LGlobal.object.style.top);
				var scale = 1;
				var eve;
				if(LGlobal.stageScale){
					var height;
					var width;
					if(LGlobal.os == OS_ANDROID){
						height = window.screen.height;
						width = window.screen.width;
					}else{
						var de=document.documentElement;
						var db=document.body;
						width=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
						height=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
					}
				   
					if(width > height){
						scale = 320/width;
					}
				}
				eve = {offsetX:(event.touches[0].pageX*scale - canvasX),offsetY:(event.touches[0].pageY*scale - canvasY)};
				
				LGlobal.offsetX = eve.offsetX;
				LGlobal.offsetY = eve.offsetY;
				LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_DOWN);
				LGlobal.IS_MOUSE_DOWN = true;
				if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
					if(!LGlobal.box2d.mouseJoint){
						var mouseX = eve.offsetX / LGlobal.box2d.drawScale,
							mouseY = eve.offsetY / LGlobal.box2d.drawScale;
						var body = LGlobal.box2d.getBodyAtMouse(mouseX, mouseY);
						if(body && body.mouseJoint) {
							var md = new LGlobal.box2d.b2MouseJointDef();
							md.bodyA = LGlobal.box2d.world.GetGroundBody();
							md.bodyB = body;
							md.target.Set(mouseX, mouseY);
							md.collideConnected = true;
							md.maxForce = 300000.0 * body.GetMass();
							LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(md);
							body.SetAwake(true);
						};
					}
				}
				LGlobal.touchHandler(event);
			});
			LEvent.addEventListener(document,LMouseEvent.TOUCH_END,function(event){
				var eve = {offsetX:LGlobal.offsetX,offsetY:LGlobal.offsetY};
				LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_UP);
				LGlobal.touchHandler(event);
				LGlobal.IS_MOUSE_DOWN = false;
				if(LGlobal.box2d != null){
					if(LGlobal.box2d.mouseJoint) {
						LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
						LGlobal.box2d.mouseJoint = null;
					}
				}
			});
			LEvent.addEventListener(document,LMouseEvent.TOUCH_MOVE,function(event){
				var canvasX = parseInt(STR_ZERO+LGlobal.object.style.left);
				var canvasY = parseInt(STR_ZERO+LGlobal.object.style.top);
				var scale = 1;
				var eve;
				if(LGlobal.stageScale){
					var height;
					var width;
					if(LGlobal.os == OS_ANDROID){
						height = window.screen.height;
						width = window.screen.width;
					}else{
						var de=document.documentElement;
						var db=document.body;
						width=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
						height=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
					}
					if(width > height){
						scale = 320/width;
					}
				}
				eve = {offsetX:(event.touches[0].pageX*scale - canvasX),offsetY:(event.touches[0].pageY*scale - canvasY)};
				LGlobal.mouseMoveEvent = eve;
				LGlobal.offsetX = eve.offsetX;
				LGlobal.offsetY = eve.offsetY;
				LGlobal.mouseEvent(eve,LMouseEvent.MOUSE_MOVE);
				LGlobal.touchHandler(event);
				if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
					var mouseX = eve.offsetX / LGlobal.box2d.drawScale,
						mouseY = eve.offsetY / LGlobal.box2d.drawScale;
					if(LGlobal.box2d.mouseJoint) {
						LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mouseX, mouseY));
					}
				}
			});
		}else{
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN,function(event){
				if(event.offsetX == null && event.layerX != null){
					event.offsetX = event.layerX;
					event.offsetY = event.layerY;
				}
				if(LGlobal.inputBox.style.display != NONE){
					LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
					LGlobal.inputBox.style.display = NONE;
				}    		
				LGlobal.mouseEvent(event,LMouseEvent.MOUSE_DOWN);
				LGlobal.IS_MOUSE_DOWN = true;
				if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
					if(!LGlobal.box2d.mouseJoint){
						var mouseX = event.offsetX / LGlobal.box2d.drawScale,
							mouseY = event.offsetY / LGlobal.box2d.drawScale;
						var body = LGlobal.box2d.getBodyAtMouse(mouseX, mouseY);
						if(body && body.mouseJoint) {
							var md = new LGlobal.box2d.b2MouseJointDef();
							md.bodyA = LGlobal.box2d.world.GetGroundBody();
							md.bodyB = body;
							md.target.Set(mouseX, mouseY);
							md.collideConnected = true;
							md.maxForce = 300000.0 * body.GetMass();
							LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint(md);
							body.SetAwake(true);
						};
					}
				}
			});
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE,function(event){
				if(event.offsetX == null && event.layerX != null){
					event.offsetX = event.layerX;
					event.offsetY = event.layerY;
				}
				LGlobal.mouseMoveEvent = event;
				LGlobal.offsetX = event.offsetX;
				LGlobal.offsetY = event.offsetY;
				LGlobal.mouseEvent(event,LMouseEvent.MOUSE_MOVE);
				if(LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null){
					var mouseX = event.offsetX / LGlobal.box2d.drawScale,
						mouseY = event.offsetY / LGlobal.box2d.drawScale;
					if(LGlobal.box2d.mouseJoint) {
						LGlobal.box2d.mouseJoint.SetTarget(new LGlobal.box2d.b2Vec2(mouseX, mouseY));
					}
				}
			});
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP,function(event){
				if(event.offsetX == null && event.layerX != null){
					event.offsetX = event.layerX;
					event.offsetY = event.layerY;
				}
				LGlobal.mouseEvent(event,LMouseEvent.MOUSE_UP);
				LGlobal.IS_MOUSE_DOWN = false;
				if(LGlobal.box2d != null){
					if(LGlobal.box2d.mouseJoint) {
						LGlobal.box2d.world.DestroyJoint(LGlobal.box2d.mouseJoint);
						LGlobal.box2d.mouseJoint = null;
					}
				}
			});
			LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT,function(event){
				if(event.offsetX == null && event.layerX != null){
					event.offsetX = event.layerX;
					event.offsetY = event.layerY;
				}
				LGlobal.mouseEvent(event,LMouseEvent.MOUSE_OUT);
				LGlobal.IS_MOUSE_DOWN = false;
			});
		}*/
	} ;
/*	LGlobal.touchHandler = function(event){
		event.stopPropagation();
		if(LGlobal.preventDefault)event.preventDefault();
		if(event.stopImmediatePropagation){
			event.stopImmediatePropagation();
		}
		return event;
	};
	LGlobal.mouseEvent = function(event,type){
		var key = null;
		for(key in LGlobal.childList){
			if(LGlobal.childList[key].mouseEvent){
				LGlobal.childList[key].mouseEvent(event,type);
			}
		}
	};*/
	LGlobal.onShow = function (){
		if(LGlobal.canvas == null)return;
		if(LGlobal.box2d != null){
			LGlobal.box2d.show();
			if(!LGlobal.traceDebug)LGlobal.canvas.clearRect(0,0,LGlobal.width,LGlobal.height);	
		}else{
			LGlobal.canvas.clearRect(0,0,LGlobal.width,LGlobal.height);	
		}
		//LGlobal.buttonShow(LGlobal.buttonList);    
		LGlobal.show(LGlobal.childList);
		
	};
/*	LGlobal.buttonShow = function(buttonlist){
		var key = null;
		for(key in buttonlist){
			if(buttonlist[key].buttonModeChange){
				buttonlist[key].buttonModeChange();
			}
	   }
	};*/
	LGlobal.show = function(showlist,cood){
		if(cood == null)cood={x:0,y:0,scaleX:1,scaleY:1};
		var key = null;
		for(key in showlist){
			if(showlist[key].show){
				showlist[key].show(cood);
			}
		}
		
	};
/*	LGlobal.divideCoordinate = function (w,h,row,col){
		var i,j;
		var cWidth = w/col;
		var cHeight = h/row;
		var resultArray = new Array();
		for(i=0;i<row;i++){
			var childArray=new Array();
			for(j=0;j<col;j++){
				childArray.push({x:cWidth*j,y:cHeight*i});
			}
			resultArray.push(childArray);
		}
		return resultArray;
	};
	LGlobal.hitTestArc = function(objA,objB,objAR,objBR){
		var rA = objA.getWidth()*0.5
		,rB = objB.getWidth()*0.5
		,xA = objA.startX()
		,xB = objB.startX()
		,yA = objA.startY()
		,yB = objB.startY();
		if(typeof objAR != UNDEFINED){
			xA += (rA - objAR);
			yA += (rA - objAR);
			rA = objAR;
		}
		if(typeof objBR != UNDEFINED){
			xB += (rB - objBR);
			yB += (rB - objBR);
			rB = objBR;
		}
		var disx = xA + rA - xB - rB
		,disy = yA + rA - yB - rB;
		return disx*disx + disy*disy < (rA + rB)*(rA + rB);
	};
	LGlobal.hitTestRect = function(objA,objB,vecA,vecB){
		var wA = objA.getWidth()
		,wB = objB.getWidth()
		,hA = objA.getHeight()
		,hB = objB.getHeight()
		,xA = objA.x
		,xB = objB.x
		,yA = objA.y
		,yB = objB.y;
		if(typeof vecA != UNDEFINED){
			xA += (wA - vecA[0])*0.5;
			yA += (hA - vecA[1])*0.5;
			wA = vecA[0];
			hA = vecA[1];
		}
		if(typeof vecB != UNDEFINED){
			xB += (wB - vecB[0])*0.5;
			yB += (hB - vecB[1])*0.5;
			wB = vecB[0];
			hB = vecB[1];
		}
		var minx = xA > xB ? xA : xB;
		var miny = yA > yB ? yA : yB;
		var maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA);
		var maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
		return minx <= maxx && miny <= maxy;
	};
	LGlobal.hitTestPoint=function(x,y,obj){  	
		var w = obj.getWidth()
		,h = obj.getHeight()
		if(obj.localToGlobal)
		{ var p=obj.localToGlobal(obj.x,obj.y)
		  if(x>p[0]&&x<p[0]+w&&y<p[1]+h&&y>p[1])
		   { return true;
		   }  	  
		 } 
		 return false; 
	
	}
    LGlobal.hitTest = LGlobal.hitTestRect;
	/*
	* PageProperty.js
	**/
/*	var trace = function(){
		if(!LGlobal.traceDebug)return;
		var traceObject = document.getElementById("traceObject");
		if(trace.arguments.length > 0 && traceObject == null){
			traceObject = document.createElement("div");
			traceObject.id = "traceObject";
			traceObject.style.position = "absolute";
			traceObject.style.top = (LGlobal.height + 20) + "px";
			document.body.appendChild(traceObject);
		}
		for(var i=0; i < trace.arguments.length; i++){
		   traceObject.innerHTML=traceObject.innerHTML+trace.arguments[i] + "<br />";
		}
	};*/
	var addChild = function(DisplayObject){
		DisplayObject.parent = "root";
		LGlobal.childList.push(DisplayObject);
	}
	var removeChild = function(DisplayObject){
		for(var i=0;i<LGlobal.childList.length;i++){
			if(DisplayObject.objectindex == LGlobal.childList[i].objectindex){
				if(DisplayObject.die)DisplayObject.die();
				LGlobal.childList.splice(i,1);
				break;
			}
		}
	};
	var getLTweenLite = function(){
		return _LTweenLite;
		 
		}
	
	//canvas 开始执行
	var canvasBengin = function(speed,canvasname,width,height,func,type){
	    _LTweenLite = new $LTweenLite();
	    LGlobal.childList.push(_LTweenLite);
		LGlobal.speed = speed;
		if(type != null && type == LEvent.INIT){
			LGlobal.time=setInterval(function(){LGlobal.onShow();}, speed);
			LGlobal.setCanvas(canvasname,width,height);
			func();
		}else{
			LEvent.addEventListener(window,"load",function(){
				LGlobal.time=setInterval(function(){LGlobal.onShow();}, speed);
				LGlobal.setCanvas(canvasname,width,height);
				func();
			});
		}
	}
	//canvas 结束执行
	var canvasOver = function(){
			LGlobal.childList= [];
			LGlobal.buttonList=[];
		    clearInterval(LGlobal.time);	  
		    LGlobal.parentContain.removeChild(LGlobal.object); 
		}
	//继承
	var base = function(derive,baseSprite,baseArgs){
		baseSprite.apply(derive,baseArgs);
		for( key in baseSprite.prototype){
			var proto = derive.constructor.prototype;
			if(!proto[key]){
				proto[key] = baseSprite.prototype[key];
			}
			proto[key][SUPER] = baseSprite.prototype;
		}
	}
	/*
	* LLoader.js
	**/
	var LLoader = function(){
		var self = this;
		self.objectindex = ++LGlobal.objectIndex;
		self.type="LLoader";
		self.loadtype = "";
		self.content = null;
		self.oncomplete = null;
		self.event = {};
	}
	LLoader.prototype = {
		addEventListener:function(type,listener){
			var self = this;
			if(type == LEvent.COMPLETE){
				self.oncomplete = listener;
			}
		},
		load:function (src,loadtype){
			var self = this;
			self.loadtype = loadtype;
			if(self.loadtype == "bitmapData"){
				self.content = new Image();
				self.content.onload = function(){
					if(self.oncomplete){
						self.event.currentTarget = self.content;
						self.oncomplete(self.event);
					}
				};
				self.content.src = src; 
			}
		}
	};
/*
* LGraphics.js
**/
/*var LGraphics = function(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LGraphics";
	self.color = "#000000";
	self.i = 0;
	self.alpha = 1;
	self.setList = new Array();
	self.showList = new Array();
}
LGraphics.prototype = {
	show:function (cood){
		if(cood==null || cood == UNDEFINED)cood={x:0,y:0};
		var self = this;
		if(self.setList.length == 0)return;
		var key = null;
		for(key in self.setList){
			self.setList[key](cood.x,cood.y);
		}
	},
	lineWidth:function (thickness){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.lineWidth = thickness;});
	},
	strokeStyle:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.strokeStyle = color;});
	},
	stroke:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.stroke();});
	},
	beginPath:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.beginPath();});
	},
	closePath:function (){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.closePath();});
	},
	moveTo:function (x,y){
		var self = this;
		self.setList.push(function(cx,cy){LGlobal.canvas.moveTo(x+cx,y+cy);});
	},
	lineTo:function (x,y){
		var self = this;
		self.setList.push(function(cx,cy){LGlobal.canvas.lineTo(x+cx,y+cy);});
	},
	clear:function (){
		var self = this;
		self.setList.splice(0,self.setList.length);
		self.showList.splice(0,self.showList.length);
	},
	rect:function (x,y,width,height){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.rect(x, y, width, height);});
		self.showList.push({type:"rect",value:[x,y,width,height]});
	},
	fillStyle:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.fillStyle = color;});
	},
	fill:function (color){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.fill();});
	},
	arc:function(x,y,radius,startAngle,endAngle,anticlockwise){
		var self = this;
		self.setList.push(function(){LGlobal.canvas.arc(x,y,radius,startAngle,endAngle,anticlockwise);});
	},
	drawArc:function(thickness,lineColor,pointArray,isfill,color){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.arc(pointArray[0]+cx,pointArray[1]+cy,pointArray[2],pointArray[3],pointArray[4],pointArray[5]);
			if(isfill){
				LGlobal.canvas.fillStyle = color;
				LGlobal.canvas.fill();
			}
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.stroke();
		});
		self.showList.push({type:"arc",value:pointArray});
	},
	drawRect:function (thickness,lineColor,pointArray,isfill,color){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.rect(pointArray[0]+cx,pointArray[1]+cy,pointArray[2],pointArray[3]);
			if(isfill){
				LGlobal.canvas.fillStyle = color;
				LGlobal.canvas.fill();
			}
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.stroke();
		});
		self.showList.push({type:"rect",value:pointArray});
	},
	drawVertices:function(thickness,lineColor,vertices,isfill,color){
		var self = this;
		if(vertices.length < 3)return;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.moveTo(vertices[0][0]+cx,vertices[0][1]+cy);
			var i,length = vertices.length;
			for(var i=1;i<length;i++){
				pointArray = vertices[i];
				LGlobal.canvas.lineTo(pointArray[0]+cx,pointArray[1]+cy);
			};
			LGlobal.canvas.lineTo(vertices[0][0]+cx,vertices[0][1]+cy);
			if(isfill){
				LGlobal.canvas.fillStyle = color;
				LGlobal.canvas.fill();
			}
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.closePath();
			LGlobal.canvas.stroke();
		});
		self.showList.push({type:"vertices",value:vertices});
	},
	drawLine:function (thickness,lineColor,pointArray){
		var self = this;
		self.setList.push(function(cx,cy){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.moveTo(pointArray[0]+cx,pointArray[1]+cy);
			LGlobal.canvas.lineTo(pointArray[2]+cx,pointArray[3]+cy);
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = lineColor;
			LGlobal.canvas.closePath();
			LGlobal.canvas.stroke();
		});
	},
	lineStyle:function (thickness,color,alpha){
		var self = this; 
		if(color==null)color=self.color;
		if(alpha==null)alpha=self.alpha;
		self.color = color;
		self.alpha = alpha;
		self.setList.push(function(){
			LGlobal.canvas.lineWidth = thickness;
			LGlobal.canvas.strokeStyle = color;
		});
	},
	add:function (fun){
		var self = this;
		self.setList.push(fun);
	},
	ismouseon:function(event,cood){
		var self = this;
		var key = null;
		if(event==null || event == UNDEFINED)return false;
		if(cood==null || cood == UNDEFINED)cood={x:0,y:0};
		var ox,oy;
		if(event.offsetX == UNDEFINED){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(ox >= self.showList[key].value[0] + cood.x && ox <= self.showList[key].value[0] + cood.x + self.showList[key].value[2] && 
					oy >= self.showList[key].value[1] + cood.y && oy <= self.showList[key].value[1] + cood.y + self.showList[key].value[3]){
					return true;
				}
			}else if(self.showList[key].type == "arc"){
				var xl = self.showList[key].value[0] + cood.x - ox;
				var yl = self.showList[key].value[1] + cood.y - oy;
				return xl*xl+yl*yl <= self.showList[key].value[2]*self.showList[key].value[2];
			}
		}		
		return false;
	},
	getWidth:function(){
		var self = this;
		var key = null,key1=null;
		var min = 0,max = 0,vertices;
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(min > self.showList[key].value[0])min = self.showList[key].value[0];
				if(max < self.showList[key].value[0] + self.showList[key].value[2])max = self.showList[key].value[0] + self.showList[key].value[2];
			}else if(self.showList[key].type == "arc"){
				if(min > self.showList[key].value[0] - self.showList[key].value[2])min = self.showList[key].value[0] - self.showList[key].value[2];
				if(max < self.showList[key].value[0] + self.showList[key].value[2])max = self.showList[key].value[0] + self.showList[key].value[2];
			}else if(self.showList[key].type == "vertices"){
				for(key1 in self.showList[key].value){
					vertices = self.showList[key].value[key1];
					if(min > vertices[0])min = vertices[0];
					if(max < vertices[0])max = vertices[0];
				}
			}
		}		
		return max - min;
	},
	getHeight:function(){
		var self = this;
		var key = null,key1=null;
		var min = 0,max = 0,vertices;
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(min > self.showList[key].value[1])min = self.showList[key].value[1];
				if(max < self.showList[key].value[1] + self.showList[key].value[3])max = self.showList[key].value[1] + self.showList[key].value[3];
			}else if(self.showList[key].type == "arc"){
				if(min > self.showList[key].value[1] - self.showList[key].value[2])min = self.showList[key].value[1] - self.showList[key].value[2];
				if(max < self.showList[key].value[1] + self.showList[key].value[2])max = self.showList[key].value[1] + self.showList[key].value[2];
			}else if(self.showList[key].type == "vertices"){
				for(key1 in self.showList[key].value){
					vertices = self.showList[key].value[key1];
					if(min > vertices[1])min = vertices[1];
					if(max < vertices[1])max = vertices[1];
				}
			}
		}		
		return max - min;
	},
	startX:function(){
		var self=this;
		var key = null,key1=null;
		var v = 0,vertices;
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(v > self.showList[key].value[0])v = self.showList[key].value[0];
			}else if(self.showList[key].type == "arc"){
				if(v > self.showList[key].value[0] - self.showList[key].value[2])v = self.showList[key].value[0] - self.showList[key].value[2];
			}else if(self.showList[key].type == "vertices"){
				for(key1 in self.showList[key].value){
					vertices = self.showList[key].value[key1];
					if(v > vertices[0])v = vertices[0];
				}
			}
		}		
		return v;
	},
	startY:function(){
		var self=this;
		var key = null,key1=null;
		var v = 0,vertices;
		for(key in self.showList){
			if(self.showList[key].type == "rect"){
				if(v > self.showList[key].value[1])v = self.showList[key].value[1];
			}else if(self.showList[key].type == "arc"){
				if(v > self.showList[key].value[1] - self.showList[key].value[2])v = self.showList[key].value[1] - self.showList[key].value[2];
			}else if(self.showList[key].type == "vertices"){
				for(key1 in self.showList[key].value){
					vertices = self.showList[key].value[key1];
					if(v > vertices[1])v = vertices[1];
				}
			}
		}		
		return v;
	}
};
*/
/*
* LSprite.js
**/
var LSprite = function(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LSprite";
	self.x = 0;
	self.y = 0;
	self.rotatex;
	self.rotatey;
	self.rotate = 0;
	self.alpha = 1;
	self.visible = true;
	self.childList = new Array();
	self.frameList = new Array();
	self.mouseList = new Array();
	//self.graphics = new LGraphics();
	//self.graphics.parent = self;
	self.width = 0;
	self.height = 0;
	self.scaleX = 1;
	self.scaleY = 1;
	self.box2d = null;
	self.mask = null;
	self.isresize = false
}   
LSprite.prototype = {
	setRotate:function (angle){
		var self = this;
		if(self.box2dBody){
			self.box2dBody.SetAngle(angle);
		}else{
			self.rotate = angle;
		}
	},
	show:function (cood){
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1};
		var self = this,saveflg = false,rotateFlag = Math.PI / 180;
		if(!self.visible)return;
		if((self.mask != null && self.mask.show) || self.alpha < 1 || self.rotate != 0 || self.scaleX != 1 || self.scaleY != 1 || self.box2dBody){
			LGlobal.canvas.save();
			saveflg = true;
		}
		
		if(self.box2dBody){
			self.x = self.box2dBody.GetPosition().x * LGlobal.box2d.drawScale - cood.x - self.rotatex;
			self.y = self.box2dBody.GetPosition().y * LGlobal.box2d.drawScale - cood.y - self.rotatey;
			self.rotate = self.box2dBody.GetAngle();
			rotateFlag = 1;
		}
		if(self.mask != null && self.mask.show){
			
			self.mask.show(cood);
			LGlobal.canvas.clip();
		}
		if(self.alpha < 1){
			LGlobal.canvas.globalAlpha = self.alpha; 
		}
		if(self.rotate != 0){
			if(typeof(self.rotatex) == "undefined"){
				self.getRotateXY();
			}
			LGlobal.canvas.translate(cood.x + self.x + self.rotatex, cood.y + self.y + self.rotatey);
			LGlobal.canvas.rotate(self.rotate * rotateFlag);
			LGlobal.canvas.translate(-(cood.x + self.x + self.rotatex), -(cood.y + self.y + self.rotatey));
		}

		//self.graphics.show({x:self.x+cood.x,y:self.y+cood.y});
		LGlobal.show(self.childList,{x:self.x+cood.x,y:self.y+cood.y,scaleX:self.scaleX*cood.scaleX,scaleY:self.scaleY*cood.scaleY});
		
		if(saveflg){
			LGlobal.canvas.restore(); 
		}
		self.loopframe();
		if(self.isresize){
			self.resize();
		  	self.isresize=false;
		}
	},
/*	getRotateXY:function(w,h){
		var self = this;
		if(w!=null && h!=null){
			self.rotatex = w/2;
			self.rotatey = h/2;
			return;
		}
		w=0;
		h=0;
		var key=null,w1,h1;
		for(key in self.childList){
			if(self.childList[key].getWidth){
				w1=self.childList[key].getWidth();
				w = w < w1?w1:w;
			}
			if(self.childList[key].getHeight){
				h1=self.childList[key].getHeight();
				h = h < h1?h1:h;
			}
		}
		self.rotatex = w/2;
		self.rotatey = h/2;
	},*/

	getWidth:function(){
     	var self  = this;
	 	if(self.childList.length!=0){  
	   		var sx=self.childList[0].x,ex =self.childList[0].getWidth() + self.childList[0].x;
			for(var i=1;i<self.childList.length;i++){			
				if(sx > self.childList[i].x){
					sx = self.childList[i].x;
				}
				if(ex < self.childList[i].getWidth() + self.childList[i].x){
					ex = self.childList[i].getWidth() + self.childList[i].x;
				}
			 }
			self.width = ex - sx
	  	}else{
			self.width = 0;		
	   	}
	  	return  self.width  
	},

    getHeight:function(){
		var self = this;
		if(self.childList.length!=0){  
			var sy = self.childList[0].y ,ey = self.childList[0].getHeight() + self.childList[0].y;
			for(var i=1;i<self.childList.length;i++){
				if(sy > self.childList[i].y){
					sy = self.childList[i].y;
				}
				if(ey < self.childList[i].getHeight() + self.childList[i].y){
					ey = self.childList[i].getHeight() + self.childList[i].y;
				}
			}
			self.height = ey - sy;
		}else{
			self.height = 0;		
		}
		return self.height;
	},

	resize:function(){
		var self  = this;
		if(self.childList.length!=0){  
			var sx=self.childList[0].x,sy = self.childList[0].y,ex =self.childList[0].width + self.childList[0].x ,ey = self.childList[0].height + self.childList[0].y;
			for(var i=1;i<self.childList.length;i++){
				if(sx > self.childList[i].x){
					sx = self.childList[i].x;
				}
				if(ex < self.childList[i].width + self.childList[i].x){
					ex = self.childList[i].width + self.childList[i].x;
				}
				if(sy > self.childList[i].y){
					sy = self.childList[i].y;
				}
				if(ey < self.childList[i].height + self.childList[i].y){
					ey = self.childList[i].height + self.childList[i].y;
				}
			}
			self.width = ex - sx;
			self.height = ey - sy;
		}else{
			self.width = 0;
			self.height = 0;		
		}
	},

/*	startY:function(){
		var self=this;
		var v=self.y + self.graphics.startY(),v1;
		for(key in self.childList){
			if(self.childList[key].startY){
				v1=self.y + self.childList[key].startY();
				v = v > v1?v1:v;
			}
		}
		return v;
	},*/
/*	setBodyMouseJoint:function(value){
		var self = this;
		if(!self.box2dBody)return;
		self.box2dBody.mouseJoint = true;
	},
	clearBody:function(){
		var self = this;
		if(!self.box2dBody)return;
		LGlobal.box2d.world.DestroyBody(self.box2dBody);
		self.box2dBody = null;
	},
	addBodyCircle:function(radius,cx,cy,type,density,friction,restitution){
		var self = this;
		self.rotatex = radius;
		self.rotatey = radius;
		self.box2dBody = LGlobal.box2d.addCircle(
			radius/LGlobal.box2d.drawScale,
			(self.x+cx)/LGlobal.box2d.drawScale,
			(self.y+cy)/LGlobal.box2d.drawScale,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density==null?.5:density,
			friction==null?0.4:friction,
			restitution==null?0.8:restitution);
		self.box2dBody.SetUserData(self);
	},
	addBodyPolygon:function(w,h,type,density,friction,restitution){
		var self = this;
		self.rotatex = w/2;
		self.rotatey = h/2;
		self.box2dBody = LGlobal.box2d.addPolygon(
			w*0.5/LGlobal.box2d.drawScale,
			h*0.5/LGlobal.box2d.drawScale,
			self.x/LGlobal.box2d.drawScale,
			self.y/LGlobal.box2d.drawScale,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
			density==null?.5:density,
			friction==null?0.4:friction,
			restitution==null?0.8:restitution);
		self.box2dBody.SetUserData(self);
	},
	addBodyVertices:function(vertices,cx,cy,type,density,friction,restitution){
		var self = this;
		self.rotatex = 0;
		self.rotatey = 0;
		self.box2dBody = LGlobal.box2d.addVertices(vertices,
			(type==1)?LGlobal.box2d.b2Body.b2_dynamicBody:LGlobal.box2d.b2Body.b2_staticBody,
				density,friction,restitution);
		self.box2dBody.SetUserData(self);
		self.box2dBody.SetPosition(new LGlobal.box2d.b2Vec2((self.x+cx)/LGlobal.box2d.drawScale,(self.y+cy)/LGlobal.box2d.drawScale));
	},*/
	loopframe:function (){
		var self = this;
		var key = null;
		for(key in self.frameList){
			self.frameList[key]();
		}
	},
	addChild:function (DisplayObject){
		var self = this;
		DisplayObject.parent = self;
		self.childList.push(DisplayObject);
		self.isresize = true;
		
	},
	removeChild:function(DisplayObject){
		var self  = this;
		for(var i=0;i<self.childList.length;i++){
			if(DisplayObject.objectindex == self.childList[i].objectindex){
				if(DisplayObject.die)DisplayObject.die();
				self.childList.splice(i,1);
				break;
			}
		}
		self.isresize = true;
		
	},
	getChildAt:function(i){
		var self = this;
		if(self.childList.length == 0 || self.childList.length <= i)return null;
		return self.childList[i];
	},
	removeChildAt:function(i){
		var self = this;
		if(self.childList.length >= i)return;
		self.childList[i].die();
		self.childList.splice(i,1);
		self.isresize = true;
		//self.resize();
	},

	removeAllChild:function(){
		var self = this;
		for(var i=0;i<self.childList.length;i++){
			if(self.childList[i].die)self.childList[i].die();
		}
		self.childList.splice(0,self.childList.length);
		self.width = 0;
		self.height = 0;
	},
	addEventListener:function (type,listener){
		var self = this;
		if(type == LEvent.ENTER_FRAME){
			self.frameList.push(listener);
		}else if(type.indexOf("mouse")>=0){
			self.mouseList.push({listener:listener,type:type});
		}else if(type.indexOf("touch")>=0){
			self.mouseList.push({listener:listener,type:type});
		}
	},
	removeEventListener:function (type,listener){
		var self = this;
		var i,length = self.frameList.length;
		for(i=0;i<length;i++){
			if(type == LEvent.ENTER_FRAME && self.frameList[i] == listener){
				self.frameList.splice(i,1);
				break;
			}
		}
		length = self.mouseList.length;
		for(i=0;i<length;i++){
			if(type == self.mouseList[i].type && self.mouseList[i].listener == listener){
				self.mouseList.splice(i,1);
				break;
			}
		}
	},

/*	mouseEvent:function (event,type,cood){
		if(event==null || event == UNDEFINED)return false;
		if(cood==null)cood={x:0,y:0,scaleX:1,scaleY:1};
		var self = this;
		var isok;
		var ox,oy;
		if(event.offsetX == UNDEFINED){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		for(key in self.childList){
			if(self.childList[key].mouseEvent){
				isok = self.childList[key].mouseEvent(event,type,{x:self.x+cood.x,y:self.y+cood.y,scaleX:self.scaleX*cood.scaleX,scaleY:self.scaleY*cood.scaleY});
				//if(isok)return true;
			}
		}
		if(self.mouseList.length == 0){
			return false;
		}
		var key = null;
	    var isclick
		if(type == LMouseEvent.MOUSE_MOVE){
			isclick = true
		}else{
			var isclick = self.ismouseon(event, cood);
		}
		if(isclick){
			for(key in self.mouseList){
				var obj = self.mouseList[key];
				if(obj.type == type){
					event.selfX = ox - (self.x+cood.x);
					event.selfY = oy - (self.y+cood.y);
					event.locX = ox-cood.x
					event.locY = oy-cood.y;
					event.clickTarget = self;
					obj.listener(event,self);
					return true;
				}
			}
			return false;
		}else{
			return false;
		}
	},
	ismouseon:function(event,cood){
		var self = this;
		var parent = null;
		if(cood == null){ 
			cood = {x:0,y:0,scaleX:1,scaleY:1};
			if(self.parent){ 
				parent = self.parent;
				while(parent&&parent != "root"&&parent!="window"){
					cood.x += parent.x;
					cood.y += parent.y;
					cood.scaleX *= parent.scaleX;
					cood.scaleY *= parent.scaleY;
					parent = parent.parent;
				}
			}    
		}
		if(!self.visible || event==null )return false;
		var key = null;
		var isclick = false;
		for(key in self.childList){
			if(self.childList[key].ismouseon)isclick = self.childList[key].ismouseon(event,{x:self.x+cood.x,y:self.y+cood.y,scaleX:self.scaleX*cood.scaleX,scaleY:self.scaleY*cood.scaleY});
			if(isclick)break;
		}
		if(!isclick && self.graphics){
			isclick = self.graphics.ismouseon(event,{x:self.x+cood.x,y:self.y+cood.y,scaleX:self.scaleX*cood.scaleX,scaleY:self.scaleY*cood.scaleY});
		}
		return isclick;
	},*/
	die:function (){
		var self = this;
		//self.graphics.clear();
		self.frameList.splice(0,self.frameList.length);
		self.mouseList.splice(0,self.mouseList.length);
		var key = null;
		for(key in self.childList){
			if(self.childList[key].die)self.childList[key].die();
		}
		self.removeAllChild();
	},
	localToGlobal:function(pointX,pointY){  
		var self=this;
	   	var cood={x:0,y:0}
	   	if(self.parent){ 
			var parent = self.parent;
			while(parent != "root"){
				cood.x += parent.x;
				cood.y += parent.y;
				parent = parent.parent;
			}
	   	}
	  	return  {"x":cood.x+pointX,"y":cood.y+pointY }  
	},
	GlobalTolocal:function(pointX,pointY){ 
	   var self = this;
	   var tmep = self.localToGlobal(self.x,self.y);
	   return [pointX-tmep[0],pointY-tmep[1]];	
    },
/*	drag:function()
	{ var self=this;
	  self.Ldfuc=function(){self.Ldownfuc.call(self,event)}
	  self.addEventListener(LMouseEvent.MOUSE_DOWN,self.Ldfuc)			
	},
	Ldownfuc:function(e)
	{ var self=this;
	  self.ismove=true;
	  self.Lmfuc=function(){self.Lmovefuc.call(self,event)}
	  self.addEventListener(LMouseEvent.MOUSE_MOVE,self.Lmfuc)
	  self.Lufuc=function(){self.Lupfuc.call(self,event)}
	  self.addEventListener(LMouseEvent.MOUSE_UP,self.Lufuc)
	  self.removeEventListener(LMouseEvent.MOUSE_DOWN,self.Ldfuc)
	},
	
	Lmovefuc:function(e)
	{ var self=this;
	  if(self.ismove)
	  {
		 self.x=e.locX-self.getWidth()/2
		 self.y=e.locY-self.getHeight()/2
	  }
	},
	Lupfuc:function()
	{ var self=this;
	  self.ismove=false;
	  self.removeEventListener(LMouseEvent.MOUSE_MOVE,self.Lmfuc);
	  self.removeEventListener(LMouseEvent.MOUSE_UP,self.Lufuc);
	  self.addEventListener(LMouseEvent.MOUSE_DOWN,self.Ldfuc)
	},*/
};

/*
* LButton.js
**/
/*var LButton = function(DisplayObject_up,DisplayObject_over){
	base(this,LSprite,[]);
	var self = this;
	self.type = "LButton";
	self.bitmap_up = DisplayObject_up;
	self.addChild(DisplayObject_up);
	
	if(DisplayObject_over == null){
		DisplayObject_over = DisplayObject_up;
	}else{
		self.addChild(DisplayObject_over);
	}
	self.bitmap_over = DisplayObject_over;
	self.bitmap_over.visible = false;
	self.bitmap_up.visible = true;
	
	LGlobal.buttonList.push(self);
}

LButton.prototype.buttonModeChange = function (){
	var self = this;
	if(self.ismouseon(LGlobal.mouseMoveEvent)){
		self.bitmap_up.visible = false;
		self.bitmap_over.visible = true;
	}else{
		self.bitmap_over.visible = false;
		self.bitmap_up.visible = true;
	}
};
	
LButton.prototype.getWidth = function(){
	var self = this;
	if(self.bitmap_over){ 
		return (self.bitmap_up.getWidth()>self.bitmap_over.getWidth())?self.bitmap_up.getWidth():self.bitmap_over.getWidth();
	}else{
		return self.bitmap_up.getWidth();
	}
}

LButton.prototype.getHeight=function(){
	var self = this;
	if(self.bitmap_over){ 
		return (self.bitmap_up.getHeight()>self.bitmap_over.getHeight())?self.bitmap_up.getHeight():self.bitmap_over.getHeight();
	}else{
		return self.bitmap_up.getHeight();
	}
}	

LButton.prototype.die = function (){
	var self = this;
	arguments.callee[SUPER].die.call(this);
	for(var i=0;i<LGlobal.buttonList.length;i++){
		if(LGlobal.buttonList[i].objectindex == self.objectindex){
			LGlobal.buttonList.splice(i,1);
			break;
		}
	}
};
*/
/*
* LTextFieldType.js
**/
var LTextFieldType = function (){};
	LTextFieldType.type = "LTextFieldType";
	LTextFieldType.INPUT = "input";
	LTextFieldType.DYNAMIC = null;
/*
* LTextField.js
**/
var LTextField = function(){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LTextField";
	self.texttype = null;
	self.x = 0;
	self.y = 0;
	self.text = "";
	self.font = "utf-8";
	self.size = "11";
	self.color = "#000000";
	self.weight = "normal";
	self.textAlign = "left";
	self.textBaseline = "top";
	self.lineWidth = 1;
	self.width = 150;
	self.height = 20;
	self.stroke = false;
	self.visible=true;
	self.maxline=20;
}
LTextField.prototype = {
	show:function (cood){
		if(cood == null)cood={x:0,y:0};
		var self = this;
		if(!self.visible)return;
		
		if(self.mask != null && self.mask.show){
			LGlobal.canvas.beginPath();
			LGlobal.canvas.save();  
			self.mask.show();
			LGlobal.canvas.clip();
		}
		if(self.texttype == LTextFieldType.INPUT){
			self.inputBackLayer.show({x:self.x+cood.x,y:self.y+cood.y});
	    	if(LGlobal.inputBox.name == "input"+self.objectindex){
	    		LGlobal.inputBox.style.marginTop = (self.y+cood.y) + "px";
	    		LGlobal.inputBox.style.marginLeft = (self.x+cood.x) + "px";
	    	}
		}
	    LGlobal.canvas.font = self.weight + " " + self.size+"pt "+self.font;  
	    LGlobal.canvas.textAlign = self.textAlign;
	    LGlobal.canvas.textBaseline = self.textBaseline;
	    LGlobal.canvas.lineWidth = self.lineWidth;  

	    if(self.stroke){
		    LGlobal.canvas.strokeStyle = self.color;
	    	LGlobal.canvas.strokeText(self.text,parseFloat(cood.x) + parseFloat(self.x),
	    		parseFloat(cood.y) + parseFloat(self.y),
	    		LGlobal.canvas.measureText(self.text).width);  
	    }else{
		    LGlobal.canvas.fillStyle = self.color;
	    	LGlobal.canvas.fillText(self.text,parseFloat(cood.x) + parseFloat(self.x),
		    		parseFloat(cood.y) + parseFloat(self.y),
		    		LGlobal.canvas.measureText(self.text).width);
	    }
	    if(self.wind_flag){
	    	self.windRun();
	    }
		if(self.mask != null && self.mask.show){
			LGlobal.canvas.restore();
		}
	},
/*	setType:function(type){
		var self = this;
		if(self.texttype != type && type == LTextFieldType.INPUT){
			self.inputBackLayer = new LSprite();
			self.inputBackLayer.graphics.drawRect(1,"black",[0, 0, self.width, self.height],true,"#cccccc");
			self.inputBackLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(){
				if(self.texttype != LTextFieldType.INPUT)return;
				LGlobal.inputBox.style.display = "";
				LGlobal.inputBox.name = "input"+self.objectindex;
	    		LGlobal.inputTextField = self;
	    		LGlobal.inputTextBox.value = self.text;
	    		LGlobal.inputTextBox.style.height = self.height+"px";
	    		LGlobal.inputTextBox.style.width = self.width+"px";
			});
		}else{
			self.inputBackLayer = null;
		}
		self.texttype = type;
	},*/
/*	mouseEvent:function (event,type,cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(self.inputBackLayer == null)return;
		self.inputBackLayer.mouseEvent(event,type,{x:self.x+cood.x,y:self.y+cood.y});
	},*/
	getWidth:function(){
		var self = this;
	    LGlobal.canvas.font = self.size+"pt "+self.font;
		return LGlobal.canvas.measureText(self.text).width;
	},
	getHeight:function(){
		var self = this;
	    LGlobal.canvas.font = self.size+"pt "+self.font;
		return self.size;
	},
/*	wind:function(listener){
		var self = this;
		self.wind_over_function = listener;
		self.wind_flag = true;
		self.wind_text = self.text;
		self.text = "";
		self.wind_length = 0;
	},
	windRun:function(){
		var self = this;
		if(self.wind_length > self.wind_text.length){
			self.wind_flag = false;
			if(self.wind_over_function)self.wind_over_function();
			return;
		}
		self.text = self.wind_text.substring(0,self.wind_length);
		self.wind_length++;
	}*/
};
/*
* LBitmap.js
**/
var LBitmap = function(bitmapdata){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LBitmap";
	self.x = 0;  
	self.y = 0;  
	self.width = 0;  
	self.height = 0;  
	self.scaleX=1;
	self.scaleY=1;
	self.alpha = 1;
	self.visible=true;
	self.rotate = 0;
	self.LX=1;
	self.LY=1;
	self.Ash=false;//反色
	self.Inv=false
	self.bitmapData = bitmapdata; 
	if(self.bitmapData){
		self.width = self.bitmapData.width;
		self.height = self.bitmapData.height;
	}
	
}
LBitmap.prototype = {
	show:function (cood){
		if(cood==null)cood={x:0,y:0};
		var self = this;
		if(!self.visible || !self.bitmapData)return;
		self.save = false;
		
		if(self.alpha < 1 || self.rotate != 0 || self.scaleX == -1 || self.scaleY == -1){
			LGlobal.canvas.save();  
			self.save = true;
		}
		if(self.rotate != 0){
			var rx,ry ;
			rx = cood.x + self.x+self.bitmapData.width*self.scaleX/2;
			ry = cood.y + self.y+self.bitmapData.height*self.scaleY/2;
			LGlobal.canvas.translate( rx, ry); 
			LGlobal.canvas.rotate(self.rotate * Math.PI / 180);
			LGlobal.canvas.translate(0-rx,0-ry); 
			if(self.alpha < 1){ 
				LGlobal.canvas.globalAlpha = self.alpha;
			}
			self.draw(cood);
		}else{
			if(self.alpha < 1){
				LGlobal.canvas.globalAlpha = self.alpha;
			}
			self.draw(cood);
		}
		if(self.save)LGlobal.canvas.restore(); 
	},
	draw:function(cood){
		var self=this;
		if(self.scaleX*cood.scaleX <0 || self.scaleY*cood.scaleY <0){
			self.tX = self.scaleX*cood.scaleX <0?-1:1;
			self.tY = self.scaleY*cood.scaleY <0?-1:1;
			LGlobal.canvas.scale(self.tX,self.tY);
			
			LGlobal.canvas.drawImage(self.bitmapData.image,
				self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
				self.tX * (cood.x + self.x),self.tY*(cood.y + self.y),self.bitmapData.width*self.scaleX*cood.scaleX,self.bitmapData.height*self.scaleY*cood.scaleY);
		}else{
			LGlobal.canvas.drawImage(self.bitmapData.image,
				self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
				cood.x + self.x,cood.y + self.y,self.bitmapData.width*self.scaleX*cood.scaleX,self.bitmapData.height*self.scaleY*cood.scaleY);
		}
		self.resize(cood);
		if(self.Ash){
			self.Effect_Ash(self.bitmapData,cood);
		}
		if(self.Inv){
			self.Effect_Inv(self.bitmapData,cood);
		}
		self.resize(cood);	
	},
	
/*	Effect_Ash:function(data,cood){       
		var self = this;
		var imageData = LGlobal.canvas.getImageData(cood.x + self.x,cood.y + self.y,data.width*self.scaleX*cood.scaleX,data.height*self.scaleY*cood.scaleY);
		var pixels = imageData.data;
		var len = pixels.length;
		LGlobal.canvas.clearRect(0,0,data.width*self.scaleX*cood.scaleX,data.height*self.scaleY*cood.scaleY);
		for(var i=0;i<len;i++){ 
			var b=(pixels[i*4]+pixels[i*4+1]+pixels[i*4+2])/3;
			pixels[i*4] = b;//红色
			pixels[i*4+1] = b;
			pixels[i*4+2] = b;
		}
		LGlobal.canvas.putImageData(imageData,cood.x + self.x,cood.y + self.y);
	},
	Effect_Inv:function(data,cood){       
		var self = this;
		var imageData = LGlobal.canvas.getImageData(cood.x + self.x,cood.y + self.y,data.width*self.scaleX*cood.scaleX,data.height*self.scaleY*cood.scaleY);
		var pixels = imageData.data;
		var len = pixels.length;
		LGlobal.canvas.clearRect(0,0,data.width*self.scaleX*cood.scaleX,data.height*self.scaleY*cood.scaleY);
		for(var i=0;i<len;i++){ 
			pixels[i*4]=255-pixels[i*4];//红色
			pixels[i*4+1]=255-pixels[i*4+1];
			pixels[i*4+2]=255-pixels[i*4+2];
		}
		LGlobal.canvas.putImageData(imageData,cood.x + self.x,cood.y + self.y);	
	},
	ismouseon:function(event,cood){
		var self = this;
		if(cood == null){ 
			cood = {x:0,y:0,scaleX:1,scaleY:1};
			var parent = self.parent;
			while(parent != "root"){
				cood.x += parent.x;
				cood.y += parent.y;
				parent = parent.parent;
			}
		}
		var tempSX = Math.abs(self.scaleX*cood.scaleX);
		var tempSY = Math.abs(self.scaleY*cood.scaleY);
		if(cood == null)cood={x:0,y:0};
		if(event==null || event == UNDEFINED)return false;
		var ox,oy;
		if(event.offsetX == UNDEFINED){
			ox = event.touches[0].pageX;
			oy = event.touches[0].pageY;
		}else{
			ox = event.offsetX;
			oy = event.offsetY;
		}
		if(event.offsetX >= self.x + cood.x && ox <= self.x + cood.x + self.bitmapData.width*tempSX&& 
			event.offsetY >= self.y + cood.y && oy <= self.y + cood.y + self.bitmapData.height*tempSY){
			return true;
		}else{
			return false;
		}
	},*/
	getWidth:function(cood){
		var self = this;
		var parent = null;
		if(cood == null){  
			cood = {x:0,y:0,scaleX:1,scaleY:1};
			if(self.parent){ 
				parent = self.parent;
				if(parent == "window"){
					return self.bitmapData != null?self.bitmapData.height*(self.scaleY>0?self.scaleY:-self.scaleY)*self.LX:0; 
				} 
				while(parent&&parent != "root"){
					cood.x += parent.x;
					cood.y += parent.y;
					cood.scaleX *= parent.scaleX;
					cood.scaleY *= parent.scaleY;
					parent = parent.parent;
				}
			}
		}
		self.LX = cood.scaleX;
		var tempSX = Math.abs(self.scaleX*cood.scaleX);
		return self.bitmapData != null?self.bitmapData.width*tempSX:0;
	},
	getHeight:function(cood){
		var self = this;
		var parent = null;
		if(cood == null){	
			cood = {x:0,y:0,scaleX:1,scaleY:1};
			if(self.parent){  
				parent = self.parent;
				if(parent == "window"){
					return self.bitmapData != null?self.bitmapData.height*(self.scaleY>0?self.scaleY:-self.scaleY)*self.LX:0; 
				} 
				while(parent&&parent != "root"){
					cood.x += parent.x;
					cood.y += parent.y;
					cood.scaleX*=parent.scaleX;
					cood.scaleY*=parent.scaleY;
					parent = parent.parent;
				}
			}
		}
		self.LY = cood.scaleY; 
		var tempSY = Math.abs(self.scaleY*cood.scaleY) 
		return self.bitmapData != null?self.bitmapData.height*tempSY:0;
	},

	resize:function(cood){
		var self = this;
	    var tempSX = Math.abs(self.scaleX*cood.scaleX);
		var tempSY = Math.abs(self.scaleY*cood.scaleY);
		self.width = (self.bitmapData != null?self.bitmapData.width*tempSX:0);
		self.height = (self.bitmapData != null?self.bitmapData.width*tempSY:0);
	},
/*	startX:function(){
		return this.x;
	},
	startY:function(){
		return this.y;
	}*/
};

/*
* LBitmapData.js
**/
var LBitmapData = function(image,x,y,width,height){
	var self = this;
	self.objectindex = ++LGlobal.objectIndex;
	self.type = "LBitmapData";
	self.oncomplete = null;
	if(image){
		self.image = image;
		self.x = (x==null?0:x);  
		self.y = (y==null?0:y);  
		self.width = (width==null?self.image.width:width);  
		self.height = (height==null?self.image.height:height);
	}else{
		self.x = 0;  
		self.y = 0;  
		self.width = 0;  
		self.height = 0;
		self.image = new Image();
	}
}
LBitmapData.prototype = {
	setProperties:function(x,y,width,height){
		var self = this;
		self.x = x;
		self.y = y;
		self.width = width;
		self.height = height;
	},
	setCoordinate:function(x,y){
		var self = this;
		self.x = x;
		self.y = y;
	}
};	
	var $LoadManage = function(){};
	$LoadManage.prototype = {
		load:function($list,$onupdate,$oncomplete){
			this.list=$list,this.onupdate=$onupdate,this.oncomplete=$oncomplete;
			this.loader=null,this.loadIndex=0,this.result=[];
			this.loadStart();
		},
		loadStart:function(){
			var self = LLoadManage;
			if(self.loadIndex >= self.list.length){
				self.oncomplete(self.result);
				return;
			}
			self.loader = new LLoader();
			self.loader.addEventListener(LEvent.COMPLETE,self.loadComplete);
			self.loader.load(self.list[self.loadIndex].path,"bitmapData");
		},
		loadComplete:function(){
			var self = LLoadManage;
			self.result[self.list[self.loadIndex].name] = self.loader.content;
			self.loadIndex++;
			if(self.onupdate){
				self.onupdate(Math.floor(self.loadIndex*100/self.list.length));
			}
			self.loadStart();
		}
	};

/*	var LEasing = {
		Quad: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c *(t/=d)*(t-2) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t + b;
				return -c/2 * ((--t)*(t-2) - 1) + b;
			}
		},
		Cubic: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		Quart: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return -c * ((t=t/d-1)*t*t*t - 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
				return -c/2 * ((t-=2)*t*t*t - 2) + b;
			}
		},
		Quint: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		Sine: {
			easeIn: function(t,b,c,d){
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sin(t/d * (Math.PI/2)) + b;
			},
			easeInOut: function(t,b,c,d){
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
			}
		},
		Strong: {
			easeIn: function(t,b,c,d){
				return c*(t/=d)*t*t*t*t + b;
			},
			easeOut: function(t,b,c,d){
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		},
		Expo: {
			easeIn: function(t,b,c,d){
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
			},
			easeOut: function(t,b,c,d){
				return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
			},
			easeInOut: function(t,b,c,d){
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
				return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		},
		Circ: {
			easeIn: function(t,b,c,d){
				return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
			},
			easeOut: function(t,b,c,d){
				return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
			},
			easeInOut: function(t,b,c,d){
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
			}
		},
		Elastic: {
			easeIn: function(t,b,c,d,a,p){
				var s;
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; s=p/4; }
				else s = p/(2*Math.PI) * Math.asin (c/a);
				return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			},
			easeOut: function(t,b,c,d,a,p){
				var s;
				if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
				if (!a || a < Math.abs(c)) { a=c; s=p/4; }
				else s = p/(2*Math.PI) * Math.asin (c/a);
				return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
			},
			easeInOut: function(t,b,c,d,a,p){
				var s;
				if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
				if (!a || a < Math.abs(c)) { a=c;s=p/4; }
				else s = p/(2*Math.PI) * Math.asin (c/a);
				if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
				return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
			}
		},
		Back: {
			easeIn: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;
			},
			easeOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
			},
			easeInOut: function(t,b,c,d,s){
				if (s == undefined) s = 1.70158; 
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
			}
		},
		Bounce: {
			easeIn: function(t,b,c,d){
				return c - LEasing.Bounce.easeOut(d-t, 0, c, d) + b;
			},
			easeOut: function(t,b,c,d){
				if ((t/=d) < (1/2.75)) {
					return c*(7.5625*t*t) + b;
				} else if (t < (2/2.75)) {
					return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
				} else if (t < (2.5/2.75)) {
					return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
				} else {
					return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
				}
			},
			easeInOut: function(t,b,c,d){
				if (t < d/2) return LEasing.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
				else return LEasing.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
			}
		}
	};
	var Quad = LEasing.Quad;
	var Cubic = LEasing.Cubic;
	var Quart = LEasing.Quart;
	var Quint = LEasing.Quint;
	var Sine = LEasing.Sine;
	var Strong = LEasing.Strong;
	var Expo = LEasing.Expo;
	var Circ = LEasing.Circ;
	var Elastic = LEasing.Elastic;
	var Back = LEasing.Back;
	var Bounce = LEasing.Bounce;	*/		
	var $LTweenLiteChild = function($target,$duration,$vars){
		var self = this,key = null;
		self.target = $target;self.duration = $duration || 0.001;self.vars = $vars;
		self.currentTime = (new Date()).getTime() / 1000;
		self.delay = self.vars.delay || 0;
		self.combinedTimeScale = self.vars.timeScale || 1;
		self.active = self.duration == 0 && self.delay == 0;
		self.varsto = {};
		self.varsfrom = {};
		if (typeof(self.vars.ease) != "function") {
			self.vars.ease = self.easeOut;
		}
		self.ease = self.vars.ease;
		delete self.vars.ease;
		if(self.vars.onComplete){
			self.onComplete = self.vars.onComplete;
			delete self.vars.onComplete;
		}
		if(self.vars.onUpdate){
			self.onUpdate = self.vars.onUpdate;
			delete self.vars.onUpdate;
		}
		if(self.vars.onStart){
			self.onStart = self.vars.onStart;
			delete self.vars.onStart;
		}
		for(key in self.vars){
			self.varsto[key] = self.vars[key];
			self.varsfrom[key] = self.target[key];
		}
		self.initTime = self.currentTime;
		self.startTime = self.initTime + self.delay;
	}
	$LTweenLiteChild.prototype = {
		init:function(){
		},
		initTweenVals:function(){
		},
		easeOut:function($t, $b, $c, $d) {
			return -$c * ($t /= $d) * ($t - 2) + $b;
		},
		tween:function(){
			var self = this;
			var time = (new Date()).getTime() / 1000 , etime;
			etime = (time - self.startTime);
			if(etime < 0)return;
			var tweentype=null;
			for(tweentype in self.varsto){
				var v = self.ease(etime,self.varsfrom[tweentype],self.varsto[tweentype]-self.varsfrom[tweentype],self.duration);
				self.target[tweentype] = v;
			}
			if (etime >= self.duration){
				if(self.onComplete)self.onComplete();
				return true;
			}else if(self.onUpdate){
				self.onUpdate();
			}
			return false;
		}
	};
	var $LTweenLite =function(){}
	$LTweenLite.prototype = {
		tweens:[],
		show:null,
		frame:function(){
			var self = this;
			var i,length=self.tweens.length;
			for(i=0;i < length;i++){
				if(self.tweens[i].tween()){
					self.tweens.splice(i,1);
					i--;
					length=self.tweens.length;
				}
			}
			if(self.tweens.length == 0)self.show = null;
		},
		to:function($target,$duration,$vars){
			if(!$target)return;
			var self = this;
			var tween = new $LTweenLiteChild($target,$duration,$vars);
			self.tweens.push(tween);
			self.show = self.frame;
		}
	};
     LLoadManage = new $LoadManage();

//画面切割工具
	var migCat = function(w,h,row,col){
		var i,j;
		var cWidth = w/row;
		var cHeight = h/col;
		var resultArray = new Array();
		for(i=0;i<col;i++){
			var childArray=new Array();
			for(j=0;j<row;j++){
				childArray.push({x:cWidth*j,y:cHeight*i});
			}
			resultArray.push(childArray);
		}
		return resultArray;
	};

//动画工具	
//定义构造函数 	 	 
var NewAnimation = function(migdata,miglist,Rate,isMirror){    
	 var self = this;
	 base(self,LSprite,[]);
	 self.frameRate = Rate;
     self.currentFrame = 0;
     self.stopIndex = null;
     self.movietime = null;
	 self.repeatCount = 0;
	 self.count = 0;
	 self.rowIndex = 0;
	 self.colIndex = 0;
	 self.isplay = false;
     self.overActionFun = null;
	 self.imgList = miglist;
	 self.isMirror = isMirror;
	 self.bitmap = new LBitmap(migdata);
	 self.addChild(self.bitmap);
     self.addEventListener(LEvent.ENTER_FRAME,function(){self.ontime.call(self)}); 	
}
NewAnimation.prototype.addStopListener = function (type,listener){
	if(type == LEvent.COMPLETE){ 
		var self = this;
		self.overActionFun = listener;
	} 
}
NewAnimation.prototype.play = function(){
	var self = this;
	self.isplay = true;
 
}
NewAnimation.prototype.stop = function(){    
	var self = this;
	self.colIndex = 0;
	self.isplay = false;

}
NewAnimation.prototype.goAndstop = function(num){   
    var self = this;
    self.stopIndex = num;
}
NewAnimation.prototype.stopAt = function(num){   
	var self = this;
    self.currentFrame = num;
	self.bitmap.bitmapData.setCoordinate(self.imgList[self.rowIndex][self.currentFrame].x,self.imgList[self.rowIndex][self.currentFrame].y); 	
}
NewAnimation.prototype.setAction = function(num){      
    var self = this;
	self.rowIndex = num;	
	self.bitmap.bitmapData.setCoordinate(self.imgList[self.rowIndex][self.colIndex].x,self.imgList[self.rowIndex][self.colIndex].y); 
}
NewAnimation.prototype.repeat = function(num){   
	var self = this;
    self.repeatCount = num;	 
}
NewAnimation.prototype.ontime = function(){  
	var self = this;
    if(self.imgList && self.isplay){
		self.bitmap.bitmapData.setCoordinate(self.imgList[self.rowIndex][self.colIndex].x,self.imgList[self.rowIndex][self.colIndex].y);     
		self.currentFrame=self.colIndex;
		self.colIndex++;
		if(self.colIndex>self.imgList[self.rowIndex].length-1){   	 			 
			self.colIndex = 0;
			if(self.repeatCount != 0){
				self.count++;
				if(self.count>=self.repeatCount){ 
					self.stop();
					self.bitmap.bitmapData.setCoordinate(self.imgList[self.rowIndex][self.colIndex].x,self.imgList[self.rowIndex][self.colIndex].y);    
					if(self.overActionFun != null){
						self.overActionFun(self);                                          
						self.overActionFun = null;
					}
					return;									   
				}					 	   
			}
		}
		if(self.stopIndex!=null && self.currentFrame==self.stopIndex){
			if(self.count==self.repeatCount-1||self.repeatCount==0){
				self.stop();
				self.bitmap.bitmapData.setCoordinate = (self.imgList[self.rowIndex][self.stopIndex].x,self.imgList[self.rowIndex][self.stopIndex].y);
				if(self.overActionFun != null){
					self.overActionFun(self); 
					self.overActionFun = null;
				}
				return;
			}			   
		}
		if(self.isMirror){
			self.bitmap.scaleX = -1*Math.abs(self.bitmap.scaleX);
		}else{
			self.bitmap.scaleX = 1*Math.abs(self.bitmap.scaleX);
		}
		//self.movietime=setTimeout(function(){self.ontime.call(self)},self.frameRate)
	}		
}		
var defineClass = function(data){
	var classname = data.name;
	var superclass = data.superclass ||Object;
	var constructor = data.construct || function(){};
	var methods = data.methods ||{};
	var statics = data.static ||{};
	var borrows = null;
	var provides = null;
	
	// Borrow may be a single constructor or an array of them
	if(!data.borrows) 	borrows = [];
	else if(data.borrows instanceof Array)borrows = data.borrows;
	else borrows = [data.borrows]; 

	if(!data.provides) provides = [];
	else if(data.provides instanceof Array)provides = data.provides;
	else borrows = [data.provides]; 

	var proto = new superclass();
	/*	 for(var p in proto)
	{if(proto.hasOwnProperty(p)){ delete proto[p];}}*/

	for(var i=0; i < borrows.length;i++){  
		var c = borrows[i]
		for(var p in c.prototype){
			if(typeof c.prototype[p]!="function")continue;
			proto[p] = c.prototype[p];
		}
	}
	for(var  p in methods) proto[p] = methods[p];
	//proto.constructor = constructor;
	//proto.superclass = superclass;
		if(classname) proto.classname = classname;
		for(var i=0;i<provides.length;i++){
			var c = provides [i];
			for(var p in c.prototype){
				if(typeof c.prototype[p]!="function")continue;
				if(p == "constructor"||p == "superclass")continue;
				if(p in proto&& typeof proto[p] =="function"&&proto[p].length == c.prototype[p].length) continue;
				throw new Error ("这个class不支持"+c.classname+"这个类");				  
			} 
		}
		for(var key in proto){  
			if(!constructor.prototype[key]){
				constructor.prototype[key] = proto[key];
			}
		}
		for( var p in statics){
			constructor[p] = statics[p];
		}
		return  constructor;	 		
	}	

	return {"LEvent":LEvent,
			"LGlobal":LGlobal,
			"addChild":addChild,
			"removeChild":removeChild,
			"canvasBengin":canvasBengin,
			"canvasOver":canvasOver,
			"base":base,
			"LLoader":LLoader,
			"LSprite":LSprite,
			"LTextField":LTextField,
			"LBitmap":LBitmap,
			"LBitmapData":LBitmapData,
			"LLoadManage":LLoadManage,
			"getLTweenLite":getLTweenLite,
			"migCat":migCat,
			"NewAnimation":NewAnimation,
			"defineClass":defineClass,		    
		   }
	}()
