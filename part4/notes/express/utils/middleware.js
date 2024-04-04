const { info, error } = require('./logger')
const requestLogger = (request, response, next) => {
    info('Method:', request.method)
    info('Path:  ', request.path)
    info('Body:  ', request.body)
    info('---')
    next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
    error(error.message)
    if (error.name === 'CastError') {
        return response.status(404).send({ error: 'malformatted id' })
    }
    next(error)
}

module.exports = { unknownEndpoint, errorHandler, requestLogger }