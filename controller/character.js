const Character = require('../model/characters')

exports.getCharacters = async (ctx) => {
    const characters = await Character.find({})
    if (!characters) {
        throw new Error(" Ocorreu um erro ao recuperar os Personagens!")
    } else {
        ctx.body = characters
    }
}

exports.getCharacterById = async (ctx) => {
    const characters = await Character.findOne({ _id: ctx.request.body._id })
    if (!characters) {
        throw new Error(" Ocorreu um erro ao recuperar o Personagen!")
    } else {
        ctx.body = characters
    }
}

exports.createCharacter = async (ctx) => {
    const result = await Character.create({
        name: ctx.request.body.name,
        nickname: ctx.request.body.nickname

    })
    if (!result) {
        throw new Error('Ocorreu um Erro ao criar o Personagem!')
    } else {
        ctx.body = { message: 'Character created!', data: result }
    }

}

exports.updateCharacter = async (ctx) => {
    const searchByName = { name: ctx.request.body.name }
    const update = { name: ctx.request.body.newName, nickname: ctx.request.body.newNickname }
    const result = await Character.findOneAndUpdate(searchByName, update)
    if (!result) {
        throw new Error('Ocorreu um erro ao Atualizar o personagem!')
    } else {
        console.log(result)
        ctx.body = {
            message: 'Character updated!', data: result

        }
    }
}


exports.deleteCharacterById = async (ctx) => {
    const result = await Character.findOneAndRemove({ _id: ctx.request.body._id })
    if (!result) {
        throw new Error('Ocorreu um Erro ao deletar o Personagem')
    } else {
        ctx.status = 200
        ctx.body = { message: 'success!' }
    }
}




