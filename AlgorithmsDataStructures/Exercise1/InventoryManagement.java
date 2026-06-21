import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class InventoryManagement {

    private Map<Integer, Product> inventory = new HashMap<>();

    public void addProduct(Product product) {
        if (inventory.containsKey(product.getProductId())) {
            System.out.println("Product with ID " + product.getProductId() + " already exists.");
            return;
        }
        inventory.put(product.getProductId(), product);
        System.out.println("Added: " + product);
    }

    public void updateProduct(int productId, String newName, int newQuantity, double newPrice) {
        Product product = inventory.get(productId);
        if (product == null) {
            System.out.println("Product ID " + productId + " not found.");
            return;
        }
        product.setProductName(newName);
        product.setQuantity(newQuantity);
        product.setPrice(newPrice);
        System.out.println("Updated: " + product);
    }

    public void deleteProduct(int productId) {
        Product removed = inventory.remove(productId);
        if (removed == null) {
            System.out.println("Product ID " + productId + " not found.");
            return;
        }
        System.out.println("Deleted: " + removed);
    }

    public void displayInventory() {
        if (inventory.isEmpty()) {
            System.out.println("Inventory is empty.");
            return;
        }
        System.out.println("\n--- Inventory ---");
        for (Product p : inventory.values()) {
            System.out.println(p);
        }
        System.out.println("-----------------\n");
    }

    public static void main(String[] args) {
        InventoryManagement system = new InventoryManagement();
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("=== Inventory Management System ===");
            System.out.println("1. Add Product");
            System.out.println("2. Update Product");
            System.out.println("3. Delete Product");
            System.out.println("4. Display Inventory");
            System.out.println("0. Exit");
            System.out.print("Enter choice: ");
            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("Enter Product ID: ");
                    int id = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter Product Name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter Quantity: ");
                    int qty = sc.nextInt();
                    System.out.print("Enter Price: ");
                    double price = sc.nextDouble();
                    system.addProduct(new Product(id, name, qty, price));
                    break;

                case 2:
                    System.out.print("Enter Product ID to update: ");
                    int uid = sc.nextInt();
                    sc.nextLine();
                    System.out.print("Enter new Name: ");
                    String uname = sc.nextLine();
                    System.out.print("Enter new Quantity: ");
                    int uqty = sc.nextInt();
                    System.out.print("Enter new Price: ");
                    double uprice = sc.nextDouble();
                    system.updateProduct(uid, uname, uqty, uprice);
                    break;

                case 3:
                    System.out.print("Enter Product ID to delete: ");
                    int did = sc.nextInt();
                    system.deleteProduct(did);
                    break;

                case 4:
                    system.displayInventory();
                    break;

                case 0:
                    System.out.println("Exiting...");
                    break;

                default:
                    System.out.println("Invalid choice. Try again.");
            }

        } while (choice != 0);

        sc.close();
    }
}