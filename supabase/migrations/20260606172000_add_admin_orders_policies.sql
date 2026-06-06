-- Allow admins to manage all orders

CREATE POLICY "Admins can view all orders"
  ON public.orders
  FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all orders"
  ON public.orders
  FOR UPDATE
  USING (public.is_admin(auth.uid()));
