import * as SQLite from "expo-sqlite";

export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
};

const db = SQLite.openDatabaseSync("tasks.db");

export function initDatabase() {
  try {
    db.execSync(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT,
                status TEXT NOT NULL
            );
        `);
    
    // Add category column if it doesn't exist (for existing databases)
    try {
      db.execSync(`ALTER TABLE tasks ADD COLUMN category TEXT;`);
    } catch (error) {
      // Column already exists, ignore error
    }
  } catch (error) {
    console.error("There were problems initializing the database: ", error);
    throw error;
  }
}

export function addTask(title: string, description: string, category: string, status: string) {
  try {
    db.runSync(
      "INSERT INTO tasks (title, description, category, status) VALUES (?, ?, ?, ?)",
      [title, description, category, status],
    );
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
}

export function updateTask(
  id: number,
  title: string,
  description: string,
  category: string,
  status: string,
) {
  try {
    db.runSync(
      "UPDATE tasks SET title = ?, description = ?, category = ?, status = ? WHERE id = ?",
      [title, description, category, status, id],
    );
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
}

export function deleteTask(id: number) {
  try {
    db.runSync("DELETE FROM tasks WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
}

export function getTasks(): Task[] {
  try {
    return db.getAllSync("SELECT * FROM tasks ORDER BY id DESC") as Task[];
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
}
