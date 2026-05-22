
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProductDetailSchema = z.object({
  productName: z.string(),
  productImages: z.array(z.string().url()),
  price: z.number().optional(),
  category: z.string(),
  description: z.string().optional(),
});

export type ProductDetails = z.infer<typeof ProductDetailSchema>;

const extractPrompt = ai.definePrompt({
  name: 'extractProductPrompt',
  input: { schema: z.object({ url: z.string().url() }) },
  output: { schema: ProductDetailSchema },
  prompt: `Extract essential product details from this URL: {{{url}}}.
  Provide name, high-quality images, numeric price, and a broad category.`,
});

export async function extractProductDetails(url: string): Promise<ProductDetails> {
  const { output } = await extractPrompt({ url });
  if (!output) throw new Error("Could not extract product details.");
  return output;
}
