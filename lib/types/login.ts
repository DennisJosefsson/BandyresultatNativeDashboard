import { z } from 'zod'
export const login = z.object({ success: z.boolean(), message: z.string(), token:z.string() })
