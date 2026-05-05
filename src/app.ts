import Fasfity from "fastify"
import cors from "@fastify/cors"
import { usersRoutes } from "./modules/users/users.controller.js";
import { authRoutes } from "./modules/auth/auth.controller.js";
import { teamsRoutes } from "./modules/teams/teams.controller.js";
import { tasksRoutes } from "./modules/tasks/tasks.controller.js";
import { AppError } from "./shared/errors/app-error.js";
import jwtPlugin from "./shared/plugins/jwt.js"
import { ZodError } from "zod";


export function buildApp() {

    const app = Fasfity()

    app.register(cors)
    app.register(jwtPlugin)
    app.register(usersRoutes)
    app.register(authRoutes)
    app.register(teamsRoutes)
    app.register(tasksRoutes)



    app.setErrorHandler((error, _, reply) => {
        if (error instanceof AppError) {
            return reply.status(error.statusCode).send({
            message: error.message,
            });
        }

        if (error instanceof ZodError) {
            return reply.status(400).send({
            message: "Validation error",
            issues: error.format(),
            });
        }

        console.error(error);

        return reply.status(500).send({
            message: "Internal server error",
        });
        });

    return app


}


