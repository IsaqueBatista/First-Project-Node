
// AULA 14 - QUERY PARAMS => ENVIA OS DADOS DA REQUISIÇÃO NA URL.
// AULA 15 - ROUTE PARAMS => USADO NORMALMENTE PARA INFORMAR, ATUALIZAR OU DELETAR ALGUM DADO EM ESPECÍFICO.
// AULA 16 -  BODY PARAMS => ENVIA OS DADOS DA REQUISIÇÃO PELO BODY EM UM JSON.




/*                                    QUERY PARAMS 

//   O CLIENTE REQUISITA ALGUMA INFORMAÇÃO E ELA VEIO PELA URL.

//                  http://localhost:3000/users?name=isaque&age=24 */

/*

const express = require('express');
const port = 3000;
const app = express();

app.get("/users", (req, res) => {

    const { name, age } = req.query
    return res.json({ name, age })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

*/





//                                   ROUTE PARAMS     

//   O CLIENTE REQUISITOU AO SERVIDOR APENAS INFORMAÇÃO DO ID:2 //

//   /USERS/ 2

/*
const express = require('express');
const port = 3000;
const app = express();

app.get("/users/:id", (request, response) => {
    const { id } = request.params
    return response.json({ id });
})

app.listen(port, () => {
    console.log(`Server started onde port ${port}`)
});

* /




//                                        BODY PARAMS 

//   PARA SER FEITA A TROCA DE DADOS ENTRE O FRONT E BACK-END PRECISAMOS INFORMAR PARA O EXPRESS EM QUAL DOS PADRÕES SERÃO ENVIADOS OS DADOS,
//   JÁ QUE TEM VÁRIOS PADRÕES: JSON, XML, YAML, EDN, etc... SEMPRE COLOCAREMOS app.use(express.json()) 
//   ABAIXO DA const app = express(), (SEMPRE ANTES DAS ROTAS.)

/*  OS DADOS CHEGARÃO ATÉ O TERMINAL E RESPONDEREMOS COM UMA MENSAGEM.

    {
        "name": "Isaque", "age": 24
    }

*/

/*
const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());


app.get("/users/", (req, res) => {

    console.log(req.body)
    return response.json({ message: "OK" })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});


//  NESSE CASO O BACK-END ENVIARÁ DE VOLTA PARA O CLIENTE, " NAME " E " AGE ".


const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());


app.get("/users/", (req, res) => {

    const { name, age } = req.body
    return res.json({ name, age })
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

*/




// UTILIZANDO VERBOS HTTP: GET, POST, PUT E DELETE. 

// AULAS: 17 Pt-1 (GET/ POST); 18 Pt-2 (PUT); 19 Pt-3 (DELETE).

// AULA 17 - Pt-1 (GET/ POST);

// const express = require('express');
// const port = 3000;
// const app = express();
// app.use (express.json());


// const users = []

// app.get ("/users", (req, res) => {

//     return res.json(users)

// });



// app.listen (port, () => {
//     console.log(`Server started on port ${port}`)
// });





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































// const express = require('express')
// const uuid = require('uuid')

// const app = express()
// const port = 3000
// app.use(express.json())

// const users = []

// app.get('/users', (req, res) => {
//     const {name, age, city} = req.query
//     return res.json(users)
// })
// app.post('/users', (req, res) => {
//     const {name, age, city} = req.body
//     const user = {name, age, city, id: uuid.v4()}

//     users.push(user)
//     return res.json(user)
// })
// app.put('/users/:id', (req, res) => {
//     const {id} = req.params
//     const {name, age, city} = req.body

//     const updatedUser = {name, age, city, id}
//     const index = users.findIndex(user => user.id === id)

//     if(index < 0) {
//         return res.status(404).json({message: "User not found"})
//     }
//     users[index] = updatedUser
//     return res.json(updatedUser)
// })
// app.delete('/users/:id', (req, res) => {
//     const {id} = req.params
//     const index = users.findIndex(user => user.id === id)

//     if(index < 0) {
//         return res.status(404).json({message: "User not found"})
//     }

//     users.splice(index, 1)
//     return res.status(204).json({message: "User successfully deleted."})
// })

// app.listen(port, () => {
//     console.log(`Server started on port ${port}`)
// })















