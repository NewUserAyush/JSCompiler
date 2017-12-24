var fs = require('fs');
var express = require('express');
var app = express();
var port = process.env.PORT || 7070;
var bodyParser = require('body-parser');
app.listen(port);
console.log('Server started! At http://localhost:' + port);


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/appendfile', function(req, res) {
    var content = req.body.content;
    var file=req.body.file;
    var filename=req.body.name;
    //console.log(file);
    appendfile(content,file,filename,res);
   
});

function appendfile(content,file,name,res){
    var filename=name+"."+file;
    console.log(filename);
    fs.writeFile(filename,content, function (err) {
      if (err) throw err;
      console.log('Saved!');
    res.send("ok");  
    }); 
}


app.get('/getfile', function(req, res) {
    var arr=[];
    fs.readFile('result.html', 'utf8', function(err, contents) {
    arr.push({'html':contents});});
    fs.readFile('result.js', 'utf8', function(err, contents) {
    arr.push({'js':contents});});
    fs.readFile('result.css', 'utf8', function(err, contents) {
    arr.push({'css':contents});
        res.send(arr);  
    });
     
});