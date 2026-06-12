import 'dotenv/config'

// サーバ用の定義値をここに設定する
const config = {
  PUBLIC_ROUTES: ['/', '/api/auth/login', '/api/auth/logout'], // アクセス制限しないURL

  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME || '__session', // セッションクッキー名
  SESSION_COOKIE_DOMAIN: process.env.SESSION_COOKIE_DOMAIN?.trim() || undefined, // サブドメイン間でセッション共有する場合の親ドメイン（例: .example.com）
  SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET || 'secret', // クッキー署名用シークレット（本番環境では必ず強力なランダム文字列に変更すること）
  SESSION_EXPIRES: process.env.SESSION_EXPIRES
    ? parseInt(process.env.SESSION_EXPIRES, 10)
    : 60 * 30, // セッション有効期限（秒）: デフォルト1800秒（30分）
  SESSION_ID_PREFIX: process.env.SESSION_ID_PREFIX || 'sess:', // Redisセッション保存用セッションIDプレフィックス
  SESSION_REDIS_URL: process.env.SESSION_REDIS_URL || 'redis://localhost:6379/' // Redis接続URL
}
export default config
