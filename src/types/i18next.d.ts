// resources.ts file is generated with `npm run toc`
import resources from './resources.js'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: typeof resources
  }
}
