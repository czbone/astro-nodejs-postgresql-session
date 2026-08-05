/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly APP_TITLE: string
}
declare namespace App {
  interface Locals {
    session: import('./server/utils/redis-session').default
    user: import('./types/user').UserSessionData
  }
}
