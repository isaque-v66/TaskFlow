import type { FastifyInstance } from "fastify";
import { TeamsService } from "./teams.service.js";
import { TeamsRepository } from "./teams.repository.js";
import { authMiddleware } from "../../shared/middleware/auth.js";
import { addMemberSchema, createTeamSchema } from "./teams.schema.js";

export async function teamsRoutes(app: FastifyInstance) {
  const service = new TeamsService(new TeamsRepository());

  app.post("/teams", { preHandler: [authMiddleware] }, async (req: any) => {
    const { name } = createTeamSchema.parse(req.body);
    const userId = req.user.sub;

    return service.create(name, userId);
  });

  app.post(
    "/teams/:teamId/members",
    { preHandler: [authMiddleware] },
    async (req: any) => {
      const { teamId } = req.params;
      const { userId } = addMemberSchema.parse(req.body);
      const requesterId = req.user.sub;

      return service.addMember(teamId, userId, requesterId);
    }
  );
}