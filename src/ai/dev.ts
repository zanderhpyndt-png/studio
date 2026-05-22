import { config } from 'dotenv';
config();

import '@/ai/flows/ai-product-detail-extraction-flow.ts';
import '@/ai/flows/ai-markup-and-scam-detector.ts';
import '@/ai/flows/ai-smart-product-matching-flow.ts';