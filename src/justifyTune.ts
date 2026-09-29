// Ajuste fino da justificacao: para cada paragrafo, testa pequenas variacoes de
// word-spacing/letter-spacing e mantem a que deixa os espacos entre palavras mais uniformes.
const SELECTOR = [
  '.hero-copy > p',
  '.section-title p',
  '.specialty-card p',
  '.procedure-narrative__intro p',
  '.procedure-narrative__items span',
  '.patient-review blockquote',
  '.faq-answer p',
  '.about-copy p',
  '.contact-copy p',
].join(',')

const CANDIDATES: ReadonlyArray<readonly [string, string]> = [
  ['-.05em', '0'], ['-.03em', '0'], ['-.08em', '0'], ['0', '0'],
  ['-.03em', '-.01em'], ['0', '-.01em'], ['-.06em', '-.01em'],
]
const NORMAL_GAP = 0.3
const MIN_GAP = 0.2

function score(el: HTMLElement, node: Text): number {
  const text = node.data
  const range = document.createRange()
  const fontSize = parseFloat(getComputedStyle(el).fontSize) || 16
  let lineTop = NaN
  let gaps: number[] = []
  let total = 0
  const flush = () => {
    if (!gaps.length) return
    const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length / fontSize
    total += Math.max(0, avg - NORMAL_GAP) ** 2 + Math.max(0, MIN_GAP - avg) ** 2
    gaps = []
  }
  for (let i = text.indexOf(' '); i !== -1; i = text.indexOf(' ', i + 1)) {
    range.setStart(node, i)
    range.setEnd(node, i + 1)
    const rect = range.getClientRects()[0]
    if (!rect) continue
    if (Number.isNaN(lineTop) || Math.abs(rect.top - lineTop) > 4) {
      flush()
      lineTop = rect.top
    }
    gaps.push(rect.width)
  }
  // A ultima linha nao e justificada, entao seus espacos nao entram na conta.
  return total
}

function tuneElement(el: HTMLElement): void {
  el.style.wordSpacing = ''
  el.style.letterSpacing = ''
  const node = el.firstChild
  if (el.childNodes.length !== 1 || !node || node.nodeType !== Node.TEXT_NODE) return
  if (!el.getClientRects().length) return
  let best = CANDIDATES[0]
  let bestScore = Infinity
  for (const candidate of CANDIDATES) {
    el.style.wordSpacing = candidate[0]
    el.style.letterSpacing = candidate[1]
    const s = score(el, node as Text)
    if (s < bestScore) { bestScore = s; best = candidate }
  }
  el.style.wordSpacing = best[0]
  el.style.letterSpacing = best[1]
}

let run = 0

// Processa poucos paragrafos por vez para nao travar a thread principal.
export function tuneJustification(): void {
  const token = ++run
  const queue = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
  const step = () => {
    if (token !== run) return
    queue.splice(0, 4).forEach(tuneElement)
    if (queue.length) setTimeout(step, 0)
  }
  step()
}
