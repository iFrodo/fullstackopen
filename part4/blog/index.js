const app = require('./app')
const { info, error } = require('./utils/logger.js')
const PORT = require('./utils/config')

app.listen(process.env.PORT || 3001, () => {
    info(`Server running on port ${process.env.PORT}`)
})