import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectMongoDB } from '@/lib/mongodb'
import User from '@/models/user'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = await req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      await connectMongoDB()
      await User.create({ name, email, password: hashedPassword })

      return res.status(201).json({ message: 'User registered.' })
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while registering the user.' })
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
