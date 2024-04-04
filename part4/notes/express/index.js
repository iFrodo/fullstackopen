const app = require('./app.js')
const { info, error } = require('./utils/logger.js')
const { PORT } = require('./utils/config.js')

app.listen(PORT || 3001, () => { info(`server start at ${PORT} port `) })

