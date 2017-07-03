class Vue {
    constructor(opts) {
        this.vTie = '';
        this.ifV = false;
        this.vueData = opts.data;
        this.id = opts.el;
        this.checkBind = ['disabled', 'readonly', 'autofocus'];
        this.app = document.querySelector(opts.el);
        this.vModel = this.app.querySelectorAll('[v-model]');
        this.vFor = this.app.querySelectorAll('[v-for]');
        if(this.vFor.length>0){
          let parent = this.vFor[0].parentNode;
          this.vParent = parent.cloneNode();
        }else {
          this.vParent = '';
        }
        this.pre = this.app.previousSibling;
        this.app2 = this.app.cloneNode();
        this.html = this.app.innerHTML;
        this.app2.innerHTML = this.html;
        this.vafter ='';
        this.vbefore ='';
        this.first = true;
        this.init();
    }
    init() {
      if(this.vModel.length > 0) {
        let vIndex = this.html.indexOf(this.vModel[0].outerHTML);
        this.vafter = this.html.substr(vIndex + this.vModel[0].outerHTML.length, this.html.length - 1);
        this.vbefore = this.html.substr(0, vIndex);
        if (this.vbefore.replace(/\s/g, '')) {
            this.html = '<div style="display:inline" id="before">' + this.vbefore + '</div>' + this.vModel[0].outerHTML;
        } else {
            this.html = this.vModel[0].outerHTML;
        }
        if (this.vafter.replace(/\s/g, '')) {
            this.html = this.html + '<div style="display:inline" id="after">' + this.vafter + '</div>';
        }
      }
      this.app.parentNode.removeChild(this.app);
      this.pre.after(this.app);
      this.change(this.html);
    }
    get data() {
        return this.vueData;
    }
    set data(value) {
        for (let porp in value) {
            this.vueData[porp] = value[porp];
        }
        this.change(this.html);
    }
    // 全局渲染
    change(html1) {
        this.app.innerHTML = this.changeDetail(html1);
        this.vModel = this.app.querySelectorAll('[data-v]')[0];
        this.vModel.addEventListener('input', (event) => {
            this.vueData[this.vTie] = event.target.value;
            this.vChange();
        });
    }
    // 双向绑定渲染
    vChange() {
        if (this.vbefore.replace(/\s/g, '')) {
            let changeHtml = this.app.querySelector('#before');
            changeHtml.innerHTML = this.changeDetail(this.vbefore);
        }
        if (this.vafter.replace(/\s/g, '')) {
            let changeHtml = this.app.querySelector('#after');
            changeHtml.innerHTML = this.changeDetail(this.vafter);
        }
    }
    // 渲染细节
    changeDetail(html1) {
        let html = html1;
        let regex = /(\{\{\s*([\w]+)\s*\}\})/g;
        while (regex.exec(html)) {
            html = html.replace(new RegExp(RegExp.$1, 'g'), this.vueData[RegExp.$2]);
        }
        let regex2 = /(v\-bind\:([\w]+)\=\"\s*([\w]+)\s*\")/g;
        while (regex2.exec(html)) {
            let bindTarget = RegExp.$2;
            let bindContent = this.vueData[RegExp.$3];
            if (this.checkBind.indexOf(bindTarget) > -1) {
                html = html.replace(new RegExp(RegExp.$1, 'g'), this.vueData[RegExp.$3]?bindTarget:'');
            } else {
                let inner = typeof(bindContent) === 'object' ? JSON.stringify(bindContent) : bindContent;
                html = html.replace(new RegExp(RegExp.$1, 'g'), RegExp.$2 + '="' + inner + '"');
            }
            regex2 = /(v\-bind\:([\w]+)\=\"\s*([\w]+)\s*\")/g;
        }
        let regex3 = /(v\-model\=\"\s*([\w]+)\s*\")/g;
        while (regex3.exec(html)) {
            this.vTie = RegExp.$2;
            html = html.replace(new RegExp(RegExp.$1, 'g'), 'value="' + this.vueData[RegExp.$2] + '"' + ' ' + 'data-v');
        }
        let res = this.forRender(html);
        html = res?res:html;
        return html;

    }

    forRender(html1) {
      if(!this.vParent) return false;
      let html = html1
      let regex4 = /(v\-for\=\"([\w]+)\s+in\s+([\w]+)\")/g
      if(!this.first) {
        if(this.vueData[outTarget].length<=this.vParent.children.length){
          console.log(123);
        }
      }
      while(regex4.exec(html)){
        let outTarget = RegExp.$3;
        let innerTarget = RegExp.$2;
        let wholeTarget = RegExp.$1;
        let parent = this.vFor[0].parentNode;
        let parentOutHtml = parent.outerHTML;
        let parentHtml = parent.innerHTML;
        let fIndex = html.indexOf(parentOutHtml);
        let preHtml = html.substr(0,fIndex);
        let afterHtml = html.substr(fIndex + parentOutHtml.length,html.length-1)
        for(let i = 0;i< this.vueData[outTarget].length-1 ;i++) {
          parentHtml += this.vFor[0].outerHTML;
        }
        parentHtml = parentHtml.replace(new RegExp(wholeTarget, 'g'),'');
        let regex = /(\{\{\s*([\w]+)\.([\w]+)\s*\}\})/g;
        let index = 0;
        while(regex.exec(parentHtml)) {
          let target = this.vueData[outTarget];
          if(RegExp.$2 === innerTarget) {
            parentHtml = parentHtml.replace(RegExp.$1,this.vueData[outTarget][index][RegExp.$3]);
            index++;
          }
          this.vParent.innerHTML = parentHtml;
        }
        html = preHtml + this.vParent.outerHTML + afterHtml
        this.first = false;
        return html;
      };
    }
}
