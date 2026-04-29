<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { LinkIcon, TrashIcon } from '@heroicons/vue/16/solid'
import { onMounted, ref } from 'vue'
import { removeEmpty, type RadicalCategory } from './flypy-shape-keymap'
import { lookupFlypyShapeCodes, type FlypyShapeLookupResult } from './flypy-shape-lookup'

const categoryClasses: Record<RadicalCategory, string> = {
  stroke: 'text-sky-600',
  phonetic: 'text-teal-600',
  special: 'text-red-600',
  shape: 'text-violet-600',
}

const input = ref('')
const history = useLocalStorage<string[]>('flypy-shape-code-lookup-history', ['实例'], {
  mergeDefaults: (storageValue, defaults) => storageValue.length > 0 ? storageValue : defaults,
})
const results = ref<FlypyShapeLookupResult[]>([])
const loading = ref(false)

async function lookup() {
  results.value = []
  loading.value = true
  results.value = await lookupFlypyShapeCodes(input.value)
  loading.value = false

  if (results.value.some(result => result.code)) {
    const text = results.value.map(result => result.character).join('')
    history.value = [
      text,
      ...history.value.filter(entry => entry !== text),
    ].slice(0, 24)
  }
}

function selectHistory(text: string) {
  input.value = text
  lookup()
}

function clearHistory() {
  history.value = []
}

onMounted(() => {
  if (history.value[0]) {
    selectHistory(history.value[0])
  }
})

const legend = [
  { category: 'stroke' as const, label: '基础笔画' },
  { category: 'phonetic' as const, label: '以音定字' },
  { category: 'special' as const, label: '特殊' },
  { category: 'shape' as const, label: '形状' },
]
</script>

<template>
  <section class="h-screen w-full flex flex-col bg-stone-200 text-stone-800">
    <!-- input -->
    <div class="grid grid-cols-[16rem_1fr] gap-x-6 gap-y-1 p-4 bg-white pt-12">
      <span class="text-stone-400">输入汉字</span>

      <div class="flex items-center gap-2">
        <span class="text-stone-400">历史</span>
        <button type="button" class="text-red-300 hover:text-red-400 hover:bg-red-100 p-1 rounded-lg cursor-pointer"
          aria-label="清空历史" title="清空历史" @click="clearHistory">
          <TrashIcon class="size-4" />
        </button>
      </div>

      <label class="flex flex-col gap-2">
        <input class="text-2xl py-2 px-3 rounded-lg bg-stone-200 focus:outline-none" v-model="input" type="text"
          autocomplete="off" inputmode="text" @input="lookup()" />
      </label>

      <div v-if="loading">
        <div>加载中</div>
      </div>
      <div v-else class="flex content-start items-start flex-wrap gap-2">
        <button v-for="text in history" :key="text" type="button"
          class="px-2 rounded-lg bg-stone-100 hover:bg-stone-200 cursor-pointer" @click="selectHistory(text)">
          <span>{{ text }}</span>
        </button>
      </div>


    </div>

    <div class="grid grid-cols-[repeat(auto-fit,16rem)] auto-rows-auto gap-x-6 gap-y-2 p-4">
      <div v-for="(result, resultIndex) in results" :key="`${result.character}-${resultIndex}`"
        class="grid grid-rows-subgrid row-span-3 gap-0">
        <div class="flex gap-2 mb-1">
          <span>{{ result.character }}</span>
          <span>{{ result.code || '未找到' }}</span>
        </div>

        <article v-for="item in result.keys" :key="`${result.character}-${resultIndex}-${item.key}`"
          class="flex gap-4 w-full rounded-lg bg-white p-2 mb-2">

          <!-- left: 按键 + 笔画 -->
          <div class="flex flex-col items-start gap-2">
            <!-- 按键 -->
            <div class="text-[1.5em] leading-none font-bold text-stone-600">
              {{ item.key }}
            </div>
            <!-- 笔画 -->
            <div v-if="item.stroke" class="text font-normal flex flex-col" :class="categoryClasses.stroke">
              <span class="text-[0.6em] border-b  w-full text-center text-stone-400">
                {{ item.stroke.split(' ')[0] }}
              </span>
              <span class="">{{ item.stroke.split(' ')[1] }}</span>
            </div>

          </div>

          <!-- right: 鹤形提示 -->
          <div class="flex flex-col gap-y-2 ">
            <!-- 1. 以音定字 + 形状 + 特殊 -->
            <div
              class="flex flex-wrap justify-start gap-2 items-end text-center leading-tight font-normal text-stone-600 content-start">
              <!-- for category in [以音定字, 形状, 特殊]; for entry in category -->
              <template v-for="category in removeEmpty(item.categories)" :key="category">
                <div v-for="entry in item.categories[category]"
                  :key="`${category}-${entry.radicals.map(radical => radical.text).join('-')}`" class=""
                  :class="categoryClasses[category]">

                  <!-- 字根解释 -->
                  <div v-if="entry.mark" class="text-[0.6em] text-stone-400 border-b">{{ entry.mark }}</div>

                  <!-- 字根 -->
                  <div>
                    <span v-for="radical in entry.radicals" :key="radical.text" class="">
                      {{ radical.text }}
                      <sup v-if="radical.superscript" class="text-[0.4em] font-bold leading-none">
                        <!-- 取部分字的说明 上,下,左 -->
                        {{ radical.superscript }}
                      </sup>
                    </span>
                  </div>
                </div>
              </template>
            </div>
            <!-- 2. 小字 -->
            <div v-if="item.small" class="flex flex-wrap gap-1 text-[0.8em]">
              <span v-for="radical in item.small" :key="radical">{{ radical }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <footer class="absolute bottom-0 right-0 flex gap-6 items-start p-4">
      <a href="https://flypy.cc/help/#/zg" target="_blank" rel="noopener noreferrer"
        class="text-stone-400 flex items-center gap-1 hover:bg-white/50 px-2 rounded-lg">
        <LinkIcon class="size-4" />
        官方指南
      </a>
      <div v-for="item in legend" :key="item.category" class="flex items-center gap-2">
        <div class="size-2 rounded-full bg-current" :class="categoryClasses[item.category]"></div>
        <div class="text-stone-400">{{ item.label }}</div>
      </div>
    </footer>
  </section>
</template>
