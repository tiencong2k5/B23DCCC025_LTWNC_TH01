// Bước 2: Định nghĩa kiểu dữ liệu với TypeScript

export const PRIORITIES = ["low", "medium", "high"] as const;

export type AssignmentPriority = (typeof PRIORITIES)[number];

export type AssignmentStatusFilter =
	| "all"
	| "incomplete"
	| "overdue"
	| "completed";

export interface Assignment {
	id: string;
	course: string;
	title: string;
	dueDate: string;
	priority: AssignmentPriority;
	completed: boolean;
}

export type AssignmentFormValues = Pick<
	Assignment,
	"course" | "title" | "dueDate" | "priority"
>;

export type CreateAssignmentInput = Omit<Assignment, "id" | "completed">;

export type UpdateAssignmentInput = Partial<
	Pick<Assignment, "course" | "title" | "dueDate" | "priority" | "completed">
>;

export function isAssignmentPriority(value: unknown): value is AssignmentPriority {
	return (
		typeof value === "string" &&
		PRIORITIES.some((priority) => priority === value)
	);
}

export function isIsoDate(value: unknown): value is string {
	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return false;
	}

	const parsedDate = new Date(`${value}T00:00:00.000Z`);
	return !Number.isNaN(parsedDate.getTime()) &&
		parsedDate.toISOString().slice(0, 10) === value;
}

export function isAssignment(value: unknown): value is Assignment {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const assignment = value as Record<string, unknown>;

	return (
		typeof assignment.id === "string" &&
		assignment.id.trim().length > 0 &&
		typeof assignment.course === "string" &&
		assignment.course.trim().length > 0 &&
		typeof assignment.title === "string" &&
		assignment.title.trim().length > 0 &&
		isIsoDate(assignment.dueDate) &&
		isAssignmentPriority(assignment.priority) &&
		typeof assignment.completed === "boolean"
	);
}

export function isArrayOf<T>(
	value: unknown,
	isItem: (item: unknown) => item is T,
): value is T[] {
	return Array.isArray(value) && value.every(isItem);
}

export function isAssignmentList(value: unknown): value is Assignment[] {
	return isArrayOf(value, isAssignment);
}
