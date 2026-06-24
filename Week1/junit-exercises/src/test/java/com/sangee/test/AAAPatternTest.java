package com.sangee.test;

import org.junit.Before;
import org.junit.After;
import org.junit.Test;
import static org.junit.Assert.*;
// Exercise 4
public class AAAPatternTest {

    int a, b;

    @Before
    public void setUp() {
        a = 10;
        b = 5;
    }

    @Test
    public void testAdd() {
        // Arrange - done in setUp

        // Act
        int result = a + b;

        // Assert
        assertEquals(15, result);
    }

    @After
    public void tearDown() {
        a = 0;
        b = 0;
    }
}