const db = require('./connection')

class Query {
    constructor(db) {
        this.db = db
    }

    findDepartments() {
        return this.db.promise().query('SELECT * FROM department;')
    }

    findRoles() {
        return this.db.promise().query('SELECT role.title, FROM role LEFT JOIN department ON role.department_id = department.id')
    }

    findEmployees() {
        return this.db.promise().query('SELECT employee.name, FROM emplpoyee LEFT JOIN role ON employee.role_id = role.id')
    }

    createDepartment() {
        return this.db.promise().query('INSERT INTO department (name) VALUE (?)')
    }

    createRole() {
        return this.db.promise().query('INSERT INTO role (title, salary, department_id)VALUES (?,?,?')
    }

    createEmployee() {
        return this.db.promise().query('INSERT INTO candidates (first_name, last_name, role_id, manager_id)VALUES (?,?,?,?')
    }

    updateEmployeeRole() {
        return this.db.promise().query('UPDATE employee SET employee.role_id = ? WHERE role_id = ?')
    }
}

module.exports = new Query(db)