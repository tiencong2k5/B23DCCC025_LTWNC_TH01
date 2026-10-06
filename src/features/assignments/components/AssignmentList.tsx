import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Book } from "lucide-react";
import type { Assignment, AssignmentStatusFilter } from "../types";
import { useFilteredAssignments } from "../../filters/hook";
import { AssignmentItem } from "./AssignmentItem";

interface AssignmentListContextValue {
  assignments: Assignment[];
  filter: AssignmentStatusFilter;
  selectedSubject: string;
  searchQuery: string;
  onToggleComplete: (assignmentId: string) => void;
  onDelete: (assignmentId: string) => void;
}

const AssignmentListContext = createContext<AssignmentListContextValue | null>(null);

function useAssignmentListContext(): AssignmentListContextValue {
  const context = useContext(AssignmentListContext);
  if (!context) {
    throw new Error("AssignmentList components must be rendered inside AssignmentList.Root.");
  }
  return context;
}

interface AssignmentListRootProps extends AssignmentListContextValue {
  children: ReactNode;
  className?: string;
}

function Root({ children, className = "", ...value }: AssignmentListRootProps) {
  return (
    <AssignmentListContext.Provider value={value}>
      <div className={className}>{children}</div>
    </AssignmentListContext.Provider>
  );
}

function Items() {
  const { assignments, filter, selectedSubject, searchQuery, onToggleComplete, onDelete } =
    useAssignmentListContext();
  const filteredAssignments = useFilteredAssignments(
    assignments,
    filter,
    selectedSubject,
    searchQuery,
  );

  return (
    <div className="space-y-4">
      {filteredAssignments.map((assignment) => (
        <AssignmentItem
          key={assignment.id}
          assignment={assignment}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function Empty() {
  const { assignments, filter, selectedSubject, searchQuery } = useAssignmentListContext();
  const filteredAssignments = useFilteredAssignments(
    assignments,
    filter,
    selectedSubject,
    searchQuery,
  );

  if (filteredAssignments.length > 0) return null;

  return (
    <div className="empty-state">
      <Book aria-hidden="true" />
      <p>Không có bài tập nào phù hợp.</p>
    </div>
  );
}

export const AssignmentList = { Root, Items, Empty };

