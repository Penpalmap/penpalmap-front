import { useRouter } from 'next/router'

const useLanguage = () => {
  const router = useRouter()
  const locale = router.locale
  const changeLocale = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}`

    router.push(router.pathname, router.asPath, { locale })
  }

  return { changeLocale, locale }
}
export default useLanguage
