const query = `*[_type == "product"] | order(_createdAt asc) {
  _id,
  name,
  "slug": slug.current
}`
const url =
  'https://xilnix6x.api.sanity.io/v2024-01-01/data/query/production?query=' +
  encodeURIComponent(query)

const res = await fetch(url)
const json = await res.json()
console.log('Status:', res.status)
console.log('Products in Sanity:', json.result?.length ?? 0)
for (const p of json.result ?? []) {
  console.log(` - ${p.name} (${p.slug}) [${p._id}]`)
}
