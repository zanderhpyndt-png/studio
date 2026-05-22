'use server';
/**
 * @fileOverview A Genkit flow for detecting dropshipping markups.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMarkupAndScamDetectorInputSchema = z.object({
  productName: z.string(),
  originalPrice: z.number(),
  productCategory: z.string(),
  productDescription: z.string().optional(),
  comparisonProducts: z.array(z.object({ store: z.string(), price: z.number(), url: z.string().url() })),
});
export type AIMarkupAndScamDetectorInput = z.infer<typeof AIMarkupAndScamDetectorInputSchema>;

const AIMarkupAndScamDetectorOutputSchema = z.object({
  isLikelyDropshipped: z.boolean(),
  isOverpriced: z.boolean(),
  markupExplanation: z.string(),
  badges: z.array(z.string()),
});
export type AIMarkupAndScamDetectorOutput = z.infer<typeof AIMarkupAndScamDetectorOutputSchema>;

const prompt = ai.definePrompt({
  name: 'aiMarkupAndScamDetectorPrompt',
  input: { schema: AIMarkupAndScamDetectorInputSchema },
  output: { schema: AIMarkupAndScamDetectorOutputSchema },
  prompt: `Analyze if \${{{originalPrice}}} for {{{productName}}} is a markup scam based on these alternatives:
{{#each comparisonProducts}}
- {{{store}}}: \${{{price}}}
{{/each}}`,
});

export async function detectProductMarkupAndScam(input: AIMarkupAndScamDetectorInput): Promise<AIMarkupAndScamDetectorOutput> {
  const {output} = await prompt(input);
  return output!;
}