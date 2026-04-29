<script setup lang="ts">
import { parsedRows, removeEmpty, type RadicalCategory } from './flypy-shape-keymap'

const categoryClasses: Record<RadicalCategory, string> = {
  stroke: 'text-sky-600',
  phonetic: 'text-teal-600',
  special: 'text-red-600',
  shape: 'text-violet-600',
}

const legend = [
  { category: 'stroke' as const, label: '基础笔画' },
  { category: 'phonetic' as const, label: '以音定字' },
  { category: 'special' as const, label: '特殊' },
  { category: 'shape' as const, label: '形状' },
]

</script>

<template>
  <section class="h-screen w-full bg-stone-200 flex items-center relative">
    <h1 class="text-stone-400 bottom-0 left-0 absolute p-4">小鹤音型 - 部件字根键盘图</h1>

    <div class="w-full overflow-x-auto text-[8px] md:text-[12px] xl:text-lg flex flex-col items-center-safe">
      <div class="flex flex-col justify-center xl:gap-2 md:gap-1 gap-0.5 items-start m-2">
        <div v-for="(row, rowIndex) in parsedRows" :key="rowIndex" class="flex xl:gap-2 md:gap-1 gap-0.5" :class="{
          'xl:pl-16 md:pl-11 pl-7': rowIndex === 1,
          'xl:pl-32 md:pl-22 pl-14': rowIndex === 2
        }">
          <article v-for="item in row" :key="item.key"
            class="flex aspect-square size-14 md:size-22 xl:size-32 flex-col xl:rounded-lg bg-white xl:p-2 md:p-1 p-0.5 md:rounded-sm">
            <div class="flex items-center justify-between xl:gap-2 md:gap-1 gap-0.5">
              <!-- keyboard key label -->
              <div class="text-[1.2em] leading-none font-bold text-stone-600">
                {{ item.key }}
              </div>
              <!-- stroke region -->
              <div v-if="item.stroke" class="text-[1em] leading-none font-normal" :class="categoryClasses.stroke">
                {{ item.stroke }}
              </div>
            </div>

            <!-- shape list -->
            <div
              class="mt-2 flex flex-1 flex-wrap justify-start xl:gap-2 md:gap-1 gap-0.5 items-end text-center leading-tight font-normal text-stone-600 content-start">
              <!-- category -->
              <template v-for="category in removeEmpty(item.categories)" :key="category">
                <!-- radical -->
                <div v-for="entry in item.categories[category]"
                  :key="`${category}-${entry.radicals.map(radical => radical.text).join('-')}`" class=""
                  :class="categoryClasses[category]">
                  <div v-if="entry.mark" class="text-[0.6em] text-stone-400 border-b">{{ entry.mark }}</div>

                  <div>
                    <span v-for="radical in entry.radicals" :key="radical.text" class="mr-1">
                      {{ radical.text }}
                      <sup v-if="radical.superscript" class="text-[0.4em] font-bold leading-none">
                        {{ radical.superscript }}
                      </sup>
                    </span>
                  </div>
                </div>
              </template>
            </div>
          </article>
        </div>
      </div>
    </div>

    <footer class="absolute bottom-0 right-0 flex gap-6 items-start p-4">
      <div v-for="item in legend" :key="item.category" class="flex items-center gap-2">
        <div class="size-2 rounded-full bg-current" :class="categoryClasses[item.category]"></div>
        <div class="text-stone-400">{{ item.label }}</div>
      </div>
    </footer>

  </section>
</template>
