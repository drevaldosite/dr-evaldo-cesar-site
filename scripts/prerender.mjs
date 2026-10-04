import { readFile, rm, writeFile } from 'node:fs/promises'
import { basename, resolve, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

const projectRoot = resolve(process.cwd())
const clientIndexPath = resolve(projectRoot, 'dist', 'index.html')
const serverOutputPath = resolve(projectRoot, '.prerender', 'entry-server.js')
const serverOutputDirectory = resolve(projectRoot, '.prerender')

const { render } = await import(pathToFileURL(serverOutputPath).href)
const applicationHtml = render()
const template = await readFile(clientIndexPath, 'utf8')
const rootPlaceholder = '<div id="root"></div>'

if (!template.includes(rootPlaceholder)) {
  throw new Error('Não foi possível localizar o elemento #root no HTML gerado pelo Vite.')
}

// CSS principal inline: elimina a única requisição que ainda bloquearia a renderização inicial.
const stylesheetPattern = /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/
const stylesheetMatch = template.match(stylesheetPattern)

if (!stylesheetMatch) {
  throw new Error('Não foi possível localizar a folha de estilos gerada pelo Vite.')
}

const inlineCss = await readFile(resolve(projectRoot, 'dist', stylesheetMatch[1]), 'utf8')

if (inlineCss.includes('</style')) {
  throw new Error('A folha de estilos contém </style e não pode ser incorporada inline.')
}

const html = template
  .replace(stylesheetMatch[0], () => `<style>${inlineCss}</style>`)
  .replace(rootPlaceholder, () => `<div id="root">${applicationHtml}</div>`)

await writeFile(clientIndexPath, html, 'utf8')

if (!serverOutputDirectory.startsWith(`${projectRoot}${sep}`) || basename(serverOutputDirectory) !== '.prerender') {
  throw new Error('Diretório temporário de pré-renderização inválido.')
}

await rm(serverOutputDirectory, { recursive: true, force: true })
