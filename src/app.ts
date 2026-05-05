import Fasfity from "fastify"
import jwt from "@fastify/jwt"
import cors from "@fastify/cors"
import { usersRoutes } from "./modules/users/users.controller.js";



export function buildApp() {

    const app = Fasfity()

    app.register(cors)
    app.register(jwt, {
        secret: process.env.JWT_SECRET!
    })
    app.register(usersRoutes)

    return app


}