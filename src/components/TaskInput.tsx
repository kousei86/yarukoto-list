import type { ChangeEvent, SubmitEvent } from "react";
import type { TaskPriorityType } from "../types/TaskTypes";
import { useState } from "react";

const TaskInput = ({
  addTask,
}: {
  addTask(taskName: string, taskPriority: TaskPriorityType): void;
}) => {
  // タスク名入力の状態管理
  const [taskName, setTaskName] = useState<string>("");
  // タスクの重要度の入力状態管理
  const [taskPriority, setTaskPriority] = useState<TaskPriorityType>("medium");
  // タスク名が入力されなかった場合の案内
  const [isEmptyTaskName, setIsEmptyTaskName] = useState<boolean>(false);

  // タスク名の受け取り処理
  const inputTaskName = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
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

  const addTaskCheck = (
    e: SubmitEvent<HTMLFormElement>,
    taskName: string,
    taskPriority: TaskPriorityType,
  ) => {
    e.preventDefault();

    const trimmedTaskName: string = taskName.trim();
    if (trimmedTaskName === "") {
      setIsEmptyTaskName(true);
      return;
    }

    addTask(trimmedTaskName, taskPriority);
    setIsEmptyTaskName(false);
    setTaskName("");
    setTaskPriority("medium");
  };

  return (
    <section className="panel" aria-labelledby="add-heading">
      <h2 id="add-heading">タスクを登録</h2>
      <form
        className="task-form"
        onSubmit={(e: SubmitEvent<HTMLFormElement>) =>
          addTaskCheck(e, taskName, taskPriority)
        }
      >
        <div className="form-field task-name-field">
          <div className="label-container">
            <label htmlFor="task-name">タスク名</label>
            <p className="emptyTaskName">
              {isEmptyTaskName && "タスク名は必須です。"}
            </p>
          </div>
          <input
            id="task-name"
            name="taskName"
            type="text"
            placeholder="やることを入力"
            value={taskName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => inputTaskName(e)}
          />
        </div>
        <div className="form-field priority-field">
          <label htmlFor="priority">重要度</label>
          <select
            id="priority"
            name="priority"
            value={taskPriority}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => selectPriority(e)}
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </div>
        <button className="primary-button" type="submit">
          登録
        </button>
      </form>
      <p className="form-message" aria-live="polite"></p>
    </section>
  );
};

export default TaskInput;
