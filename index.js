import Koa from 'koa'
import serve from 'koa-static'
import fs from 'fs'
import path from 'path'

const app = new Koa()
const dist = path.join(__dirname, 'dist')
let validRoutes

fs.readdir(dist, (err, files) => {
  if (err) return console.log('Unable to scan directory: ' + err)
  validRoutes = files
})

function isRouteValid (url) {
  if (!validRoutes || !url) return false
  return validRoutes.find(route => url.slice(1) === route)
}

app.use(async (ctx, next) => {
  if (!isRouteValid(ctx.url)) ctx.path = 'index.html'
  await next()
})

app.use(serve(dist))

app.listen(3010)
