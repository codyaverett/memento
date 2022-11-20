---
name: Create DB Elements
created: 2022-11-20T14:57:25-06:00
updated: 2022-11-20T15:05:22-06:00
aliases: 
tags: 
---
# Create DB Elements

## Database
```SQL
CREATE DATABASE AP;
```

## Table
```sql
--MSSQL SERVER
CREATE TABLE Invoices
(
	InvoiceID  INT  NOT NULL IDENTITY PRIMARY KEY,
	VendorID   INT  NOT NULL REFERENCES Vendors(VendorID),
	InvoiceNumber  VARCHAR(50)  NOT NULL,
	InvoiceDate    DATE         NOT NULL,
	InvoiceTotal   MONEY        NOT NULL,
	PaymentTotal   MONEY        NOT NULL DEFAULT 0,
	CreditTotal    MONEY        NOT NULL DEFAULT 0,
	TermsID    INT        NOT NULL REFERENCES Terms(TermsID),
	InvoiceDueDate  DATE  NOT NULL,
	PaymentDate     DATE  NULL,
)
```

### Add New Column to Table
```SQL
ALTER TABLE Invoices
ADD BalanceDue  MONEY NOT NULL;
```

### Statement That Deletes the New Column
```SQL
ALTER TABLE Invoices
DROP COLUMN BalanceDue;
```

## Statement That Creates an Index on the Table
```SQL
CREATE INDEX IX_Invoices_VendorID
	ON Invoices (VendorID);
```
