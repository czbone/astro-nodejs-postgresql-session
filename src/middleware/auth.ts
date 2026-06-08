import { defineMiddleware } from 'astro/middleware'
import redis from '@/server/utils/redis-client'
import config from '@/server/config'
import RedisSession from '@/server/utils/redis-session'
import Session from '@/server/utils/session'

const INDEX_PATH = '/'

// セッション管理用のRedisセッションインスタンス作成
const redisSession = new RedisSession({ client: redis, ttl: config.SESSION_EXPIRES })

export const auth = defineMiddleware(async (context, next) => {
  // Redisセッション管理用APIを取得
  context.locals.session = redisSession

  // セッションからユーザ情報取得
  const user = await Session.getUser(context)
  if (user) {
    context.locals.user = user

    // ルートの場合はprotectedページに遷移
    if (context.url.pathname === INDEX_PATH) {
      //return Response.redirect(new URL('/protected', context.url), 302)
      //return Response.redirect(new URL('/protected', context.url)) // Response.redirectのデフォルトのレスポンスコードは302 ⇒ エラー発生
      return context.redirect('/protected') // OK
    } else {
      return next()
    }
  } else {
    if (config.PUBLIC_ROUTES.includes(context.url.pathname)) {
      // アクセス制限しないURLの場合
      return next()
    } else if (context.url.pathname.startsWith('/api/')) {
      // APIはアクセス不可
      return new Response(JSON.stringify({ message: 'アクセスできません' }), {
        status: 401
      })
    } else {
      // それ以外はルートにリダイレクト
      return Response.redirect(new URL('/', context.url))
    }
  }
})
