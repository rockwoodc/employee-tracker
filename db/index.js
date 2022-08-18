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
        return this.db.promise().query('')
    }

    createDepartment() {
        return this.db.promise().query('')
    }

    createRole() {
        return this.db.promise().query('')
    }

    createEmployee() {
        return this.db.promise().query('')
    }

    updateEmployeeRole() {
        return this.db.promise().query('')
    }
}

module.exports = new Query(db)