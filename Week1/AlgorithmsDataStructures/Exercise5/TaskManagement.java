import java.util.Scanner;

public class TaskManagement {

    class Node {
        Task task;
        Node next;

        Node(Task task) {
            this.task = task;
            this.next = null;
        }
    }

    private Node head;

    public void addTask(Task task) {
        Node newNode = new Node(task);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        System.out.println("Added: " + task);
    }

    public void searchTask(int taskId) {
        Node current = head;
        while (current != null) {
            if (current.task.taskId == taskId) {
                System.out.println("Found: " + current.task);
                return;
            }
            current = current.next;
        }
        System.out.println("Task ID " + taskId + " not found.");
    }

    public void traverseTasks() {
        if (head == null) {
            System.out.println("No tasks found.");
            return;
        }
        System.out.println("\n--- Task List ---");
        Node current = head;
        while (current != null) {
            System.out.println(current.task);
            current = current.next;
        }
        System.out.println("-----------------\n");
    }

    public void deleteTask(int taskId) {
        if (head == null) {
            System.out.println("No tasks to delete.");
            return;
        }
        if (head.task.taskId == taskId) {
            System.out.println("Deleted: " + head.task);
            head = head.next;
            return;
        }
        Node current = head;
        while (current.next != null) {
            if (current.next.task.taskId == taskId) {
                System.out.println("Deleted: " + current.next.task);
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
        System.out.println("Task ID " + taskId + " not found.");
    }

    public static void main(String[] args) {
        TaskManagement system = new TaskManagement();
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("=== Task Management System ===");
            System.out.println("1. Add Task");
            System.out.println("2. Search Task");
            System.out.println("3. Traverse Tasks");
            System.out.println("4. Delete Task");
            System.out.println("0. Exit");
            System.out.print("Enter choice: ");
            choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter Task ID: ");
                    int id = scanner.nextInt();
                    scanner.nextLine();
                    System.out.print("Enter Task Name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter Status: ");
                    String status = scanner.nextLine();
                    system.addTask(new Task(id, name, status));
                    break;

                case 2:
                    System.out.print("Enter Task ID to search: ");
                    int sid = scanner.nextInt();
                    system.searchTask(sid);
                    break;

                case 3:
                    system.traverseTasks();
                    break;

                case 4:
                    System.out.print("Enter Task ID to delete: ");
                    int did = scanner.nextInt();
                    system.deleteTask(did);
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