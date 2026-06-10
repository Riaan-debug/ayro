const query = `*[_type == "product"] | order(_createdAt asc) {
  _id,
  name,
  "slug": slug.current,
  showOnShop
}`

const visibleQuery = `*[_type == "product" && showOnShop != false] | order(_createdAt asc) {
  name,
  "slug": slug.current,
  showOnShop
}`
const url =
  'https://xilnix6x.api.sanity.io/v2024-01-01/data/query/production?query=' +
  encodeURIComponent(query)

const res = await fetch(url)
const json = await res.json()
console.log('Status:', res.status)
console.log('All products:', json.result?.length ?? 0)
for (const p of json.result ?? []) {
  console.log(` - ${p.name} (${p.slug}) showOnShop=${p.showOnShop} [${p._id}]`)
}

const visibleRes = await fetch(
  'https://xilnix6x.api.sanity.io/v2024-01-01/data/query/production?query=' +
    encodeURIComponent(visibleQuery),
)
const visibleJson = await visibleRes.json()
console.log('\nVisible on shop (showOnShop != false):', visibleJson.result?.length ?? 0)
for (const p of visibleJson.result ?? []) {
  console.log(` - ${p.name} showOnShop=${p.showOnShop}`)
}
