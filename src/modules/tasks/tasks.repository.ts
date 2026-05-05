import { prisma } from "../../shared/plugins/prisma.js";
import { TaskStatus } from "@prisma/client";

export class TasksRepository {
  create(data: any) {
    return prisma.task.create({ data });
  }

  findByTeam(teamId: string) {
    return prisma.task.findMany({
      where: { teamId },
    });
  }

  updateStatus(taskId: string, status: TaskStatus) {
    return prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
  }
}