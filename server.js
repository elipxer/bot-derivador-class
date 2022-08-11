const express = require('express');
const cors = require('cors');
//importaciones base de datos

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            messages: "/api/receiveWhatsApp",
            db: "/api/db"
        }

        //Middlewares
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }
    
    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body de la petición
        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.path.messages,require('./routes/messages'));
        this.app.use(this.path.db,require('./routes/db'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            const ts = new Date().toUTCString();
            console.log(`[${ts}] server running on port ${this.port}`);
        })
    }
}

module.exports = Server