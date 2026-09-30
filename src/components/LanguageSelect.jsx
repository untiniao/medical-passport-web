import { useI18n } from '../I18nContext'

export default function LanguageSelect({ className = '' }) {
  const { lang, setLang, languages, t } = useI18n()

  return (
    <label className={`flex items-center gap-2 text-sm ${className}`}>
      <span className="sr-only">{t.language}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white/90 px-2.5 py-1.5 text-sm text-slate-800 shadow-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/30"
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  )
}
