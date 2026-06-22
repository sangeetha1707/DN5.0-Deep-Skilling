CREATE TABLE Accounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(50),
    AccountType VARCHAR2(20),
    Balance NUMBER(10,2)
);

CREATE TABLE Employees (
    EmployeeID NUMBER PRIMARY KEY,
    EmployeeName VARCHAR2(50),
    Department VARCHAR2(30),
    Salary NUMBER(10,2)
);

INSERT INTO Accounts VALUES (101, 'Arun Kumar', 'SAVINGS', 20000);
INSERT INTO Accounts VALUES (102, 'Priya Sharma', 'SAVINGS', 15000);
INSERT INTO Accounts VALUES (103, 'Ramesh Patel', 'CURRENT', 30000);
INSERT INTO Accounts VALUES (104, 'Sneha Reddy', 'SAVINGS', 10000);

INSERT INTO Employees VALUES (1, 'John', 'IT', 50000);
INSERT INTO Employees VALUES (2, 'David', 'IT', 60000);
INSERT INTO Employees VALUES (3, 'Priya', 'HR', 45000);
INSERT INTO Employees VALUES (4, 'Ramesh', 'HR', 55000);

COMMIT;

SELECT * FROM Accounts;

SELECT * FROM Employees;