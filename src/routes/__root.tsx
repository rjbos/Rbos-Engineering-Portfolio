import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { Wrench } from 'lucide-react'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        title: 'Mechanical Engineering Portfolio — Projects, Simulations & Case Studies',
      },
      {
        name: 'description',
        content:
          'A portfolio of mechanical engineering projects spanning CAD, robotics, thermal systems, FEA, manufacturing, and embedded sensing.',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-50 text-slate-950 antialiased">
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-slate-950">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 text-white">
            <Wrench className="h-4 w-4" />
          </span>
          <span className="text-base font-bold tracking-tight">Reuben Bose</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/"
            hash="projects"
            className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950"
          >
            Projects
          </Link>
          <Link
            to="/"
            hash="approach"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 sm:inline-block"
          >
            Approach
          </Link>
          <Link
            to="/"
            hash="about"
            className="hidden rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-950 sm:inline-block"
          >
            About
          </Link>
          <Link
            to="/"
            hash="contact"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
          >
            Get in touch
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer id="contact" className="mt-24 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-slate-950">
              <Wrench className="h-4 w-4" />
            </span>
            <span className="text-base font-bold tracking-tight">Reuben Bose</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            Mechanical engineer working at the intersection of design, simulation, and embedded systems.
            Open to full-time roles and collaboration on hardware projects.
          </p>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Browse
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" hash="projects" className="transition-colors hover:text-white">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/" hash="approach" className="transition-colors hover:text-white">
                Approach
              </Link>
            </li>
            <li>
              <Link to="/" hash="about" className="transition-colors hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Contact
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:hello@example.com"
                className="transition-colors hover:text-white"
              >
                hello@example.com
              </a>
            </li>
            <li className="text-slate-400">Boston, MA</li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                LinkedIn
              </a>
              <span className="px-2 text-slate-600">·</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-white"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Reuben Bose. Built with TanStack Start on Netlify.
      </div>
    </footer>
  )
}
