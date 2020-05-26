var express = require('express');
var router = express.Router();
var monk=require('monk');

var multer=require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage })
var db=monk('localhost:27017/psp');
var certi=db.get('certificate');

/* GET home page. */
router.get('/',function(req,res){
	
	certi.find({},function(err,docs){
		res.render('',{"b":docs})
	})
});

router.post('/certi-upload', upload.single('certi'), function (req, res, next) {
   console.log(req.file);
   var data={
   	certi:req.file.originalname,
   	descript:req.body.descript
   }
    certi.insert(data,function(err,docs){
   	if(err){
   		console.log(err);
   	}else{
   		console.log(docs);
   	}
   });
  res.redirect('/');
});
module.exports = router;
