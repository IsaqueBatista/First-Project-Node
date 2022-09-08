const { request } = require('express')
const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3000
app.use(express.json())

const users = []



const userMiddleware = (req, res, next) => {
    const { id } = req.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return res.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (req, res) => {
    const { name, age, city } = req.query
    return res.json(users)
})

app.post('/users', (req, res) => {
    const { name, age, city } = req.body
    const user = { name, age, city, id: uuid.v4() }

    users.push(user)
    return res.json(user)
})

app.put('/users/:id', userMiddleware, (req, res) => {
    const { name, age, city } = req.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { name, age, city, id }


    users[index] = updatedUser
    return res.json(updatedUser)
})

app.delete('/users/:id', userMiddleware, (req, res) => {
    const index = req.userIndex

    users.splice(index, 1)
    return res.status(204).json()
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
