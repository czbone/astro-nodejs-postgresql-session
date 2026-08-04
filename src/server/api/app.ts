import { Hono } from 'hono'
import auth from '@/server/api/routes/auth'
import note from '@/server/api/routes/note'

const app = new Hono()

app.route('/auth', auth)
app.route('/note', note)

export default app
