import type { FastifyInstance } from "fastify";
import { AuthService } from "./auth.service.js";
import { loginSchema } from "./auth.schema.js";




export async function authRoutes(app: FastifyInstance) {
  const service = new AuthService();

  app.post("/login", async (req, reply) => {
    const data = loginSchema.parse(req.body);

    const user = await service.login(data.email, data.password);

    const token = app.jwt.sign({
        sub: user.id,
    });

    return reply.send({ token });
  })
}