import { useAssignmentForm } from "../hooks";
import type { AssignmentFormValues } from "../types";
import type { Course } from "../../courses/types";

interface AssignmentFormProps {
  onAdd: (assignment: AssignmentFormValues) => void;
  courses: Course[];
  coursesLoading: boolean;
}

export const AssignmentForm = ({ onAdd, courses, coursesLoading }: AssignmentFormProps) => {
  const { formValues, handleInputChange, handleSubmit, reset } = useAssignmentForm(onAdd);

  return (
    <div>
      <h2>Thêm bài tập mới</h2>
      
      <form onSubmit={handleSubmit} className="assignment-form">
        <div className="form-field">
          <label htmlFor="assignment-title">
            Tên bài tập <span className="required-mark">*</span>
          </label>
          <input
            id="assignment-title"
            type="text"
            required
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            placeholder="VD: Tiểu luận Lịch sử Đảng..."
            className="form-control"
          />
        </div>

        <div className="form-field">
          <label htmlFor="assignment-course">
            Môn học
          </label>
          <select
            id="assignment-course"
            name="course"
            value={formValues.course}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="" disabled>
              {coursesLoading ? "Đang tải khóa học..." : "Chọn khóa học"}
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>{course.name}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="assignment-due-date">
            Hạn nộp <span className="required-mark">*</span>
          </label>
          <input
            id="assignment-due-date"
            type="date"
            required
            name="dueDate"
            value={formValues.dueDate}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-field">
          <label htmlFor="assignment-priority">
            Độ ưu tiên
          </label>
          <select id="assignment-priority" name="priority" value={formValues.priority} onChange={handleInputChange} className="form-control">
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={reset}
            className="button-secondary"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={!formValues.course.trim() || !formValues.title.trim() || !formValues.dueDate}
            className="button-primary"
          >
            Lưu bài tập
          </button>
        </div>
      </form>
    </div>
  );
};