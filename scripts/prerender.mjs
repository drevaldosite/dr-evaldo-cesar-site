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

await writeFile(clientIndexPath, template.replace(rootPlaceholder, `<div id="root">${applicationHtml}</div>`), 'utf8')

if (!serverOutputDirectory.startsWith(`${projectRoot}${sep}`) || basename(serverOutputDirectory) !== '.prerender') {
  throw new Error('Diretório temporário de pré-renderização inválido.')
}

await rm(serverOutputDirectory, { recursive: true, force: true })
