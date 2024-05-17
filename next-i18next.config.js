// @ts-check

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en',
      'fr',
      'es',
      'de',
      'pt',
      'it',
      'ru',
      'ja',
      'zh',
      'ar',
      'hi',
      'tr',
      'ko',
      'pl',
      'nl',
      'id',
    ],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  /**
   * @link https://github.com/i18next/next-i18next#6-advanced-configuration
   */
  // saveMissing: false,
  strictMode: true,
  // serializeConfig: false,
  // react: { useSuspense: false }
}
