const { Pool } = require('pg');
const { createToken } = require('../middlewares')

const pool = new Pool({
  host: 'heffalump.db.elephantsql.com',
  user: 'ocfauihc',
  password: 'uuz0wOqV8UXkLGFWTBlh5yrXLvWO0ncp',
  database: 'ocfauihc',
  port: '5432'
})

const createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    birth_date = '',
    gender = '',
    email,
    password,
    role
  } = req.body;

  try {
    const response = await pool.query(
      `INSERT INTO users (first_name, last_name, birth_date, gender, email, password, role_id) 
      VALUES ($1, $2, $3, $4, $5, crypt($6, gen_salt('bf')), $7)`,
      [first_name, last_name, birth_date, gender, email, password, role]
    )

    res.json(response)
  } catch (error) {
    res.send(error);
  }
}

const getusers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users')
    res.json(rows)
  } catch (error) {
    res.json(error)
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const response = await pool.query(
      `SELECT users.id AS user_id, roles.name AS role
        FROM users
      INNER JOIN roles
        ON users.role_id = roles.id
      WHERE email = $1
        AND password = crypt($2, password);`,
      [email, password]
    )

    const token = createToken({
      id: response.rows[0].user_id,
      role: response.rows[0].role,
    })

    res.send(token)
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  getusers,
  createUser,
  loginUser
}