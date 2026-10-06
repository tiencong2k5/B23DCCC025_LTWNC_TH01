import { isAssignmentList, type Assignment } from "../features/assignments/types";
import { isCourseList, type Course } from "../features/courses/types";

const mockCourses: unknown = [
	{ id: "course-web", name: "Lập trình Web" },
	{ id: "course-database", name: "Cơ sở dữ liệu" },
	{ id: "course-testing", name: "Kiểm thử phần mềm" },
];

const mockAssignments: unknown = [
	{
		id: "assignment-1",
		course: "Lập trình Web",
		title: "Xây dựng giao diện React",
		dueDate: "2026-10-15",
		priority: "high",
		completed: false,
	},
	{
		id: "assignment-2",
		course: "Cơ sở dữ liệu",
		title: "Thiết kế sơ đồ ERD",
		dueDate: "2026-10-20",
		priority: "medium",
		completed: false,
	},
	{
		id: "assignment-3",
		course: "Kiểm thử phần mềm",
		title: "Viết test case",
		dueDate: "2026-10-02",
		priority: "low",
		completed: true,
	},
];

async function getMockAssignments(): Promise<unknown> {
	await new Promise((resolve) => setTimeout(resolve, 250));
	return mockAssignments;
}

async function getMockCourses(): Promise<unknown> {
	await new Promise((resolve) => setTimeout(resolve, 250));
	return mockCourses;
}

export async function fetchAssignments(): Promise<Assignment[]> {
	const response = await getMockAssignments();

	if (!isAssignmentList(response)) {
		throw new Error("Dữ liệu bài tập từ API không hợp lệ.");
	}

	return response;
}

export async function fetchCourses(): Promise<Course[]> {
	const response = await getMockCourses();

	if (!isCourseList(response)) {
		throw new Error("Dữ liệu khóa học từ API không hợp lệ.");
	}

	return response;
}
