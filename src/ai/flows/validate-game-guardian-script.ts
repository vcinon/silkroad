'use server';
/**
 * @fileOverview A GameGuardian script validation AI agent.
 *
 * - validateGameGuardianScript - A function that validates a GameGuardian script.
 * - ValidateGameGuardianScriptInput - The input type for the validateGameGuardianScript function.
 * - ValidateGameGuardianScriptOutput - The return type for the validateGameGuardianScript function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateGameGuardianScriptInputSchema = z.object({
  scriptContent: z
    .string()
    .describe('The content of the GameGuardian script to validate.'),
  version: z.string().optional().describe('The version of the GameGuardian script.'),
  timestamp: z.number().optional().describe('The timestamp of the script execution.'),
  userId: z.string().optional().describe('The ID of the user running the script.'),
});
export type ValidateGameGuardianScriptInput = z.infer<
  typeof ValidateGameGuardianScriptInputSchema
>;

const ValidateGameGuardianScriptOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the GameGuardian script is valid.'),
  reason: z.string().describe('The reason why the script is invalid, if applicable.'),
});
export type ValidateGameGuardianScriptOutput = z.infer<
  typeof ValidateGameGuardianScriptOutputSchema
>;

export async function validateGameGuardianScript(
  input: ValidateGameGuardianScriptInput
): Promise<ValidateGameGuardianScriptOutput> {
  return validateGameGuardianScriptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateGameGuardianScriptPrompt',
  input: {schema: ValidateGameGuardianScriptInputSchema},
  output: {schema: ValidateGameGuardianScriptOutputSchema},
  prompt: `You are an expert GameGuardian script validator.

You will receive a GameGuardian script and must determine if it is valid based on the following criteria:

- The script should not contain any malicious code.
- If a version is provided, the script version must be up to date.
- If a timestamp is provided, the script should be executed within the allowed time window.
- If a userId is provided, the user must have permission to execute the script.

Script Content: {{{scriptContent}}}
Version: {{{version}}}
Timestamp: {{{timestamp}}}
User ID: {{{userId}}}

Based on your validation, determine if the script is valid and provide a reason if it is not.
Set the isValid output field appropriately.  If the script is not valid, the reason must be set.
`,
});

const validateGameGuardianScriptFlow = ai.defineFlow(
  {
    name: 'validateGameGuardianScriptFlow',
    inputSchema: ValidateGameGuardianScriptInputSchema,
    outputSchema: ValidateGameGuardianScriptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
