import { Hono } from 'hono'
import type { APIContext } from 'astro'
import { verify } from '@/server/utils/password'
import Session from '@/server/utils/session'
import { UserDB } from '@/server/db'
import type { UserSessionData } from '@/types/user'
import { convertToUserSessionData } from '@/types/user'

type Env = { Bindings: { astro: APIContext } }

const auth = new Hono<Env>()

auth.post('/login', async (c) => {
  const { request } = c.env.astro

  if (request.headers.get('Content-Type') !== 'application/json') {
    return c.json({ message: 'Request format error' }, 400)
  }

  try {
    const body = await request.json()
    const email = body.email
    const password = body.password

    if (!email || !password) {
      return c.json({ message: 'Email address and password are required' }, 400)
    }

    const userWithPassword = await UserDB.getUserByEmail(email)
    if (!userWithPassword) {
      return c.json({ message: 'Bad credentials' }, 401)
    }

    const verified = await verify(password, userWithPassword.password)
    if (!verified) {
      return c.json({ message: 'Bad credentials' }, 401)
    }

    const sessionData: UserSessionData = convertToUserSessionData(userWithPassword)
    await Session.createUser(c.env.astro, sessionData)

    return c.json({ message: 'Login succeeded' }, 200)
  } catch (err) {
    console.log(err)
    return c.json({ message: 'Login failed' }, 500)
  }
})

auth.post('/logout', async (c) => {
  try {
    await Session.deleteUser(c.env.astro)
    return c.json({ message: 'Logout succeeded' }, 200)
  } catch {
    return c.json({ message: 'Logout failed' }, 500)
  }
})

export default auth
