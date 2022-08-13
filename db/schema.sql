DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  deptId INTEGER NOT NULL,
  CONSTRAINT fk_deptId FOREIGN KEY (deptId) REFERENCES department(id)
);

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  employeeRole INTEGER NOT NULL,
  manager INTEGER,
  CONSTRAINT fk_employeeRole FOREIGN KEY (employeeRole)
  REFERENCES roles(id),
  KEY manager (manager),
  CONSTRAINT fk_manager FOREIGN KEY (manager)
  REFERENCES employee (id) ON DELETE SET NULL
);

