export interface CreateTaskInput {
   title:string;
   description:string;
   status?:"pending" | "in_progress" | "completed";
   priority?:"low" | "medium" | "high";
   dueDate?:Date;
}