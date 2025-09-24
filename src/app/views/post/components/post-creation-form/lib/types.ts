// Core
import { z } from 'zod'

// Internal
import { POST_CREATION_FORM_SCHEMA } from './constants'

export type Prosp = React.FormHTMLAttributes<HTMLFormElement>

export type PostCreationFormType = z.infer<typeof POST_CREATION_FORM_SCHEMA>
