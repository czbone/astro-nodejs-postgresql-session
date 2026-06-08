/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly APP_TITLE: string
  readonly PUBLIC_API_URL: string
}
declare namespace App {
  interface Locals {
    session: RedisSession
    user: UserSessionData
  }
}
