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

	LGlobal.show = function(showlist,cood){
		if(cood == null)cood={x:0,y:0,scaleX:1,scaleY:1};
		var key = null;
		for(key in showlist){
			if(showlist[key].show){
				showlist[key].show(cood);
			}
		}
		
	};

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

};


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
