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
	var beginCssManage = {"normal":{}};


    function manageMode (){
        this.ConfigManage = null;
		this.showTime = 500;
		this.styleManage = {};
    }
    manageMode.prototype ={
        constructor : manageMode,
        /**
         *@author zhanghong
         * @function  设置模块配置
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [Object]config 配置参数
         */
        initConfig : function(config){
            this.ConfigManage ={};
            if( typeof config == 'object'){
                for(key in config){
                    this.ConfigManage[key] =config[key];
                }
            }
        },
        /**
         *@author zhanghong
         * @function  创建模块
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] ModeName 模块名, [String] [styleWay] 模块名的显示方式,默认为normal
         *@return new coreTemplete();
         *
         */
        createMode :function(ModeName,styleWay){
            if(typeof this.ConfigManage[ModeName] != 'undefined'&& !modeManage[ModeName]){
              var  showWay =(showStyleManage[styleWay]&&styleWay)||"normal";
              var  closeWay =(closeStyleManage[styleWay]&&styleWay)||"normal";
			  var beginCss =(beginCssManage[styleWay]&&styleWay)||"normal";
                modeManage[ModeName] = {};
                modeManage[ModeName].context = new coreTemplete(ModeName,this.ConfigManage[ModeName],showWay,closeWay,beginCss);
                modeManage[ModeName].itemIndex = 0;
                modeManage[ModeName].showsContainer = {};
                  }
            return (modeManage[ModeName])&&modeManage[ModeName].context
        },
        /**
         *@author zhanghong
         * @function  设置显示方式配置
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [Object]showStyleObj 配置参数
         */
        setShowStyle :function(showStyleObj){
            if( typeof showStyleObj == 'object'){
                for(key in showStyleObj){
                    showStyleManage[key] =showStyleObj[key];
                }
            }

        },
        /**
         *@author zhanghong
         * @function  设置关闭方式配置
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [Object]closeStyleObj 配置参数
         */
        setCloseStyle :function(closeStyleObj){
            if( typeof closeStyleObj == 'object'){
                for(key in closeStyleObj){
                    closeStyleManage[key] =closeStyleObj[key];
                }
            }

        },
		

	    JqAnimate:function(){
			var showManage =  self.styleManage.showStyle;
			var closeManage =  self.styleManage.closeStyle;
			var beginManage =  self.styleManage.beginStyle;
			for(var key in showManage){
					showStyleManage[key] = function(NUM){
					     return    (function(ele){
					ele.animate( showManage[NUM].opt, showManage[NUM].showTime);
					return showManage[NUM].showTime;
					})
					}(key)
				
				}
			for(var key in closeManage){
					closeStyleManage[key] = function(NUM){
					 return   (function(ele){	
					ele.animate( closeManage[NUM].opt,closeManage[NUM].showTime)
					return showManage[NUM].showTime;
					})
					}(key)
				
				}
			 if( typeof beginManage == 'object'){
                for(key in beginManage){
                    beginCssManage[key] = beginManage[key].opt;
                }
            }
			},
        /**
         *@author zhanghong
         * @function  设置总体显示方式配置
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [Object]StyleObj 配置参数
         */
				
		setStyle :function(StyleObj){
			self = this;
			this.styleManage = {"showStyle":{},"closeStyle":{},"beginStyle":{}};
			var showManage =  self.styleManage.showStyle;
			var closeManage =  self.styleManage.closeStyle;
			var beginManage =  self.styleManage.beginStyle;
			if( typeof StyleObj == 'object'){
				for(var key in StyleObj){
					var styleName = key;
					var styleNameObj = StyleObj[key];
					var showTime = 0;										
					for(var newKey in styleNameObj){
						var value = styleNameObj[newKey];
						
						switch(newKey){
							case "beginCss": 
							      beginManage[key]= beginManage[key]||{};
								  beginManage[key]["opt"] = value;							
							      break;
							case "showWay": 
							      showManage[key]= showManage[key]||{};
								  showManage[key]["opt"] = value;
							      break;
							case "colseWay":
								  closeManage[key]= closeManage[key]||{};
							      closeManage[key]["opt"] = value; 
						
							case "runTime":
							      showTime = value;							
							
							     ; break;
							}
							
						
						}
						showManage[key]&&(showManage[key]["showTime"] =showTime||500 ); 
						closeManage[key]&&(closeManage[key]["showTime"] =showTime||500 ); 
					   
					
					}
					 self.JqAnimate();
				
			}
			
			
			},
		
        /**
         *@author zhanghong
         * @function  设置显示起始样式配置
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [Object]beginCssConfig 配置参数
         */
		setBeginCss:function(beginCssConfig){
            if( typeof beginCssConfig == 'object'){
                for(key in beginCssConfig){
                    beginCssManage[key] = beginCssConfig[key];
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

    function coreTemplete(currentMode,config,showWay,closeWay,beginCss){
        this.config = config;
        this.target = "";
        this.ModeType = currentMode;
        this.htmlEle = null;
        this.showWay = showWay;
        this.closeWay = closeWay;
		this.beginCss = beginCss;
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
        /**
         *@author zhanghong
         * @function  加载具体模块的某项配置选项
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] itemName 模块具体选项名, [String] [target] 如果有此参数 则直接加载并且显示,[Every] [par] 显示时运行的参数 [Boolean] [closeMoveOnce] 此次显示是否停止显示方式；
         *@return ;
         *
         */
        load : function (itemName,target,par,closeMoveOnce) {
            var self = this;
            if(self.loadT.indexOf(itemName) == -1) {
                self.loadT.push(itemName);
                self.loadCss(itemName);
                (!target)?( setTimeout(self.loadJs(itemName, function () {
                    self.show(itemName);
                }), 300)):(  self.loadJs(itemName, function () {
                    self.show(itemName, target,par,closeMoveOnce);
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
        /**
         *@author zhanghong
         * @function  显示具体模块的某项配置选项 
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] itemName 模块具体选项名, [String] target 如果有此参数 则直接加载并且显示,[Every] [par] 显示时需要传递的参数 [Boolean] [closeMoveOnce] 此次显示是否停止显示方式；
         *@return null;
         *
         */

        show : function(itemName, target,par,closeMoveOnce){
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
					
					var beginCss = (this.getConfigValue(itemName, "beginCss"))||this.beginCss;
                    var showObj = new creatShowStylePar(this.target,showWay,closeWay,beginCss,this.itemName,this.ModeType,this.htmlEle);
					
                    this.runedT[itemName] = new ShowStyle(showObj);
					this.isRunNow = (target)?true:false;
                    if(this.isRunNow){
                        this.run(itemName,target,par,closeMoveOnce);

                    }


                }
            }else{//已经运行过了
			    
                this.run(itemName,target,par,closeMoveOnce);
            }
        },
        run :function(itemName,target,par,closeMoveOnce){
            var loadData = this.getConfigValue(itemName, "loadData");
			this.runedT[itemName].target = target;
            this.runedT[itemName].show(closeMoveOnce);
            if(loadData && typeof loadData == 'function') {
                loadData(par);
            }
        },
        /**
         *@author zhanghong
         * @function  关闭具体模块的某项配置选项
         * @information 参数形式 [类型] 参数名 （[参数名] 表可选）
         * @param [String] itemName 模块具体选项名, [function] [fun] 关闭完成时要调用的函数
         *@return null;
         *
         */
        close : function(itemName, fun){
            if(this.runedT[itemName] && this.runedT[itemName].view){
                this.runedT[itemName].close(fun);
            }
        }
    }

       function creatShowStylePar(target,showWay,closeWay,beginCss,itemName,ModeType,htmlEle){
            this.target = target||"";;
            this.showWay = showWay;
            this.closeWay = closeWay;
            this.itemName = itemName||"";
            this.htmlEle = htmlEle||null;
            this.ModeType = ModeType;
			this.beginCss = beginCss
        }
      function ShowStyle(opt){
            var currentMode = modeManage[opt.ModeType];
            this.target = opt.target || null;
            this.htmlEle = opt.htmlEle || null;
            this.showWay = opt.showWay;
            this.closeWay = opt.closeWay;
            this.modeType = opt.ModeType;
            this.itemName = opt.itemName;
			this.beginCss = opt.beginCss;
			this.closeMoveOnce = false;
            this.view = false;
            this.oldTarge = "";
            this.myIndex = (currentMode.itemIndex++);
            currentMode.showsContainer[this.myIndex] = this;
            this.currentContainer =currentMode.showsContainer;
        }
        ShowStyle.prototype = {
            show : function(closeMoveOnce){
                var self = this;
                if(!this.view){
                    self.showFun(closeMoveOnce);
              }

            },
			setbeginCss:function(){
				var self = this;
				var cssObj = beginCssManage[self.beginCss];
				if(typeof cssObj =="object"){
					self.htmlEle.css(cssObj);					
					}
				
				},	
			
            showFun : function(closeMoveOnce){
                var self = this;
				var processTime = 0;
				this.closeMoveOnce =  closeMoveOnce;
                self.closeOthers();
                $(self.target).append(self.htmlEle);				
                if(typeof showStyleManage[self.showWay] =="function"&&!this.closeMoveOnce){     
				    self.setbeginCss();
					setTimeout(function(){processTime =  showStyleManage[self.showWay].call(self,self.htmlEle);setTimeout(function(){
                    self.view =true;
                    },processTime);  },100)
                    
                 }else{
					 
					 setTimeout(function(){
						self.closeMoveOnce = false
						self.view =true;
						},processTime);
						 
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
					if(typeof closeStyleManage[self.closeWay] =="function"&&!this.closeMoveOnce){
					   setTimeout(function(){processTime = closeStyleManage[self.closeWay].call(self,vaule.htmlEle),setTimeout(removeValue,processTime); },100);
	
					}else{
						 setTimeout(removeValue,processTime);
						
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