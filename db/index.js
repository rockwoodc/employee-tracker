const db = require('./connection')

class Query {
    constructor(db) {
        this.db = db
    }

    findDepartments() {
        return this.db.promise().query('SELECT * FROM department;')
    }

    findRoles() {
        // job title, role id, the department that role belongs to, and the salary for that role
        return this.db.promise().query('SELECT role.title, role.id, department.name, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;')
    }

    findEmployees() {
        // employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        return this.db.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, " ",manager.last_name) AS manager_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON  manager.id = employee.manager_id;')
    }

    createDepartment(department) {
        return this.db.promise().query('INSERT INTO department SET ?', department)
    }

    createRole(role) {
        return this.db.promise().query('INSERT INTO role SET ?', role)
    }

    createEmployee() {
        return this.db.promise().query('INSERT INTO candidates (first_name, last_name, role_id, manager_id)VALUES (?,?,?,?')
    }

    updateEmployeeRole(empId, roleId) {
        return this.db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, empId])
    }
}

module.exports = new Query(db)