import type { APIRoute } from 'astro'
import app from '@/server/api/app'

export const ALL: APIRoute = (context) => app.fetch(context.request, { astro: context })
