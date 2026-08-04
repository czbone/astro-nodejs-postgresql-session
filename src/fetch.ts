import { Hono } from 'hono'
import { middleware, pages } from 'astro/hono'
import api from '@/server/api/app'

const app = new Hono()

app.use(middleware())
app.route('/api', api)
app.use(pages())

export default app
