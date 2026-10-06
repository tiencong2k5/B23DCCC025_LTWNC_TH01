//  useFilteredAssignments : Trả về danh sách đã lọc theo trạng thái: Tất cả / Chưa hoàn thành / Quá hạn / Đã hoàn thành

import { useMemo } from "react";
import type { Assignment, AssignmentStatusFilter } from "../assignments/types";

export function useFilteredAssignments(
    assignments: Assignment[],
    filter: AssignmentStatusFilter,
    selectedSubject: string,
    searchQuery = "",
): Assignment[] {
    return useMemo(() => {
        let filtered = assignments;

        // Lọc theo trạng thái
        switch (filter) {
            case 'incomplete':
                filtered = filtered.filter((a) => !a.completed);
                break;
            case 'completed':
                filtered = filtered.filter((a) => a.completed);
                break;
            case 'overdue':
                filtered = filtered.filter((a) => {
                    const dueDate = new Date(`${a.dueDate}T00:00:00`);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return !a.completed && dueDate < today;
                });
                break;
            default:
                break;
        }

        // Lọc theo môn học
        if (selectedSubject) {
            filtered = filtered.filter((a) => a.course === selectedSubject);
        }

        const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
        if (normalizedQuery) {
            filtered = filtered.filter((a) =>
                `${a.title} ${a.course}`.toLocaleLowerCase().includes(normalizedQuery),
            );
        }

        return filtered;
    }, [assignments, filter, searchQuery, selectedSubject]);
}
