import type { ChangeEvent } from "react";
import type { TaskType, TaskPriorityType } from "../types/TaskTypes";
import { useState } from "react";

const TaskCard = ({
  task,
  toggleCompleted,
  deleteTask,
  updateTask,
}: {
  task: TaskType;
  toggleCompleted(id: number): void;
  deleteTask(id: number): void;
  updateTask(
    id: number,
    nameOnEdit: string,
    taskPriority: TaskPriorityType,
  ): void;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [nameOnEdit, setNameOnEdit] = useState<string>("");
  const [taskPriority, setTaskPriority] = useState<TaskPriorityType>("medium");

  // タスク名・重要度の編集開始
  const startEdit = (taskName: string, taskPriority: TaskPriorityType) => {
    setIsEdit(true);
    setNameOnEdit(taskName);
    setTaskPriority(taskPriority);
  };

  // タスク名の受け取り処理
  const inputTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameOnEdit(e.target.value);
  };

  // タスクの登録時に選択した重要度の受け取り処理
  const selectPriority = (e: ChangeEvent<HTMLSelectElement>) => {
    if (
      e.target.value === "high" ||
      e.target.value === "medium" ||
      e.target.value === "low"
    ) {
      setTaskPriority(e.target.value);
    }
  };

  // タスクの更新処理の実行
  const editTask = (
    id: number,
    nameOnEdit: string,
    taskPriority: TaskPriorityType,
  ) => {
    const trimmedName = nameOnEdit.trim();
    if (trimmedName === "") {
      setNameOnEdit("");
      return;
    }

    updateTask(id, trimmedName, taskPriority);
    setIsEdit(false);
  };

  // タスクの更新をキャンセル
  const cancelEditTaskName = () => {
    setNameOnEdit("");
    setIsEdit(false);
  };

  return (
    <li className={`task-card ${task.completed ? "completed" : ""}`}>
      <input
        className="task-check"
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.completed}
        onChange={() => toggleCompleted(task.id)}
      />
      <div className="task-content">
        <div className="task-title-row">
          {isEdit ? (
            <>
              <div className="form-field task-name-field">
                <input
                  id={`edit-task-${task.id}`}
                  className="edit-taskName-input"
                  aria-label="タスク名の編集"
                  name="taskName"
                  type="text"
                  placeholder="⚠ タスク名は必須です。"
                  value={nameOnEdit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    inputTaskName(e)
                  }
                />
              </div>
              <div className="form-field priority-field">
                <select
                  id={`edit-priority-${task.id}`}
                  aria-label="重要度の編集"
                  name="priority"
                  value={taskPriority}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    selectPriority(e)
                  }
                >
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <span className="completed-at">{task.completedAt}</span>
              <label className="task-title" htmlFor={`task-${task.id}`}>
                {task.name}
              </label>
              <span className={`priority priority-${task.priority}`}>
                {task.priority === "high"
                  ? "高"
                  : task.priority === "medium"
                    ? "中"
                    : "低"}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="task-actions">
        {isEdit ? (
          <>
            <button
              className="icon-button"
              type="button"
              aria-label={`編集したタスクを保存`}
              title="タスクの編集"
              value={nameOnEdit}
              onClick={() => editTask(task.id, nameOnEdit, taskPriority)}
            >
              &#12295;
            </button>
            <button
              className="icon-button"
              type="button"
              aria-label={`${nameOnEdit}をキャンセル`}
              title="キャンセル"
              value={nameOnEdit}
              onClick={cancelEditTaskName}
            >
              &#10005;
            </button>
          </>
        ) : (
          <button
            className="icon-button"
            type="button"
            aria-label={`${task.name}を編集`}
            title="編集"
            onClick={() => startEdit(task.name, task.priority)}
          >
            &#x270E;
          </button>
        )}
        <button
          className="icon-button delete-button"
          type="button"
          aria-label={`${task.name}を削除`}
          title="削除"
          onClick={() => deleteTask(task.id)}
        >
          &#x1F5D1;
        </button>
      </div>
    </li>
  );
};

export default TaskCard;
