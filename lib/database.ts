import * as SQLite from "expo-sqlite";

export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
};

const db = SQLite.openDatabase("tasks.db");

export function initDatabase() {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        status TEXT NOT NULL
      )`,
      [],
      () => {
        console.log("Database initialized successfully");
      },
      (_, error) => {
        console.error("There were problems initializing the database: ", error);
        return false;
      }
    );
  });
}

export function addTask(title: string, description: string, category: string, status: string) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tasks (title, description, category, status) VALUES (?, ?, ?, ?)",
      [title, description, category, status],
      () => {
        console.log("Task added successfully");
      },
      (_, error) => {
        console.error("Error adding task: ", error);
        return false;
      }
    );
  });
}

export function updateTask(
  id: number,
  title: string,
  description: string,
  category: string,
  status: string,
) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE tasks SET title = ?, description = ?, category = ?, status = ? WHERE id = ?",
      [title, description, category, status, id],
      () => {
        console.log("Task updated successfully");
      },
      (_, error) => {
        console.error("Error updating task: ", error);
        return false;
      }
    );
  });
}

export function deleteTask(id: number) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM tasks WHERE id = ?",
      [id],
      () => {
        console.log("Task deleted successfully");
      },
      (_, error) => {
        console.error("Error deleting task: ", error);
        return false;
      }
    );
  });
}

export function getTasks(callback: (tasks: Task[]) => void) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM tasks ORDER BY id DESC",
      [],
      (_, { rows }) => {
        const tasks = rows._array as Task[];
        callback(tasks);
      },
      (_, error) => {
        console.error("Error fetching tasks: ", error);
        callback([]);
        return false;
      }
    );
  });
}
