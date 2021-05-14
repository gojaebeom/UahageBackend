WITH restaurant AS (
    insert into restaurants(category_id, name, )
    values()
),
v(a,b,c,d) AS (values
    ($27,$28,$29,$30),
    ($31,$32,$33,$34),
    ...
)
INSERT INTO invoiceItems (invoice_id, name, qty, price, description)
    SELECT restaurant.id, a,b,c,d FROM v, restaurant;