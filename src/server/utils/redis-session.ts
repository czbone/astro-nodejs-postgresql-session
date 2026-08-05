import type Redis from 'ioredis'
import type { UserSessionData } from '@/types/user'

export type SessionRecord = {
  user: UserSessionData
  cookie?: {
    expires?: Date | string
  }
}

type Options = {
  client: Redis
  ttl?: number
}

class RedisSession {
  private client: Redis
  private ttl: number

  constructor(options: Options) {
    this.client = options.client
    this.ttl = options.ttl ?? 1800
  }

  async get(sid: string): Promise<SessionRecord | null> {
    const data = await this.client.get(sid)
    if (!data) return null

    try {
      return JSON.parse(data) as SessionRecord
    } catch {
      return null
    }
  }

  async set(sid: string, sess: SessionRecord): Promise<'OK' | null> {
    let value: string
    try {
      value = JSON.stringify(sess)
    } catch {
      return null
    }

    const ttl = this.getTTL(sess)
    if (ttl > 0) {
      return await this.client.set(sid, value, 'EX', ttl)
    }

    await this.destroy(sid)
    return null
  }

  async touch(sid: string, sess?: SessionRecord): Promise<number> {
    return await this.client.expire(sid, this.getTTL(sess))
  }

  async destroy(sid: string): Promise<number> {
    return await this.client.del(sid)
  }

  private getTTL(sess?: SessionRecord): number {
    if (sess?.cookie?.expires) {
      const ms = Number(new Date(sess.cookie.expires)) - Date.now()
      return Math.ceil(ms / 1000)
    }
    return this.ttl
  }
}

export default RedisSession
