DECLARE
v_age NUMBER;
BEGIN
FOR cust IN (
SELECT CustomerID, DOB
FROM Customers
) LOOP


    v_age := FLOOR(MONTHS_BETWEEN(SYSDATE, cust.DOB) / 12);

    IF v_age > 60 THEN
        UPDATE Loans
        SET InterestRate = InterestRate - 1
        WHERE CustomerID = cust.CustomerID;
    END IF;

END LOOP;

COMMIT;


END;
/
SELECT * FROM Loans;