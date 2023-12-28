import test from 'node:test'
import assert from 'node:assert/strict'
import module from 'node:module'

async function resolve (moduleId, context, next) {
  const result = await next(moduleId, context);

  if (result.url.startsWith('node:')) {
    if (context.parentURL.includes('?has-query-string=true')) {
      console.log('pass', context.parentURL)
    } else {
      throw new Error('context.parentURL is missing query string')
    }    
  } else {
    result.url += `?has-query-string=true&rand=${Math.random()}`
  }
  return result
}
/*
async function load(url, context, next) {
  if (url.startsWith('node:'))
    return next(url, context)

  return {
    shortCircuit: true,
    format: 'module',
    source: (await next(url, context)).source
  }
}

module.register && module.register(`
data:text/javascript,
export ${encodeURIComponent(load)}
export ${encodeURIComponent(resolve)}`.slice(1))
*/

module.register && module.register(`
data:text/javascript,
export ${encodeURIComponent(resolve)}`.slice(1))

test('should call resolvehook with querystring, builtin top import', async () => {
  const index = await import('./index.js')

  assert.ok(index.importbuiltintop())
})

test('should call resolvehook with querystring, builtin inline await import', async () => {
  const index = await import('./index.js')

  assert.ok(await index.importbuiltininlineawait())
})
