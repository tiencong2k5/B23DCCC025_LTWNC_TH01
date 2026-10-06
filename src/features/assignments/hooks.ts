import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { AssignmentFormValues } from "./types";

function getLocalDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getDateOrdinal(dateKey: string): number | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
    if (!match) return null;

    const [, year, month, day] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    if (getLocalDateKey(date) !== dateKey) return null;

    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

export function useDeadlineStatus(dueDate: string, completed = false) {
    const [todayKey, setTodayKey] = useState(() => getLocalDateKey(new Date()));

    useEffect(() => {
        const now = new Date();
        const nextMidnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
        );
        const timeout = window.setTimeout(() => {
            setTodayKey(getLocalDateKey(new Date()));
        }, nextMidnight.getTime() - now.getTime());

        return () => window.clearTimeout(timeout);
    }, [todayKey]);

    return useMemo(() => {
        const dueOrdinal = getDateOrdinal(dueDate);
        const todayOrdinal = getDateOrdinal(todayKey);
        const daysRemaining =
            dueOrdinal === null || todayOrdinal === null
                ? 0
                : (dueOrdinal - todayOrdinal) / 86_400_000;
        const isOverdue = !completed && daysRemaining < 0;
        const label = completed
            ? "Đã hoàn thành"
            : isOverdue
                ? `Quá hạn ${Math.abs(daysRemaining)} ngày`
                : `Còn ${daysRemaining} ngày`;

        return { daysRemaining, isOverdue, label };
    }, [completed, dueDate, todayKey]);
}

const emptyFormValues: AssignmentFormValues = {
    course: "",
    title: "",
    dueDate: "",
    priority: "medium",
};

export function useAssignmentForm(
    onSubmit: (values: AssignmentFormValues) => void,
) {
    const [formValues, setFormValues] = useState<AssignmentFormValues>(emptyFormValues);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = event.currentTarget;
        if (name === "course" || name === "title" || name === "dueDate") {
            setFormValues((current) => ({ ...current, [name]: value }));
        } else if (name === "priority" && (value === "low" || value === "medium" || value === "high")) {
            setFormValues((current) => ({ ...current, priority: value }));
        }
    };

    const reset = () => setFormValues(emptyFormValues);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formValues.course.trim() || !formValues.title.trim() || !formValues.dueDate) {
            return;
        }

        onSubmit({
            ...formValues,
            course: formValues.course.trim(),
            title: formValues.title.trim(),
        });
        reset();
    };

    return { formValues, handleInputChange, handleSubmit, reset };
}