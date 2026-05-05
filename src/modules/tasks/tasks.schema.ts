import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  teamId: z.string().uuid(),
});

export const updateStatusSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]),
});

export type CreateTaskDTO = z.infer<typeof createTaskSchema>;