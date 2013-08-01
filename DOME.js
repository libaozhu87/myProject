/**
 * Created with JetBrains WebStorm.
 * author: zhangHong
 * Date: 13-5-31
 * Time: 下午10:42
 * To change this template use File | Settings | File Templates.
 */
(function ($){
    var modeManage = {};
    var showStyleManage = {"normal":function(){return 0}};
    var closeStyleManage = {"normal":function(){return 0}};
	var initCssManage = {"normal":{}};


    function manageMode (){
        this.ConfigManage = null;
    }
    manageMode.prototype ={
        constructor : manageMode,
        /**
         *@author zhanghong
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [Object]config 配置参数
         */
        initConfig : function(config){
            this. ConfigManage ={};
            if( typeof config == 'object'){
                for(key in config){
                    this.ConfigManage[key] =config[key];
                }
            }
        },
        /**
         *@author zhanghong
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] ModeName 模块名, [String] showWay 模块名的显示方式,[String] closeWay 模块名的关闭方式,[String] initCss 模块名的初始化样式,
         *
         *
         */
        createMode :function(ModeName,showWay,closeWay,initCss){
            if(typeof this.ConfigManage[ModeName] != 'undefined'&& !modeManage[ModeName]){
                showWay =(showStyleManage[showWay]&&showWay)||"normal";
                closeWay =(closeStyleManage[closeWay]&&closeWay)||"normal";
				initCss =(closeStyleManage[initCss]&&initCss)||"normal";
                modeManage[ModeName] = {};
                modeManage[ModeName].context = new coreTemplete(ModeName,this.ConfigManage[ModeName],showWay,closeWay,initCss);
                modeManage[ModeName].itemIndex = 0;
                modeManage[ModeName].showsContainer = {};
                  }
            return (modeManage[ModeName])&&modeManage[ModeName].context
        },

        setShowStyle :function(showStyleObj){
            if( typeof showStyleObj == 'object'){
                for(key in showStyleObj){
                    showStyleManage[key] =showStyleObj[key];
                }
            }

        },
        setCloseStyle :function(closeStyleObj){
            if( typeof closeStyleObj == 'object'){
                for(key in closeStyleObj){
                    closeStyleManage[key] =closeStyleObj[key];
                }
            }

        },
		setInitCss:function(initCssConfig){
            if( typeof initCssConfig == 'object'){
                for(key in initCssConfig){
                    initCssManage[key] = initCssConfig[key];
                }
            }

        },

    }
    function loadScript(src, callback, errorCallback){
        var scriptEle = document.createElement("script");
        callback = callback || function(){};
        errorCallback = errorCallback || function(){ console.log(src + ' -- load error !'); };
        scriptEle.type = "text/javascript";
        scriptEle.setAttribute("load_type","js");
        scriptEle.setAttribute("charset", "utf-8");
        scriptEle.src = src;
        scriptEle.charset = 'utf-8';
        document.getElementsByTagName("head").item(0).appendChild(scriptEle);
        scriptEle.onload = scriptEle.onreadystatechange = function(){
            if(  !scriptEle.readyState  || scriptEle.readyState=='loaded' || scriptEle.readyState=='complete'){
                callback();
            }
        }
        scriptEle.onerror = function(){
            errorCallback
        };
    }
    function loadCss(src){
        var cssEle = document.createElement('link');
        cssEle.rel = 'stylesheet';
        cssEle.type = 'text/css';
        cssEle.setAttribute("load_type","css");
        cssEle.href = src;
        document.getElementsByTagName('head').item(0).appendChild(cssEle);
    }

    function coreTemplete(currentMode,config,showWay,closeWay,initCss){
        this.config = config;
        this.target = "";
        this.ModeType = currentMode;
        this.htmlEle = null;
        this.showWay = showWay;
        this.closeWay = closeWay;
		this.initCss = initCss;
        this.isRunNow = false;
        this.loadT = [];//
        this.runedT = {};
    }
    coreTemplete.prototype = {
        constructor : coreTemplete,//构造函数
        initHtmlTemplete:function(str){
           this.content =$(str);
        },


        getConfigValue : function(itemName, key) {
            if(typeof this.config[itemName][key] != "undefined") {
                return this.config[itemName][key];
            }
            return false;
        },
        load : function (itemName,target) {
            var self = this;
            if(self.loadT.indexOf(itemName) == -1) {
                self.loadT.push(itemName);
                self.loadCss(itemName);
                (!target)?( setTimeout(self.loadJs(itemName, function () {
                    self.show(itemName);
                }), 300)):(  self.loadJs(itemName, function () {
                    self.show(itemName, target);
                }) )
            }


        },
        loadJs : function(itemName, callback) {
            var urlJs = this.getConfigValue(itemName, 'js');
            urlJs&&loadScript(urlJs, callback);
        },
        loadCss : function(itemName){
            var urlCss = this.getConfigValue(itemName, 'css');
            urlCss&&loadCss(urlCss);
        },
        show : function(itemName, target,par){
            if(!this.runedT[itemName]){//没有加载完成的话
                if(this.loadT.indexOf(itemName) == -1){
                    this.load(itemName,target);//重新加载
                }else{
                    var initData = this.getConfigValue(itemName, "initData");

                    this.htmlEle = $(this.getConfigValue(itemName, "htmlStr"))||"";
					if(initData && typeof initData == 'function'){
                        initData(this.htmlEle);
                        }
                    var showWay = (this.getConfigValue(itemName, "showWay"))||this.showWay;
                    var closeWay = (this.getConfigValue(itemName, "closeWay"))||this.closeWay;
					var initCss = (this.getConfigValue(itemName, "initCss"))||this.initCss;
                    var showObj = new creatShowStylePar(this.target,showWay,closeWay,initCss,this.itemName,this.ModeType,this.htmlEle);
					
                    this.runedT[itemName] = new ShowStyle(showObj);
					//this.runedT[itemName].setInitCss();
					this.isRunNow = (target)?true:false;
                    if(this.isRunNow){
                        this.run(itemName,target,par);

                    }


                }
            }else{//已经运行过了
			    
                this.run(itemName,target,par);
            }
        },
        run :function(itemName,target,par){
            var loadData = this.getConfigValue(itemName, "loadData");
			this.runedT[itemName].target = target;
            this.runedT[itemName].show();
            if(loadData && typeof loadData == 'function') {
                loadData(par);
            }
        },
        close : function(itemName, fun){
            if(this.runedT[itemName] && this.runedT[itemName].view){
                this.runedT[itemName].close(fun);
            }
        }
    }

       function creatShowStylePar(target,showWay,closeWay,initCss,itemName,ModeType,htmlEle){
            this.target = target||"";;
            this.showWay = showWay;
            this.closeWay = closeWay;
			this.initCss = initCss;
            this.itemName = itemName||"";
            this.htmlEle = htmlEle||null;
            this.ModeType = ModeType
        }
      function ShowStyle(opt){
            var currentMode = modeManage[opt.ModeType];
            this.target = opt.target || null;
            this.htmlEle = opt.htmlEle || null;
            this.showWay = opt.showWay;
            this.closeWay = opt.closeWay;
            this.modeType = opt.ModeType;
            this.itemName = opt.itemName;
			this.initCss = opt.initCss;
            this.view = false;
            this.oldTarge = "";
            this.myIndex = (currentMode.itemIndex++);
            currentMode.showsContainer[this.myIndex] = this;
            this.currentContainer =currentMode.showsContainer;
        }
        ShowStyle.prototype = {
            show : function(){
                var self = this;
                if(!this.view){
                    self.showFun();
              }

            },
			setInitCss:function(){
				var self = this;
				var cssObj = initCssManage[self.showWay];
				if(typeof cssObj =="object"){
					self.htmlEle.css(cssObj);					
					}
				
				},
			
            showFun : function(){
                var self = this;
				var processTime = 0;
                self.closeOthers();
                $(self.target).append(self.htmlEle);
				self.setInitCss();		
                if(typeof showStyleManage[self.showWay] =="function"){
					setTimeout(function(){processTime =  showStyleManage[self.showWay].call(self,self.htmlEle);setTimeout(function(){
                    self.view =true;
                    },processTime);  },100)
                    
                 }

            },
            close : function(fun){
                var value = this.currentContainer[this.myIndex];
                if(value.view){
                    var outValueArr = [value];
                    this.closeFun(outValueArr, fun);
                }
            },
            closeFun : function(closeArr, overFn){
				var self = this;
				var processTime = 0;
				for(var i = 0; i < closeArr.length; i++){					
					var vaule = closeArr[i];
					if(typeof closeStyleManage[self.closeWay] =="function"){
					   setTimeout(function(){processTime = closeStyleManage[self.closeWay].call(self,vaule.htmlEle),setTimeout(removeValue,processTime); },100);
	
					}
				}
                
                function removeValue(){
                    for(var i = 0; i < closeArr.length; i++){
                        var outValue = closeArr[i];
                        var parentEle = $(outValue.target)[0];
                        parentEle.removeChild(outValue.htmlEle[0]);
                        outValue.view = false;
                    }
                    if( overFn && typeof overFn == "function"){
                        overFn();
                    }
                };

            },
            closeOthers : function(type){
                var self = this;
                var outValueArr = [];
                for(var key in this.currentContainer){
                    if(key != this.myIndex){
                        var value = this.currentContainer[key];
                        if(value.view && (value.target == this.target)){
                            outValueArr.push(value);
                            self.closeFun(outValueArr);
                          }
                     }
                }
            }
        }
		
   $.MODE  = (function (){
      return  new  manageMode();
    })()	
		

})($)