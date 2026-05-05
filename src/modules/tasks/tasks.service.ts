import { TasksRepository } from "./tasks.repository.js";
import { prisma } from "../../shared/plugins/prisma.js";
import { TaskStatus } from "@prisma/client";


export class TasksService {
  constructor(private repo: TasksRepository) {}

  async create(data: any, userId: string) {
    const membership = await prisma.membership.findFirst({
      where: {
        userId,
        teamId: data.teamId,
      },
    });

    if (!membership) {
      throw new Error("Not part of this team");
    }

    return this.repo.create({
      ...data,
      authorId: userId,
    });
  }

  list(teamId: string) {
    return this.repo.findByTeam(teamId);
  }

  updateStatus(taskId: string, status: TaskStatus) {
    return this.repo.updateStatus(taskId, status);
  }
}