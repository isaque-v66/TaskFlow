import type { FastifyInstance } from "fastify";
import { UsersService } from "./users.service.js";
import { UsersRepository } from "./users.repository.js";
import { createUserSchema } from "./users.schema.js";



export async function usersRoutes(app: FastifyInstance) {
    const service = new UsersService(new UsersRepository())


    app.post("/users", async (req, reply) => {
        const data = createUserSchema.parse(req.body);

        const user = await service.create(data);

        return reply.send(user);
    });


}