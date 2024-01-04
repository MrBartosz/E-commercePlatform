import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'

export const POST = async (request: any) => {
  const { email, password } = await request.json()

  await connectMongoDB()

  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    return new NextResponse('Email is already in use', { status: 400 })
  }

  const resetToken = crypto.randomBytes(20).toString('hex')
  const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  const passwordResetExpires = Date.now() + 3600000

  existingUser.resetToken = passwordResetToken
  existingUser.resetTokenExpiry = passwordResetExpires
  const resetUrl = `localhost:3000/reset-password/${resetToken}`

  console.log(resetUrl)
}
