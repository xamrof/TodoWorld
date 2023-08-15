import { PrismaClient } from '@prisma/client'
import {encodePassword} from '../src/utils/bycriptPass'
const prisma = new PrismaClient()

async function main() {
    const alice = await prisma.user.upsert({
        where: { email: 'alice@prisma.io' },
        update: {},
        create: {
          email: 'alice@prisma.io',
          user: 'alice12',
          password: encodePassword('123456'),
          age: 23,
          tasks: {
            create: {
              title: 'Check out Prisma with Next.js',
              description: 'https://www.prisma.io/nextjs',
              priority: 'LOW',
            },
          },
        },
      })
      const bob = await prisma.user.upsert({
        where: { email: 'bob@prisma.io' },
        update: {},
        create: {
            email: 'bob@prisma.io',
            user: 'bob12',
            password: encodePassword('123456'),
            age: 24,
          tasks: {
            create: [
              {
                title: 'Follow Prisma on Twitter',
                description: 'https://twitter.com/prisma',
                priority: 'HIGH',
              },
              {
                title: 'Follow Nexus on Twitter',
                description: 'https://twitter.com/nexusgql',
                priority: 'MEDIUM',
              },
            ],
          },
        },
      })
      const baal = await prisma.user.upsert({
        where: { email: 'baal@prisma.io' },
        update: {},
        create: {
            email: 'baal@prisma.io',
            user: 'ShogunRaiden',
            password: encodePassword('123456'),
            age: 19,
          tasks: {
            create: [
              {
                title: 'comer dulces',
                description: 'necesito comer dulces',
                priority: 'HIGH',
              },
              {
                title: 'Ir con el viajero',
                description: 'Necesito salir',
                priority: 'MEDIUM',
              },
            ],
          },
        },
      })
      const lumine = await prisma.user.upsert({
        where: { email: 'lumine@prisma.io' },
        update: {},
        create: {
            email: 'lumine@prisma.io',
            user: 'lumine',
            password: encodePassword('123456'),
            age: 24,
          tasks: {
            create: [
              {
                title: 'i am lumine',
                description: 'this is a description',
                priority: 'HIGH',
              },
              {
                title: 'el viajero es mi hermano',
                description: 'this is a description',
                priority: 'LOW',
              },
            ],
          },
        },
      })

      const ganyu = await prisma.user.upsert({
        where: { email: 'ganyu@prisma.io' },
        update: {},
        create: {
            email: 'ganyu@prisma.io',
            user: 'ganyu',
            password: encodePassword('123456'),
            age: 24,
          tasks: {
            create: [
              {
                title: 'soy la mejor personaje',
                description: 'this is a description',
                priority: 'LOW',
              },
              {
                title: 'disparo muchas flechas',
                description: 'this is a description',
                priority: 'MEDIUM',
              },
              {
                title: 'pego duro',
                description: 'this is a description',
                priority: 'HIGH',
              }
            ],
          },
        },
      })
      const kokomi = await prisma.user.upsert({
        where: { email: 'kokomi@prisma.io' },
        update: {},
        create: {
            email: 'kokomi@prisma.io',
            user: 'kokomi',
            password: encodePassword('123456'),
            age: 21,
          tasks: {
            create: [
              {
                title: 'soy kokomi',
                description: 'this is a description',
                priority: 'HIGH',
              },
            ],
          },
        },
      })
      const shenhe = await prisma.user.upsert({
        where: { email: 'shenhe@prisma.io' },
        update: {},
        create: {
            email: 'shenhe@prisma.io',
            user: 'shenhe',
            password: encodePassword('123456'),
            age: 21,
          tasks: {
            create: [
              {
                title: 'soy dormilona',
                description: 'this is a description',
                priority: 'MEDIUM',
              },
              {
                title: 'soy dormilona',
                description: 'this is a description',
                priority: 'MEDIUM',
              },
              {
                title: 'soy dormilona',
                description: 'this is a description',
                priority: 'MEDIUM',
              }
            ],
          },
        },
      })
      const xianling = await prisma.user.upsert({
        where: { email: 'xianling@prisma.io' },
        update: {},
        create: {
            email: 'xianling@prisma.io',
            user: 'xianling',
            password: encodePassword('123456'),
            age: 17,
          tasks: {
            create: [
              {
                title: 'Necesito cocinar',
                description: 'this is a description',
                priority: 'HIGH',
              },
            ],
          },
        },
      })
      const yelan = await prisma.user.upsert({
        where: { email: 'yelan@prisma.io' },
        update: {},
        create: {
            email: 'yelan@prisma.io',
            user: 'yelan',
            password: encodePassword('123456'),
            age: 21,
          tasks: {
            create: [
              {
                title: 'es un secreto',
                description: 'this is a description',
                priority: 'HIGH',
              }
            ],
          },
        },
      })
      const zhongli = await prisma.user.upsert({
        where: { email: 'zhongli@prisma.io' },
        update: {},
        create: {
            email: 'zhoongli@prisma.io',
            user: 'zhongli',
            password: encodePassword('123456'),
            age: 500,
          tasks: {
            create: [
              {
                title: 'Soy el puto amo',
                description: 'this is a description',
                priority: 'HIGH',
              }
            ],
          },
        },
      })
      
      console.log({ alice, bob })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
