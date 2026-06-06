-- Extend orders for cart checkout and payment metadata

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS qty integer NOT NULL DEFAULT 1 CHECK (qty > 0),
  ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'cash_on_delivery',
  ADD COLUMN IF NOT EXISTS checkout_reference uuid DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS unit_price numeric(10,2),
  ADD COLUMN IF NOT EXISTS order_total numeric(10,2);
