import type { FastifyInstance } from "fastify";
import { TasksService } from "./tasks.service.js";
import { TasksRepository } from "./tasks.repository.js";
import { authMiddleware } from "../../shared/middleware/auth.js";

import {
  createTaskSchema,
  updateStatusSchema,
} from "./tasks.schema.js";

export async function tasksRoutes(app: FastifyInstance) {
  const service = new TasksService(new TasksRepository());

  
  app.post(
    "/tasks",
    { preHandler: [authMiddleware] },
    async (req: any, reply) => {
      const data = createTaskSchema.parse(req.body);

      const result = await service.create(data, req.user.sub);

      return reply.send(result);
    }
  );

  
  app.get(
    "/teams/:teamId/tasks",
    { preHandler: [authMiddleware] },
    async (req: any, reply) => {
      const { teamId } = req.params;

      const tasks = await service.list(teamId);

      return reply.send(tasks);
    }
  );

  
  app.patch(
    "/tasks/:taskId/status",
    { preHandler: [authMiddleware] },
    async (req: any, reply) => {
      const { status } = updateStatusSchema.parse(req.body);

      const { taskId } = req.params;

      const updated = await service.updateStatus(taskId, status);

      return reply.send(updated);
    }
  );
}