import inquirer from 'inquirer';
import { getEmployees, getRoles, getDepartments, addEmployee, addDepartment, addRole, updateManager } from './queries';

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all employees',
      'View all roles',
      'View all departments',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee manager',
      'Exit',
    ],
  });

  switch (action) {
    case 'View all employees':
      const employees = await getEmployees();
      console.table(employees);
      break;
    case 'View all roles':
      const roles = await getRoles();
      console.table(roles);
      break;
    case 'View all departments':
      const departments = await getDepartments();
      console.table(departments);
      break;
    case 'Add a department':
      const { departmentName } = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter department name:',
      });
      await addDepartment(departmentName);
      console.log('Department added successfully!');
      break;
    case 'Add a role':
      const { title, salary, departmentId } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter role salary:' },
        { type: 'input', name: 'departmentId', message: 'Enter department ID for this role:' },
      ]);
      await addRole(title, parseFloat(salary), parseInt(departmentId));
      console.log('Role added successfully!');
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter employee first name:' },
        { type: 'input', name: 'lastName', message: 'Enter employee last name:' },
        { type: 'input', name: 'roleId', message: 'Enter employee role ID:' },
        { type: 'input', name: 'managerId', message: 'Enter manager ID (if any, leave blank for none):' },
      ]);
      await addEmployee(firstName, lastName, parseInt(roleId), managerId ? parseInt(managerId) : null);
      console.log('Employee added successfully!');
      break;
    case 'Update employee manager':
      const { employeeId, newManagerId } = await inquirer.prompt([
        { type: 'input', name: 'employeeId', message: 'Enter employee ID:' },
        { type: 'input', name: 'newManagerId', message: 'Enter new manager ID:' },
      ]);
      await updateManager(parseInt(employeeId), parseInt(newManagerId));
      console.log('Manager updated successfully!');
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
      break;
  }

  mainMenu();
};

mainMenu();
