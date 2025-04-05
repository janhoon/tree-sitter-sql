SELECT co1, "col1", 1, test();

SELECT 
  id,
  first_name,
  last_name,
  email,
  created_at
FROM users
WHERE status = 'active' AND created_at > '2023-01-01'
ORDER BY created_at DESC
LIMIT 10;

SELECT 
  o.id AS order_id,
  o.order_date,
  c.name AS customer_name,
  p.name AS product_name,
  oi.quantity,
  oi.price
FROM orders o
INNER JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN customers c ON o.customer_id = c.id
JOIN products p ON oi.product_id = p.id
WHERE o.order_date BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY o.id, c.name, p.name
HAVING SUM(oi.price * oi.quantity) > 100
ORDER BY o.order_date DESC;

INSERT INTO users (first_name, last_name, email, status, created_at)
VALUES 
  ('John', 'Doe', 'john.doe@example.com', 'active', NOW()),
  ('Jane', 'Smith', 'jane.smith@example.com', 'pending', NOW());

UPDATE products
SET 
  price = price * 1.1,
  updated_at = NOW()
WHERE category = 'electronics' AND stock > 0
RETURNING id, name, price;

DELETE FROM order_items
WHERE order_id IN (
  SELECT id FROM orders WHERE created_at < '2022-01-01'
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active',
  CONSTRAINT valid_status CHECK (status IN ('active', 'inactive', 'pending'))
);

ALTER TABLE products
ADD COLUMN featured BOOLEAN DEFAULT false;

WITH monthly_sales AS (
  SELECT
    DATE_TRUNC('month', o.order_date) AS month,
    p.category,
    SUM(oi.price * oi.quantity) AS total_sales
  FROM orders o
  JOIN order_items oi ON o.id = oi.order_id
  JOIN products p ON oi.product_id = p.id
  WHERE o.status = 'completed'
  GROUP BY month, p.category
)
SELECT
  month,
  category,
  total_sales,
  SUM(total_sales) OVER (PARTITION BY category ORDER BY month) AS cumulative_sales,
  RANK() OVER (PARTITION BY month ORDER BY total_sales DESC) AS category_rank
FROM monthly_sales
ORDER BY month, total_sales DESC;

SELECT
  id,
  name,
  price,
  CASE
    WHEN price < 10 THEN 'Budget'
    WHEN price BETWEEN 10 AND 50 THEN 'Mid-range'
    WHEN price > 50 THEN 'Premium'
    ELSE 'Unknown'
  END AS price_category
FROM products;

SELECT
  id,
  UPPER(name) AS uppercase_name,
  CAST(price AS INTEGER) AS rounded_price,
  COALESCE(description, 'No description available') AS description
FROM products;
