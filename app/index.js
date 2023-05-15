let express = require("express")
let app = express()

app.use(express.static(__dirname + '/public'));
app.listen(8080)

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});