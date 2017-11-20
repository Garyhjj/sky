var fs = require("fs");
var path = require('path');
var async = require('async');
exports.getAllAlbums = function(cb){
    let f = path.join(__dirname,'/../uploads')
    let folder = []

    fs.readdir(f,function(err,files) {
        if(err) {
            cb&&cb('无法读取此文件夹',folder)
            return 
        }
        console.time('testForEach');
        console.time('testForEach1');
        var requ = [];
        files.forEach((fl) => {
            requ.push((c) => {
                fs.stat(path.join(f,fl),function(err,file) {
                    if(file.isDirectory()) {
                        folder.push(fl);
                    };
                    c&&c(err,folder);
                });
            })
        });
        async.parallel(requ,(err,r)=>{
            console.log(r);
            console.timeEnd('testForEach1');
            folder.sort();
            cb&&cb(err,folder)
        });
        // (function collect(i) {
        //     if(i === files.length) {
        //         console.timeEnd('testForEach');
        //         cb&&cb(null,folder)
        //         return
        //     }
        //     fs.stat(path.join(f,files[i]),function(err,file) {
        //         if(file.isDirectory()) {
        //             folder.push(files[i]);
        //         }
        //         i++;
        //         return collect(i);
        //     })
        // })(0)
    })
}

exports.scanPhoto = function(dirname,cb) {
    let f = path.join(__dirname,'/../uploads/',dirname);
    let imgs = [];
    fs.readdir(f,function(err,files) {
        if(err) {
            cb&&cb('无法读取此文件夹',imgs)
            return 
        }
        console.time('testFor');
        console.time('testFor1');
        var requ = [];
        files.forEach((fl) => {
            requ.push((c) => {
                fs.stat(path.join(f,fl),function(err,file) {
                    if(file.isFile()) {
                        imgs.push(fl);
                    };
                    c&&c(err,imgs);
                });
            })
        });
        async.parallel(requ,(err,r)=>{
            console.timeEnd('testFor1');
            imgs.sort();
            cb&&cb(err,imgs)
        });
        // let  i = 0;
        // let lg = files.length-1;
        // files.forEach((fl) => {
        //         fs.stat(path.join(f,fl),function(err,file) {
        //             if(file.isDirectory()) {
        //                 imgs.push(fl);
        //             };
        //             if(i === lg) {
        //                 console.timeEnd('testFor');
        //                 cb&&cb(err,imgs)
        //             }
        //             i++;
        //     })
        // });
        // (function collect(i) {
        //     if(i === files.length) {
        //         cb&&cb(null,imgs)
        //         console.timeEnd('testFor');
        //         return
        //     }
        //     fs.stat(path.join(f,files[i]),function(err,file) {
        //         if(err) {
        //             cb&&cb('无法读取此文件夹',imgs)
        //         }
        //         if(file.isFile()) {
        //             imgs.push(files[i]);
        //         }
        //         i++;
        //         return collect(i);
        //     })
        // })(0)
    })
}