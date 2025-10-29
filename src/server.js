
import ENVIRONMENT from './config/environment.config.js'
import connectMongoDB from "./config/mongoDB.config.js";
import express, { request, response } from 'express'
import Workspaces from './models/Workspace.model.js';
connectMongoDB()
import UserRepository from "./repositories/user.repository.js";
import mongoose from "mongoose";
import { validarId } from './utils/validations.utils.js';
import WorkspacesRepository from './repositories/workspace.repository.js';
import workspace_router from './routes/workspace.route.js';
import auth_router from './routes/auth.router.js';
import jwt from 'jsonwebtoken'
import cors from 'cors'
import authMiddleware from './middleware/auth.middleware.js';
import MemberWorkspaceRepository from './repositories/memberWorkspace.repository.js';

// const token_test = jwt.sign(
//     {
//     nombre: 'pepe'
// }, 
// ENVIRONMENT.JWT_SECRET_KEY, 
// {expiresIn: '24h'}
// )
// console.log(token_test)
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/ping', (request, response) =>{
    response.send({
        ok: true,
        message: 'pong'
    })
}
)



app.use('/api/workspace', workspace_router)
app.use('/api/auth', auth_router)


const randomMiddleware = (min_numero_random) =>{
    
return (request, response, next) =>{
    const numero_random = Math.random()
    if(numero_random < min_numero_random){
        response.send({message: 'tienes mala suerte '})
    }
    else{
        request.tieneSuerte = true
        next()
    }
}


}




app.get('/test', randomMiddleware(0.9), (request, response)=>{
console.log(request.tieneSuerte)
   response.send({
    ok: true
   })
})
app.get('/ruta-protegida', authMiddleware, (request, response)  => {

      console.log(request.user)
      response.send({
        ok: true
      })

})
app.listen(
    8080,
    () => {
        console.log("esto esta funcionando")
    }
)


// MemberWorkspaceRepository.create('69001afcd80d083759b535ec', 
//     '68fe8f17b183eec244021c31' )
MemberWorkspaceRepository.getAllworkspaceByUserId('69001afcd80d083759b535ec')