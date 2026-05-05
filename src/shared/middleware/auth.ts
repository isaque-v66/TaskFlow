import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/app-error.js";






export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {

   
  try {
    await request.jwtVerify();
  } catch {
    throw new AppError("Unauthorized", 401);
  }
}