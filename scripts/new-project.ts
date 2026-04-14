import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const name = process.argv[2]
if (!name) {
  console.error('Usage: pnpm new-project <name>')
  process.exit(1)
}

const year = new Date().getFullYear()
const month = String(new Date().getMonth() + 1).padStart(2, '0')
const day = String(new Date().getDate()).padStart(2, '0')

// a=2026..z=2051, A=2052..Z=2077
let yearChar: string
if (year >= 2026 && year <= 2051) {
  yearChar = String.fromCharCode(97 + (year - 2026)) // a-z
} else if (year >= 2052 && year <= 2077) {
  yearChar = String.fromCharCode(65 + (year - 2052)) // A-Z
} else {
  console.error(`Year ${year} is outside encodable range (2026–2077)`)
  process.exit(1)
}

const prefix = `${yearChar}${month}${day}`
const folderName = `${prefix}-${name}`
const dir = join(import.meta.dirname, '..', 'src', 'projects', folderName)

mkdirSync(dir, { recursive: true })
writeFileSync(
  join(dir, '01-intro.slide.vue'),
  `<template>\n  <h1>${name}</h1>\n</template>\n`
)

console.log(`Created ${dir}/01-intro.slide.vue`)
