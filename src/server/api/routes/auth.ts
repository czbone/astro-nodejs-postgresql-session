import { Hono } from 'hono'
import { getFetchState } from 'astro/hono'
import { verify } from '@/server/utils/password'
import Session from '@/server/utils/session'
import { UserDB } from '@/server/db'
import type { UserSessionData } from '@/types/user'
import { convertToUserSessionData } from '@/types/user'

const auth = new Hono()

auth.post('/login', async (c) => {
  if (c.req.header('Content-Type') !== 'application/json') {
    return c.json({ message: 'Request format error' }, 400)
  }

  try {
    const body = await c.req.json()
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
    await Session.createUser(getFetchState(c), sessionData)

    return c.json({ message: 'Login succeeded' }, 200)
  } catch (err) {
    console.log(err)
    return c.json({ message: 'Login failed' }, 500)
  }
})

auth.post('/logout', async (c) => {
  try {
    await Session.deleteUser(getFetchState(c))
    return c.json({ message: 'Logout succeeded' }, 200)
  } catch {
    return c.json({ message: 'Logout failed' }, 500)
  }
})

export default auth
