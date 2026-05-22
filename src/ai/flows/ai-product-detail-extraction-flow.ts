'use server';
/**
 * @fileOverview A Genkit flow for extracting product details from a given URL.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProductDetailExtractionInputSchema = z.object({
  productUrl: z.string().url().describe('The URL of the product page.'),
});
export type AIProductDetailExtractionInput = z.infer<typeof AIProductDetailExtractionInputSchema>;

const AIProductDetailExtractionOutputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productImages: z.array(z.string().url()).describe('Product image URLs.'),
  price: z.number().optional().describe('Numeric price.'),
  currency: z.string().optional().describe('Currency code.'),
  category: z.string().describe('Product category.'),
  description: z.string().optional().describe('Short description.'),
});
export type AIProductDetailExtractionOutput = z.infer<typeof AIProductDetailExtractionOutputSchema>;

export async function aiProductDetailExtraction(input: AIProductDetailExtractionInput): Promise<AIProductDetailExtractionOutput> {
  return aiProductDetailExtractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProductDetailExtractionPrompt',
  input: {schema: AIProductDetailExtractionInputSchema},
  output: {schema: AIProductDetailExtractionOutputSchema},
  prompt: `Extract product details from the URL: {{{productUrl}}}. Return name, images, numeric price, and category.`,
});

const aiProductDetailExtractionFlow = ai.defineFlow(
  { name: 'aiProductDetailExtractionFlow', inputSchema: AIProductDetailExtractionInputSchema, outputSchema: AIProductDetailExtractionOutputSchema },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);