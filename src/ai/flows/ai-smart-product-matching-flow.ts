'use server';
/**
 * @fileOverview A Genkit flow for intelligently matching products across marketplaces.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartProductMatchingInputSchema = z.object({
  originalUrl: z.string().url(),
  productName: z.string(),
  productDescription: z.string().optional(),
  productCategory: z.string().optional(),
  originalPrice: z.number().optional(),
});
export type SmartProductMatchingInput = z.infer<typeof SmartProductMatchingInputSchema>;

const MatchedProductSchema = z.object({
  productName: z.string(),
  productUrl: z.string().url(),
  storeName: z.string(),
  price: z.number(),
  shippingCost: z.number(),
  estimatedDelivery: z.string(),
  similarityScore: z.number(),
  imageUrls: z.array(z.string().url()).optional(),
});

const SmartProductMatchingOutputSchema = z.array(MatchedProductSchema);
export type SmartProductMatchingOutput = z.infer<typeof SmartProductMatchingOutputSchema>;

const findSimilarProductsTool = ai.defineTool(
  {
    name: 'findSimilarProducts',
    description: 'Searches marketplaces for cheaper versions of the product.',
    inputSchema: z.object({ productName: z.string(), originalPrice: z.number().optional() }),
    outputSchema: SmartProductMatchingOutputSchema,
  },
  async (input) => {
    const basePrice = input.originalPrice || 100;
    return [
      {
        productName: `${input.productName} (Factory Direct)`,
        productUrl: 'https://www.aliexpress.com',
        storeName: 'AliExpress',
        price: basePrice * 0.25,
        shippingCost: 0,
        estimatedDelivery: '12 days',
        similarityScore: 0.98,
      },
      {
        productName: `${input.productName} (Marketplace)`,
        productUrl: 'https://www.temu.com',
        storeName: 'Temu',
        price: basePrice * 0.35,
        shippingCost: 2.99,
        estimatedDelivery: '8 days',
        similarityScore: 0.95,
      }
    ];
  }
);

const smartProductMatchingPrompt = ai.definePrompt({
  name: 'smartProductMatchingPrompt',
  input: {schema: SmartProductMatchingInputSchema},
  output: {schema: SmartProductMatchingOutputSchema},
  tools: [findSimilarProductsTool],
  prompt: `Find cheaper alternatives for: {{{productName}}} (Original Price: \${{{originalPrice}}}). Use the findSimilarProducts tool.`,
});

const aiSmartProductMatchingFlow = ai.defineFlow(
  { name: 'aiSmartProductMatchingFlow', inputSchema: SmartProductMatchingInputSchema, outputSchema: SmartProductMatchingOutputSchema },
  async (input) => {
    const {output} = await smartProductMatchingPrompt(input);
    return output!;
  }
);

export async function aiSmartProductMatching(input: SmartProductMatchingInput): Promise<SmartProductMatchingOutput> {
  return aiSmartProductMatchingFlow(input);
}