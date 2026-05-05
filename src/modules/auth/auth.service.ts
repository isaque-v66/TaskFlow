import {prisma} from "../../shared/plugins/prisma.js"
import bcrypt from "bcrypt"
import { AppError } from "../../shared/errors/app-error.js"


export class AuthService {
    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({where: {email}})

        if(!user) {
            throw new AppError("Credenciais inválidas", 401)
        }


        const match = await bcrypt.compare(password, user.password)

        if(!match) {
            throw new AppError("Credenciais inválidas", 401)
        }


        return user

    }
}