export type RadicalCategory = 'stroke' | 'phonetic' | 'special' | 'shape'
export type ContentCategory = Exclude<RadicalCategory, 'stroke'>

export interface RadicalKey {
  key: string
  stroke?: string
  phonetic?: string[]
  special?: string[]
  shape?: string[]
  small?: string[]
}

export interface ParsedRadical {
  text: string
  superscript?: string
}

export interface ParsedEntry {
  mark?: string
  radicals: ParsedRadical[]
}

export interface ParsedKey {
  key: string
  stroke?: string
  small?: string[]
  categories: Partial<Record<ContentCategory, ParsedEntry[]>>
}

export const contentCategories: ContentCategory[] = ['shape', 'phonetic', 'special']

export const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

export const shapeInfoByKey: Record<string, Omit<RadicalKey, 'key'>> = {
  Q: { phonetic: ['求', '反犬: 犭', '且: 具-上', '其: 其-上'], small: ['七', '千', '犬', '丘', '曲', '且', '气', '乞'] },
  W: { phonetic: ['文', '文字头: 亠', '反文: 夂 攵'], small: ['王', '瓦', '五', '无', '万', '午', '亡', '未', '乌', '韦', '勿', '为', '戊', '我', '丸', '兀'] },
  E: { phonetic: ['耳: 阝 卩', '儿: 见-下'], shape: ['像E: 彐 山'], small: ['二', '耳', '儿', '而'] },
  R: { phonetic: ['人: 亻'], small: ['人', '入', '冉', '壬', '刃'] },
  T: { phonetic: ['田'], small: ['土', '天', '太', '屯'] },
  Y: { phonetic: ['言: 讠', '衣底: 𧘇', '羊', '羊变形 无尾羊: ⺶ ⺷'], small: ['又', '酉', '已', '于', '义', '与', '夭', '玉', '牙', '丫', '永', '尤', '也', '业', '由', '央', '亚', '严', '用', '幺', '禺', '臾', '尹', '禹', '夷', '弋', '聿', '雨', '曳'] },
  U: { phonetic: ['石', '水: 氺', '食: 饣', '手变形: 龵', '十变形: 𠂇'], small: ['十', '尸', '士', '手', '身', '水', '上', '少', '术', '失', '生', '世', '申', '史', '升', '事', '书', '束', '勺', '戍', '豕', '氏', '矢'] },
  I: { phonetic: ['chi: 彳', 'chu: 亍', '虫'], small: ['川', '厂', '车', '长', '叉', '尺', '丑', '臣', '成', '垂', '斥', '串', '产', '出'] },
  O: { shape: ['圆的: 日 月 目'] },
  P: { stroke: '撇 丿', special: ['强记: 礻 衤'], small: ['片', '平', '爿'] },
  A: { stroke: '横 一', shape: ['A像鱼: 鱼'], small: ['凹'] },
  S: { phonetic: ['丝: 纟', '私: 厶 龴', '四: 罒'], small: ['三', '巳', '肃'] },
  D: { stroke: '点 丶', phonetic: ['点: 冫 氵', '刀: 刂 ⺈'], small: ['大', '丁', '刀', '歹', '刁', '东', '丹', '电', '氐'] },
  F: { phonetic: ['扶手: 扌', 'fou: 缶', '丰变形: 龶 寿-上 带-上'], small: ['非', '方', '飞', '夫', '凡', '甫', '弗', '乏', '丰'] },
  G: { phonetic: ['鬼', '革', '骨', 'gen: 艮', '既左: 既-左'], small: ['广', '弓', '戈', '工', '瓜', '干', '个', '甘', '丐', '果', '更', '夬'] },
  H: { phonetic: ['像火: 灬', '黑', '虎头: 虍', '禾: 余-下'], small: ['禾', '户', '互', '乎', '火'] },
  J: { phonetic: ['金: 钅 金', '卷字头: 龹'], small: ['巾', '几', '九', '斤', '久', '巨', '己', '井', '及', '夹', '甲', '臼', '韭', '戋', '柬', '击'] },
  K: { special: ['框: 匚 冂 凵 囗 㠯'], small: ['口', '开', '亏'] },
  L: { stroke: '竖 丨', phonetic: ['立', '龙', '老字头: 耂'], small: ['了', '力', '乐', '来', '良', '两', '里', '吏', '耒', '卵', '丽'] },
  Z: { phonetic: ['足: ⻊', '走之底: 廴 辶'], small: ['再', '自', '子'] },
  X: { shape: ['乂像X: 乂'], phonetic: ['心: 忄', '兴字头 小: ⺍ ⺌ ⺗'], small: ['小', '西', '心', '血', '下', '夕', '乡', '戌', '习'] },
  C: { phonetic: ['草: 艹 廾'], small: ['寸', '才', '匆', '册'] },
  V: { stroke: '折 乛', phonetic: ['竹: ⺮', 'zhi: 豸'], small: ['止', '爪', '主', '舟', '之', '正', '丈', '中', '专', '朱', '州', '重', '乍'] },
  B: { phonetic: ['宝盖: 冖 宀', '倒八: 丷', '病: 疒', 'bao: 勹', '匕: 比-左'], small: ['百', '白', '八', '卜', '匕', '卞', '不', '巴', '本', '必', '丙', '半', '办'] },
  N: { stroke: '捺 乀', phonetic: ['无尾牛 牛: ⺧ 牜'], small: ['廿', '女', '牛', '鸟', '乃', '内', '农', '年'] },
  M: { phonetic: ['木: 朩'], small: ['木', '毛', '米', '门', '马', '皿', '末', '灭', '母', '民', '么', '面'] },
}

export const rows: RadicalKey[][] = keyboardRows.map(row => row.map(key => ({ key, ...shapeInfoByKey[key] })))

export const parsedRows: ParsedKey[][] = rows.map(row => row.map(parseKey))
export const keyMap = new Map(parsedRows.flat().map(key => [key.key, key]))

export function removeEmpty(categories: ParsedKey['categories']): ContentCategory[] {
  return contentCategories.filter(category => categories[category]?.length)
}

function parseKey(key: RadicalKey): ParsedKey {
  return {
    key: key.key,
    stroke: key.stroke,
    small: key.small,
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
