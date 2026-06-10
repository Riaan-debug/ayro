const html = await fetch('https://cole-roan.vercel.app/').then((r) => r.text())
const match = html.match(/assets\/(index-[^"]+\.js)/)
if (!match) {
  console.log('Could not find JS bundle on live site')
  process.exit(1)
}
const js = await fetch(`https://cole-roan.vercel.app/assets/${match[1]}`).then((r) =>
  r.text(),
)
console.log('Bundle:', match[1])
console.log('Has showOnShop filter:', js.includes('showOnShop'))
