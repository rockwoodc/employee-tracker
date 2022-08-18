const inquirer = require('inquirer');
require('console.table')
const db = require('./db')

const businessMenu = [
    {
        type: 'list',
        name: 'menu',
        message: 'Choose what you would like to do:',
        choices: ['View all departments', 'View all roles', 'View all Employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
]

const addDept = [
    {
        type: 'input',
        name: 'newDept',
        message: "What is the name of your new department?",
    }
]

const addRole = [
    {
        type: 'input',
        name: 'newRoleName',
        message: 'What is the name of the new role?'
    },
    {
        type: 'input',
        name: 'newRoleSalary',
        message: 'What is the salary of the new role?'
    },
    {
        type: 'input',
        name: 'newRoleDept',
        message: 'Into which department should this role be added?'
    },
]

const addEmployee = [
    {
        type: 'input',
        name: 'newEmployeeFirstName',
        message: 'What is the first name of the employee?'
    },
    {
        type: 'input',
        name: 'newEmployeeSecondName',
        message: 'What is the last name of the employee?'
    },
    {
        type: 'input',
        name: 'newEmployeeRole',
        message: 'What is role of the employee to be added?'
    },
    {
        type: 'input',
        name: 'newEmployeeDept',
        message: 'Which department should this employee be added?'
    },
]

const updateRole = [
    {
        type: 'input',
        name: 'updateRole',
        message: "What is this employee's new role?"
    }
]


function ask() {
    inquirer.prompt(businessMenu).then((answers) => {
        switch (answers.menu) {
            //after a case is chosen, the user will be directed to the associated function
            case 'View all departments':
                viewDepts();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all Employees':
                // viewEmployees();
                break;
            case 'Add a department':
                // addDept();
                break;
            case 'Add a role':
                // addRole();
                break;
            case 'Add an employee':
                // addEmployee();
                break;
            case 'Update an employee role':
                // updateRole();
                break;
        };
    });
}

function viewDepts() {
    db.findDepartments().then(([data]) => {
        console.table(data)
    }).then(() => ask());
}

function viewRoles(){
    db.findRoles().then(([data]) => {
        console.table(data)
    }).then(() => ask());
}



ask();

