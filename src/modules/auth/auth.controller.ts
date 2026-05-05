import type { FastifyInstance } from "fastify";
import { AuthService } from "./auth.service.js";

export async function authRoutes(app: FastifyInstance) {
  const service = new AuthService();

  app.post("/login", async (req, reply) => {
    const { email, password } = req.body as any;

    const user = await service.login(email, password);

    const token = app.jwt.sign({
      sub: user.id,
      email: user.email,
    });

    return reply.send({ token });
  });
}