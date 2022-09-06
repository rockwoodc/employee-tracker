const inquirer = require("inquirer");
const { findDepartments, findEmployees } = require("./db");
require("console.table");
const db = require("./db");

//Main menu that will appear first and after each completed section
const businessMenu = [
  {
    type: "list",
    name: "menu",
    message: "Choose what you would like to do:",
    choices: [
      "View all departments",
      "View all roles",
      "View all Employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  },
];

//how each menu function is called
function ask() {
  inquirer.prompt(businessMenu).then((answers) => {
    switch (answers.menu) {
      //after a case is chosen, the user will be directed to the associated function
      case "View all departments":
        viewDepts();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all Employees":
        viewEmployees();
        break;
      case "Add a department":
        addDept();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateRole();
        break;
      //if user is done, exit
      default:
        process.exit();
    }
  });
}

//console log a table of the departments
function viewDepts() {
  db.findDepartments()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => ask());
}

//console log a table of the roles
function viewRoles() {
  db.findRoles()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => ask());
}

//console log a table of the employees
function viewEmployees() {
  db.findEmployees()
    .then(([data]) => {
      console.table(data);
    })
    .then(() => ask());
}

//prompts for adding a role
function addRole() {
  db.findDepartments().then(([data]) => {
    let deptartment = data;
    const departmentList = data.map(({ name, id }) => ({
      name: name,
      value: id,
    }));
    return inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What role would you like to add?",
          validate: (titleInput) => {
            if (titleInput) {
              return true;
            } else {
              console.log("Please enter the role name");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary associated with this role?",
          validate: (roleSalary) => {
            if (roleSalary) {
              return true;
            } else {
              console.log("Please enter the salary of this role");
              return false;
            }
          },
        },
        {
          type: "list",
          name: "department_id",
          message: "Which deptartment is assoicated with this role?",
          choices: departmentList,
        },
      ])
      //creates role and then returns user to menu
      .then((answer) => {
        db.createRole(answer).then(() => ask());
      });
  });
}

//add an employee prompts
function addEmployee() {
  db.findRoles().then(([data]) => {
    let role = data;
    const roleList = data.map(({ title, id }) => ({
      name: title,
      value: id,
    }));
    db.findEmployees().then(([data]) => {
      let employee = data;
      const employeeList = employee.map(({ first_name, last_name, id }) => ({
        name: `${first_name}  ${last_name}`,
        value: id,
      }));

      employeeList.unshift({
        name: "none",
        value: null,
      });

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employees first name?",
            validate: (first_nameInput) => {
              if (first_nameInput) {
                return true;
              } else {
                console.log("Please enter the first name");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employees last name?",
            validate: (last_nameInput) => {
              if (last_nameInput) {
                return true;
              } else {
                console.log("Please enter the last name");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "role_id",
            message: "Which role is assoicated with this employee?",
            choices: roleList,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Which manager oversees this employee?",
            choices: employeeList,
          },
        ])
        //creates employee and then returns user to menu
        .then((answer) => {
          db.createEmployee(answer).then(() => ask());
        });
    });
  });
}

//update employee function
function updateRole() {
  db.findEmployees().then(([data]) => {
    let employee = data;

    const employeeList = employee.map(({ first_name, last_name, id }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    db.findRoles().then(([data]) => {
      let role = data;
      const roleList = role.map(({ id, title }) => ({
        name: `${title}`,
        value: id,
      }));

     inquirer
        .prompt([
          {
            type: "list",
            name: "employeeId",
            message: "Which employee would you like to update?",
            choices: employeeList,
          },
          {
            type: "list",
            name: "role_id",
            message: "Which role is this employee associated with?",
            choices: roleList,
          },
        ])
        //updates employee and returns user to menu
        .then((answer) => {
          const role_id = answer.role_id;
          const employeeId = answer.employeeId;
          db.updateEmployeeRole(employeeId, role_id).then(() => ask());
        });
    });
  });
}

//add a department prompts
function addDept() {
  return (
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the department you'd like to add?",
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("Please enter a department name");
              return false;
            }
          },
        },
      ])
      ////add new department and then returns user to menu
      .then((answer) => {
        db.createDepartment(answer).then(() => ask());
      })
  );
}

ask();
