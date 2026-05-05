import type { FastifyInstance } from "fastify";
import { UsersService } from "./users.service.js";
import { UsersRepository } from "./users.repository.js";



export async function usersRoutes(app: FastifyInstance) {
    const service = new UsersService(new UsersRepository())


    app.post("/users", async (req, reply) => {
        const body = req.body as any

        const user = await service.create(body)


        return reply.send(user)
    })



}