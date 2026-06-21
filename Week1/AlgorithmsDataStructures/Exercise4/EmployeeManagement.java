import java.util.Scanner;

public class EmployeeManagement {

    private Employee[] employees;
    private int count;

    public EmployeeManagement(int capacity) {
        employees = new Employee[capacity];
        count = 0;
    }

    public void addEmployee(Employee emp) {
        if (count == employees.length) {
            System.out.println("Array is full. Cannot add more employees.");
            return;
        }
        employees[count] = emp;
        count++;
        System.out.println("Added: " + emp);
    }

    public void searchEmployee(int employeeId) {
        for (int i = 0; i < count; i++) {
            if (employees[i].employeeId == employeeId) {
                System.out.println("Found: " + employees[i]);
                return;
            }
        }
        System.out.println("Employee ID " + employeeId + " not found.");
    }

    public void traverseEmployees() {
        if (count == 0) {
            System.out.println("No employees found.");
            return;
        }
        System.out.println("\n--- Employee List ---");
        for (int i = 0; i < count; i++) {
            System.out.println(employees[i]);
        }
        System.out.println("---------------------\n");
    }

    public void deleteEmployee(int employeeId) {
        for (int i = 0; i < count; i++) {
            if (employees[i].employeeId == employeeId) {
                System.out.println("Deleted: " + employees[i]);
                for (int j = i; j < count - 1; j++) {
                    employees[j] = employees[j + 1];
                }
                employees[count - 1] = null;
                count--;
                return;
            }
        }
        System.out.println("Employee ID " + employeeId + " not found.");
    }

    public static void main(String[] args) {
        EmployeeManagement system = new EmployeeManagement(10);
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("=== Employee Management System ===");
            System.out.println("1. Add Employee");
            System.out.println("2. Search Employee");
            System.out.println("3. Traverse Employees");
            System.out.println("4. Delete Employee");
            System.out.println("0. Exit");
            System.out.print("Enter choice: ");
            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter Employee ID: ");
                    int id = scanner.nextInt();
                    scanner.nextLine();
                    System.out.print("Enter Name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter Position: ");
                    String position = scanner.nextLine();
                    System.out.print("Enter Salary: ");
                    double salary = scanner.nextDouble();
                    system.addEmployee(new Employee(id, name, position, salary));
                    break;

                case 2:
                    System.out.print("Enter Employee ID to search: ");
                    int sid = scanner.nextInt();
                    system.searchEmployee(sid);
                    break;

                case 3:
                    system.traverseEmployees();
                    break;

                case 4:
                    System.out.print("Enter Employee ID to delete: ");
                    int did = scanner.nextInt();
                    system.deleteEmployee(did);
                    break;

                case 0:
                    System.out.println("Exiting...");
                    break;

                default:
                    System.out.println("Invalid choice. Try again.");
            }

        } while (choice != 0);

        scanner.close();
    }
}