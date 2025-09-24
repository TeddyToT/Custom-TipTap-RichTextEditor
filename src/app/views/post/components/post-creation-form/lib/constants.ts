import { z } from 'zod'

// Form Schemas
export const POST_CREATION_FORM_SCHEMA = z.object({
  title: z.string().trim().min(1, { message: '' }),
  content: z.string().trim()
})

// Default Form Value
export const DEFAULT_POST_CREATION_FORM_VALUES: z.infer<typeof POST_CREATION_FORM_SCHEMA> = {
  title: '',
  content: ''
} as const
