import { keyMap, type ParsedKey } from './flypy-shape-keymap'

export interface FlypyShapeLookupResult {
  character: string
  code: string
  keys: ParsedKey[]
}

let codeMapPromise: Promise<Map<string, string>> | undefined

export async function lookupFlypyShapeCodes(text: string): Promise<FlypyShapeLookupResult[]> {
  const codeMap = await loadFlypyShapeCodes()

  return Array.from(text)
    .filter(character => /\p{Script=Han}/u.test(character))
    .map(character => {
      const code = codeMap.get(character) ?? ''

      return {
        character,
        code,
        keys: code
          .toUpperCase()
          .split('')
          .map(key => keyMap.get(key))
          .filter((key): key is ParsedKey => Boolean(key)),
      }
    })
}

async function loadFlypyShapeCodes() {
  codeMapPromise ??= import('./flypy_full.txt?raw').then(module => parseFlypyShapeCodes(module.default))
  return codeMapPromise
}

function parseFlypyShapeCodes(source: string): Map<string, string> {
  return new Map(
    source
      .trim()
      .split('\n')
      .map(line => line.split('=') as [string, string])
  )
}
