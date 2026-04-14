import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../projects'

export interface SlideEntry {
  name: string
  component: () => Promise<any>
}

export interface ProjectEntry {
  name: string
  slides: SlideEntry[]
}

export const useSlidesStore = defineStore('slides', () => {
  const route = useRoute()
  const sidebarOpen = ref(true)

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  // Routes use literal paths, so parse project/slide from route.path
  const pathParts = computed(() => {
    const parts = route.path.split('/').filter(Boolean)
    return { project: parts[0], slide: parts[1] }
  })

  const currentProject = computed(() =>
    projects.find(p => p.name === pathParts.value.project)
  )

  const currentSlideIndex = computed(() => {
    const proj = currentProject.value
    if (!proj) return -1
    return proj.slides.findIndex(s => s.name === pathParts.value.slide)
  })

  const prevSlide = computed(() => {
    const proj = currentProject.value
    const idx = currentSlideIndex.value
    if (!proj || idx <= 0) return null
    return { project: proj.name, slide: proj.slides[idx - 1].name }
  })

  const nextSlide = computed(() => {
    const proj = currentProject.value
    const idx = currentSlideIndex.value
    if (!proj || idx < 0 || idx >= proj.slides.length - 1) return null
    return { project: proj.name, slide: proj.slides[idx + 1].name }
  })

  return { projects, sidebarOpen, toggleSidebar, currentProject, currentSlideIndex, prevSlide, nextSlide }
})
