import DBService from './db.service';

import Task from '@/interfaces/Task';

class TasksService {
    private dbService: DBService;

    constructor() {
        this.dbService = new DBService('tasks');
    }

    find(): Task[] {
        return this.dbService.find();
    }

    create(task: Task): void {
        this.dbService.create(task);
    }

    update(task: Task): void {
        this.dbService.update(task);
    }

    delete(id: number): void {
        this.dbService.delete(id);
    }
}

// make it allways export the same instance
export const tasksService = new TasksService();