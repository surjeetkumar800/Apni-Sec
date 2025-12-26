import { z } from "zod";

export const createIssueSchema = z.object({
  type: z.enum(["Cloud Security", "Red Team Assessment", "VAPT"]),
  title: z.string().min(3),
  description: z.string().min(5),
  priority: z.enum(["low", "medium", "high"]).optional(),
  status: z.enum(["open", "in-progress", "resolved", "closed"]).optional(),
});
