/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly APP_TITLE: string
}
declare namespace App {
  interface Locals {
    session: RedisSession
    user: UserSessionData
  }
}
