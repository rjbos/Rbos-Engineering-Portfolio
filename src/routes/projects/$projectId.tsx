import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, Calendar, CheckCircle2, Clock, UserRound } from 'lucide-react'
import projects from '@/data/projects'

export const Route = createFileRoute('/projects/$projectId')({
  component: ProjectDetail,
  loader: ({ params }) => {
    const project = projects.find((p) => p.id === Number(params.projectId))
    if (!project) throw notFound()
    return project
  },
  notFoundComponent: ProjectNotFound,
})

function ProjectDetail() {
  const project = Route.useLoaderData()
  const Icon = project.icon

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pt-10">
        <Link
          to="/"
          hash="projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>
      </div>

      <header className="mx-auto max-w-5xl px-6 pb-12 pt-8">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            <Icon className="h-3.5 w-3.5" />
            {project.category}
          </span>
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
            {project.difficulty}
          </span>
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{project.summary}</p>

        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Meta icon={Calendar} label="Year" value={project.year} />
          <Meta icon={UserRound} label="Role" value={project.role} />
          <Meta icon={Clock} label="Duration" value={project.duration} />
        </dl>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <img src={project.cover} alt={project.title} className="aspect-[16/9] w-full object-cover" />
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-12">
          <Section title="The problem">
            <p className="text-base leading-8 text-slate-700">{project.problem}</p>
          </Section>

          <Section title="Approach">
            <p className="text-base leading-8 text-slate-700">{project.description}</p>
            <ul className="mt-6 space-y-3">
              {project.approach.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-base leading-7 text-slate-700">{step}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Outcomes">
            <div className="grid gap-4 sm:grid-cols-2">
              {project.outcomes.map((o) => (
                <div
                  key={o.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {o.label}
                  </div>
                  <div className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                    {o.value}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Deliverables">
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-slate-900" />
                  {d}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <SidePanel title="Skills">
            <div className="flex flex-wrap gap-2">
              {project.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </SidePanel>

          <SidePanel title="Tools used">
            <ul className="space-y-1.5 text-sm text-slate-700">
              {project.tools.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                  {t}
                </li>
              ))}
            </ul>
          </SidePanel>
        </aside>
      </div>

      <RelatedProjects currentId={project.id} />
    </article>
  )
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-1 text-base font-bold text-slate-950">{value}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">{title}</h2>
      {children}
    </section>
  )
}

function SidePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{title}</h3>
      {children}
    </div>
  )
}

function RelatedProjects({ currentId }: { currentId: number }) {
  const related = projects.filter((p) => p.id !== currentId).slice(0, 3)
  return (
    <section className="border-t border-slate-200 bg-slate-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
            More projects
          </h2>
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-950"
          >
            See all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((p) => {
            const Icon = p.icon
            return (
              <Link
                key={p.id}
                to="/projects/$projectId"
                params={{ projectId: p.id.toString() }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Icon className="h-3.5 w-3.5" />
                    {p.category}
                  </div>
                  <div className="font-bold text-slate-950">{p.title}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-3xl font-black tracking-tight text-slate-950">Project not found</h1>
      <p className="mt-4 text-slate-600">
        That project may have been moved or never existed. Browse the full library instead.
      </p>
      <Link
        to="/"
        hash="projects"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Browse projects
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
