const koa = require('koa')
const mongoose = require('mongoose')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
//const error = require('koa-json-error')
const logger = require('koa-logger')
const koaRes = require('koa-res')
//const handleError = require('koa-handle-error')
const character = require('./controller/character')
const Cors = require('koa-cors');
const app = new koa()

router = new Router()

mongoose.Promise = require('bluebird')
mongoose
    .connect('mongodb://localhost/noderest')
    .then((response) => {
        console.log('mongo connection created')
    })
    .catch((err) => {
        console.log("Error connecting to Mongo")
        console.log(err);
    })
    app.use(async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            ctx.status = err.status || 500
            ctx.body = err.message
            ctx.app.emit('error', err, ctx)
        }
    })
    // logging
    app.use(logger())
    app.use(Cors());
    // body parsing
    app.use(bodyParser())
    // format response as JSON
app.use(convert(koaRes()))
// configure router
router
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

app.use(router.routes())

app.listen(3000);