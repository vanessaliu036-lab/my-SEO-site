"use client"

import { FormEvent, useEffect, useState } from "react"

const PASSWORD_HASH = "7e831593833c68e3f2f6323a7d176d98fe2dd518e6847f813f528a513679333d"
const SESSION_KEY = "occ-admin-auth"

async function sha256(value: string) {
  const data = new TextEncoder().encode(value)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export default function AdminPasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1")
    setReady(true)
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const digest = await sha256(password)
    if (digest === PASSWORD_HASH) {
      sessionStorage.setItem(SESSION_KEY, "1")
      setUnlocked(true)
      setError("")
      setPassword("")
      return
    }
    setError("Incorrect password")
    setPassword("")
  }

  if (!ready) return null
  if (unlocked) return <>{children}</>

  return (
    <main className="min-h-screen bg-[#f7f6f2] flex items-center justify-center px-6 py-12">
      <section className="w-full max-w-[430px] rounded-[28px] border border-[#e4e2dc] bg-white px-8 py-10 shadow-[0_24px_70px_rgba(17,24,39,0.08)] md:px-10 md:py-12">
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-[#9a9a92]">ORIGIN COFFEE CAMBODIA</p>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-[30px] font-bold tracking-[-0.05em] text-[#121826]">OCC</div>
              <h1 className="mt-5 font-serif text-[36px] leading-none tracking-[-0.035em] text-[#121826]">Admin Access</h1>
            </div>
            <span className="rounded-full border border-[#e8e7e2] px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#8a8d93]">PRIVATE</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#7b818c]">Enter the admin password to continue to orders, inventory, B2B and procurement.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="occ-admin-password" className="mb-2 block text-[11px] font-semibold tracking-[0.12em] text-[#8f949d]">PASSWORD</label>
            <input
              id="occ-admin-password"
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                if (error) setError("")
              }}
              autoFocus
              className="h-12 w-full rounded-xl border border-[#dedfe2] bg-white px-4 text-base tracking-[0.18em] text-[#121826] outline-none transition focus:border-[#121826]"
              placeholder="••••"
            />
            {error ? <p className="mt-2 text-xs text-[#9a3f3f]">{error}</p> : null}
          </div>

          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-[#121826] text-[12px] font-semibold tracking-[0.16em] text-white transition hover:bg-[#273142]"
          >
            ENTER ADMIN
          </button>
        </form>

        <a href="/" className="mt-7 block text-center text-[11px] font-semibold tracking-[0.14em] text-[#8d939d] transition hover:text-[#121826]">
          ← BACK TO FRONTEND
        </a>
      </section>
    </main>
  )
}
