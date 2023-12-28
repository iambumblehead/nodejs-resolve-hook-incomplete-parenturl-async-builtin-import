import nodepath from 'node:path'

const importbuiltintop = () => {
  return nodepath.basename('/what/is/basname.txt')
}

const importbuiltininlineawait = async () => (
  (await import('node:fs/promises')).readdir('.'))

export {
  importbuiltintop,
  importbuiltininlineawait
}
