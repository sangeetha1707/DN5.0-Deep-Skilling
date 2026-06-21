public class SortingOrders {

    public static void bubbleSort(Order[] orders) {
        int n = orders.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (orders[j].totalPrice > orders[j + 1].totalPrice) {
                    Order temp = orders[j];
                    orders[j] = orders[j + 1];
                    orders[j + 1] = temp;
                }
            }
        }
    }

    public static void quickSort(Order[] orders, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(orders, low, high);
            quickSort(orders, low, pivotIndex - 1);
            quickSort(orders, pivotIndex + 1, high);
        }
    }

    private static int partition(Order[] orders, int low, int high) {
        double pivot = orders[high].totalPrice;
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (orders[j].totalPrice <= pivot) {
                i++;
                Order temp = orders[i];
                orders[i] = orders[j];
                orders[j] = temp;
            }
        }
        Order temp = orders[i + 1];
        orders[i + 1] = orders[high];
        orders[high] = temp;
        return i + 1;
    }

    public static void printOrders(Order[] orders) {
        for (Order o : orders) {
            System.out.println(o);
        }
    }

    public static void main(String[] args) {
        Order[] orders1 = {
            new Order(1, "Alice", 5000.00),
            new Order(2, "Bob", 1200.50),
            new Order(3, "Charlie", 8999.99),
            new Order(4, "Diana", 3450.00),
            new Order(5, "Eve", 670.25)
        };

        Order[] orders2 = {
            new Order(1, "Alice", 5000.00),
            new Order(2, "Bob", 1200.50),
            new Order(3, "Charlie", 8999.99),
            new Order(4, "Diana", 3450.00),
            new Order(5, "Eve", 670.25)
        };

        System.out.println("=== Bubble Sort ===");
        bubbleSort(orders1);
        printOrders(orders1);

        System.out.println("\n=== Quick Sort ===");
        quickSort(orders2, 0, orders2.length - 1);
        printOrders(orders2);
    }
}