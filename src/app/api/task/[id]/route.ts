import { tasksService } from "@/services/tasks.service";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
  res: Response
) {
  const task = await tasksService.getById(parseInt(params.id));
  return Response.json(task);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
  res: Response
) {
  await tasksService.delete(parseInt(params.id));
  return Response.json({ message: "Task deleted" });
}
