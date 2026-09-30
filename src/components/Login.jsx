import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useI18n } from '../I18nContext'
import LanguageSelect from './LanguageSelect'

function authMessage(code, t) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/invalid-email':
      return t.authInvalid
    case 'auth/user-not-found':
      return t.authUserNotFound
    case 'auth/wrong-password':
      return t.authWrongPassword
    case 'auth/too-many-requests':
      return t.authTooMany
    default:
      return t.errorGeneric
  }
}

export default function Login() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError(t.emailRequired)
      return
    }
    setBusy(true)
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
    } catch (err) {
      setError(authMessage(err.code, t))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-svh flex-col bg-gradient-to-b from-teal-50 via-white to-slate-50">
      <header className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2 text-teal-800">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-700 text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v18M3 12h18" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-semibold tracking-tight">{t.appName}</span>
        </div>
        <LanguageSelect />
      </header>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 pb-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/70">
          <h1 className="text-2xl font-semibold text-slate-900">{t.signIn}</h1>
          <p className="mt-2 text-sm text-slate-500">{t.tagline}</p>

          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/30"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                {t.password}
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-500/30"
              />
            </div>

            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-teal-700 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {busy ? t.signingIn : t.signIn}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
