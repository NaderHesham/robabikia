-- Create reviews table for product ratings and reviews

CREATE TABLE public.reviews (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id text REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  rating     smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body       text,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, product_id)
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT USING (true);

CREATE POLICY "Authenticated users can submit a review"
  ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
