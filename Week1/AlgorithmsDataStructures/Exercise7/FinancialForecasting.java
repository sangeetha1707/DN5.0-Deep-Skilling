import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class FinancialForecasting {

    private static Map<Integer, Double> memo = new HashMap<>();

    public static double calculateFutureValue(double presentValue, double growthRate, int years) {
        if (years == 0) {
            return presentValue;
        }
        if (memo.containsKey(years)) {
            return memo.get(years);
        }
        double result = calculateFutureValue(presentValue, growthRate, years - 1) * (1 + growthRate);
        memo.put(years, result);
        return result;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter present value: ");
        double presentValue = scanner.nextDouble();

        System.out.print("Enter annual growth rate (e.g. 0.05 for 5%): ");
        double growthRate = scanner.nextDouble();

        System.out.print("Enter number of years: ");
        int years = scanner.nextInt();

        System.out.println("\n=== Financial Forecast ===");
        for (int i = 1; i <= years; i++) {
            memo.clear();
            double futureValue = calculateFutureValue(presentValue, growthRate, i);
            System.out.printf("Year %d: %.2f%n", i, futureValue);
        }

        scanner.close();
    }
}