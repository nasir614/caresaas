// src/ai/flows/compliance-check-tool.ts
'use server';

/**
 * @fileOverview An AI-powered tool that reviews staff credentials and training records,
 * highlights potential compliance issues, and estimates compliance risk based on expiry dates.
 *
 * - complianceCheckTool - A function that handles the compliance check process.
 * - ComplianceCheckToolInput - The input type for the complianceCheckTool function.
 * - ComplianceCheckToolOutput - The return type for the complianceCheckTool function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ComplianceCheckToolInputSchema = z.object({
  staffCredentials: z
    .string()
    .describe('A list of staff credentials, including names, roles, and credential types.'),
  trainingRecords: z
    .string()
    .describe('A list of staff training records, including names, training topics, and completion dates.'),
});
export type ComplianceCheckToolInput = z.infer<typeof ComplianceCheckToolInputSchema>;

const ComplianceCheckToolOutputSchema = z.object({
  complianceIssues: z
    .string()
    .describe('A summary of potential compliance issues identified in the staff credentials and training records.'),
  riskAssessment: z
    .string()
    .describe('An estimation of the overall compliance risk based on expiry dates and outstanding requirements.'),
});
export type ComplianceCheckToolOutput = z.infer<typeof ComplianceCheckToolOutputSchema>;

export async function complianceCheckTool(input: ComplianceCheckToolInput): Promise<ComplianceCheckToolOutput> {
  return complianceCheckToolFlow(input);
}

const prompt = ai.definePrompt({
  name: 'complianceCheckToolPrompt',
  input: {schema: ComplianceCheckToolInputSchema},
  output: {schema: ComplianceCheckToolOutputSchema},
  prompt: `You are an AI-powered compliance officer specializing in adult daycare regulations.

You will review staff credentials and training records to identify potential compliance issues and estimate the overall compliance risk.

Consider expiry dates, missing credentials, and incomplete training records when assessing compliance.

Staff Credentials: {{{staffCredentials}}}
Training Records: {{{trainingRecords}}}

Based on this information, provide a summary of compliance issues and a risk assessment.

Compliance Issues:
Risk Assessment: `,
});

const complianceCheckToolFlow = ai.defineFlow(
  {
    name: 'complianceCheckToolFlow',
    inputSchema: ComplianceCheckToolInputSchema,
    outputSchema: ComplianceCheckToolOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);



