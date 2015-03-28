/**
 * Created by Administrator on 2015-02-04.
 */
var easyimg = require('easyimage');
var path = require('path');
var fs = require('fs');
var fse = require('fs-extra');
var async = require('async');
var msg = require('../database/msg');

//exports.uploadfunc_join = function(files,email){
//    var originalname = files.originalname;
//    var rename = email+"_"+originalname;
////    var photoname = rename;
////    var name = files.name;
//
//    var srcImg = files.path;
//
//    var originPath = path.join(__dirname,'..','public','photo','users',rename);
//    var origin = "/photo/users/"+rename;
//
//    var idx = rename.lastIndexOf('.');
//    var tempName = rename.substring(0,idx);
//    var ext = rename.substring(idx);
//    rename = tempName + '_thumbnail' + ext;
//    var dstPath = path.join(__dirname,'..','public','photo','users','thumbnail',rename);
//    var thumbnail = "/photo/users/thumbnail/"+rename;
//
//    console.log("srcImg",srcImg);
//    console.log("originPath",originPath);
//    console.log("dstPath",dstPath);
//
//    fse.move(srcImg,originPath,0, function(err) {
//        if (err) console.error(err);
//        else{
//            easyimg.thumbnail({
//                src: originPath, dst: dstPath,
//                width: 128, height: 128,
//                x: 0, y: 0
//            }).then(function (file) {
//                console.log("사진부분 완료");
//            });
//        }
//    })
//
//
//
//    var arr = {};
//    arr.photo = origin;
//    arr.thumbnail = thumbnail;
//    return arr;
//};

exports.uploadfunc_join = function(files,email,callback){
    if(files != undefined){
        var originalname = files.originalname;

        var srcImg = files.path;

        var idx = originalname.lastIndexOf('.');
        var tempName = email
        var ext = originalname.substring(idx);
        rename = tempName  + ext;
        var originPath = path.join(__dirname,'..','public','photo','users',rename);
        var origin = "/photo/users/"+rename;

//        var idx = email.lastIndexOf('.');
//        var tempName = email.substring(0,idx);
//        var ext = email.substring(idx);
        var idx = originalname.lastIndexOf('.');
        var tempName = email
        var ext = originalname.substring(idx);
        rename = tempName + '_thumbnail' + ext;
        var dstPath = path.join(__dirname,'..','public','photo','users','thumbnail',rename);
        var thumbnail = "/photo/users/thumbnail/"+rename;

        console.log("srcImg",srcImg);
        console.log("originPath",originPath);
        console.log("dstPath",dstPath);

        fse.move(srcImg,originPath,0, function(err) {
            if (err) callback(msg.err_photo_no,null);
            else{
                easyimg.thumbnail({
                    src: originPath, dst: dstPath,
                    width: 128, height: 128,
                    x: 0, y: 0
                }).then(function (file) {
                    console.log("사진부분 완료");
                });
            }
        })



        var arr = {};
        arr.photo = origin;
        arr.thumbnail = thumbnail;
        arr.originalname = originalname;

        callback(null,arr);

    }
    else callback(null,null);
};




exports.uploadfunc_course = function(files){
    var photo_org_name = files.originalname;
    var idx = photo_org_name.lastIndexOf('.');
    var tempName = photo_org_name.substring(0,idx);
    var ext = photo_org_name.substring(idx);
    var unique =  Date.now();
    var photo_name = tempName+unique+ext;

    var srcImg = files.path;

    var originPath = path.join(__dirname,'..','public','photo','course',photo_name);
    var origin = "/photo/course/"+photo_name;


    var photo_thumbnail = tempName + '_thumbnail' + unique+ext;
    var dstPath = path.join(__dirname,'..','public','photo','course','thumbnail',photo_thumbnail);
    var thumbnail = "/photo/course/thumbnail/"+photo_thumbnail;
    console.log(dstPath);


    fse.move(srcImg,originPath,0, function(err) {
        if (err) console.error(err);
        else{
            easyimg.thumbnail({
                src: originPath, dst: dstPath,
                width: 128, height: 128,
                x: 0, y: 0
            }).then(function (file) {
                console.log("사진부분 완료");
            });
        }
    })


    var arr = {};
    arr.photo = origin;
    arr.photo_org_name = photo_org_name;
    arr.thumbnail = thumbnail;
    return arr;
};


exports.uploadfunc_course2 = function(files,callback){
    if(files != undefined) {
        var photo_org_name = files.originalname;
        console.log(photo_org_name);
        var idx = photo_org_name.lastIndexOf('.');
        var tempName = photo_org_name.substring(0, idx);
        var ext = photo_org_name.substring(idx);
        var unique = Date.now();
        var photo_name = unique + ext;

        var srcImg = files.path;

        var originPath = path.join(__dirname, '..', 'public', 'photo', 'course', photo_name);
        var origin = "/photo/course/" + photo_name;


        var photo_thumbnail = unique + '_thumbnail' + ext;
        var dstPath = path.join(__dirname, '..', 'public', 'photo', 'course', 'thumbnail', photo_thumbnail);
        var thumbnail = "/photo/course/thumbnail/" + photo_thumbnail;
        console.log(dstPath);


        fse.move(srcImg, originPath, 0, function (err) {
            if (err) console.error(err);
            else {
                easyimg.thumbnail({
                    src: originPath, dst: dstPath,
                    width: 128, height: 128,
                    x: 0, y: 0
                }).then(function (file) {
                    console.log("사진부분 완료");
                });
            }
        })


        var arr = {};
        arr.photo = origin;
        arr.photo_org_name = photo_org_name;
        arr.thumbnail = thumbnail;

        callback(thumbnail, origin, photo_org_name);
    } else callback(null, null, null);
};





exports.uploadfunc_board2 = function(dir,files,callback){
    console.log(files);
    if(files != undefined) {
        if (Array.isArray(files)) {
            items = files;
        } else {
            items = [files];
        }
        console.log("items",items);
        var result = {};
        result.photo = [];
        fs.mkdir(path.join(__dirname, '..', 'public', 'photo', 'board', dir), function () {
            async.each(items, function (item, callback_each) {

                var i = items.indexOf(item);
                var originalname = item.originalname;
                var srcImg = item.path;

                var idx = originalname.lastIndexOf('.');
                var ext = originalname.substring(idx);
                var unique = Date.now();
                var photo_name = unique + ext;

                var originPath = path.join(__dirname, 'photo', 'board', dir, photo_name);
                var origin_path = "/photo/board/" + dir + '/' + photo_name;

                fse.move(srcImg, originPath, 0, function (err) {
                        if (err) callback_each(err);
                        else {
                            var origin = {};
                            console.log(origin);
                            origin.photo_path=origin_path;
                            origin.originalname = originalname;
                            result.photo[i] = origin;
                            callback_each();
                        }
                    }
                );
            }, function (err) {
                if (err) {
                    fse.remove(path.join(__dirname, '..', 'public', 'photo', 'board', dir), function (err) {
                        callback(err, result);
                    });
                    callback(err, result);
                }
                var originalname = items[0].originalname;
                var idx = originalname.lastIndexOf('.');
                var ext = originalname.substring(idx);
                var unique = Date.now();
                var photo_thumbnail = unique + '_thumbnail' + ext;

                var dstPath = path.join(__dirname, '..', 'public', 'photo', 'board', dir, photo_thumbnail);
                result.thumbnail = "/photo/board/" + dir + '/' + photo_thumbnail;
                console.log(result);
                console.log(result.photo);
                console.log(result.photo[0]);
                console.log(result.photo[0].originalname);
                easyimg.thumbnail({

                    src: path.join(__dirname, '..', 'public', result.photo[0].photo_path), dst: dstPath,
                    width: 128, height: 128,
                    x: 0, y: 0
                }).then(function (file) {
//                console.log('file',file);
                    console.log("썸네일 사진 끝");
                });
                callback(null, result);
            });
        });
    }
    else callback(null,null);
};



exports.uploadfunc_board = function(dir,files,callback){
    fse.remove(path.join(__dirname,'..','public','photo','board',dir),function(err) {
        if(err) callback(err, null);
        else if (files != undefined) {
            var items;
            if (Array.isArray(files)) {
                items = files;
            } else {
                items = [files];
            }
            console.log(files);
            console.log("items", items);
            var result = {};
            result.photo = [];
            fs.mkdir(path.join(__dirname, '..', 'public', 'photo', 'board', dir), function () {
                async.each(items, function (item, callback_each) {
                    console.log("item",item);
                    var i = items.indexOf(item);
                    var originalname = item.originalname;
                    var srcImg = item.path;

                    var idx = originalname.lastIndexOf('.');
                    var ext = originalname.substring(idx);
                    var unique = Date.now();
                    var photo_name = unique + ext;

                    var originPath = path.join(__dirname, 'photo', 'board', dir, photo_name);
                    var origin_path = "/photo/board/" + dir + '/' + photo_name;

                    fse.move(srcImg, originPath, 0, function (err) {
                            if (err) callback_each(err);
                            else {
                                var origin = {};
                                console.log(origin);
                                origin.photo_path = origin_path;
                                origin.originalname = originalname;
                                result.photo[i] = origin;
                                callback_each();
                            }
                        }
                    );
                }, function (err) {
                    if (err) {
                        fse.remove(path.join(__dirname, '..', 'public', 'photo', 'board', dir), function (err) {
                            callback(err, result);
                        });
                        callback(err, result);
                    }
                    var originalname = items[0].originalname;
                    var idx = originalname.lastIndexOf('.');
                    var ext = originalname.substring(idx);
                    var unique = Date.now();
                    var photo_thumbnail = unique + '_thumbnail' + ext;

                    var dstPath = path.join(__dirname, '..', 'public', 'photo', 'board', dir, photo_thumbnail);
                    result.thumbnail = "/photo/board/" + dir + '/' + photo_thumbnail;
                    console.log(result);
                    console.log(result.photo);
                    console.log(result.photo[0]);
                    console.log(result.photo[0].originalname);
                    easyimg.thumbnail({

                        src: path.join(__dirname, '..', 'public', result.photo[0].photo_path), dst: dstPath,
                        width: 128, height: 128,
                        x: 0, y: 0
                    }).then(function (file) {
//                console.log('file',file);
                        console.log("썸네일 사진 끝");
                    });
                    callback(null, result);
                });
            });
        }
        else callback(null, null);
    });
};



exports.uploadfunc_board_modify = function(dir,files,email){
    var result = {};
    result.arr = []
    fse.remove(path.join(__dirname,'..','public','photo','board',dir),function(){
        fs.mkdir(path.join(__dirname,'..','public','photo','board',dir), function(files){
            async.each(files,function(item,callback_each){
                var originalname = item.originalname;
                var srcImg = item.path;
                var originPath = path.join(__dirname,'..','public','board',dir,originalname);
                var origin = "/photo/board/"+dir+'/'+originalname;
                fse.move(srcImg,originPath,0, function(err) {
                        if (err) throw err;
                        result.arr.push(origin);
                        callback_each();
                    }
                );
            },function(err){
                if (err) throw err;
                var originalname = files[0];
                var idx = originalname.lastIndexOf('.');
                var tempName = originalname.substring(0,idx);
                var ext = originalname.substring(idx);
                var photo_thumbnail = tempName + '_thumbnail' + unique+ext;
                var dstPath = path.join(__dirname,'..','public','board',dir,photo_thumbnail);
                result.thumbnail = "/photo/board/"+dir+'/'+photo_thumbnail;
                easyimg.thumbnail({
                    src:originPath,dst: dstPath,
                    width:128,height:128,
                    x:0,y:0
                }).then(function(file){
                    console.log('file',file);
                });
                callback(null);
            });
        });
    })

    return result;
};