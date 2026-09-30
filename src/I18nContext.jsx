import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, getStrings } from './i18n'

const STORAGE_KEY = 'mp-lang'

const I18nContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: getStrings('en'),
  languages: LANGUAGES,
})

function detectLang() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && LANGUAGES.some((l) => l.code === saved)) return saved
  const nav = navigator.language || 'en'
  if (nav.startsWith('zh')) {
    if (nav.includes('TW') || nav.includes('HK') || nav.includes('Hant')) return 'zh-TW'
    return 'zh-CN'
  }
  if (nav.startsWith('ja')) return 'ja'
  if (nav.startsWith('pt')) return 'pt'
  if (nav.startsWith('es')) return 'es'
  if (nav.startsWith('ko')) return 'ko'
  return 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => detectLang())

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (code) => {
    setLangState(code)
    localStorage.setItem(STORAGE_KEY, code)
  }

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: getStrings(lang),
      languages: LANGUAGES,
    }),
    [lang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
