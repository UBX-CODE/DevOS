export interface ITask {
  title: string;

  description: string;

  status:
    | "TODO"
    | "IN_PROGRESS"
    | "DONE";

  priority:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

  projectId: string;

  userId: string;
}