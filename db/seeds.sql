INSERT INTO department (department_name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, deptId)
VALUES
('Sales Lead', 100000, 1),
('Sales person', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 150000, 2),
('Accountant', 95000, 3),
('Account Manager', 90000, 3),
('Lawyer', 200000, 4),
('Legal Team Lead', 90000, 4);

INSERT INTO employee (first_name, last_name, employeeRole, manager)
VALUES
('Josh', 'Hall', 1, NULL),
('Andy','Waine', 1, NULL),
('Ryan','Gendel', 2, 1),
('Runa','Gendel', 2, 1),
('Cortland','Finch', 3, 2),
('James','Fraser', 3, 2),
('Christian','Rockwood', 4, 1),
('Victoria','Nahley', 4, 2);