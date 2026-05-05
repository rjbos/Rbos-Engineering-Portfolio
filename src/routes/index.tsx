import { useMemo, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Search, Sparkles, Wrench } from 'lucide-react'
import projects from '@/data/projects'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

function HomePage() {
  return (
    <>
      <Hero />
      <ProjectLibrary />
      <Approach />
      <About />
    </>
  )
}

function Hero() {
  const featured = projects.filter((p) => p.featured).slice(0, 1)[0] ?? projects[0]

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(15,23,42,0.06),_transparent_60%)]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <Wrench className="h-4 w-4" />
            Mechanical Engineering Portfolio
          </div>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Engineering projects that prove out real solutions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A working portfolio of CAD, simulation, robotics, and manufacturing projects — each with the
            problem, the calculations, and the measured outcome documented end-to-end.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              hash="projects"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              View projects
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              hash="approach"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400"
            >
              How I work
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              { v: '7+', l: 'Documented projects' },
              { v: '4', l: 'Engineering domains' },
              { v: '2025', l: 'Most recent work' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                <dt className="text-2xl font-black tracking-tight text-slate-950">{s.v}</dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl">
          <div className="overflow-hidden rounded-[1.5rem]">
            <Link
              to="/projects/$projectId"
              params={{ projectId: featured.id.toString() }}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 text-white">
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                    <Sparkles className="h-3 w-3" />
                    Featured project
                  </div>
                  <h2 className="text-xl font-bold tracking-tight md:text-2xl">{featured.title}</h2>
                  <p className="mt-1 text-sm text-slate-200">{featured.category}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {featured.outcomes.slice(0, 4).map((o) => (
              <div key={o.label} className="rounded-2xl bg-slate-50 p-3">
                <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {o.label}
                </div>
                <div className="mt-1 text-sm font-bold text-slate-950">{o.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectLibrary() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory
      if (!q) return matchesCategory
      const haystack = [project.title, project.category, project.summary, ...project.skills, ...project.tools]
        .join(' ')
        .toLowerCase()
      return matchesCategory && haystack.includes(q)
    })
  }, [activeCategory, search])

  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
            Project Library
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Choose your engineering direction
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Filter by domain or search for a specific tool, simulation, or skill. Every project links to a
            full case study with calculations and results.
          </p>
        </div>
        <div className="relative max-w-md grow md:grow-0 md:basis-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search skills, tools, or projects…"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeCategory === category
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No projects match your filter. Try a different skill, category, or tool.
        </div>
      )}
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const Icon = project.icon
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: project.id.toString() }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-slate-950/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {project.difficulty}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-slate-100 p-2">
            <Icon className="h-5 w-5 text-slate-800" />
          </div>
          <p className="text-sm font-semibold text-slate-500">{project.category}</p>
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-950">{project.title}</h3>
        <p className="mb-5 text-sm leading-6 text-slate-600">{project.summary}</p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 4 && (
            <span className="rounded-full px-2 py-1 text-xs font-medium text-slate-500">
              +{project.skills.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
          <span className="font-medium text-slate-500">{project.year}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-slate-950 transition-colors group-hover:text-slate-700">
            View case study
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function Approach() {
  const sections = [
    {
      title: 'Problem statement',
      body: 'Define the constraint that mattered — load, cost, lead time, or environment — before touching CAD.',
    },
    {
      title: 'Engineering calculations',
      body: 'Hand calcs and analytical models set the baseline so simulations can be sanity-checked, not blindly trusted.',
    },
    {
      title: 'CAD and simulation',
      body: 'Parametric models and FEA / CFD studies that document assumptions, mesh, and convergence.',
    },
    {
      title: 'Test results',
      body: 'Bench data or instrumented prototypes compared against predictions — including where they disagree.',
    },
    {
      title: 'Failure analysis',
      body: 'Honest writeups of what broke, why, and how the next revision addressed it.',
    },
    {
      title: 'Next improvements',
      body: 'A short list of what would change with more time, cost, or instrumentation.',
    },
  ]

  return (
    <section id="approach" className="scroll-mt-20 bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div className="md:sticky md:top-24">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            How each project is built
          </p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Built like an engineering case study, not a gallery.
          </h2>
          <p className="mt-4 leading-7 text-slate-300">
            The best project pages do more than show the final result. They explain the problem,
            constraints, design decisions, calculations, failures, iterations, and measured outcomes —
            the same way a real design review goes.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/10">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-white px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">About</p>
          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Mechanical engineer with a soft spot for instrumented prototypes.
          </h2>
          <p className="mt-4 text-slate-600">
            I work across CAD, simulation, and embedded mechatronics — usually somewhere on the spectrum
            from a one-off bracket redesign to a full vehicle dynamics study. The projects below cover
            paid work, coursework, and personal builds, and each one is documented end-to-end.
          </p>
          <p className="mt-4 text-slate-600">
            Currently open to mechanical and mechatronics roles, and to short collaborations on
            instrumentation or DFM rework.
          </p>
          <Link
            to="/"
            hash="contact"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { h: 'Design & CAD', b: 'SolidWorks, Fusion 360, GD&T, parametric assemblies, shop drawings.' },
            { h: 'Simulation', b: 'FEA in ANSYS / SolidWorks Simulation, CFD in Fluent, MATLAB modeling.' },
            { h: 'Mechatronics', b: 'Embedded C/C++, sensor fusion, PID, rapid PCB and chassis prototyping.' },
            { h: 'Manufacturing', b: 'CNC, sheet metal, injection molding DFM, cost and lead-time analysis.' },
          ].map((c) => (
            <div key={c.h} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-semibold text-slate-950">{c.h}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{c.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
