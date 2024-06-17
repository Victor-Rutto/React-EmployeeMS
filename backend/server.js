const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'Managers', // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL Connected successfuly');
});

// Endpoint to get users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// Endpoint to add a new user
app.post('/api/users', (req, res) => {
  const { name, email, role, department, password } = req.body;
  const sql = 'INSERT INTO users (name, email, role, department, password) VALUES (?, ?, ?, ?,?)';
  db.query(sql, [name, email, role, department, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

app.post('/api/login', (req, res)=>{
    const {email, password} = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    const result = db.query(sql, [], (err, result)=>{
           if(result)
    res.status(200).json(result);
else
res.status(200).json({error: 'Invalid credentials- '+ err }); 
    })

})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
