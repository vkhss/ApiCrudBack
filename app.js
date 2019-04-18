const ServerBootEngine = require('./boot-engine.module/main.engine')

new ServerBootEngine({
    databaseUri: 'mongodb://localhost:27017'
}).init()

//Criar modulo de pegar configuracao de ambiente e passar como parametro em init() do ServerBootEngine