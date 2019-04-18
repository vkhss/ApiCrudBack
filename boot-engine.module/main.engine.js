const Promise = require('bluebird'),
mongoose = require('mongoose'),
koa = require('koa'),
convert = require('koa-convert'),
bodyParser = require('koa-bodyparser'),
logger = require('koa-logger'),
koaRes = require('koa-res'),
cors = require('koa2-cors'),
character = require('../controller/character'),
Router = require('koa-router');

class ServerBootEngine {
    
    connectDatabase(conf){
        mongoose
        .connect('mongodb://localhost/noderest', {reconnectTries: 10, useNewUrlParser: true})

        mongoose
        .connection.on('error', (err) => Promise.reject(new Error(err)))

        mongoose
        .connection.on('disconnected', (err) => Promise.reject(new Error(err)))
        
    }

    configServer(conf){
        this.app.use(logger())
        this.app.use(cors());
        this.app.use(bodyParser())
        this.app.use(convert(koaRes()))
        return Promise.resolve()
    }

    errorHandler(){
        this.app.on('error', (err, ctx) => {
            ctx.throw(400, err.message);
            console.error(err, ctx)     
        })
        return Promise.resolve()
    }

    setupRoutes(conf){
        this.router
        .get('/', async (ctx) => {
            ctx.body = 'Pagina Inicial'
        })
        .get('/throwerror', async () => {
            throw new Error('Aghh! An error!')
        })
        .get('/characters', character.getCharacters)
        .get('/characters', character.getCharacterById)
        .post('/characters', character.createCharacter)
        .put('/characters', character.updateCharacter)
        .delete('/characters', character.deleteCharacterById)   

        this.app.use(this.router.routes())
        return Promise.resolve()
    }

    initServer(conf){
        this.app.listen(3000);
        return Promise.resolve()
    }

    constructor(){
        this.app = new koa()
        this.router = new Router()
    }

    init(conf){
        return Promise
        .all([
            this.connectDatabase(),
            this.configServer(),
            this.errorHandler(),
            this.setupRoutes(),
            this.initServer()
        ])
        .catch(error => {
            console.error(error)
        })
    }
} 

module.exports = ServerBootEngine