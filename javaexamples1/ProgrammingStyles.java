package javaexamples1;


import java.util.Arrays;
import java.util.IntSummaryStatistics;

public class ProgrammingStyles {
	public static void main(String[] args) {
		int[] input = { 10, 20, 30, 40, 50 };
		System.out.println("Imperative Style");
		System.out.println("*");
		int sum = 0;
		for (int i = 0; i < input.length; i++) {
			sum = sum + input[i];
			System.out.println(sum);
		}
		System.out.println(sum);
		System.out.println(sum);

		System.out.println("*");
		System.out.println("Declarative Style");
		int sum1 = Arrays.stream(input).sum();
		System.out.println(sum1);
		IntSummaryStatistics stat = Arrays.stream(input).summaryStatistics();

		System.out.println(stat.getSum());
		System.out.println(stat.getAverage());
		System.out.println(stat.getMax());
		System.out.println(stat.getMin());
		System.out.println(stat.getCount());
		streamAPIMethods(input);
	}

	public static void streamAPIMethods(int[] input) {
		System.out.println(Arrays.toString(input));

		// Find elements divisible by 2
		Arrays.stream(input).filter(i -> i % 2 == 0).forEach(System.out::println);
		// Square Each and every element
		Arrays.stream(input).map(e -> e * e).forEach(System.out::println);
	}

}