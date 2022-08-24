Ссылка на этот каталог
https://drive.google.com/drive/folders/1O1yZcfG_NXnYZuJxXcJVdMEVHK91mHS2?usp=sharing
Простой http сервер (файл http.ts)
Запускать http.ts
обработка запросов в процедуре handle()
возврат результата клиенту через вызов this.send(0, res, { msg:msgtxt  });

После запуска сервера, можно обращаться к нему из браузера так:
http://localhost:8156/get
http://localhost:8156/

В общем виде  http://localhost:8156/<path>
Где <path> это локальный путь внутри сервера в обработке handle() он сидит в переменной url, он анализируется в блоке:
        switch (url){
            case "/get": { msgtxt="Чтото хотелось вернуть!"; break; }
            //case "/get": { msgtxt=`Прогуливаюсь по тротуару с довольной миной на лице            лол\r\nАрбуз!`; break; }
            default: msgtxt="unknown command"
        }
