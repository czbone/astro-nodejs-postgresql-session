import type { User } from '@/generated/prisma/client'

export type UserRole = 'admin' | 'operator' | 'user'

// 一時利用ユーザ情報
export interface UserData {
  id: string
  email: string
  name: string
  role: string
}

export interface UserSessionData {
  id: string
  email: string
  name: string
  role: UserRole
}

// Prisma APIのデータを変換
export const convertToUserData = (user: User): UserData => {
  const { password, ...exceptPassword } = user
  return exceptPassword
}
export const convertToUserSessionData = (user: User): UserSessionData => {
  const { password, createdAt, updatedAt, ...exceptPassword } = user
  const userSessinData: UserSessionData = {
    id: exceptPassword.id,
    email: exceptPassword.email,
    name: exceptPassword.name,
    role: exceptPassword.role as UserRole
  }
  return userSessinData
}
