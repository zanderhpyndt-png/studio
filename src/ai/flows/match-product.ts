
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MatchSchema = z.object({
  productName: z.string(),
  productUrl: z.string().url(),
  storeName: z.string(),
  price: z.number(),
  shippingCost: z.number(),
  estimatedDelivery: z.string(),
  similarityScore: z.number(),
});

export type ProductMatch = z.infer<typeof MatchSchema>;

const findMatchesTool = ai.defineTool(
  {
    name: 'findMatches',
    description: 'Simulates searching global marketplaces for alternatives.',
    inputSchema: z.object({ productName: z.string(), targetPrice: z.number().optional() }),
    outputSchema: z.array(MatchSchema),
  },
  async (input) => {
    const base = input.targetPrice || 100;
    return [
      {
        productName: input.productName,
        productUrl: 'https://www.aliexpress.com',
        storeName: 'AliExpress',
        price: base * 0.4,
        shippingCost: 0,
        estimatedDelivery: '10-15 days',
        similarityScore: 0.95,
      },
      {
        productName: input.productName,
        productUrl: 'https://www.temu.com',
        storeName: 'Temu',
        price: base * 0.55,
        shippingCost: 2.99,
        estimatedDelivery: '7 days',
        similarityScore: 0.92,
      }
    ];
  }
);

const matchPrompt = ai.definePrompt({
  name: 'matchProductPrompt',
  input: { schema: z.object({ productName: z.string(), originalPrice: z.number().optional() }) },
  output: { schema: z.array(MatchSchema) },
  tools: [findMatchesTool],
  prompt: `Find better deals for "{{{productName}}}" which retails for \${{{originalPrice}}}. Use the findMatches tool.`,
});

export async function findProductMatches(productName: string, originalPrice?: number): Promise<ProductMatch[]> {
  const { output } = await matchPrompt({ productName, originalPrice });
  return output || [];
}
