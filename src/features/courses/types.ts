export interface Course {
  id: string;
  name: string;
}

export function isCourse(value: unknown): value is Course {
  if (typeof value !== "object" || value === null) return false;

  const course = value as Record<string, unknown>;
  return (
    typeof course.id === "string" &&
    course.id.trim().length > 0 &&
    typeof course.name === "string" &&
    course.name.trim().length > 0
  );
}

export function isCourseList(value: unknown): value is Course[] {
  return Array.isArray(value) && value.every(isCourse);
}