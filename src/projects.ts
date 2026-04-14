import type { ProjectEntry } from './stores/slides'

const modules = import.meta.glob('./projects/**/*.slide.vue')

const projectMap = new Map<string, ProjectEntry>()
for (const path of Object.keys(modules).sort()) {
  const match = path.match(/\.\/projects\/([^/]+)\/([^/]+)\.slide\.vue$/)
  if (!match) continue
  const [, projectName, slideName] = match
  if (!projectMap.has(projectName)) {
    projectMap.set(projectName, { name: projectName, slides: [] })
  }
  projectMap.get(projectName)!.slides.push({
    name: slideName,
    component: modules[path] as () => Promise<any>,
  })
}

export const projects = [...projectMap.values()]
