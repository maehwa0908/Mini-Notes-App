import * as SQLite from "expo-sqlite";

export type Task = {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
};

let db: SQLite.SQLiteDatabase | null = null;

async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync("tasks.db");
  }
  return db;
}

export async function initDatabase() {
  try {
    const database = await getDb();
    await database.execAsync(`
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

export async function addTask(title: string, description: string, category: string, status: string) {
  try {
    const database = await getDb();
    await database.runAsync(
      "INSERT INTO tasks (title, description, category, status) VALUES (?, ?, ?, ?)",
      [title, description, category, status],
    );
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
}

export async function updateTask(
  id: number,
  title: string,
  description: string,
  category: string,
  status: string,
) {
  try {
    const database = await getDb();
    await database.runAsync(
      "UPDATE tasks SET title = ?, description = ?, category = ?, status = ? WHERE id = ?",
      [title, description, category, status, id],
    );
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
}

export async function deleteTask(id: number) {
  try {
    const database = await getDb();
    await database.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
}

export async function getTasks(): Promise<Task[]> {
  try {
    const database = await getDb();
    const result = await database.getAllAsync<Task>("SELECT * FROM tasks ORDER BY id DESC");
    return result || [];
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return [];
  }
}
