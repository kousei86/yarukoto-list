import "./App.css";
import type {
  TaskType,
  TasksCountType,
  TaskPriorityType,
  TaskStatusType,
} from "./types/TaskTypes";
import Header from "./components/Header";
import TasksCount from "./components/TasksCount";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { useState } from "react";

const App = () => {
  // タスクデータの状態管理
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      name: "会議資料を作る",
      priority: "high",
      completed: false,
      completedAt: null,
    },
    {
      id: 2,
      name: "コーヒー豆を買う",
      priority: "low",
      completed: true,
      completedAt: "2026年11月22日 12:14:36",
    },
    {
      id: 3,
      name: "依頼書を確認する",
      priority: "medium",
      completed: false,
      completedAt: null,
    },
  ]);

  // 選択している絞り込みの状態管理
  // addTaskの最後で通知機能を使う必要があるため、App.tsxで状態を管理する
  const [selectedFilter, setSelectedFilter] =
    useState<TaskStatusType>("incomplete");

  // 絞り込みで「完了」を選択している時、新規登録完了で通知回数の状態を管理する
  const [notificationId, setNotificationId] = useState(0);

  // 「未完了、完了、すべて」の集計
  const incompleteCount: number = tasks.filter(
    (task) => task.completed === false,
  ).length;
  const completedCount: number = tasks.filter(
    (task) => task.completed === true,
  ).length;
  const allCount: number = tasks.length;
  const tasksCount: TasksCountType = {
    incomplete: incompleteCount,
    completed: completedCount,
    all: allCount,
  };

  // タスクを登録する処理
  const addTask = (taskName: string, taskPriority: TaskPriorityType) => {
    setTasks((prev) => [
      {
        id: Date.now(),
        name: taskName,
        priority: taskPriority,
        completed: false,
        completedAt: null,
      },
      ...prev,
    ]);

    // 絞り込みで「完了」を選択している時の通知回数を１つ増加する
    if (selectedFilter === "completed") {
      setNotificationId((prev) => prev + 1);
    }
  };

  // タスクの完了と未完了を切り替える
  const toggleCompleted = (id: number) => {
    // 時刻を計算
    const tokyoTime = new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const completedTime = tokyoTime.format(new Date());

    // tasksの更新
    setTasks((prev) =>
      prev.map((task) =>
        task.id !== id
          ? task
          : {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? completedTime : null,
            },
      ),
    );
  };

  // タスク名と重要度を更新する処理の本体
  // （TaskCardから読み出す：Tasksに影響があるため、ここで定義する）
  const updateTask = (
    id: number,
    nameOnEdit: string,
    taskPriority: TaskPriorityType,
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id !== id
          ? task
          : {
              ...task,
              name: nameOnEdit,
              priority: taskPriority,
            },
      ),
    );
  };

  // タスクを削除する処理
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className="app">
      {/* ヘッダー */}
      <Header />

      {/* 集計エリア */}
      <TasksCount tasksCount={tasksCount} />

      {/* タスク登録エリア */}
      <TaskInput addTask={addTask} />

      {/*タスク一覧エリア*/}
      <TaskList
        tasks={tasks}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        notificationId={notificationId}
        toggleCompleted={toggleCompleted}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </main>
  );
};

export default App;
