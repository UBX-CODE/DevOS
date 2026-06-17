export interface IProject {
  title: string;
  description: string;

  status:
    | "PLANNED"
    | "IN_PROGRESS"
    | "COMPLETED";

  priority:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

  githubUrl?: string;

  liveUrl?: string;

  userId: string;
}