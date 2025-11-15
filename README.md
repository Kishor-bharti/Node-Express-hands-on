## This is a hands-on practice on Node/Express

### Tips:
1. Never forget to add `node_modules` in `.gitignore` before git push!
2. Always begin your project following these steps:
    - Make a `Project-name` folder
    - Start with creating a `server.js` file & then run `npm init` command
    - Create these files in order:
        - `.env`
        - `.gitignore`
        - `README.md`
    - Add this inside your `.gitignore` file:
        - `node_modules/`
        - `.env`
    - Install necessary modules:
        - `npm install express mysql2 dotenv cors`
    - Create a public folder (to server public files like `index.html`)
    use `app.use(express.static("public"));` in the server.js, this will show your HTML frontend.

3. Use `npm install --save-dev nodemon` for development!
Add a script inside `package.json`:
```json
"scripts": {
  "dev": "nodemon server.js"
}
```
Run with: `npm run dev`
4. Put sensitive data in .env:
```txt
DB_USER=root
DB_PASS=7517
DB_HOST=localhost
```
And load it in your Node server:
`require("dotenv").config();`

### Database used for this project:
```sql
CREATE DATABASE learning;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT *FROM users;
```