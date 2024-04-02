const express = require('express')

const app = express()
const PORT = 3000

app.use(express.static(`${__dirname}/dist/static`))

app.use('/*', (req, res) => {
    res.sendFile(`${__dirname}/dist/static/index.html`)
	//возможно добавить удаление пути
})

app.get('/', (req, res) => {
    res.status(200)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})
