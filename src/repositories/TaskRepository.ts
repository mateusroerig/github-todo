import { Task } from "@prisma/client";

import prisma from "../../lib/prisma";

export default class TaskRepository {
  getAll() {
    return prisma.task.findMany({
      where: {
        userId: 1,
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
