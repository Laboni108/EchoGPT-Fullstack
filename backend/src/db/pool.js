import pg from "pg";
import { env } from "../config/env.js";

const { Pool } = pg;

export const pool = new Pool({ connectionString: env.databaseUrl });

pool.on("error", (err) => {
  console.error("Unexpected database error:", err.message);
});

export async function checkDb() {
  const result = await pool.query("SELECT NOW() AS now");
  return result.rows[0].now;
}