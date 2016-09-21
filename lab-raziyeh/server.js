//node modules
const http = require('http');
// npm modules
// app modules
// module constants
const PORT = process.env.PORT || 3000;
// module logic

http.createServer(function(req,res) {
  res.write('ok');
  res.end();
}).listen(PORT, function(){
  console.log('server is up on port: ' , PORT);
});
