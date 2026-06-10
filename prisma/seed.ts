import { prisma } from '@/lib/prisma'

async function main() {
  console.log('Starting seed...')

  // ユーザーデータ
  const users = [
    {
      email: 'admin@example.com',
      name: '管理者',
      password: '$2a$10$XLEGbbEKPN6WUHyV6Iv9zeT90nZTJl3uz4HPelKblOaQQgEicWijW',
      role: 'admin'
    },
    {
      email: 'user@example.com',
      name: '一般ユーザ',
      password: '$2a$10$XLEGbbEKPN6WUHyV6Iv9zeT90nZTJl3uz4HPelKblOaQQgEicWijW',
      role: 'user'
    }
  ]

  // ユーザーを作成
  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData
    })
    console.log(`Created/Updated user: ${user.email}`)
  }

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error during seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
