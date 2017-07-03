class Vue {
    constructor(opts) {
        this.$data = opts.data;
        this.$methods = opts.methods;
        this.app = document.querySelector(opts.el);
        this.clone = '';
        this.bind = {};
        this.bindItems = [];
        this.checkBind = ['disabled', 'readonly', 'autofocus'];
        this.app.remove();
        Object.assign(this, this.$data);
        this.init();
        console.log(this)
    }
    init() {
        for (var prop in this.$data) {
            this.bindItems.push(prop);
        }
        this.clone = this.mvvm(this.app);
        for (var prop in this) {
            if (this.bindItems.indexOf(prop) > -1) {
                this.addObserver(this, prop, this[prop])
            }
        }
        document.body.appendChild(this.clone)
        this.observerFactory(this.$data);
        for (var prop in this.$data) {
            this.$data[prop] = this.$data[prop];
        }

    }
    observerFactory(model) {
        var fun = ['push', 'pop', 'sort', 'reverse', 'unshift', 'shift', 'splice'];
        var _this = this;
        for (var prop in model) {
            this.addObserver(model, prop, model[prop])
            if (model[prop] instanceof Array) {
                var target = model[prop];
                fun.forEach(function(item) {
                  var _prototype = Array.prototype[item];
                  target[item] = function() {
                    var new_value = _prototype.apply(this,arguments);
                    _this.notify(model,prop,model[prop]);
                    return new_value;
                  }
                })
                // for(var j = 0;j<target.length; j++) {
                //   if (target[j] instanceof Object) {
                //     console.log(target[j]);
                //     this.observerFactory(target[j]) //递归
                //   }
                // }
            } else if (model[prop] instanceof Object) {
                this.observerFactory(model[prop]) //递归
            }
        }
    }
    addObserver(model, property, value) {
        var _this = this
        Object.defineProperty(model, property, {
            enumerable: true, //是否可枚举
            configurable: false, //是否以后还可以配置name属性
            set: function reactiveSetter(nvalue) {
                value = nvalue;
                _this.notify(model, property, value)
            },
            get: function reactiveGetter() {
                return value;
            }
        })
    }
    notify(obj, key, value) {
        var _this = this;
        console.log(777);
        if (!this.bind[key]) return;
        this.bind[key].forEach(function(node) {
            if (node.cmdType === 'text') {
                node.data = value
            } else if (node.vIf === key) {
                node.next = !node.next ? node.nextElementSibling : node.next
                if (!value) {
                    node.next = node.nextElementSibling;
                    node.remove()
                } else {
                    if (node.next) {
                        node.ref.parentNode.ref.insertBefore(node, node.next)
                    } else {
                        node.ref.parentNode.ref.appendChild(node)
                    }
                }
            } else if (node.vShow === key) {
                if (!value) {
                    node.beforeStyle = node.style.display;
                    node.style.display = "none"
                } else {
                    node.style.display = node.beforeStyle ? node.beforeStyle : "block";
                }
            }
            if (node.vBind) {
                node.vBind.forEach(function(bind) {
                    if (bind.target === key) {
                        if (_this.checkBind.indexOf(bind.attribute) > -1) {
                            if (_this.$data[bind.target]) {
                                node.setAttribute(bind.attribute, '');
                            } else {
                                node.removeAttribute(bind.attribute);
                            }
                        } else {
                            node.setAttribute(bind.attribute, _this.$data[bind.target]);
                        }
                    }
                })
            }
            if (node.vFor) {
              if(true) {
                console.log(111);
                console.log(_this.$data[key]);
                var ref = node.ref || ref;
                var parent = node.ref.parentNode.ref || parent;
                var regex = /(\{\{\s*([\w]+)\.([\w]+)\s*\}\})/g;
                node.remove();
                node.vFor.temp = node.vFor.temp || [];
                for(var k = 0 ;k<node.vFor.temp.length; k++) {
                  node.vFor.temp[k].remove()
                }
                for(var i = 0;i<_this.$data[key].length;i++) {
                  var newNode = node.vFor.temp[i] || ref.cloneNode();
                  if(node.vFor.temp[i]) {
                    newNode = node.vFor.temp[i]
                    while(regex.exec(ref.innerHTML)) {
                      if(RegExp.$2 === node.vFor.sub) {
                        newNode.innerHTML = ref.innerHTML.replace(new RegExp(RegExp.$1,'g'),_this.$data[key][i][RegExp.$3])
                      }
                    }
                  } else {
                    console.log(444);
                    newNode = ref.cloneNode(true)
                    while(regex.exec(ref.innerHTML)) {
                      if(RegExp.$2 === node.vFor.sub) {
                        newNode.innerHTML = ref.innerHTML.replace(new RegExp(RegExp.$1,'g'),_this.$data[key][i][RegExp.$3])
                      }
                    }
                    node.vFor.temp.push(newNode)
                  }
                  parent.appendChild(newNode);
                }
                if(_this.$data[key].length - node.vFor.temp.length < 0) {
                  for(var j = _this.$data[key].length ;j<node.vFor.temp.length; j++) {
                    node.vFor.temp[j].remove()
                  }
                }
              }
            }
        })
    }
    parseElement(element) {
        let attributes = element.attributes;
        if (attributes.length === 0) return;
        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].name === "v-show") {
                var m = attributes[i].value;
                this.bind[m] = this.bind[m] || [];
                this.bind[m].push(element.ref);
                element.ref.vShow = m;
                element.ref.removeAttribute(attributes[i].name)
            } else if (attributes[i].name === "v-if") {
                var m = attributes[i].value;
                this.bind[m] = this.bind[m] || [];
                this.bind[m].push(element.ref);
                element.ref.vIf = m;
                element.ref.removeAttribute(attributes[i].name);
            }
            if (/v\-bind\:[\w]+/.test(attributes[i].name)) {
                var regex2 = /(v\-bind\:([\w]+))/g;
                if (regex2.exec(attributes[i].name)) {
                    var m = attributes[i].value;
                    this.bind[m] = this.bind[m] || []
                    this.bind[m].push(element.ref)
                    element.ref.vBind = element.ref.vBind || [];
                    element.ref.vBind.push({
                        attribute: RegExp.$2,
                        target: m
                    });
                    element.ref.removeAttribute(attributes[i].name)
                }
            }
            if (/v\-on\:[\w]+/.test(attributes[i].name)) {
                var regex3 = /(v\-on\:([\w]+))\=\s*([\w]+)\s*/g;
                var regex4 = /(v\-on\:([\w]+))\=\s*([\w]+)\((.*)\)\s*/g;
                if (regex4.exec(attributes[i].name + '=' + attributes[i].value)) {
                    var m = RegExp.$3;
                    var event = RegExp.$2;
                    var arg = RegExp.$4;
                    var regex5 = /([\'\"]{0,1}\w+[\'\"]{0,1})\,{0,1}/g;
                    element.ref.parseArg = [];
                    while (regex5.exec(arg)) {
                        if (this.bindItems.indexOf(RegExp.$1) > -1) {
                            element.ref.parseArg.push({
                                target: RegExp.$1,
                                bind: true
                            });
                        } else {
                            element.ref.parseArg.push({
                                target: RegExp.$1,
                                bind: false
                            });
                        }
                    }
                    var _this = this;
                    element.ref.addEventListener(event, function(event) {
                        console.log(this.parseArg);
                        this.parseArg = this.parseArg.map((item) => {
                                if (item.bind) {
                                    return _this[item.target]
                                } else {
                                    return item.target
                                }
                            })
                            // _this.$methods[m].call(_this,_this.$data,...this.parseArg);
                    });
                } else if (regex3.exec(attributes[i].name + '=' + attributes[i].value)) {
                    var m = attributes[i].value;
                    console.log(this.$methods[m]);
                    element.ref.addEventListener(RegExp.$2, (event) => {
                        this.$methods[m].call(this, event, this.$data);
                    });
                }
            }
            if (attributes[i].name === "v-for") {
              var regex5 = /\s*(\w+)\s+in\s+(\w+)\s*/
              if(regex5.exec(attributes[i].value)) {
                this.bind[RegExp.$2] = this.bind[RegExp.$2] || [];
                this.bind[RegExp.$2].push(element.ref);
                element.ref.vFor = {bind:RegExp.$2, sub: RegExp.$1};
                element.ref.removeAttribute(attributes[i].name);
                console.log(RegExp.$1+':'+RegExp.$2);
              }
            }
        }
    }
    mvvm(node) {
        var clone = node.cloneNode(false) //复制节点 true代表深度克隆 false代表只克隆当前node
        node.ref = clone //让克隆对象和模板对象的node发生关系
        clone.ref = node
        for (var i = 0; i < node.childNodes.length; i++) {
            clone.appendChild(this.mvvm(node.childNodes[i]))
        }
        switch (node.nodeType) {
            case 1:
                this.parseElement(node) //解析元素的指令的
                break;
            case 3:
                if (/\{\{\s*(\w+)\s*\}\}/.exec(node.data)) {
                    this.bind[RegExp.$1] = this.bind[RegExp.$1] || []
                    this.bind[RegExp.$1].push(node.ref)
                    node.ref.cmdType = 'text'
                }
                break;
            default:

        }
        return clone
    }
}
