var express = require("express");

var app = express();

var router = require("./controller/route.js");

app.set("view engine","ejs");


app.use(express.static("./public"));//配置静态资源
app.use(express.static("./uploads"));

app.get("/",router.showIndex);

app.get("/:dirname",router.getAllPhotos)

app.get("/up",router.upload)

app.post("/up",router.uploadP)
app.use(function(req,res) {
    res.render('404')
})
app.listen(3000)



var Keygrip = require("keygrip");
keys = new Keygrip(["SEKRIT2", "SEKRIT1"])
console.log(keys)
var aa = keys.sign('fghfg');
console.log(aa)
keys.index('fghfg',aa)






