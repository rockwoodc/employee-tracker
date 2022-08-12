DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS roles;
-- DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  FOREIGN KEY (department_name) REFERENCES department(department_name)
);

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  FOREIGN KEY (title) REFERENCES role(title),
  -- reference another employee that is the manager of the current employee
  FOREIGN KEY (roles) REFERENCES roles(title) ON DELETE SET NULL
);

