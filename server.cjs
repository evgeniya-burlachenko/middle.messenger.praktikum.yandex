const express = require('express')

const app = express()
const PORT = 3000

app.use(express.static(`${__dirname}/dist`))

app.use('/*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`)
	//возможно добавить удаление пути
})

app.get('/', (req, res) => {
	 res.sendFile(`${__dirname}/dist/index.html`)
    // res.status(200)
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})
