<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'
import { useSlidesStore } from './stores/slides'
import { ViewfinderCircleIcon, ChevronLeftIcon, ChevronRightIcon, Bars3Icon, EyeIcon } from '@heroicons/vue/16/solid'

const topBarPinned = useLocalStorage('topbar-pinned', false)

const store = useSlidesStore()
const router = useRouter()
const route = useRoute()
const navRef = ref<HTMLElement>()

function scrollToActive() {
  navRef.value?.querySelector('.router-link-exact-active')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
}

watch(() => route.path, () => scrollToActive())

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    store.toggleSidebar()
    return
  }
  if (e.key === 'ArrowLeft' && store.prevSlide) {
    router.push(`/${store.prevSlide.project}/${store.prevSlide.slide}`)
    return
  }
  if (e.key === 'ArrowRight' && store.nextSlide) {
    router.push(`/${store.nextSlide.project}/${store.nextSlide.slide}`)
    return
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden">
    <div v-show="store.sidebarOpen" class="relative border-r border-stone-200 w-56">
      <nav ref="navRef" class="absolute inset-0 px-1 overflow-y-auto">
        <div v-for="project in store.projects" :key="project.name">
          <!-- project name label -->
          <div class="text-stone-500 pt-2 pb-1 px-2 sticky top-0 bg-white">{{ project.name }}</div>
          <!-- slide link -->
          <router-link v-for="slide in project.slides" :key="slide.name" :to="`/${project.name}/${slide.name}`"
            class="block text-stone-900 px-2 py-1 hover:bg-stone-100 rounded-lg" active-class="!text-green-500">
            {{ slide.name }}
          </router-link>
        </div>
      </nav>
      <div class="absolute right-0 bottom-0 p-1">
        <button class=" p-1 m-1 bg-stone-200 text-stone-800 hover:text-stone-600 rounded"
          title="Scroll to the Active Slide" @click="scrollToActive">
          <ViewfinderCircleIcon class="size-5" />
        </button>
      </div>
    </div>
    <main class="flex-1 overflow-auto relative">
      <!-- top bar: hidden by default, appears on hover -->
      <div class="absolute top-0 inset-x-0 mt-1 flex items-center justify-between transition-opacity"
        :class="topBarPinned ? 'opacity-100' : 'opacity-0 hover:opacity-100'">
        <div class="flex items-center gap-2">
          <button class="p-2 ml-2 hover:bg-stone-100 rounded" @click="store.toggleSidebar()" title="Toggle sidebar">
            <Bars3Icon class="size-5" />
          </button>
          <template v-if="store.currentProject">
            <h2 class="text-stone-800" v-if="store.currentSlideIndex >= 0">
              {{ store.currentProject.slides[store.currentSlideIndex].name }}
            </h2>
            <h1 class="text-stone-400 ">{{ store.currentProject.name }}</h1>
          </template>
        </div>
        <div class="flex items-center gap-2 text-stone-600">
          <button class="p-2 hover:bg-stone-200 bg-stone-100 rounded-lg"
            :class="topBarPinned ? 'bg-stone-300 text-stone-900' : ''" @click="topBarPinned = !topBarPinned"
            :title="topBarPinned ? 'Unpin top bar' : 'Pin top bar'">
            <EyeIcon class="size-5" />
          </button>
          <div class="  bg-stone-100 rounded-lg mr-2 overflow-hidden">
            <button class="p-2 pr-1 hover:bg-stone-200" :disabled="!store.prevSlide"
              @click="store.prevSlide && router.push(`/${store.prevSlide.project}/${store.prevSlide.slide}`)">
              <ChevronLeftIcon class="size-5" />
            </button>
            <button class="p-2 pl-1 hover:bg-stone-200" :disabled="!store.nextSlide"
              @click="store.nextSlide && router.push(`/${store.nextSlide.project}/${store.nextSlide.slide}`)">
              <ChevronRightIcon class="size-5" />
            </button>
          </div>

        </div>
      </div>

      <!-- slide content -->
      <router-view />
    </main>
  </div>
</template>
