export interface CreateTaskInput {
   title:string;
   description:string;
   status?:"pending" | "in_progress" | "completed";
   priority?:"low" | "medium" | "high";
   dueDate?:Date;
}

export interface QueryParamsType {
   page?:string;
   limit?:string;
   status?:string;
   priority?:string;
   sort?:string;
}