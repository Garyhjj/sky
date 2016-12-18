var goods = [
    {
        "id": 'A101',
        "goodsImg": "../img/product/1.jpg",
        "goosTitle": "乐视 乐max2 智能手机 4G双卡双待",
        "size": "全网通(6G+64G)标配",
        "original": "2239",
        "price": "1879",
        "num": '1',
        "checked": true
    },
    {
        "id": 'A102',
        "goodsImg": "../img/product/2.jpg",
        "goosTitle": "锤子（smartisan）M1 智能手机 4G双卡双待 咖啡金(皮革)",
        "size": "全网通(4G+32G)标配",
        "original": "1399",
        "price": "2699",
        "num": '1',
        "checked": true
    },
    {
        "id": 'A103',
        "goodsImg": "../img/product/3.jpg",
        "goosTitle": "华为 Mate 8 3GB+32GB版 苍穹灰 移动联通电信4G手机",
        "size": "移动联通电信4G",
        "original": "1099",
        "price": "2799",
        "num": '1',
        "checked": true
    }
];

var vm = new Vue({
    el: '#buyCar',
    data: {
        goods: goods,
        checkname: [],
        total: 0,
        allCount: 0,
        check1:true
    },
    computed: {
        total: function () {
            var temptotal = 0;

            for (var i=0; i< goods.length; i++){
              if(goods[i].checked){
                temptotal = temptotal + parseInt(goods[i].price * goods[i].num);
              }
            }

            return temptotal;
        },
        allCount: function(){
            var tempallCount = 0;

            for (var i=0; i< goods.length; i++){
              if(goods[i].checked){
                tempallCount++;
              }
            }
            return tempallCount;
        },
        checkname: function(){
          var checkedSpec = [];
          for (var i=0; i< goods.length; i++){
            if(goods[i].checked){
              checkedSpec.push(i);
            }
          }
          return checkedSpec;
        }
    },
    methods: {
      dell: function($index){
        if(goods.length>1){
          goods[$index].num =0;
          goods[$index].checked = false;
        }
        goods.splice($index, 1);
      },
        add: function($index){
            goods[$index].num ++;
        },
        minus: function($index){
            if(goods[$index].num > 0){
                goods[$index].num --;
            }
        },
        del: function($index){

          this.dell($index);
        },
        clearAll: function(){
            goods.splice(0, goods.length);
            //goods = [];
        },
        selectAll: function(){
            this.check1 = !this.check1;
            this.checkname = [];
            if(this.check1){
              for( var i=0; i<goods.length; i++){
                     this.checkname.push(String(i));
                     goods[i].checked =true;
              }
            }else{
              this.checkname = [];
              for( var i=0; i<goods.length; i++){
                  goods[i].checked =false;
              }
            }

        },
        delall: function(){
          console.log(this.checkname);
          var temCheck = this.checkname.slice();
          for(var i = 0; i < temCheck.length; i++){
            var delSite = temCheck[i]-i;
              this.dell(delSite);
          }
          this.$emit('clearCheckName');
      },
      checkClick: function(index){
        goods[index].checked = ! goods[index].checked;
        this.check1 = this.checkname.length == goods.length? true : false;

      }


    },
    events: {
        clearCheckName: function(){
            this.checkname = [];
        }
    }
});
