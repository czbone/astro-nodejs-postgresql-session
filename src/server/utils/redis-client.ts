import Redis from 'ioredis'
import config from '@/server/config'

// Redisクライアントのシングルトンパターン
// グローバルスコープでのRedisインスタンス管理
const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

export const redis = globalForRedis.redis ?? new Redis(config.SESSION_REDIS_URL)

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis

// Redisエラーハンドリング
redis.on('error', (err) => {
  console.error('Redis connection error:', err)
})

redis.on('connect', () => {
  console.log('Redis connected successfully')
})

redis.on('reconnecting', () => {
  console.log('Redis reconnecting...')
})

redis.on('close', () => {
  console.log('Redis connection closed')
})

export default redis
