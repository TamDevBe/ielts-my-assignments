export type Skill = "Reading" | "Listening" | "Writing" | "Speaking";
export interface Student { id: string; fullName: string; email: string; createdAt: string }
export interface Lesson { id: string; unit: string; skill: Skill; title: string }
export interface Assignment { id: string; studentId: string; lessonId: string; title: string; dueAt: string }
export interface Submission { id: string; assignmentId: string; submittedAt: string }
