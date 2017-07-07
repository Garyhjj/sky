webpackJsonp([1,4],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_service_chart_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(94);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicChartComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BasicChartComponent = (function () {
    function BasicChartComponent(chartService, formBuilder) {
        this.chartService = chartService;
        this.formBuilder = formBuilder;
        this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.showWhere = 0;
        this.basicData = {
            reasonType: '34456'
        };
        this.hasSwich = false;
        this.myOption = '';
        this.colors = this.chartService.colors;
    }
    BasicChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.basicTodo = this.initWork();
        this.titleChange();
        this.basicTodo.controls['series_l'].valueChanges.subscribe(function (value) {
            _this.changeSeries(value);
        });
        this.basicTodo.controls['colors'].valueChanges.subscribe(function (val) {
            _this.getDetail({
                type: 100,
                detail: {
                    color: val
                }
            });
        });
    };
    //初始化原始數據
    BasicChartComponent.prototype.initWork = function (work) {
        if (work === void 0) { work = {}; }
        return this.formBuilder.group({
            series_l: [1, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            title: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            legend_data: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            xAxis_data: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            series: this.formBuilder.array([
                this.formBuilder.control('')
            ]),
            seriesType: this.formBuilder.array([
                this.formBuilder.control('bar')
            ]),
            yAxisIndex: this.formBuilder.array([
                this.formBuilder.control(0)
            ]),
            colors: this.formBuilder.array([
                this.formBuilder.control(this.colors[0])
            ]),
        });
    };
    BasicChartComponent.prototype.isDoubleY = function (e) {
        this._isDoubleY = e.target.checked;
    };
    BasicChartComponent.prototype.isRoseType = function (e) {
        this._isRoseType = e.target.checked;
        this.getDetail({
            type: 97, detail: {
                roseType: this._isRoseType
            }
        });
    };
    BasicChartComponent.prototype.isPie = function (e) {
        this._isPie = e.target.checked;
    };
    BasicChartComponent.prototype.changeDetail = function (option) {
        this.myChart && this.myChart.setOption(option);
        this.myOption = option;
    };
    BasicChartComponent.prototype.getDetail = function (del) {
        var optionAll = this.getOption();
        if (!optionAll)
            return;
        var option = optionAll.baseOption ? optionAll.baseOption : optionAll;
        var media = optionAll.media ? optionAll.media : [];
        switch (del.type) {
            case 0:
                _a = [option.xAxis, option.yAxis], option.yAxis = _a[0], option.xAxis = _a[1];
                this.hasSwich = !this.hasSwich;
                break;
            case 1:
                Object.assign(option, del.detail);
                break;
            case 8:
                if (this.hasSwich) {
                    Object.assign(option.yAxis[0], del.detail);
                }
                else {
                    Object.assign(option.xAxis[0], del.detail);
                }
                break;
            case 9:
                if (this.hasSwich) {
                    Object.assign(option.xAxis[0], del.detail);
                }
                else {
                    Object.assign(option.yAxis[0], del.detail);
                }
                break;
            case 10:
                if (this._isDoubleY) {
                    if (this.hasSwich) {
                        Object.assign(option.xAxis[1], del.detail);
                    }
                    else {
                        Object.assign(option.yAxis[1], del.detail);
                    }
                }
                break;
            case 11:
                Object.assign(option.series[0], del.detail);
                break;
            case 12:
                if (del.detail) {
                    var query = [
                        {
                            query: {
                                maxWidth: 2560,
                            },
                            option: {
                                dataZoom: [{
                                        type: 'inside',
                                        disabled: true,
                                        start: 1,
                                        end: 100
                                    }]
                            }
                        },
                        {
                            query: {
                                maxWidth: 420,
                            },
                            option: {
                                dataZoom: [{
                                        type: 'inside',
                                        disabled: false,
                                        xAxisIndex: [0],
                                        start: 1,
                                        end: 35
                                    }]
                            }
                        }
                    ];
                    media = media.concat(query);
                }
                else {
                    var query = [
                        {
                            query: {
                                maxWidth: 420,
                            },
                            option: {
                                dataZoom: [{
                                        type: 'inside',
                                        disabled: true,
                                        xAxisIndex: [0],
                                        start: 1,
                                        end: 100
                                    }]
                            }
                        }
                    ];
                    media = media.concat(query);
                }
                break;
            case 97:
                option.series[0] = del.detail;
                break;
            case 98:
                option.yAxis[1] = del.detail;
                break;
            case 99:
                option.yAxis[0] = del.detail;
                break;
            default:
                Object.assign(option, del.detail);
                break;
        }
        if (media.length > 0) {
            optionAll = {
                baseOption: option,
                media: media
            };
        }
        else {
            optionAll = option;
        }
        this.changeDetail(optionAll);
        var _a;
    };
    BasicChartComponent.prototype.changeSeries = function (value) {
        var num_c = Number(value);
        var num_now = this.basicTodo.controls['series'].length;
        var change = ['series', 'seriesType', 'yAxisIndex', 'colors'];
        if (num_now < num_c) {
            for (var i = 0; i < num_c - num_now; i++) {
                for (var y = 0; y < change.length; y++) {
                    var arr = this.basicTodo.controls[change[y]];
                    var def = '';
                    switch (y) {
                        case 1:
                            def = 'bar';
                            break;
                        case 2:
                            def = '0';
                            break;
                        case 3:
                            def = this.colors[i + 1];
                            break;
                    }
                    ;
                    arr.push(this.formBuilder.control(def));
                }
            }
        }
        else if (num_now > num_c) {
            for (var i = 0; i < -(num_c - num_now); i++) {
                for (var y = 0; y < change.length; y++) {
                    var arr = this.basicTodo.controls[change[y]];
                    arr.removeAt(arr.length - 1);
                }
            }
        }
    };
    BasicChartComponent.prototype.initBasic = function () {
        console.log(this.basicTodo.value);
        if (this.myChart) {
            this.myChart.clear();
        }
        ;
        var title = this.basicTodo.value.title;
        var legend_data = this.basicTodo.value.legend_data.split(',');
        var xAxis_data = this.basicTodo.value.xAxis_data.split(',');
        var color = this.basicTodo.value.colors;
        if (this._isPie) {
            this.myOption = this.initPie(title, legend_data, xAxis_data, color);
            this.myChart = this.chartService.makeChart('main2', this.myOption);
        }
        else {
            this.myOption = this.initNotPie(title, legend_data, xAxis_data, color);
            this.myChart = this.chartService.makeChart('main1', this.myOption);
        }
        console.log(this.myChart);
    };
    BasicChartComponent.prototype.initNotPie = function (title, legend_data, xAxis_data, color) {
        var series = [];
        for (var i = 0; i < this.basicTodo.controls['series'].length; i++) {
            var tempSeries = this.basicTodo.controls['series'].controls[i];
            var data = tempSeries.value.split(',');
            data = data.map(function (value) {
                return { value: value };
            });
            series.push({
                name: legend_data[i],
                type: this.basicTodo.controls['seriesType'].controls[i].value,
                yAxisIndex: this.basicTodo.controls['yAxisIndex'].controls[i].value,
                data: data
            });
        }
        ;
        var option2 = this.chartService.initDoubleYChart(title, {
            legend_data: legend_data,
            xAxis_data: xAxis_data,
            series: series
        });
        option2.color = color;
        if (!this._isDoubleY) {
            option2.yAxis = [{ type: 'value' }];
        }
        if (this.hasSwich) {
            _a = [option2.xAxis, option2.yAxis], option2.yAxis = _a[0], option2.xAxis = _a[1];
        }
        // option2.tooltip.formatter = "{b} <br/>{a} : {c}";
        return option2;
        var _a;
    };
    BasicChartComponent.prototype.initPie = function (title, legend_data, xAxis_data, color) {
        var allData = [];
        for (var i = 0; i < this.basicTodo.controls['series'].length; i++) {
            var tempSeries = this.basicTodo.controls['series'].controls[i];
            allData.push(Number(tempSeries.value));
        }
        allData = allData.map(function (value, index) {
            return { value: value, name: legend_data[index] };
        });
        var option = this.chartService.initPieChart(title, {
            legend_data: legend_data,
            series: [{
                    name: xAxis_data[0], data: allData
                }]
        });
        option.color = color;
        if (this.isRoseType) {
            option.series[0].roseType = true;
        }
        return option;
    };
    BasicChartComponent.prototype.titleChange = function () {
        var _this = this;
        this.basicTodo.controls['title'].valueChanges.subscribe(function (value) {
            if (!_this.myChart)
                return;
            _this.myChart.setOption({
                title: {
                    text: value
                }
            });
        });
    };
    BasicChartComponent.prototype.getOption = function () {
        return this.myOption;
    };
    BasicChartComponent.prototype.changeSize = function (size, point) {
        var mySize = size.value.split('*');
        var style = this.myPhone.nativeElement.style;
        if (Number(mySize[0]) && Number(mySize[1])) {
            if (!point) {
                style.height = Number(mySize[0]) + 'px';
                style.width = Number(mySize[1]) + 'px';
            }
            else {
                style.height = Number(mySize[1]) + 'px';
                style.width = Number(mySize[0]) + 'px';
            }
        }
        this.myChart && this.myChart.resize();
    };
    BasicChartComponent.prototype.selectPhone = function (value) {
        this.sizeInput.nativeElement.value = value;
    };
    BasicChartComponent.prototype.dealCode = function (val) {
        var opt = '';
        try {
            opt = JSON.parse(val);
        }
        catch (e) {
            console.log(e);
        }
        if (!opt)
            return;
        this.myOption = opt;
        this.myChart && this.myChart.setOption(opt);
    };
    BasicChartComponent.prototype.firstAdd = function (e) {
        this.getDetail({
            type: 99,
            detail: this.percentAdd(e.target.checked)
        });
    };
    BasicChartComponent.prototype.secondAdd = function (e) {
        this.getDetail({
            type: 98,
            detail: this.percentAdd(e.target.checked)
        });
    };
    BasicChartComponent.prototype.percentAdd = function (checkd) {
        var del = {};
        if (checkd) {
            del = {
                axisLabel: {
                    formatter: '{value} %'
                }
            };
        }
        else {
            del = {
                axisLabel: {
                    formatter: '{value}'
                }
            };
        }
        return del;
    };
    BasicChartComponent.prototype.showOption = function () {
        console.log(JSON.stringify(this.myOption));
    };
    return BasicChartComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('phone'),
    __metadata("design:type", Object)
], BasicChartComponent.prototype, "myPhone", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])('size'),
    __metadata("design:type", Object)
], BasicChartComponent.prototype, "sizeInput", void 0);
BasicChartComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-basic-chart',
        template: __webpack_require__(551),
        styles: [__webpack_require__(548)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_service_chart_service__["a" /* ChartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_service_chart_service__["a" /* ChartService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */]) === "function" && _b || Object])
], BasicChartComponent);

var _a, _b;
//# sourceMappingURL=basic-chart.component.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_service_chart_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(94);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailDefineComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DetailDefineComponent = (function () {
    function DetailDefineComponent(chartService, formBuilder) {
        this.chartService = chartService;
        this.formBuilder = formBuilder;
        this.changeDetail = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* EventEmitter */]();
        this.fontSize = [];
        this.myHeight = [];
        this.myRotate = [];
    }
    DetailDefineComponent.prototype.ngOnInit = function () {
        // this.changeDetail.emit('1');
        for (var i = 0; i < 50; i++) {
            this.fontSize.push(i);
        }
        for (var i = 0; i < 101; i++) {
            this.myHeight.push(i);
        }
        for (var i = 0; i < 361; i++) {
            this.myRotate.push(i);
        }
        this.detailTodo = this.initWork();
        this.signSubscribe();
        // this.chartSub = this.chartService.chartTerms.subscribe((val) =>{
        //
        // })
    };
    DetailDefineComponent.prototype.ngOnDestroy = function () {
        this.chartSub.unsubscribe();
    };
    DetailDefineComponent.prototype.signSubscribe = function () {
        this.switchChange();
        this.legend_orientChange();
        this.legend_positionChange();
        this.legend_fontSizeChange();
        this.title_positionChange();
        this.title_fontSizeChange();
        this.grid_positionChange();
        this.grid_heightChange();
        this.xAxisLabel_fontSizeChange();
        this.yAxisLabel1_fontSizeChange();
        this.yAxisLabel2_fontSizeChange();
        this.xAxisLabel_rotateChange();
        this.yAxisLabel1_rotateChange();
        this.yAxisLabel2_rotateChange();
        this.pie_positionChange();
        this.pie_radiusChange();
        this.scaleChange();
    };
    //初始化原始數據
    DetailDefineComponent.prototype.initWork = function (work) {
        if (work === void 0) { work = {}; }
        return this.formBuilder.group({
            switch: [false, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            scale: [false, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            title_position: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            title_fontSize: [18, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            legend_orient: ['horizontal', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            legend_position: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            legend_fontSize: [18, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            grid_position: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            grid_height: [90, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            xAxisLabel_fontSize: [18, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            yAxisLabel1_fontSize: [18, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            yAxisLabel2_fontSize: [18, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            xAxisLabel_rotate: [0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            yAxisLabel1_rotate: [0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            yAxisLabel2_rotate: [0, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            pie_position: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
            pie_radius: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* Validators */].required],
        });
    };
    DetailDefineComponent.prototype.switchChange = function () {
        var _this = this;
        this.detailTodo.controls['switch'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 0,
                detail: ''
            });
        });
    };
    DetailDefineComponent.prototype.legend_orientChange = function () {
        var _this = this;
        this.detailTodo.controls['legend_orient'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 1,
                detail: {
                    legend: {
                        orient: val,
                    },
                }
            });
        });
    };
    DetailDefineComponent.prototype.legend_positionChange = function () {
        var _this = this;
        this.detailTodo.controls['legend_position'].valueChanges.subscribe(function (val) {
            var temp = val.split(',');
            var position = _this.makePosition(temp);
            _this.changeDetail.emit({
                type: 2,
                detail: {
                    legend: position
                }
            });
        });
    };
    DetailDefineComponent.prototype.legend_fontSizeChange = function () {
        var _this = this;
        this.detailTodo.controls['legend_fontSize'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 3,
                detail: {
                    legend: {
                        textStyle: {
                            fontSize: val
                        }
                    },
                }
            });
        });
    };
    DetailDefineComponent.prototype.title_positionChange = function () {
        var _this = this;
        this.detailTodo.controls['title_position'].valueChanges.subscribe(function (val) {
            var temp = val.split(',');
            var position = _this.makePosition(temp);
            _this.changeDetail.emit({
                type: 4,
                detail: {
                    title: position
                }
            });
        });
    };
    DetailDefineComponent.prototype.title_fontSizeChange = function () {
        var _this = this;
        this.detailTodo.controls['title_fontSize'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 5,
                detail: {
                    title: {
                        textStyle: {
                            fontSize: val
                        }
                    },
                }
            });
        });
    };
    DetailDefineComponent.prototype.grid_positionChange = function () {
        var _this = this;
        this.detailTodo.controls['grid_position'].valueChanges.subscribe(function (val) {
            var temp = val.split(',');
            var position = {};
            switch (temp.length) {
                case 1:
                    position = {
                        top: temp[0] + '%',
                    };
                    break;
                case 2:
                    position = {
                        top: temp[0] + '%',
                        left: temp[1] + '%',
                    };
                    break;
                case 3:
                    position = {
                        top: temp[0] + '%',
                        left: temp[1] + '%',
                        bottom: temp[2] + '%',
                    };
                    break;
                default:
                    position = {
                        top: temp[0] + '%',
                        left: temp[1] + '%',
                        bottom: temp[2] + '%',
                        right: temp[3] + '%',
                    };
                    break;
            }
            _this.changeDetail.emit({
                type: 6,
                detail: {
                    grid: position
                }
            });
        });
    };
    DetailDefineComponent.prototype.grid_heightChange = function () {
        var _this = this;
        this.detailTodo.controls['grid_height'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 7,
                detail: {
                    grid: {
                        height: val + '%'
                    },
                }
            });
        });
    };
    DetailDefineComponent.prototype.xAxisLabel_fontSizeChange = function () {
        var _this = this;
        this.detailTodo.controls['xAxisLabel_fontSize'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 8,
                detail: {
                    axisLabel: {
                        textStyle: {
                            fontSize: val
                        }
                    }
                }
            });
        });
    };
    DetailDefineComponent.prototype.yAxisLabel1_fontSizeChange = function () {
        var _this = this;
        this.detailTodo.controls['yAxisLabel1_fontSize'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 9,
                detail: {
                    axisLabel: {
                        textStyle: {
                            fontSize: val
                        }
                    }
                }
            });
        });
    };
    DetailDefineComponent.prototype.yAxisLabel2_fontSizeChange = function () {
        var _this = this;
        this.detailTodo.controls['yAxisLabel2_fontSize'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 10,
                detail: {
                    axisLabel: {
                        textStyle: {
                            fontSize: val
                        }
                    }
                }
            });
        });
    };
    DetailDefineComponent.prototype.xAxisLabel_rotateChange = function () {
        var _this = this;
        this.detailTodo.controls['xAxisLabel_rotate'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 8,
                detail: {
                    axisLabel: {
                        rotate: val
                    }
                }
            });
        });
    };
    DetailDefineComponent.prototype.yAxisLabel1_rotateChange = function () {
        var _this = this;
        this.detailTodo.controls['yAxisLabel1_rotate'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 9,
                detail: {
                    axisLabel: {
                        rotate: val
                    }
                }
            });
        });
    };
    DetailDefineComponent.prototype.yAxisLabel2_rotateChange = function () {
        var _this = this;
        this.detailTodo.controls['yAxisLabel2_rotate'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 10,
                detail: {
                    axisLabel: {
                        rotate: val
                    }
                }
            });
        });
    };
    DetailDefineComponent.prototype.pie_positionChange = function () {
        var _this = this;
        this.detailTodo.controls['pie_position'].valueChanges.subscribe(function (val) {
            var arr = val.split(',');
            _this.changeDetail.emit({
                type: 11,
                detail: {
                    center: [arr.length > 1 && arr[1] ? arr[1] + '%' : '50%', arr[0] + '%'],
                }
            });
        });
    };
    DetailDefineComponent.prototype.pie_radiusChange = function () {
        var _this = this;
        this.detailTodo.controls['pie_radius'].valueChanges.subscribe(function (val) {
            var arr = val.split(',');
            _this.changeDetail.emit({
                type: 11,
                detail: {
                    radius: [arr.length > 1 && arr[1] ? arr[1] + '%' : '0%', arr[0] + '%'],
                }
            });
        });
    };
    DetailDefineComponent.prototype.scaleChange = function () {
        var _this = this;
        this.detailTodo.controls['scale'].valueChanges.subscribe(function (val) {
            _this.changeDetail.emit({
                type: 12,
                detail: val
            });
        });
    };
    DetailDefineComponent.prototype.makePosition = function (data) {
        var position = {};
        if (data.length > 1) {
            position = {
                top: data[0] + '%',
                left: data[1] + '%'
            };
        }
        else {
            position = {
                top: data[0] + '%',
            };
        }
        return position;
    };
    return DetailDefineComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Boolean)
], DetailDefineComponent.prototype, "isDoubleY", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Boolean)
], DetailDefineComponent.prototype, "isPie", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* Output */])(),
    __metadata("design:type", Object)
], DetailDefineComponent.prototype, "changeDetail", void 0);
DetailDefineComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-detail-define',
        template: __webpack_require__(552),
        styles: [__webpack_require__(549)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_service_chart_service__["a" /* ChartService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_service_chart_service__["a" /* ChartService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormBuilder */]) === "function" && _b || Object])
], DetailDefineComponent);

var _a, _b;
//# sourceMappingURL=detail-define.component.js.map

/***/ }),

/***/ 236:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 236;


/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(248);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basic_chart_basic_chart_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_define_detail_define_component__ = __webpack_require__(145);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', redirectTo: 'basic',
        pathMatch: 'full' },
    { path: 'basic', component: __WEBPACK_IMPORTED_MODULE_2__basic_chart_basic_chart_component__["a" /* BasicChartComponent */] },
    { path: 'detail', component: __WEBPACK_IMPORTED_MODULE_3__detail_define_detail_define_component__["a" /* DetailDefineComponent */] },
    { path: '**', pathMatch: 'full', redirectTo: 'BasicChartComponent' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(550),
        styles: [__webpack_require__(547)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__basic_chart_basic_chart_component__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__detail_define_detail_define_component__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_service_chart_service__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_directive_Bmap_directive__ = __webpack_require__(247);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__basic_chart_basic_chart_component__["a" /* BasicChartComponent */],
            __WEBPACK_IMPORTED_MODULE_7__detail_define_detail_define_component__["a" /* DetailDefineComponent */],
            __WEBPACK_IMPORTED_MODULE_9__shared_directive_Bmap_directive__["a" /* MyBMapDirective */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing__["a" /* AppRoutingModule */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__shared_service_chart_service__["a" /* ChartService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(18);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyBMapDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MyBMapDirective = (function () {
    function MyBMapDirective(el) {
        this.el = el;
    }
    MyBMapDirective.prototype.ngAfterViewInit = function () {
        window['initBaidu'] = this.initBaidu;
        window['myEl'] = this;
        if (document.querySelector('script[baiduM]')) {
            this.initBaidu();
        }
        else {
            this.loadJScript();
        }
    };
    MyBMapDirective.prototype.loadJScript = function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.setAttribute('baiduM', '1');
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=rECGU9AZLOa1SkguIO1UvN08de7kECrL&callback=initBaidu";
        document.body.appendChild(script);
    };
    MyBMapDirective.prototype.initBaidu = function () {
        var _this = window['myEl'];
        var BMap = window['BMap'];
        var opts = { offset: new BMap.Size(100, 20) };
        var map = new BMap.Map(_this.el.nativeElement); // 创建地图实例
        map.addControl(new BMap.NavigationControl());
        map.addControl(new BMap.ScaleControl(opts));
        map.addControl(new BMap.OverviewMapControl());
        map.addControl(new BMap.MapTypeControl());
        map.addControl(new BMap.GeolocationControl());
        map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
        var point = new ((_a = BMap.Point).bind.apply(_a, [void 0].concat(_this.pos)))(); // 创建点坐标
        map.centerAndZoom(point, 20); // 初始化地图，设置中心点坐标和地图级别
        var _a;
        //      var geolocation = new BMap.Geolocation();  //实例化浏览器定位对象。
        //      console.log(geolocation)
        //  //下面是getCurrentPosition方法。调用该对象的getCurrentPosition()，与HTML5不同的是，这个方法原型是getCurrentPosition(callback:function[, options: PositionOptions])，也就是说无论成功与否都执行回调函数1，第二个参数是关于位置的选项。 因此能否定位成功需要在回调函数1中自己判断。
        // geolocation.getCurrentPosition(function(r){   //定位结果对象会传递给r变量
        //     // if(this.getStatus() == 'BMAP_STATUS_SUCCESS'){  //通过Geolocation类的getStatus()可以判断是否成功定位。
        //     //     var mk = new BMap.Marker(r.point);    //基于定位的这个点的点位创建marker
        //     //     map.addOverlay(mk);    //将marker作为覆盖物添加到map地图上
        //     //     map.panTo(r.point);   //将地图中心点移动到定位的这个点位置。注意是r.point而不是r对象。
        //     //     alert('您的位置：'+r.point.lng+','+r.point.lat);  //r对象的point属性也是一个对象，这个对象的lng属性表示经度，lat属性表示纬度。
        //     // }
        //     // else {
        //     //     alert('failed'+this.getStatus());
        //     // }
        //     console.log(r)
        // },{enableHighAccuracy: true})
    };
    return MyBMapDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Input */])(),
    __metadata("design:type", Array)
], MyBMapDirective.prototype, "pos", void 0);
MyBMapDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Directive */])({ selector: '[myBMap]' }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* ElementRef */]) === "function" && _a || Object])
], MyBMapDirective);

var _a;
//# sourceMappingURL=Bmap.directive.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(62)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(62)();
// imports


// module
exports.push([module.i, ".chartOut {\r\n  margin-left: 10px;\r\n  margin-top: 10px;\r\n  height:736px;\r\n  width:414px;\r\n  border:1px solid #888;\r\n}\r\n.chart{\r\n  width: 100%;\r\n  height:47%;\r\n  min-height: 250px;\r\n  margin-bottom: 5%;\r\n}\r\n.myForm {\r\n  height:600px;\r\n  overflow-y: scroll;\r\n  overflow-x: hidden;\r\n}\r\n.box {\r\n  margin-left: 10px;\r\n  margin-top: 10px;\r\n}\r\n.hide{\r\n  display: none;\r\n}\r\n.show {\r\n  display: block;\r\n}\r\n.nav-tabs {\r\n  margin-bottom: 10px;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(62)();
// imports


// module
exports.push([module.i, ".myForm {\r\n  height:600px;\r\n  overflow-y: scroll;\r\n  overflow-x: hidden;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 550:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\" role=\"navigation\">\r\n  <div class=\"container-fluid\">\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class=\"navbar-header\">\r\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n        <span class=\"sr-only\">Toggle navigation</span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n      </button>\r\n      <a class=\"navbar-brand\" href=\"#\">报表设计</a>\r\n    </div>\r\n  </div><!-- /.container-fluid -->\r\n</nav>\r\n<ul class=\"nav nav-tabs\">\r\n  <li role=\"presentation\" routerLinkActive='active' ><a routerLink=\"basic\">基本表格</a></li>\r\n  <!-- <li role=\"presentation\" routerLinkActive='active' ><a routerLink=\"detail\">细节</a></li> -->\r\n</ul>\r\n<router-outlet></router-outlet>\r\n"

/***/ }),

/***/ 551:
/***/ (function(module, exports) {

module.exports = "<div class=\"row box\">\r\n  <div class=\"col-xs-5\">\r\n    <ul class=\"nav nav-tabs\">\r\n      <li role=\"presentation\" [class.active]=\"showWhere === 0 \"><a (click)=\"showWhere = 0\">基本定义</a></li>\r\n      <li role=\"presentation\" [class.active]=\"showWhere === 1 \"><a (click)=\"showWhere = 1\">细节操作</a></li>\r\n      <li role=\"presentation\" [class.active]=\"showWhere === 2 \"><a (click)=\"getOption();showWhere = 2\">代码操作</a></li>\r\n    </ul>\r\n    <div class=\"hide\" [class.show]=\"showWhere == 2\">\r\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"showOption()\">输出配置到控制台</button>\r\n      <div class=\"form-group\">\r\n        <label for=\"title\">配置内容</label>\r\n        <textarea class=\"form-control\" rows=\"40\" [value] =\"myOption | json \" #code1 (input)=\"dealCode(code1.value)\"></textarea>\r\n      </div>\r\n      <div class=\"chart\" myBMap [pos]=\"[113.13402564, 23.03509484]\">\r\n\r\n      </div>\r\n    </div>\r\n    <div class=\"hide\" [class.show]=\"showWhere == 1\">\r\n      <app-detail-define (changeDetail)=\"getDetail($event)\" [isDoubleY]=\"_isDoubleY\" [isPie]=\"_isPie\"></app-detail-define>\r\n    </div>\r\n    <div class=\"hide\" [class.show]=\"showWhere == 0\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-3\">\r\n          <label>\r\n          <input type=\"checkbox\" id=\"checkboxSuccess\" value=\"1\" (change) =\"isPie($event)\">\r\n          饼图\r\n          </label>\r\n        </div>\r\n        <div class=\"col-xs-3\" *ngIf=\"_isPie\">\r\n          <label>\r\n          <input type=\"checkbox\" id=\"checkbox\" value=\"1\" (change) =\"isRoseType($event)\">\r\n          南丁格尔图\r\n          </label>\r\n        </div>\r\n        <div class=\"col-xs-3\" *ngIf=\"!_isPie\">\r\n          <label>\r\n          <input type=\"checkbox\" id=\"checkbox\" value=\"1\" (change) =\"isDoubleY($event)\">\r\n          双纵坐标\r\n          </label>\r\n        </div>\r\n        <div class=\"col-xs-3\" *ngIf=\"!_isPie\">\r\n          <label>\r\n          <input type=\"checkbox\" id=\"checkbox\" value=\"1\" (change) =\"firstAdd($event)\">\r\n          第一纵坐标加%\r\n          </label>\r\n        </div>\r\n        <div class=\"col-xs-3\" *ngIf=\"!_isPie && _isDoubleY\">\r\n          <label>\r\n          <input type=\"checkbox\" id=\"checkbox\" value=\"1\" (change) =\"secondAdd($event)\">\r\n          第二纵坐标加%\r\n          </label>\r\n        </div>\r\n      </div>\r\n\r\n      <form [formGroup]=\"basicTodo\" *ngIf=\"basicTodo\" class=\"myForm\">\r\n        <div class=\"form-group\">\r\n          <label for=\"unit\">数据系列数</label>\r\n          <select class=\"form-control\" id=\"unit\" formControlName=\"series_l\">\r\n          <option *ngFor=\"let item of items\" [value]=\"item\">{{item}}</option>\r\n        </select>\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"title\">图表名称</label>\r\n          <input type=\"text\" class=\"form-control\" id=\"title\" placeholder=\"\" formControlName=\"title\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"legend_data\">数据类名</label>\r\n          <input type=\"text\" class=\"form-control\" id=\"legend_data\" placeholder=\"类名之间请用英文逗号分开\" formControlName=\"legend_data\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <label for=\"xAxis_data\">{{_isPie?'数据名称':'横坐标名称'}}</label>\r\n          <input type=\"text\" class=\"form-control\" id=\"xAxis_data\" [placeholder]=\"_isPie?'':'数据之间请用英文逗号分开'\" formControlName=\"xAxis_data\">\r\n        </div>\r\n        <div class=\"row\">\r\n          <div class=\"col-xs-5\">\r\n            <div formArrayName=\"series\">\r\n              <div class=\"form-group\" *ngFor=\"let ctrl of basicTodo.controls['series'].controls; let i = index;\">\r\n                <label [for]=\"'series'+i\">数据类名{{i+1}}数据</label>\r\n                <input type=\"text\" class=\"form-control\" [id]=\"'series'+i\" [placeholder]=\"_isPie?'':'数据之间请用英文逗号分开'\" [formControlName]=\"i\">\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-3\" *ngIf=\"!_isPie\">\r\n            <div formArrayName=\"seriesType\" >\r\n              <div class=\"form-group\" *ngFor=\"let ctrl of basicTodo.controls['seriesType'].controls; let i = index;\">\r\n                <label [for]=\"'seriesType'+i\">图表类型</label>\r\n                <select class=\"form-control\" [id]=\"'series'+i\" [formControlName]=\"i\">\r\n              <option  value=\"bar\">柱状图</option>\r\n              <option  value=\"line\">折线图</option>\r\n            </select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-2\" *ngIf=\"!_isPie && _isDoubleY\">\r\n            <div formArrayName=\"yAxisIndex\" >\r\n              <div class=\"form-group\" *ngFor=\"let ctrl of basicTodo.controls['yAxisIndex'].controls; let i = index;\">\r\n                <label [for]=\"'yAxisIndex'+i\">所属纵坐标</label>\r\n                <select class=\"form-control\" [id]=\"'yAxisIndex'+i\" [formControlName]=\"i\">\r\n              <option  value=\"0\">左边</option>\r\n              <option  value=\"1\">右边</option>\r\n            </select>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xs-2\">\r\n            <div formArrayName=\"colors\">\r\n              <div class=\"form-group\" *ngFor=\"let ctrl of basicTodo.controls['colors'].controls; let i = index;\">\r\n                <label [for]=\"'colors'+i\">颜色</label>\r\n                <input class=\"form-control\" type=\"color\" name=\"favcolor\" [formControlName]=\"i\"/>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <button type=\"submit\" class=\"btn btn-default\" (click)=\"initBasic()\">重置并绘图</button>\r\n      </form>\r\n    </div>\r\n    </div>\r\n  <div class=\"col-xs-7\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-3 form-inline\">\r\n        <div class=\"form-group\">\r\n          <label for=\"type\">手机型号</label>\r\n          <select class=\"form-control\" id=\"type\" value=\"736*414\" #youPhone (change)=\"selectPhone(youPhone.value);changeSize(size,point.checked)\">\r\n            <option  value=\"736*414\">iphone6 Plus</option>\r\n            <option  value=\"1024*768\">ipad</option>\r\n            <option  value=\"667*375\">iphone6</option>\r\n            <option  value=\"568*320\">iphone5</option>\r\n            <option  value=\"480*320\">iphone4</option>\r\n            <option  value=\"1280*800\">Nexus 10</option>\r\n            <option  value=\"731*411\">Nexus 5X</option>\r\n            <option  value=\"773*435\">Nexus 6P</option>\r\n            <option  value=\"640*360\">Galaxy Note 3</option>\r\n            <option  value=\"640*360\">Galaxy S5</option>\r\n          </select>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-xs-2 form-inline\">\r\n        <label>\r\n          <input type=\"checkbox\" id=\"checkboxSuccess\" value=\"1\" #point (change)=\"changeSize(size,point.checked)\">\r\n          横屏\r\n        </label>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-xs-3 form-inline\">\r\n        <div class=\"form-group\">\r\n          <label for=\"l*w\">长*宽</label>\r\n          <input type=\"text\" class=\"form-control\" id=\"l*w\" placeholder=\"736*414\" value=\"736*414\" #size (input)=\"changeSize(size,point.checked)\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"chartOut\" #phone>\r\n      <div id=\"main1\" class=\"chart\" *ngIf=\"!_isPie\"></div>\r\n      <div id=\"main2\" class=\"chart\" *ngIf=\"_isPie\"></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ 552:
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"detailTodo\" *ngIf=\"detailTodo\" class=\"myForm\">\r\n  <div class=\"row\">\r\n    <div class=\"col-xs-3\" *ngIf=\"!isPie\">\r\n      <label>\r\n      <input type=\"checkbox\" id=\"checkboxSuccess\" formControlName=\"switch\" >\r\n      纵横坐标交换\r\n      </label>\r\n    </div>\r\n    <div class=\"col-xs-3\" *ngIf=\"!isPie\">\r\n      <label>\r\n      <input type=\"checkbox\" id=\"checkbox\" formControlName=\"scale\" >\r\n      竖屏时启动放大功能\r\n      </label>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n  <div class=\"row\">\r\n    <div class=\"form-group col-xs-6\">\r\n      <label for=\"title_position\">标题位置</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"title_position\" placeholder=\"10,10 上,左距离,输入0-100\" formControlName=\"title_position\">\r\n    </div>\r\n    <div class=\"form-group col-xs-6\">\r\n      <label for=\"title_fontSize\">标题字体大小</label>\r\n      <select class=\"form-control\" id=\"title_fontSize\" formControlName=\"title_fontSize\">\r\n      <option *ngFor=\"let item of fontSize\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n    <div class=\"form-group col-xs-4\">\r\n      <label for=\"legend_orient\">类名排列方法</label>\r\n      <select class=\"form-control\" id=\"legend_orient\" formControlName=\"legend_orient\">\r\n    <option  value=\"horizontal\">水平</option>\r\n    <option  value=\"vertical\">垂直</option>\r\n  </select>\r\n    </div>\r\n    <div class=\"form-group col-xs-4\">\r\n      <label for=\"legend_position\">类名位置</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"legend_position\" placeholder=\"10,10 上,左距离,输入0-100\" formControlName=\"legend_position\">\r\n    </div>\r\n    <div class=\"form-group col-xs-4\">\r\n      <label for=\"legend_fontSize\">类名字体大小</label>\r\n      <select class=\"form-control\" id=\"legend_fontSize\" formControlName=\"legend_fontSize\">\r\n      <option *ngFor=\"let item of fontSize\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n    <div class=\"form-group col-xs-6\" *ngIf=\"isPie\">\r\n      <label for=\"pie_position\">饼图位置</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"pie_position\" placeholder=\"10,10 上,左距离,输入0-100\" formControlName=\"pie_position\">\r\n    </div>\r\n    <div class=\"form-group col-xs-6\" *ngIf=\"isPie\">\r\n      <label for=\"pie_radius\">饼图外内圆半径</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"pie_radius\" placeholder=\"10,10 外,内距离,输入0-100\" formControlName=\"pie_radius\">\r\n    </div>\r\n    <div class=\"form-group col-xs-6\" *ngIf=\"!isPie\">\r\n      <label for=\"grid_position\" >图表位置</label>\r\n      <input type=\"text\" class=\"form-control\" id=\"grid_position\"\r\n      placeholder=\"10,10,10,10 上,左,下,右距离,输入0-100\" formControlName=\"grid_position\">\r\n    </div>\r\n    <div class=\"form-group col-xs-6\" *ngIf=\"!isPie\">\r\n      <label for=\"grid_height\" >图表高度</label>\r\n      <select class=\"form-control\" id=\"grid_height\" formControlName=\"grid_height\">\r\n      <option *ngFor=\"let item of myHeight\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n  </div>\r\n\r\n\r\n  <div class=\"row\" *ngIf=\"!isPie\">\r\n    <div class=\"form-group col-xs-6\">\r\n      <label for=\"xAxisLabel_fontSize\">横坐标字体大小</label>\r\n      <select class=\"form-control\" id=\"xAxisLabel_fontSize\" formControlName=\"xAxisLabel_fontSize\">\r\n      <option *ngFor=\"let item of fontSize\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n    <div class=\"form-group col-xs-6\">\r\n      <label for=\"xAxisLabel_rotate\">横坐标字体倾斜度</label>\r\n      <select class=\"form-control\" id=\"xAxisLabel_rotate\" formControlName=\"xAxisLabel_rotate\">\r\n      <option *ngFor=\"let item of myRotate\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\" *ngIf=\"!isPie\">\r\n    <div class=\"form-group col-xs-6\">\r\n      <label for=\"yAxisLabel1_fontSize\">第一纵坐标字体大小</label>\r\n      <select class=\"form-control\" id=\"yAxisLabel1_fontSize\" formControlName=\"yAxisLabel1_fontSize\">\r\n      <option *ngFor=\"let item of fontSize\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n    <div class=\"form-group col-xs-6\">\r\n      <label for=\"yAxisLabel1_rotate\">第一纵坐标字体倾斜度</label>\r\n      <select class=\"form-control\" id=\"yAxisLabel1_rotate\" formControlName=\"yAxisLabel1_rotate\">\r\n      <option *ngFor=\"let item of myRotate\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\" *ngIf=\"!isPie && isDoubleY\">\r\n    <div class=\"form-group col-xs-6\">\r\n      <label for=\"yAxisLabel2_fontSize\">第二纵坐标字体大小</label>\r\n      <select class=\"form-control\" id=\"yAxisLabel2_fontSize\" formControlName=\"yAxisLabel2_fontSize\">\r\n      <option *ngFor=\"let item of fontSize\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n    <div class=\"form-group col-xs-6\">\r\n      <label for=\"yAxisLabel2_rotate\">第二纵坐标字体倾斜度</label>\r\n      <select class=\"form-control\" id=\"yAxisLabel2_rotate\" formControlName=\"yAxisLabel2_rotate\">\r\n      <option *ngFor=\"let item of myRotate\" [value]=\"item\">{{item}}</option>\r\n    </select>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- <button type=\"submit\" class=\"btn btn-default\" (click)=\"initBasic()\">画图</button> -->\r\n</form>\r\n"

/***/ }),

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(237);


/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_echarts__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_echarts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_echarts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChartService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChartService = (function () {
    function ChartService() {
        this.chartTerms = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.fontFamily = ['Helvetica', 'Tahoma', 'Arial', 'STXihei', '华文细黑', 'Microsoft YaHei', '微软雅黑', 'sans-serif'];
        this.colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
    }
    ChartService.prototype.getECharts = function () {
        return __WEBPACK_IMPORTED_MODULE_1_echarts__;
    };
    ChartService.prototype.makeChartWithDom = function (dom, option) {
        var myChart = __WEBPACK_IMPORTED_MODULE_1_echarts__["init"](dom);
        myChart.setOption(option);
        return myChart;
    };
    ChartService.prototype.makeChart = function (id, option) {
        var myChart = __WEBPACK_IMPORTED_MODULE_1_echarts__["init"](document.getElementById(id));
        myChart.setOption(option);
        return myChart;
    };
    ChartService.prototype.afterInit = function (option) {
        option = this.addFontFamily(option);
        return option;
    };
    ChartService.prototype.addFontFamily = function (option, fontFamily) {
        if (fontFamily === void 0) { fontFamily = this.fontFamily; }
        var add = { fontFamily: fontFamily };
        Object.assign(option.textStyle, add);
        return option;
    };
    ChartService.prototype.initSingleYChart = function (title, data, isY_value) {
        if (isY_value === void 0) { isY_value = true; }
        var mySeries = data.series;
        mySeries[0].barGap = 0;
        var option = {
            title: {
                text: title, textStyle: {
                    fontSize: 18
                },
                x: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data.legend_data,
                top: '7%',
                textStyle: {
                    fontSize: 13
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            series: mySeries,
            textStyle: {
                fontSize: 18
            }
        };
        if (isY_value) {
            option.yAxis = [{ type: 'value' }];
            option.xAxis = [
                {
                    type: 'category',
                    data: data.xAxis_data,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ];
        }
        else {
            option.xAxis = [{ type: 'value' }];
            option.yAxis = [
                {
                    type: 'category',
                    data: data.xAxis_data,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ];
        }
        option = this.afterInit(option);
        return option;
    };
    ChartService.prototype.initPieChart = function (title, data) {
        var mySeries = data.series;
        mySeries[0].type = 'pie';
        mySeries[0].itemStyle = {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };
        // mySeries[0].center =['50%','60%'];
        var option = {
            title: {
                text: title,
                textStyle: {
                    fontSize: 18
                },
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : <br/>{c} ({d}%)"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                height: '60%',
                containLabel: true
            },
            legend: {
                orient: 'horizontal',
                top: '7%',
                itemGap: 4,
                textStyle: {
                    fontSize: 13
                },
                data: data.legend_data
            },
            series: mySeries,
            textStyle: {}
        };
        option = this.afterInit(option);
        return option;
    };
    ChartService.prototype.initDoubleYChart = function (title, data) {
        var mySeries = data.series;
        mySeries[0].barGap = 0;
        var option = {
            title: {
                text: title, textStyle: {},
                x: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: data.legend_data,
                top: '7%',
                textStyle: {}
            },
            grid: {
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: data.xAxis_data,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: '',
                    min: 0,
                    boundaryGap: [0.2, 0.2],
                    nameTextStyle: {
                        fontSize: 14
                    }
                },
                {
                    type: 'value',
                    scale: true,
                    name: '',
                    nameTextStyle: {
                        fontSize: 14
                    },
                    min: 0,
                    boundaryGap: [0.2, 0.2],
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: mySeries,
            textStyle: {
                fontSize: 18
            }
        };
        option = this.afterInit(option);
        return option;
    };
    return ChartService;
}());
ChartService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], ChartService);

//# sourceMappingURL=chart.service.js.map

/***/ })

},[616]);
//# sourceMappingURL=main.bundle.js.map