import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/SideBar";
import { AssignmentForm } from "../features/assignments/components/AssignmentForm";
import { AssignmentList } from "../features/assignments/components/AssignmentList";
import { addAssignment, deleteAssignment, fetchAssignments, toggleComplete } from "../features/assignments/assignmentsSlice";
import type { Assignment, AssignmentFormValues } from "../features/assignments/types";
import { setStatusFilter } from "../features/filters/filterSlice";
import { fetchCourses } from "../features/courses/coursesSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export default function AssignmentPage() {
  const dispatch = useAppDispatch();
  const assignments = useAppSelector((state) => state.assignments.assignments);
  const loading = useAppSelector((state) => state.assignments.loading);
  const filter = useAppSelector((state) => state.filters.status);
  const courses = useAppSelector((state) => state.courses.items);
  const coursesLoading = useAppSelector((state) => state.courses.loading);
  const coursesError = useAppSelector((state) => state.courses.error);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    void dispatch(fetchAssignments());
    void dispatch(fetchCourses());
  }, [dispatch]);

  const taskStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return {
      all: assignments.length,
      incomplete: assignments.filter((assignment) => !assignment.completed).length,
      completed: assignments.filter((assignment) => assignment.completed).length,
      overdue: assignments.filter((assignment) => {
        const dueDate = new Date(`${assignment.dueDate}T00:00:00`);
        return !assignment.completed && dueDate < today;
      }).length,
    };
  }, [assignments]);

  const handleAddAssignment = (values: AssignmentFormValues) => {
    const assignment: Assignment = {
      ...values,
      id: crypto.randomUUID(),
      completed: false,
    };
    dispatch(addAssignment(assignment));
  };

  return (
    <div className="app-shell">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="workspace">
        <Sidebar
          filter={filter}
          setFilter={(nextFilter) => dispatch(setStatusFilter(nextFilter))}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          courses={courses}
          taskStats={taskStats}
        />

        <main className="assignment-main">
          <div className="main-heading">
            <h2>Danh sách bài tập</h2>
            <button
              type="button"
              onClick={() => document.getElementById("assignment-form")?.scrollIntoView({ behavior: "smooth" })}
              className="add-mobile"
            >
              <Plus aria-hidden="true" /> Thêm
            </button>
          </div>

          <p className="section-label">Bài tập</p>

          {loading ? (
            <p className="loading-state">Đang tải bài tập...</p>
          ) : (
            <AssignmentList.Root
              assignments={assignments}
              filter={filter}
              selectedSubject={selectedSubject}
              searchQuery={searchQuery}
              onToggleComplete={(id) => dispatch(toggleComplete(id))}
              onDelete={(id) => dispatch(deleteAssignment(id))}
              className="assignment-list"
            >
              <AssignmentList.Empty />
              <AssignmentList.Items />
            </AssignmentList.Root>
          )}
        </main>

        <aside id="assignment-form" className="form-panel">
          {coursesError && <p role="alert" className="form-error">{coursesError}</p>}
          <AssignmentForm onAdd={handleAddAssignment} courses={courses} coursesLoading={coursesLoading} />
        </aside>
      </div>
    </div>
  );
}