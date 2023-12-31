import Link from 'next/link'

const links = [
  {
    title: 'Homepage',
    path: '/',
  },
  {
    title: 'Login',
    path: '/login',
  },
  {
    title: 'SignIn',
    path: '/signIn',
  },
]

const Links = () => {
  return (
    <div>
      {links.map((link) => (
        <Link
          href={link.path}
          key={link.title}
        >
          {link.title}
        </Link>
      ))}
    </div>
  )
}

export default Links
