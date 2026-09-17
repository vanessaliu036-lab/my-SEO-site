import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const source = readFileSync("components/site/site-final-cta.tsx", "utf8")

test("shared closing CTA uses the approved compact B layout on desktop", () => {
  assert.match(source, /grid-cols-1 gap-10 px-6 py-16 sm:px-8 md:grid-cols-12 md:px-12 lg:px-16 lg:py-20/)
  assert.match(source, /className="md:col-span-2"/)
  assert.match(source, /className="md:col-span-9 md:col-start-4"/)
  assert.match(source, /max-w-\[900px\][^\n]*text-\[clamp\(2\.4rem,4\.8vw,5\.2rem\)\]/)
  assert.doesNotMatch(source, /lg:py-28|text-\[clamp\(3rem,6vw,6\.4rem\)\]/)
})

test("shared closing CTA tightens supporting copy and button spacing without removing buttons", () => {
  assert.match(source, /mt-7 grid grid-cols-1 gap-6 border-t border-white\/16 pt-6[^\n]*lg:gap-10/)
  assert.match(source, /max-w-\[720px\] text-\[15px\] leading-7/)
  assert.equal((source.match(/px-5 py-2\.5/g) || []).length, 2)
  assert.match(source, /href=\{cta\.primaryHref\}/)
  assert.match(source, /href=\{cta\.secondaryHref\}/)
})

test("closing CTA retains existing page-specific content, routes and exclusion policy", () => {
  assert.match(source, /new Set\(\["\/contact", "\/distribution", "\/partnerships"\]\)/)
  assert.match(source, /title: "Start with Cambodia\. Build from there\."/)
  assert.match(source, /primaryHref: "\/contact"/)
  assert.match(source, /secondaryHref: "\/solutions"/)
  assert.match(source, /bg-\[#182019\] text-\[#f6f3ea\]/)
  assert.match(source, /className="flex flex-wrap gap-3"/)
})
