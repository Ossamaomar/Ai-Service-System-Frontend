export type Task = {
  id: string
  title: string
  status: "todo" | "in-progress" | "done" | "canceled"
  label: "bug" | "feature" | "documentation"
  priority: "low" | "medium" | "high"
}

export const tasks: Task[] = [
  {
    id: "TASK-8782",
    title: "You can't compress the program without quantifying the open-source SSD pixel!",
    status: "in-progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
    status: "todo",
    label: "documentation",
    priority: "high",
  },
  // Add more tasks...
]