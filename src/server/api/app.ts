import { Hono } from 'hono'
import type { APIContext } from 'astro'
import auth from '@/server/api/routes/auth'
import note from '@/server/api/routes/note'

type Env = { Bindings: { astro: APIContext } }

const app = new Hono<Env>().basePath('/api')

app.route('/auth', auth)
app.route('/note', note)

export default app
