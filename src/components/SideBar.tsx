import type { AssignmentStatusFilter } from "../features/assignments/types";
import type { Course } from "../features/courses/types";

interface SidebarProps {
  filter: AssignmentStatusFilter;
  setFilter: (filter: AssignmentStatusFilter) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  courses: Course[];
  taskStats: { all: number; incomplete: number; completed: number; overdue: number };
}

export const Sidebar = ({ 
  filter, setFilter, 
  selectedSubject, setSelectedSubject,
  courses,
  taskStats 
}: SidebarProps) => {
  const filters = [
    { id: 'all', label: 'Tất cả', count: taskStats.all },
    { id: 'incomplete', label: 'Đang làm', count: taskStats.incomplete },
    { id: 'completed', label: 'Đã xong', count: taskStats.completed },
    { id: 'overdue', label: 'Quá hạn', count: taskStats.overdue },
  ];

  return (
    <aside className="sidebar">
      <div className="filter-group">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as AssignmentStatusFilter)}
              className={`filter-button ${filter === f.id ? "active" : ""}`}
            >
              <span>{f.label}</span>
              <span className="filter-count">
                {f.count}
              </span>
            </button>
          ))}
        </div>

      <div>
        <h3 className="sidebar-heading">
          Môn học
        </h3>
        <div className="course-list">
          {[{ id: "all", name: "Tất cả" }, ...courses].map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedSubject(course.id === "all" ? "" : course.name)}
              className={`course-button ${(course.id === "all" ? selectedSubject === "" : selectedSubject === course.name) ? "active" : ""}`}
            >
              {course.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};