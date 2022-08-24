import http from "http";
import fs from 'fs';
import url from "url";

let cfg = {
    TCPPortToListen: 8156
    , StaticFilesRoot: ""
}

function log(...args:any) {
    console.log(...args);
}

interface AskMsg {
    ctype?: string,
    msg?: string,
    encoding?: "utf8",
    error?: Error | string
}

class Server {
    httpserv?: http.Server;

    // Функция возвращает результат запроса клиенту  
    send(retcode: number, res: http.ServerResponse, rec: AskMsg) {
        if (!rec.ctype) rec.ctype = "text/html; charset=utf-8"; //if (!rec.ctype) rec.ctype = "text/plain; charset=utf-8";
        let h = typeof (rec.ctype) == "object" ? rec.ctype : { "Content-Type": String(rec.ctype) };
        if (!retcode) retcode = 200;
        let errcodes = {
            200: "", 404: "404 Not Found", 500: "500 Internal server Error",
            425: 'Too Early — сервер не готов принять риски обработки "ранней информации"'
        }

        let data = (rec.msg ? rec.msg : "");
        rec.encoding = "utf8";
        h["Charset"] = "UTF-8";

        res.writeHead(retcode, h);
        res.end(data, rec.encoding);
    }

    async handle(req: http.IncomingMessage, res: http.ServerResponse) {
        // это обработчик HTTP запросов
        console.log(req.url)

        let url = req.url ;
        let msgtxt = "";
        let sepurl = url.split('/');
        let urlpart1 = "/" + sepurl[1];

        switch (urlpart1) {
            case "/api":
                let seputl2 = sepurl.slice(2);
                let urlpart2 = seputl2.join("/");
                if (urlpart2 == "") { urlpart2 = urlpart1.replace("/", ""), urlpart1 = "/" }
                if (urlpart2 == "get") { msgtxt = "Это метод апи get"; break; }
                if (urlpart2 == "set") { msgtxt = "Это метод апи set"; break; }
                else { msgtxt = "Нет такого апи метода"; break; }
            case "/":
                msgtxt = fs.readFileSync("./stat/index.html", 'utf8'); break;
            default: 
                let newurl = "./stat" + url;
                if (!fs.existsSync(newurl)) {
                    this.send(404, res, {});
                    return;
                }
                let ext = url.split('.').pop();
                let ext2sty = {png:"image/png", css:"text/css", html:"text/html", js:"js"};
                let cont_type = ext2sty[ext] ; 
                if (cont_type === undefined) cont_type = "text/plain";
                let buff = fs.readFileSync(newurl);
                res.writeHead(200, { "Content-Type": ext2sty[ext] } );
                res.end(buff);
                return;
        }

        this.send(0, res, { msg: msgtxt });
    }

    listen() {
        this.httpserv = http.createServer(this.handle.bind(this));
        this.httpserv.listen(cfg.TCPPortToListen);
        log(`сервер запущен PID=${process.pid}, порт ${cfg.TCPPortToListen}, путь к статическим файлам '${cfg.StaticFilesRoot}'...`);
    }
}

async function main() {
    let srv = new Server();
    srv.listen();
}

main();
// use: http://localhost:8156/get