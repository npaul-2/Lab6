import { z } from 'zod';

export const StudentSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  age: z.number().min(18, "Students must be 18 or older").max(100, "Invalid age"),
  gpa: z.number().min(0).max(4.0, "GPA must be between 0 and 4.0"),
  major: z.string().min(1, "Major is required"),
  units: z.number().min(0).max(24, "Max 24 units per semester"),
  gradYear: z.number().min(2024).max(2035),
  unpaidDues: z.number().min(0),
});

export type Student = z.infer<typeof StudentSchema>;