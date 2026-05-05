import { prisma } from "../../shared/plugins/prisma.js";

export class TeamsRepository {
  create(name: string, userId: string) {
    return prisma.team.create({
      data: {
        name,
        members: {
          create: {
            userId,
            role: "ADMIN",
          },
        },
      },
    });
  }

  addMember(teamId: string, userId: string) {
    return prisma.membership.create({
      data: {
        teamId,
        userId,
        role: "MEMBER",
      },
    });
  }

  findMembership(userId: string, teamId: string) {
    return prisma.membership.findFirst({
      where: { userId, teamId },
    });
  }
}