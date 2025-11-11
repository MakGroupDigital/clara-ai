
'use server';

/**
 * @fileOverview Analyzes candidate video interviews to assess soft skills and provide a matching score.
 *
 * - analyzeCandidateVideoInterview - A function that handles the video interview analysis process.
 * - AnalyzeCandidateVideoInterviewInput - The input type for the analyzeCandidateVideoInterview function.
 * - AnalyzeCandidateVideoInterviewOutput - The return type for the analyzeCandidateVideoInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCandidateVideoInterviewInputSchema = z.object({
  interviewTranscript: z
    .string()
    .describe(
      "A text transcript of the candidate's interview."
    ),
  jobDescription: z.string().describe('The description of the job.'),
});
export type AnalyzeCandidateVideoInterviewInput = z.infer<typeof AnalyzeCandidateVideoInterviewInputSchema>;

const AnalyzeCandidateVideoInterviewOutputSchema = z.object({
  softSkillsAssessment: z
    .object({
      communication: z.number().describe('Score for communication skill'),
      teamwork: z.number().describe('Score for teamwork skill'),
      problem_solving: z.number().describe('Score for problem solving skill'),
      leadership: z.number().describe('Score for leadership skill'),
    })
    .describe('An assessment of various soft skills with scores from 0 to 100.'),
  matchingScore: z.number().describe('The overall matching score between the candidate and the job.'),
  summary: z.string().describe('A summary of the candidate video interview'),
});
export type AnalyzeCandidateVideoInterviewOutput = z.infer<typeof AnalyzeCandidateVideoInterviewOutputSchema>;

export async function analyzeCandidateVideoInterview(
  input: AnalyzeCandidateVideoInterviewInput
): Promise<AnalyzeCandidateVideoInterviewOutput> {
  return analyzeCandidateVideoInterviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCandidateVideoInterviewPrompt',
  input: {schema: AnalyzeCandidateVideoInterviewInputSchema},
  output: {schema: AnalyzeCandidateVideoInterviewOutputSchema},
  prompt: `You are an expert recruiter, skilled at analyzing candidate video interviews based on their transcripts.

You will assess the candidate's soft skills based on their interview transcript and the provided job description. Evaluate communication, teamwork, problem_solving, and leadership skills, assigning a score from 0 to 100 for each.

Based on your analysis, you will generate an overall matching score between 0 and 100, and set the matchingScore output field appropriately.

You will also provide a short summary of the interview.

Job Description: {{{jobDescription}}}
Interview Transcript: {{{interviewTranscript}}}
`,
});

const analyzeCandidateVideoInterviewFlow = ai.defineFlow(
  {
    name: 'analyzeCandidateVideoInterviewFlow',
    inputSchema: AnalyzeCandidateVideoInterviewInputSchema,
    outputSchema: AnalyzeCandidateVideoInterviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
