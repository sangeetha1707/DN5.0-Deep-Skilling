package com.sangee.test;
import org.junit.Test;
import static org.junit.Assert.*;
public class MyFirstTest {
	    @Test 
	    public void testAssertions() { 
	        // Assert equals 
	        assertEquals(5, 2 + 3); 
	 
	        // Assert true 
	        assertTrue(5 > 3); 
	 
	        // Assert false 
	        assertFalse(5 < 3); 
	 
	        // Assert null 
	        assertNull(null); 
	 
	        // Assert not null 
	        assertNotNull(new Object()); 
	    } 

}
