import { Task } from "@prisma/client";

import prisma from "../../lib/prisma";
import { TaskFilter } from "./TaskFilter";

export default class TaskRepository {
  get(userId: string, filters: TaskFilter) {
    return prisma.task.findMany({
      where: {
        userId: userId,
        ...(filters.title && { title: { contains: filters.title } }),
        ...(filters.description && { description: { contains: filters.description } }),
        ...(filters.date && { date: filters.date }),
        ...(filters.completed !== undefined && { completed: filters.completed }),
      },
      orderBy: {
        completed: "asc",
      }
    });
  }

  getById(id: number) {
    return prisma.task.findUnique({
      where: {
        id: id
      },
    });
  }

  save(task: Omit<Task, "id">) {
    return prisma.task.create({
      data: task,
    });
  }

  update(task: Task) {
    return prisma.task.update({
      where: {
        id: task.id,
      },
      data: task,
    });
  }

  delete(id: number) {
    return prisma.task.delete({
      where: {
        id: id,
      },
    });
  }
}
