import { TaskFilter } from "@/repositories/TaskFilter";
import { tasksService } from "@/services/tasks.service";
import { Task } from "@prisma/client";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId") as string;

  if (!userId) {
    return Response.json({ message: "userId is required" }, { status: 400 });
  }

  const dateParam = searchParams.get("date");
  const date = dateParam ? new Date(dateParam) : undefined;

  const completedParam = searchParams.get("completed");
  let completed = undefined;
  if (completedParam) {
    if (completedParam === 'true') {
      completed = true;
    } else if (completedParam === 'false') {
      completed = false;
    }
  }
  
  const filters: TaskFilter = {
    title: searchParams.get("title") || undefined,
    description: searchParams.get("description") || undefined,
    date,
    completed,
  }

  // Pass filters object to the getAll method
  const tasks = await tasksService.get(userId, filters);
  return Response.json(tasks);
}

export async function POST(req: Request, res: Response) {
  const data: Omit<Task, "id"> = await req.json();
  const task = await tasksService.save(data);
  return Response.json(task);
}

export async function PUT(req: Request, res: Response) {
  const data: Task = await req.json();
  const task = await tasksService.update(data);
  return Response.json(task);
}
