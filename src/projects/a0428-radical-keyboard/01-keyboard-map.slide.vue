<script setup lang="ts">
type RadicalCategory = 'stroke' | 'phonetic' | 'special' | 'shape'
type ContentCategory = Exclude<RadicalCategory, 'stroke'>

interface RadicalKey {
  key: string
  stroke?: string
  phonetic?: string[]
  special?: string[]
  shape?: string[]
}

interface ParsedRadical {
  text: string
  superscript?: string
}

interface ParsedEntry {
  mark?: string
  radicals: ParsedRadical[]
}

interface ParsedKey {
  key: string
  stroke?: string
  categories: Partial<Record<ContentCategory, ParsedEntry[]>>
}

const rows: RadicalKey[][] = [
  [
    { key: 'Q', phonetic: ['求', '反犬: 犭', '且: 具-上', '其: 其-上'] },
    { key: 'W', phonetic: ['文', '文字头: 亠', '反文: 夂 攵'] },
    { key: 'E', phonetic: ['耳: 阝 卩', '儿: 见-下'], shape: ['像E: 彐 山'] },
    { key: 'R', phonetic: ['人: 亻'] },
    { key: 'T', phonetic: ['田'] },
    { key: 'Y', phonetic: ['言: 讠', '衣底: 𧘇', '羊', '羊变形 无尾羊: ⺶ ⺷'] },
    { key: 'U', phonetic: ['石', '水: 氺', '食: 饣', '手变形: 龵', '十变形: 𠂇'] },
    { key: 'I', phonetic: ['chi: 彳', 'chu: 亍', '虫'] },
    { key: 'O', shape: ['圆的: 日 月 目'] },
    { key: 'P', stroke: '撇 丿', special: ['强记: 礻 衤'] },
  ],
  [
    { key: 'A', stroke: '横 一', shape: ['A像鱼: 鱼'] },
    { key: 'S', phonetic: ['丝: 纟', '私: 厶 龴', '四: 罒'] },
    { key: 'D', stroke: '点 丶', phonetic: ['点: 冫 氵', '刀: 刂 ⺈'] },
    { key: 'F', phonetic: ['扶手: 扌', 'fou: 缶', '丰变形: 龶 寿-上 带-上'] },
    { key: 'G', phonetic: ['鬼', '革', '骨', 'gen: 艮', '既左: 既-左'] },
    { key: 'H', phonetic: ['像火: 灬', '黑', '虎头: 虍', '禾: 余-下'] },
    { key: 'J', phonetic: ['金: 钅 金', '卷字头: 龹'] },
    { key: 'K', special: ['框: 匚 冂 凵 囗 㠯'] },
    { key: 'L', stroke: '竖 丨', phonetic: ['立', '龙', '老字头: 耂'] },
  ],
  [
    { key: 'Z', phonetic: ['足: ⻊', '走之底: 廴 辶'] },
    { key: 'X', phonetic: ['心: 忄', '兴字头 小: ⺍ ⺌ ⺗'], shape: ['乂像X: 乂'] },
    { key: 'C', phonetic: ['草: 艹 廾'] },
    { key: 'V', stroke: '折 乛', phonetic: ['竹: ⺮', 'zhi: 豸'] },
    { key: 'B', phonetic: ['宝盖: 冖 宀', '倒八: 丷', '病: 疒', 'bao: 勹', '匕: 比-左'] },
    { key: 'N', stroke: '捺 乀', phonetic: ['无尾牛 牛: ⺧ 牜'] },
    { key: 'M', phonetic: ['木: 朩'] },
  ],
]

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

const contentCategories: ContentCategory[] = ['phonetic', 'special', 'shape']

const parsedRows: ParsedKey[][] = rows.map(row => row.map(parseKey))

function parseKey(key: RadicalKey): ParsedKey {
  return {
    key: key.key,
    stroke: key.stroke,
    categories: Object.fromEntries(
      contentCategories
        .map(category => [category, parseEntries(key[category])] as const)
        .filter(([, entries]) => entries.length > 0)
    ) as Partial<Record<ContentCategory, ParsedEntry[]>>,
  }
}

function parseEntries(entries?: string[]): ParsedEntry[] {
  return entries?.map(parseEntry) ?? []
}

function parseEntry(entry: string): ParsedEntry {
  const [rawMark, rawRadicals] = entry.includes(':')
    ? entry.split(/:(.*)/s)
    : ['', entry]

  return {
    mark: rawMark.trim() || undefined,
    radicals: rawRadicals.trim().split(/\s+/).map(parseRadical),
  }
}

function parseRadical(radical: string): ParsedRadical {
  const [text, superscript] = radical.split('-', 2)
  return { text, superscript }
}

function removeEmpty(categories: ParsedKey['categories']): ContentCategory[] {
  return contentCategories.filter(category => categories[category]?.length)
}
</script>

<template>
  <section class="h-screen w-full bg-stone-200 flex items-center relative">
    <h1 class="text-stone-400 bottom-0 left-0 absolute p-4">小鹤音型 - 部件字根键盘图</h1>

    <div class="w-full overflow-x-auto">
      <div class="flex flex-col justify-center gap-2 items-center-safe m-2">
        <div v-for="(row, rowIndex) in parsedRows" :key="rowIndex" class="h-32 flex gap-2">
          <article v-for="item in row" :key="item.key"
            class="flex aspect-square size-32 flex-col rounded-lg bg-white p-2">
            <div class="flex items-center justify-between gap-2">
              <!-- keyboard key label -->
              <div class="text-xl leading-none font-bold text-stone-600">
                {{ item.key }}
              </div>
              <!-- stroke region -->
              <div v-if="item.stroke" class="text-md leading-none font-normal" :class="categoryClasses.stroke">
                {{ item.stroke }}
              </div>
            </div>

            <!-- shape list -->
            <div
              class="mt-2 flex flex-1 flex-wrap justify-start gap-1 items-end text-center leading-tight font-normal text-stone-600 content-start">
              <!-- category -->
              <template v-for="category in removeEmpty(item.categories)" :key="category">
                <!-- radical -->
                <div v-for="entry in item.categories[category]"
                  :key="`${category}-${entry.radicals.map(radical => radical.text).join('-')}`" class="mr-2"
                  :class="categoryClasses[category]">
                  <div v-if="entry.mark" class="text-xs text-stone-400 border-b">{{ entry.mark }}</div>

                  <div>
                    <span v-for="radical in entry.radicals" :key="radical.text" class="mr-1">
                      {{ radical.text }}<sup v-if="radical.superscript" class="text-xs font-bold leading-none">{{
                        radical.superscript }}</sup>
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
