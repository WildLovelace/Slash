import http from "http";
import url from "url";
//import {mm2} from "./index2"; yy
//mm2(1);

let cfg = {
    TCPPortToListen: 8156
    , StaticFilesRoot: ""
}


function log(...args) {
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


    //private send(retcode: number, res: http.ServerResponse, rec: { ctype?: string, msg?: string, encoding?: "utf8", error?: Error | string }): void {
    send(retcode: number, res: http.ServerResponse, rec: AskMsg) {
        // Функция возвращает результат запроса клиенту  
        if (!rec.ctype) rec.ctype = "text/plain; charset=utf-8";
        let h = typeof (rec.ctype) == "object" ? rec.ctype : { "Content-Type": String(rec.ctype) };
        if (!retcode) retcode = 200;
        let errcodes = {
            200: "", 404: "404 Not Found", 500: "500 Internal server Error",
            425: 'Too Early — сервер не готов принять риски обработки "ранней информации"'
        }

        let data = (rec.msg ? rec.msg : "");
        rec.encoding = "utf8";
        h["Charset"] = "UTF-8"

        res.writeHead(retcode, h);
        res.end(data, rec.encoding);
        //res.end(data);
        //else res.end(data)
    }

    async handle(req: http.IncomingMessage, res: http.ServerResponse) {
        // это обработчик HTTP запросов
        const p = req.url ? req.url.split("?")[0] : "";
        let url = req.url;
        let self = this;
        let msgtxt = ""
        switch (url) {
            case "/get": { msgtxt = "Чтото хотелось вернуть!"; break; }
            //case "/get": { msgtxt=`Прогуливаюсь по тротуару с довольной миной на лице            лол\r\nАрбуз!`; break; }
            default: msgtxt = "unknown command"
        }
        console.log(req.url)
        this.send(0, res, { msg: msgtxt });
        //this.send(0, res, { msg: JSON.stringify({msg:msgtxt}), ctype: "application/json" });
        //this.send(0, res, { msg:"test:Прогуливаюсь по тротуару с довольной миной на лице.\r\nлол\r\nАрбуз"  });
        //this.send(0, res, { msg: "Hello!!"+url  });

    }


    listen() {
        this.httpserv = http.createServer(this.handle.bind(this))
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