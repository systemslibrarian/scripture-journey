import type { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Adapter } from 'next-auth/adapters'
import { prisma } from '@/lib/prisma'

function getEmailServerConfig() {
  const host = process.env.EMAIL_SERVER_HOST
  const port = process.env.EMAIL_SERVER_PORT
  const user = process.env.EMAIL_SERVER_USER
  const pass = process.env.EMAIL_SERVER_PASSWORD

  if (host && port && user && pass) {
    const parsedPort = Number(port)
    if (Number.isNaN(parsedPort)) {
      throw new Error('EMAIL_SERVER_PORT must be a valid number.')
    }

    return {
      host,
      port: parsedPort,
      secure: process.env.EMAIL_SERVER_SECURE === 'true' || parsedPort === 465,
      auth: {
        user,
        pass,
      },
    }
  }

  return process.env.EMAIL_SERVER
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    EmailProvider({
      server: getEmailServerConfig(),
      from: process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
  },
}
