public class SearchFunctions {

    public static int linearSearch(Product[] products, int targetId) {
        for (int i = 0; i < products.length; i++) {
            if (products[i].productId == targetId) {
                return i;
            }
        }
        return -1;
    }

    public static int binarySearch(Product[] products, int targetId) {
        int low = 0;
        int high = products.length - 1;

        while (low <= high) {
            int mid = (low + high) / 2;
            if (products[mid].productId == targetId) {
                return mid;
            } else if (products[mid].productId < targetId) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        Product[] products = {
            new Product(101, "Laptop", "Electronics"),
            new Product(203, "Shoes", "Footwear"),
            new Product(305, "Shirt", "Clothing"),
            new Product(412, "Phone", "Electronics"),
            new Product(550, "Watch", "Accessories")
        };

        Product[] sortedProducts = {
            new Product(101, "Laptop", "Electronics"),
            new Product(203, "Shoes", "Footwear"),
            new Product(305, "Shirt", "Clothing"),
            new Product(412, "Phone", "Electronics"),
            new Product(550, "Watch", "Accessories")
        };

        int target = 412;

        System.out.println("=== Linear Search ===");
        int linearResult = linearSearch(products, target);
        if (linearResult != -1) {
            System.out.println("Product found at index " + linearResult + ": " + products[linearResult]);
        } else {
            System.out.println("Product not found.");
        }

        System.out.println("\n=== Binary Search ===");
        int binaryResult = binarySearch(sortedProducts, target);
        if (binaryResult != -1) {
            System.out.println("Product found at index " + binaryResult + ": " + sortedProducts[binaryResult]);
        } else {
            System.out.println("Product not found.");
        }
    }
}