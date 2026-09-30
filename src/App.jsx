import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { useI18n } from './I18nContext'
import LanguageSelect from './components/LanguageSelect'
import Login from './components/Login'
import PassportView from './components/PassportView'

export default function App() {
  const { t } = useI18n()
  const [user, setUser] = useState(undefined)
  const [passport, setPassport] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    return onAuthStateChanged(auth, setUser)
  }, [])

  useEffect(() => {
    if (!user) {
      setPassport(null)
      setStatus('idle')
      setError('')
      return
    }

    let cancelled = false
    async function load() {
      setStatus('loading')
      setError('')
      try {
        const snap = await getDoc(doc(db, 'passports', user.uid))
        if (cancelled) return
        if (snap.exists()) {
          setPassport({ id: snap.id, ...snap.data() })
          setStatus('ready')
        } else {
          setPassport(null)
          setStatus('empty')
        }
      } catch {
        if (cancelled) return
        setError(t.errorGeneric)
        setStatus('error')
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [user, t.errorGeneric])

  if (user === undefined) {
    return (
      <div className="grid min-h-svh place-items-center bg-slate-50 text-slate-600">
        {t.loading}
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <div className="min-h-svh bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2 text-teal-800">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v18M3 12h18" strokeLinecap="round" />
              </svg>
            </span>
            <span className="font-semibold">{t.appName}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelect />
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              {t.signOut}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6">
        {status === 'loading' ? <p className="text-center text-slate-500">{t.loading}</p> : null}
        {status === 'error' ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}
        {status === 'empty' ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
            <p className="font-medium text-slate-800">{t.notFound}</p>
            <p className="mt-2 text-sm text-slate-500">{t.notFoundHint}</p>
          </div>
        ) : null}
        {status === 'ready' && passport ? (
          <PassportView passport={passport} userEmail={user.email} />
        ) : null}
      </main>
    </div>
  )
}
