// タスクデータの型
export type TaskType = {
  id: number;
  name: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  completedAt: string | null;
};

// タスクの集計を渡すPropsの型
export type TasksCountType = {
  incomplete: number;
  completed: number;
  all: number;
};

// タスクの重要度の型
export type TaskPriorityType = "high" | "medium" | "low";

// タスクの絞り込みボタンから受ける型
export type TaskStatusType = "incomplete" | "completed" | "all";
