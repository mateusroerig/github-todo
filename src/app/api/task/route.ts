import { tasksService } from "@/services/tasks.service";
import { Task } from "@prisma/client";

export async function GET(req: Request, res: Response) {
  const tasks = await tasksService.getAll();
  return Response.json(tasks);
}

export async function POST(req: Request, res: Response) {
  const data: Omit<Task, 'id'> = await req.json()
  const task = await tasksService.save(data);
  return Response.json(task);
}

export async function PUT(req: Request, res: Response) {
  const data: Task = await req.json()
  const task = await tasksService.update(data);
  return Response.json(task);
}
