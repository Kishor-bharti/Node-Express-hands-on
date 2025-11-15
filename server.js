require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// Load ENV variables
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

let db;

// Initialize DB Connection
async function initDB() {
    try {
        db = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME
        });

        console.log("MySQL2 Connected!");
    } catch (err) {
        console.error("DB Connection Failed:", err);
        process.exit(1); // stop server if DB fails
    }
}

initDB();

// GET all users
app.get("/users", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database query failed" });
    }
});

// CREATE user
app.post("/users", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const [result] = await db.query(
            "INSERT INTO users (name) VALUES (?)",
            [name]
        );

        res.json({ id: result.insertId, name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Insert failed" });
    }
});

// Start server
app.listen(3000, () =>
    console.log("Server running at http://localhost:3000")
);