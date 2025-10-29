import ENVIRONMENT from "../config/environment.config.js"
import transporter from "../config/mailer.config.js"
import UserRepository from "../repositories/user.repository.js"
import { ServerError } from "../utils/customError.utils.js"
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

class AuthService{
    static async register(username, password, email){

      const user_found =  await UserRepository.getByEmail(email)
      if(user_found){
        throw new ServerError(
            400, 
            'email ya utilizado'
        )
      }
     const password_hashed = await bcrypt.hash(password, 12)
     const user_created = await UserRepository.createUser(username, email, password_hashed)

    const verification_token = jwt.sign(
        {
        email:email,
        user_id: user_created._id
        },
        ENVIRONMENT.JWT_SECRET_KEY
    )


            await transporter.sendMail({
            from: 'progruser23@gmail.com',
            to: email,
            subject: 'Verificacion de correo electronico',
            html: `
            <h1>Hola desde node.js</h1>
            <p>Este es un mail de verificacion</p>
             <a href='${ENVIRONMENT.URL_API_BACKEND}/api/auth/verify-email/${verification_token}'>Verificar email</a>
            `
        })
    }
    static async verifyEmail(verification_token){
        try{
 const payload = jwt.verify(verification_token, ENVIRONMENT.JWT_SECRET_KEY) 
console.log(payload)
 await UserRepository.updateById(
    payload.user_id,
    {
        verified_email: true
    }
 
) 
  return
   }
        
   catch(error){
    if(error instanceof jwt.JsonWebTokenError){
        throw ServerError(400, 'token invalido')
    }
    else{
        throw error
    }
   }
}
static async login(email, password){
const user = await UserRepository.getByEmail(email)
if(!user){
    throw new ServerError(400, 'email, no registraro')
}
if(user.verified_email ===false){
        throw new ServerError(400, 'email, no verificado')
}
const is_same_password = await bcrypt.compare(password, user.password)
if(!is_same_password){
    throw new ServerError(400, 'contraseña incorrecta')
}
 const authorization_token = jwt.sign(
    {
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
    }, 
    ENVIRONMENT.JWT_SECRET_KEY,
    {
        expiresIn: '7d'
    }
)
return{
    authorization_token
}

}
}

export default AuthService