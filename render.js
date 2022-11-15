var http = require("http")
var url = require("url")
var fs = require("fs")
var qs = require("querystring")
const port = process.env.PORT || 3000

var renderBeli = fs.readFileSync("./pages/beli.html");
var renderKontak = fs.readFileSync("./pages/kontak.html");
var renderLoginBerhasil = fs.readFileSync("./pages/login_berhasil.html");

function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, { "Content-type": "text/css" });
        var fileContents = fs.readFileSync("./style.css", { encoding: "utf8" });
        response.write(fileContents);
        response.end();
    }
}

var server = http.createServer(function(request,response){
    css(request, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<h2>Pencarian</h2>");
            response.write("<p>Anda Mencari : <b>" + keyword + "</b> </p>");
            response.write("<h3><b></b>Tidak ada Hasil ! Maaf Website ini masih dalam tahap pengembangan</b></h3>");
            response.end("<a href='/'>Kembali</a>");
            
            }
        else{
            fs.readFile("./pages/beranda.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Conten-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data)
            response.end();    
            });
        }
    }
    else if (request.url == '/beli'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(renderBeli);
        response.end();
    }
    else if (request.url == '/kontak'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(renderKontak);
        response.end();
    }

    else if (request.url==="/login" && request.method === "GET"){
        fs.readFile("./pages/login.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }
    else if (request.url==="/login" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if (formData.username === "1121101997" && formData.password === "muhammadaufa"){
                response.writeHead(200,{"Content-Type":"text/html"});
                response.end(renderLoginBerhasil);
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
                response.end();
            }
        });
    }

    else if (request.url==="/daftar" && request.method === "GET"){
        fs.readFile("./pages/sign up.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }
    else if (request.url==="/daftar" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var s = qs.parse(requestBody);
            if (s.fullname && s.username 
                && s.email && s.phone 
                && s.password){
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<p>fullname: " + s.fullname + "</p>");
                response.write("<p>username: " + s.username + "</p>");
                response.write("<p>email: " + s.email + "</p>");
                response.write("<p>phone: " + s.phone + "</p>");
                response.write("<p>password: " + s.password + "</p>");
                response.write("<a href='/'>Kembali</a>");
                response.end();
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
                response.end();
            }
        });
    }
});

server.listen(port);
console.log("server Berjalan")
