import { toPng } from 'html-to-image'

/**
 * Captures a full HTMLTableElement as a PNG,
 * even if it is inside a horizontally scrollable container.
 */
export default async function (
  tableEl: HTMLTableElement,
): Promise<string> {
  if (!tableEl) {
    throw new Error('captureTablePng: table element is required')
  }

  // Clone the table
  const clone = tableEl.cloneNode(true) as HTMLTableElement

  // Normalize styles to avoid mobile clipping
  clone.style.width = 'max-content'
  clone.style.maxWidth = 'none'
  clone.style.overflow = 'visible'
  clone.style.transform = 'none'
  clone.style.borderCollapse = 'collapse'

  // Disable sticky headers if present
  clone.querySelectorAll<HTMLTableCellElement>('th').forEach((th) => {
    th.style.position = 'static'
  })

  // Create offscreen wrapper
  const wrapper: HTMLDivElement = document.createElement('div')
  wrapper.style.position = 'fixed'
  wrapper.style.top = '-10000px'
  wrapper.style.left = '0'
  wrapper.style.backgroundColor = '#ffffff'
  wrapper.style.padding = '16px'
  wrapper.style.zIndex = '-1'

  wrapper.appendChild(clone)
  document.body.appendChild(wrapper)

  // Wait one frame so layout is fully computed (important on mobile)
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

  // Capture PNG
  const png: string = await toPng(clone, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    cacheBust: true,
    skipFonts: true,
  })

  // Cleanup
  document.body.removeChild(wrapper)

  return png
}
