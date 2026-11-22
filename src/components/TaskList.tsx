import type {
  TaskType,
  TaskStatusType,
  TaskPriorityType,
} from "../types/TaskTypes";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

const TaskList = ({
  tasks,
  selectedFilter,
  setSelectedFilter,
  notificationId,
  toggleCompleted,
  deleteTask,
  updateTask,
}: {
  tasks: TaskType[];
  selectedFilter: TaskStatusType;
  setSelectedFilter(status: TaskStatusType): void;
  notificationId: number;
  toggleCompleted(id: number): void;
  deleteTask(id: number): void;
  updateTask(
    id: number,
    nameOnEdit: string,
    taskPriority: TaskPriorityType,
  ): void;
}) => {
  // 絞り込みで「完了」を選択している時の通知の状態管理
  const [notify, setNotify] = useState<boolean>(false);

  // タスクを絞り込む処理
  const filteredTasks = tasks.filter((task) => {
    // 未完了ボタンが押された時
    if (selectedFilter === "incomplete") return !task.completed;

    // 完了ボタンが押された時
    if (selectedFilter === "completed") return task.completed;

    // すべてボタンが押された時
    if (selectedFilter === "all") return true;
  });

  // 絞り込みで「完了」を選択している時に必要な設定
  // これをしないと、[完了]ボタンを押しただけで通知されてしまう。
  useEffect(() => {
    if (notificationId === 0) return;

    const timer = window.setTimeout(() => {
      setNotify(true);
    }, 10);

    return () => window.clearTimeout(timer);
  }, [notificationId]);

  return (
    <section className="tasks-section" aria-labelledby="tasks-heading">
      <div className="tasks-heading-row">
        <h2 id="tasks-heading">タスク一覧</h2>
        {/* タスクフィルターエリア */}
        <div className="filters" role="group" aria-label="表示するタスク">
          <button
            className={`filter-button ${selectedFilter === "incomplete" ? "active" : ""} ${
              notify ? "notify" : ""
            }`}
            type="button"
            aria-pressed={selectedFilter === "incomplete"}
            onClick={() => setSelectedFilter("incomplete")}
            onAnimationEnd={() => setNotify(false)}
          >
            未完了
          </button>
          <button
            className={`filter-button ${selectedFilter === "completed" ? "active" : ""}`}
            type="button"
            aria-pressed={selectedFilter === "completed"}
            onClick={() => setSelectedFilter("completed")}
          >
            完了
          </button>
          <button
            className={`filter-button ${selectedFilter === "all" ? "active" : ""}`}
            type="button"
            aria-pressed={selectedFilter === "all"}
            onClick={() => setSelectedFilter("all")}
          >
            すべて
          </button>
        </div>
      </div>

      {/* タスクカードエリア */}
      {filteredTasks.length === 0 ? (
        <>
          <p className="empty-message">タスクがありません</p>
        </>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              toggleCompleted={toggleCompleted}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TaskList;
