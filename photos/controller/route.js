//路由只是方法的罗列，具体的业务实现由model实现

var file = require("../models/files.js");
var fm = require("formidable");
var path = require("path");
var sd = require("silly-datetime");
var fs = require("fs");
exports.showIndex = function(req,res,next){
    //读取所有文件夹
    var allFolders = file.getAllAlbums(function(err,f) {
        res.render("index",{
            allAlbums:f
        })
    });
}

exports.getAllPhotos = function(req,res,next) {
    let dir = req.params.dirname
    file.scanPhoto(dir,function(err,imgs) {
        if(err) {
            next();
        } else {
            res.render("imgs",{
                imgs:imgs,
                dir:dir
            })
        }
    })
}

exports.upload = function(req,res,next) {
    res.render('upload')
}

exports.uploadP = function(req,res,next) {
    let form = new fm.IncomingForm();
    form.uploadDir = path.normalize(__dirname+'/../public/temp');
    form.parse(req,function(err,fields,files) {
        if(err) {
            res.send('上传失败');
            return;
        }
        console.log(files.file.size)
        let oldPath = files.file.path;
        
        if(files.file.size === 0) {
            setTimeout(function() {
                fs.unlink(oldPath,function(err) {
                    if(err) {
                        console.log(err);
                    }
                     res.send('dfgdfgd');
    
                })
            }, 0);
        } else {
            let time = sd.format(new Date(),"YYYYMMDDHHmmss");
            let rd = Math.floor(Math.random()*9000+1000);
            let extname = path.extname(files.file.name);
            let newPath = path.join(__dirname,'/../uploads/1/'+time+rd+extname);
            console.log(files.file.path)
            fs.rename(oldPath,newPath,function(err) {
                if(err) {
                    res.send('上传失败');
                } else {
                    res.send(time+rd+extname);
                }
            })
        }
        
    })
}