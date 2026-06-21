import java.util.Scanner;

public class LibraryManagement {

    public static int linearSearch(Book[] books, String title) {
        for (int i = 0; i < books.length; i++) {
            if (books[i].title.equalsIgnoreCase(title)) {
                return i;
            }
        }
        return -1;
    }

    public static int binarySearch(Book[] books, String title) {
        int low = 0;
        int high = books.length - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            int result = books[mid].title.compareToIgnoreCase(title);
            if (result == 0) {
                return mid;
            } else if (result < 0) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Book[] books = {
            new Book(1, "Clean Code", "Robert Martin"),
            new Book(2, "Design Patterns", "Gang of Four"),
            new Book(3, "Effective Java", "Joshua Bloch"),
            new Book(4, "Refactoring", "Martin Fowler"),
            new Book(5, "The Pragmatic Programmer", "David Thomas")
        };

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter book title to search: ");
        String title = scanner.nextLine();

        System.out.println("\n=== Linear Search ===");
        int linearResult = linearSearch(books, title);
        if (linearResult != -1) {
            System.out.println("Found: " + books[linearResult]);
        } else {
            System.out.println("Book not found.");
        }

        System.out.println("\n=== Binary Search (sorted by title) ===");
        int binaryResult = binarySearch(books, title);
        if (binaryResult != -1) {
            System.out.println("Found: " + books[binaryResult]);
        } else {
            System.out.println("Book not found.");
        }

        scanner.close();
    }
}