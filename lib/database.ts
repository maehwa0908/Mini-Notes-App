import * as SQLite from "expo-sqlite";

export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
};

let db: any = null;

function getDb() {
  if (!db) {
    try {
      db = SQLite.openDatabaseSync("tasks.db");
    } catch (error) {
      console.error("Failed to open database:", error);
      throw error;
    }
  }
  return db;
}

export function initDatabase() {
  try {
    const database = getDb();
    database.execSync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        status TEXT NOT NULL
      )
    `);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("There were problems initializing the database: ", error);
  }
}

export function addTask(title: string, description: string, category: string, status: string) {
  try {
    const database = getDb();                                                         
    database.runSync(
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
    const database = getDb();
    database.runSync(
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
    const database = getDb();
    database.runSync("DELETE FROM tasks WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
}

export function getTasks(): Task[] {
  try {
    const database = getDb();
    const result = database.getAllSync("SELECT * FROM tasks ORDER BY id DESC") as Task[];
    return result || [];
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return [];
  }
}
