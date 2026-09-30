import { formatList, formatTimestamp, translateBlood, translateCondition } from '../i18n'
import { useI18n } from '../I18nContext'

function Field({ label, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-teal-800">{label}</h3>
      <div className="mt-2 text-slate-900">{children}</div>
    </section>
  )
}

function Chips({ items, empty }) {
  if (!items.length) {
    return <p className="text-slate-500">{empty}</p>
  }
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-900 ring-1 ring-teal-200"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function PassportView({ passport, userEmail }) {
  const { lang, t } = useI18n()
  const history = formatList(passport.history).map((key) => translateCondition(lang, key))
  const allergies = formatList(passport.allergy)
  const meds = formatList(passport.meds)
  const updated = formatTimestamp(passport.updatedAt, lang)

  return (
    <div className="space-y-4">
      <article className="overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800 via-teal-700 to-cyan-800 p-6 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100">
          {t.passportTitle}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{passport.name || t.unknown}</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-teal-200">{t.blood}</p>
            <p className="mt-1 text-lg font-medium">{translateBlood(lang, passport.blood)}</p>
          </div>
          <div>
            <p className="text-teal-200">{t.email}</p>
            <p className="mt-1 truncate text-lg font-medium">{userEmail}</p>
          </div>
        </div>
      </article>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label={t.allergy}>
          <Chips items={allergies} empty={t.none} />
        </Field>
        <Field label={t.meds}>
          <Chips items={meds} empty={t.none} />
        </Field>
      </div>

      <Field label={t.history}>
        <Chips items={history} empty={t.none} />
      </Field>

      <Field label={t.emergencyContact}>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-slate-500">{t.contactName}</dt>
            <dd className="mt-0.5 font-medium">{passport.contactName || t.none}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">{t.contact}</dt>
            <dd className="mt-0.5 font-medium">
              {passport.contact ? (
                <a className="text-teal-800 underline-offset-2 hover:underline" href={`tel:${passport.contact}`}>
                  {passport.contact}
                </a>
              ) : (
                t.none
              )}
            </dd>
          </div>
        </dl>
      </Field>

      {updated ? (
        <p className="text-center text-xs text-slate-500">
          {t.updatedAt}: {updated}
        </p>
      ) : null}
    </div>
  )
}
