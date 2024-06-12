import { Task } from "@prisma/client";

import TaskRepository from "@/repositories/TaskRepository";

class TasksService {
  private repository: TaskRepository;

  constructor() {
    this.repository = new TaskRepository();
  }

  getAll(userId: string) {
    return this.repository.getAll(userId);
  }

  getById(id: number) {
    return this.repository.getById(id);
  }

  save(task: Omit<Task, "id">) {
    return this.repository.save(task);
  }

  update(task: Task) {
    return this.repository.update(task);
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}

// make it always export the same instance
export const tasksService = new TasksService();
