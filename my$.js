/**
 * Created with JetBrains WebStorm.
 * User: 章洪
 * Date: 12-8-30
 * Time: 下午10:18
 *  * description. 此库为一个轻量级的防JQ 库  只适合运用在支持DOM2规范 以及DOM3 中的规范的querySelectorAll和querySelector 如webkit内核 此库不涉及IE6，7 的兼容性 封装此库的初始目的在于基于HTML5 游戏开发的需要
 */
(function(E){
    var selectElementArr = [];//ToDo 选择器选中的元素的数组
    var MYEVENT = {};
    var DOMEVENT = {"click":1};//ToDo DOM自带的事件此处只有1个，如需要可以按此方式添加
    E.my$ = (function(){
        return new myQuery()
    })();
    //ToDo animate方法所需的运动方式配置
    var ease = {
        'in':'ease-in',
        'out':'ease-out',
        'in-out':'ease-in-out',
        'snap':'cubic-bezier(0,1,.5,1)',
        'linear':'cubic-bezier(0.250, 0.250, 0.750, 0.750)'
    };
    function each (fun){
        for(var i = 0, len = selectElementArr.length; i < len; i++){
            fun(selectElementArr[i]);
        }
    }
    function myQuery (){
    }
    /**
     * 选取单一的元素;
     *
     * @param {String} sq
     * @return my$;
     * @api public
     */

    myQuery.prototype.Q = function(sq){
        var ele = null;
        selectElementArr = [];
        (ele = doc.querySelector(sq))&&(selectElementArr.push(ele));
        return this;
    };
    /**
     * 选取多个元素;
     *
     * @param1 {String} sq
     * @param2 {Object} [suitObj] 选择合适的属性的元素 ex {"id":"aa"}
     * @return my$;
     * @api public
     */
    myQuery.prototype.allQ = function(sq,suitObj){
        var newEleArr = [];
        selectElementArr = [];
        selectElementArr = doc.querySelectorAll(sq);
        each(function(ele){
            for(var key in suitObj){
                var value =  ele.getAttribute(key);
                if(value != suitObj[key]){
                    break;
                }
            }
            newEleArr.push(ele)
        })
        (newEleArr.length!=0)&&(selectElementArr = newEleArr);
        return this;
    }
    /**
     * 把元素包装成my$;
     *
     * @param1 {Object} newEle
     * @return my$;
     * @api public
     */

    myQuery.prototype.$ = function(newEle){
        selectElementArr = [];
        (newEle.nodeType == 1) && (selectElementArr.push(newEle));
        return this;
    };
    /**
     * 获取的元素  如结果为单个元素 返回元素本身  多个放回数组;
     *
     * @return result;
     * @api public
     */
    myQuery.prototype.getEle = function(){
        var result = null   ;
        switch(selectElementArr.length){
            case "0": result = null;break;
            case "1": result = selectElementArr[0];break;
            default :result = selectElementArr;break;
        }
        return result;
    }
    /**
     * 获取的元素class  如结果为单个元素 返回class名  多个放回数组;
     *
     * @return result;
     * @api public
     */
    myQuery.prototype.getClass = function(){
        var result = null;
        var results = [];
        switch(selectElementArr.length){
            case "0": result = null;break;
            case "1": result = selectElementArr[0].className;break;
            default :each( function(ele){
                              results.push(ele.className);
                              });
                      result = results;
                break;
        }
        return result;
    }
    /**
     * 设置元素的class;
     *
     * @param1 {String} className
     * @return my$;
     * @api public
     */
    myQuery.prototype.setClass = function(className){
        var result = null;
        var results = [];
        switch(selectElementArr.length){
            case "0":break;
            case "1":  selectElementArr[0].className = className;break;
            default :each( function(ele){
                ele.className = className;
            });break;
        }
        return this;
    }

    /**
     * 设置元素的class;
     *
     * @param1 {Object} cssObj 如 {"height":"90px"}
     * @return my$;
     * @api public
     */
    myQuery.prototype.css = function(cssObj){
        each(function(ele){
            for (var key in cssObj) {
                ele.style[key] = cssObj[key];
            }
        })
        return this;
    }

    /**
     * 增加元素的class;
     *
     * @param1 {String} name
     * @return my$;
     * @api public
     */
    myQuery.prototype.addClass = function(name){
        var oldClass = null;
        each(function(ele){
            oldClass = ele.className;
            if (oldClass.indexOf(name) == -1) {
                ele.className = (oldClass) ? (oldClass + " " + name) : name;
            }
        })
        return this;
    }
    /**
     * 减少元素的class;
     *
     * @param1 {String} name
     * @return my$;
     * @api public
     */
    myQuery.prototype.removeClass = function(name){
        var oldClass = null;
        var newClass = null;
        var start = 0;
        each(function(ele){
             oldClass = null;
             newClass = null;
             start = -1;
             ele && (oldClass = ele.className);
             name || (ele.className = "");
             name && oldClass && (start = oldClass.indexOf(name));
            (start != -1) && (newClass = oldClass.substring(0, start) + oldClass.substring(start + name.length + 1), ele.className = newClass)
        })
        return this;
    };
    /**
     * 获取选取的元素的属性  如结果为单个元素 返回元素属性值  多个返回数组;
     *@param1 {String} key
     * @return result;
     * @api public
     */
    myQuery.prototype.getAtt = function(key){
        var result = null;
        var results = [];
        switch(selectElementArr.length){
            case "0": result = null;break;
            case "1": result = selectElementArr[0].getAttribute(key);break;
            default :each( function(ele){
                results.push(ele.getAttribute(key));
            });
                result = results;
                break;
        }
        return result;
    };
    /**
     * 设置元素的属性;
     *
     * @param1 {String} key
     * @param1 {String} value
     * @return my$;
     * @api public
     */
    myQuery.prototype.setAtt = function(key,value){
        each(function(ele){
            ele.setAttribute(key, value);
        })

    };
    /**
     * 获取选取的元素textNode节点的值 ;
     *
     * @return result;
     * @api public
     */

    myQuery.prototype.getHtml = function(){
        var result = null;
        var results = [];
        switch(selectElementArr.length){
            case "0": result = null;break;
            case "1": result = selectElementArr[0].innerHTML;break;
            default :each( function(ele){
                results.push(ele.innerHTML);
            });
                result = results;
                break;
        }
        return result;
    };
    /**
     * 写入元素的textNode节点的值;
     *
     * @param1 {String} htmlStr
     * @param2 {Object} [suitObj] 选择合适的属性的元素 ex {"id":"aa"}
     * @return my$;
     * @api public
     */

    myQuery.prototype.html = function(htmlStr, suitObj){
        each( function(ele){
                for (var key in suitObj) {
                    var attValue = ele.getAttribute(key);
                    if (attValue  != suitObj[key]) {
                        return;
                    }
                }
            ele.innerHTML = htmlStr;

        });
        return this;

    };
    /**
     * 设置元素的value;
     *
     * @param1 {String} value
     * @return my$;
     * @api public
     */
    myQuery.prototype.val = function(value){
        each(function(ele){
            ele.setAttribute("value", value);

        })
        return this;
    };
    /**
     * 绑定自定义以及DOM事件;
     *
     * @param1 {String} where 如果为DOM事件 此为选择器表达式 自定义则为 自己定义的位置
     * @param2 {String} type  事件类型
     * @param3 {function} fun 要触发的函数
     * @return null;
     * @api public
     */
    myQuery.prototype.bind = function(where, type, fun){
        var sqEle = null;
        if (DOMEVENT[type]) {
            sqEle = this.Q(where).(this.getEle());
            sqEle.addEventListener(type, fun, true);
        }
        MYEVENT[where] = MYEVENT[where] || {};
        MYEVENT[where][type] = fun;
        return this;
    };
    /**
     * 解除自定义以及DOM事件;
     *
     * @param1 {String} where 已经注册的位置
     * @param2 {String} type  事件类型
     * @return null;
     * @api public
     */
    myQuery.prototype.unbind = function(where, type){
        var fun = null;
        var ele = null;
        if (DOMEVENT[type]) {
            fun = MYEVENT[where][type];
            fun && ( ele = this.Q(where).(this.getEle()),
                ele && ele.removeEventListener(type, fun)
                )
        }
        delete MYEVENT[where][type];
        return this;
    };
    /**
     * 触发自定义以及DOM事件;
     *
     * @param1 {String} where 已经注册的位置
     * @param2 {String} type  事件类型
     * @return null;
     * @api public
     */
    myQuery.prototype.trigger = function(where, type){
        var fun = MYEVENT[where][type];
        if (fun) {
            fun.apply(this, par);
        }
    };
    /**
     * 选取多个元素;
     *
     * @param {Object} [suitObj] 选择合适的属性的元素 ex {"id":"aa"}
     * @return my$;
     * @api public
     */
    myQuery.prototype.siblings = function(suitObj){
        var newArr = [];
        var isRight = true;
        each(function(ele){
            var preEle = ele.previousSibling;
            var nextEle = ele.nextSibling;
            var eleValue = null;
            while (preEle) {
                if (preEle.nodeType == 1) {
                    isRight = true;
                    for (var key in suitObj) {
                        eleValue = suitObj[key];
                        if (eleValue != preEle.getAttribute(key)) {
                            isRight = false;
                            break;
                        }
                    }
                    (isRight) && newArr.push(preEle);
                }
                preEle = preEle.previousSibling;
            }

            while (nextEle) {
                if (nextEle.nodeType == 1) {
                    isRight = true;
                    for (var key in suitObj) {
                        var eleValue = suitObj[key];
                        if (eleValue != nextEle.getAttribute(key)) {
                            isRight = false;
                            break;
                        }
                    }
                    (isRight) && newArr.push(nextEle);
                }
                nextEle = nextEle.nextSibling;
            }
        })
        selectElementArr = newArr;
        return this;
    };
    /**
     * 选取已经选中元素数组里特定位置的元素;
     *
     * @param1 {number} index
     * @return my$;
     * @api public
     */
    myQuery.prototype.eq = function(index){
        var newArr = [];
        selectElementArr[index] && (newArr.push(eleArr[index]), selectElementArr = newArr);
        return this;
    };
    /**
     * 选取已经选中元素数组里最后一个元素;;
     *
     * @return my$;
     * @api public
     */
    myQuery.prototype.last = function(){
        var newArr = [];
        var len = eleArr.length - 1;
        selectElementArr[len] && (newArr.push(eleArr[len]), selectElementArr = newArr);
        return this;

    };
    /**
     * 选取已经选中元素数组里 后代的元素;
     *
     * @param1 {string} sq
     * @return my$;
     * @api public
     */

    myQuery.prototype.findChild = function(sq){
        var newArr = []
        each(function(ele){
                var childEle = ele.querySelectorAll(sq);
                var childArr = [];
                if (childEle) {
                    for (var i = 0; i < childEle.length; i++) {
                        childArr.push(childEle[i]);
                    }
                }
                newArr = newArr.concat(childArr);
        })
        selectElementArr = newArr;
        return this;
    };
    /**
     * 为已经选中元素数组 加上元素;
     *
     * @param1 {Object} newEle
     * @return my$;
     * @api public
     */
    myQuery.prototype.append = function(newEle){
        each(function(ele){
            ele.appendChild(newEle);
        })
        return this;
    };
    /**
     * 移除已经选中元素数组 里的子元素;
     *
     * @param1 {Object} [removeEle] 如果有此参数 则移除此特定的元素 否则移除全部
     * @return my$;
     * @api public
     */
    myQuery.prototype.remove = function(removeEle){

       each(function(ele){
          var nodes = eleArr[i].childNodes;
          if( removeEle && (removeEle.nodeType == 1)){
            ele.removeChild(ele);
            return this;
          }
           for (var j = 0; j < nodes.length; j++) {
               nodes[j] && (nodes[j].nodeType == 1) && (ele.removeChild(nodes[j]));
           }

       })
        return this;
    };
    /**
     * 为选中数组里的元素添加动画效果;
     *
     * @param1 {Object} moveObj 需要改变的属性{"height":(+)90px};
     * @param2 {function} [callback] 动画完成以后调用的函数；
     * @param3 {number} [time] 动画完成的时间；
     * @param4 {string} [style] 动画的运动方式；
     * @param5 {number} [delaytime] 动画开始的延迟时间；
     * @return null;
     * @api public
     */

    myQuery.prototype.animate = function(moveObj,callback ,time, style, delaytime){
        var _props = moveObj || {};
        var _Ans = {};
        var _duration = time || 1000;
        var _ea = ease[style]  || 'ease';
        var _delay = delaytime || 0;
        _Ans["-webkit-transition-properties"] = 'all';
        _Ans["-webkit-transition-timing-function"] = _ea;
        _Ans["-webkit-transition-delay"] = delay + 'ms';
        _Ans["-webkit-transition-duration"] = _duration + 'ms';
        each(function(ele){
            for (var prop in _Ans) {
                var value = _Ans[prop];
                ele.style.setProperty(prop, value, '');
            }
        })
        function delayAnimate () {
            each(function(ele){
                for (var prop in _props) {
                    var value = _props[prop];
                    var str = value.substr(0, 1);
                    if (str = '+' || '-') {
                        var styleObj = window.getComputedStyle(ele, null);
                        var currentValue = styleObj.getPropertyValue(prop);
                        value = parseInt(currentValue) + parseInt(value) + 'px';
                    }
                    eleArr[i].style.setProperty(prop, value, '');
                }

            })
        };
        setTimeout(delayAnimate, 0);
        callback && setTimeout(callback, _duration);
    };



})(this)