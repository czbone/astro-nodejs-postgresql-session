import type { User } from '@prisma/client'
import prisma from './prisma'

class UserDB {
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      })
      return user
    } catch (err) {
      console.error(err)
      return null
    }
  }
}
export default new UserDB()
