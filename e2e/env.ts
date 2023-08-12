import { z } from 'zod';

export const EnvSchema = z.object({
  BASE_URL: z.string().default('http://localhost:3000'),
  PORT: z
    .string()
    .transform((v) => parseInt(v, 10))
    .default('3000'),
});

export const env = EnvSchema.parse(process.env);
