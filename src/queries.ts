import pool from './db';

// Get all employees
export const getEmployees = async () => {
  const res = await pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, employee.manager_id
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
};

// Get all roles
export const getRoles = async () => {
  const res = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return res.rows;
};

// Get all departments
export const getDepartments = async () => {
  const res = await pool.query('SELECT * FROM department');
  return res.rows;
};

// Add an employee
export const addEmployee = async (firstName: string, lastName: string, roleId: number, managerId: number | null) => {
  const res = await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstName, lastName, roleId, managerId]
  );
  return res.rows[0];
};

// Add a department
export const addDepartment = async (name: string) => {
  const res = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
  return res.rows[0];
};

// Add a role
export const addRole = async (title: string, salary: number, departmentId: number) => {
  const res = await pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
    [title, salary, departmentId]
  );
  return res.rows[0];
};

// Update employee manager
export const updateManager = async (employeeId: number, managerId: number) => {
  const res = await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *', [managerId, employeeId]);
  return res.rows[0];
};
