const inquirer = require('inquirer');
const { findDepartments, findEmployees } = require('./db');
require('console.table')
const db = require('./db')

const businessMenu = [
    {
        type: 'list',
        name: 'menu',
        message: 'Choose what you would like to do:',
        choices: ['View all departments', 'View all roles', 'View all Employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
    }
]

// const addDept = [
//     {
//         type: 'input',
//         name: 'newDept',
//         message: "What is the name of your new department?",
//     }
// ]

// const addRole = [
//     {
//         type: 'input',
//         name: 'newRoleName',
//         message: 'What is the name of the new role?'
//     },
//     {
//         type: 'input',
//         name: 'newRoleSalary',
//         message: 'What is the salary of the new role?'
//     },
//     {
//         type: 'input',
//         name: 'newRoleDept',
//         message: 'Into which department should this role be added?'
//     },
// ]

// const addEmployee = [
//     {
//         type: 'input',
//         name: 'newEmployeeFirstName',
//         message: 'What is the first name of the employee?'
//     },
//     {
//         type: 'input',
//         name: 'newEmployeeSecondName',
//         message: 'What is the last name of the employee?'
//     },
//     {
//         type: 'input',
//         name: 'newEmployeeRole',
//         message: 'What is role of the employee to be added?'
//     },
//     {
//         type: 'input',
//         name: 'newEmployeeDept',
//         message: 'Which department should this employee be added?'
//     },
// ]

// const updateRole = [
//     {
//         type: 'input',
//         name: 'updateRole',
//         message: "What is this employee's new role?"
//     }
// ]


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
                viewEmployees();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            //if user is done, exit
            default:
                process.exit();
        };
    });
}

function viewDepts() {
    db.findDepartments().then(([data]) => {
        console.table(data)
    }).then(() => ask());
}

function viewRoles() {
    db.findRoles().then(([data]) => {
        console.table(data)
    }).then(() => ask());
}

function viewEmployees() {
    db.findEmployees().then(([data]) => {
        console.table(data)
    }).then(() => ask());
}

function addRole() {
    db.findDepartments().then(([data]) => {
        let deptartment = data;
        const departmentList = data.map(({ name, id }) => ({
            name: name,
            value: id
        }));
        return (
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What role would you like to add?',
                        validate: (titleInput) => {
                            if (titleInput) {
                                return true;
                            } else {
                                console.log('Please enter the role name');
                                return false;
                            }
                        },
                    },
                    {
                        type: 'input',
                        name: 'Salary',
                        message: 'What is the salary associated with this role?',
                        validate: (roleSalary) => {
                            if (roleSalary) {
                                return true;
                            } else {
                                console.log('Please enter the salary of this role');
                                return false;
                            }
                        },
                    },
                    {
                        type: 'list',
                        name: 'deptartment_id',
                        message: 'Which deptartment is assoicated with this role?',
                        choices: departmentList,
                    },
                ])
                .then((answer) => {
                    db.addNewRole(answer).then(() => businessMenu ());
                })
        );
    });
}

function addEmployee() {
    db.findRoles().then(([data]) => {
        let role = data;
        const roleList = data.map(({ title, id }) => ({
            name: title,
            value: id
        }));
        db.findEmployees().then(([data]) => {
            let employee = data;
            const employeeList = employee.map(({first_name, last_name, id}) => ({
                name: first_name, last_name,
                value: id,
            }));
        })
        return (
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'What is the employees first name?',
                        validate: (first_nameInput) => {
                            if (first_nameInput) {
                                return true;
                            } else {
                                console.log('Please enter the first name');
                                return false;
                            }
                        },
                    },
                    {
                        type: 'input',
                        name: '_name',
                        message: 'What is the employees last name?',
                        validate: (last_nameInput) => {
                            if (last_nameInput) {
                                return true;
                            } else {
                                console.log('Please enter the last name');
                                return false;
                            }
                        },
                    },
                    {
                        type: 'list',
                        name: 'role_id',
                        message: 'Which role is assoicated with this employee?',
                        choices: roleList,
                    },
                ])
                .then((answer) => {
                    db.addNewRole(answer).then(() => businessMenu ());
                })
        );
    });
}

//update employee function
function updateRole() {
    db.findEmployees().then(([data]) => {
        let employee = data;
        const employeeList = employee.map(({first_name, last_name, id}) => ({
            name: first_name, last_name,
            value: id,
        }));
        db.findRoles().then(([data])=> {
            let role = data;
            const roleList = role.map(({ id, title}) => ({
                name: title,
                value: id,
            }));

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee would you like to update?',
                    choice: employeeList,
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Which role is this employee associated with?',
                    choices: roleList
                },
            ])
            .then((answer) => {
                const role_id = answer.role_id;
                const employeeId = answer.employeeId;
                db.updateRole(employeeId, role_id).then(() => businessMenu());
            });
        });
    });
}

function addDept() {
    return (
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the department you'd like to add?",
                validate: (nameInput) => {
                    if (nameInput) {
                        return true;
                    }else {
                        console.log('Please enter a department name');
                        return false;
                    }
                },
            },
        ])
        //adds to table
        .then((answer) => {
            db.createDepartment(answer).then(() => businessMenu());
        })
    );
}


ask();

