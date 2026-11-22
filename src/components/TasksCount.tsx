import type { TasksCountType } from "../types/TaskTypes";

const TasksCount = ({ tasksCount }: { tasksCount: TasksCountType }) => {
  return (
    <section className="summary" aria-label="タスクの件数">
      <div className="summary-item">
        <span className="summary-label">未完了</span>
        <strong className="summary-count">{tasksCount.incomplete}</strong>
      </div>
      <div className="summary-item">
        <span className="summary-label">完了</span>
        <strong className="summary-count">{tasksCount.completed}</strong>
      </div>
      <div className="summary-item">
        <span className="summary-label">すべて</span>
        <strong className="summary-count">{tasksCount.all}</strong>
      </div>
    </section>
  );
};

export default TasksCount;
