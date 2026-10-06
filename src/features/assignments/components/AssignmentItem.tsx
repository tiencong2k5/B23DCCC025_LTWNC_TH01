
import { Circle, CheckCircle2, Book, Clock, AlertCircle, Trash2} from "lucide-react";
import type { Assignment } from "../types";
import { useDeadlineStatus } from "../hooks";

interface AssignmentItemProps {
  assignment: Assignment;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AssignmentItem : React.FC<AssignmentItemProps> = ({ assignment, onToggleComplete, onDelete }) =>{
  const deadlineStatus = useDeadlineStatus(assignment.dueDate, assignment.completed);
    const itemStatus = {
    text: deadlineStatus.label,
    color: assignment.completed ? 'completed-status' : deadlineStatus.isOverdue ? 'overdue' : '',
    isOverdue: deadlineStatus.isOverdue,
    };

    return(
        <article className={`assignment-row ${assignment.completed ? "completed" : ""}`}>
                    <button 
                type="button"
                        onClick={() => onToggleComplete(assignment.id)}
                className={`complete-button ${assignment.completed ? "is-complete" : ""}`}
                aria-label={assignment.completed ? "Bỏ đánh dấu hoàn thành" : "Đánh dấu hoàn thành"}
                    >
                        {assignment.completed ? (
                          <CheckCircle2 className="w-6 h-6 fill-emerald-100" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                    </button>

                    <div className="assignment-copy">
                        <h3 className="assignment-title">
                          {assignment.title}
                        </h3>
                        
                        <div className="assignment-meta">
                          <span className="course-badge">
                            <Book aria-hidden="true" />
                            {assignment.course}
                          </span>
                          <span className={`deadline-status ${itemStatus.color}`}>
                            {itemStatus.isOverdue ? <AlertCircle aria-hidden="true" /> : <Clock aria-hidden="true" />}
                            {itemStatus.text}
                          </span>
                          <span className="priority-badge">{assignment.priority}</span>
                        </div>
                    </div>
                    <div className="row-actions">
                      <button 
                        type="button"
                        onClick={() => onDelete(assignment.id)}
                        className="row-action delete"
                        title="Xóa"
                        aria-label={`Xóa ${assignment.title}`}
                      >
                        <Trash2 aria-hidden="true" />
                      </button>
                    </div>
        </article>
    );
};