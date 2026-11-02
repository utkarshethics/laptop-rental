import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Laptop, ShieldCheck, Truck, RefreshCw, ClipboardCheck, MessageCircle, Phone, Mail } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import {
  SECOND_HAND_FAQS,
  SECOND_HAND_GRADES,
  SECOND_HAND_MODELS,
  SECOND_HAND_ROUTE,
  SECOND_HAND_SEGMENTS,
  SECOND_HAND_STEPS,
  SECOND_HAND_TRUST,
  formatINR,
  type SecondHandSegment,
} from '@/data/second-hand';

const CANONICAL = `https://laptoponrent.online${SECOND_HAND_ROUTE}/`;
const TRUST_ICONS = [ClipboardCheck, ShieldCheck, Truck, RefreshCw];

export function SecondHandLaptops() {
  const [segment, setSegment] = useState<'all' | SecondHandSegment>('all');
  const models = segment === 'all' ? SECOND_HAND_MODELS : SECOND_HAND_MODELS.filter(m => m.segment === segment);

  return (
    <>
      <Helmet>
        <title>Buy Second-Hand Laptops in India | Certified Refurbished | LaptopRent</title>
        <meta
          name="description"
          content="Buy certified second-hand and refurbished laptops from Dell, HP, Lenovo, Apple and ASUS. Quality-checked, warranty included, doorstep delivery across 25+ Indian cities."
        />
        <link rel="canonical" href={CANONICAL} />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-600 text-white">
        <div className="container py-12 md:py-16">
          <nav className="text-sm text-white/70 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/categories" className="hover:text-white">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">Second-Hand Laptops</span>
          </nav>
          <span className="inline-block bg-white/15 rounded-full px-3 py-1 text-xs font-semibold mb-4">
            NEW · Buy, don't just rent
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl">
            Certified Second-Hand Laptops — Quality-Checked, Ready to Use
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mb-6">
            Business-grade Dell, HP, Lenovo, Apple and ASUS laptops at a fraction of the new price. Every unit is tested,
            cleaned, graded honestly and delivered to your door with warranty.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#models" className="bg-white text-primary-700 font-semibold px-5 py-3 rounded-lg hover:bg-primary-50">
              Browse laptops
            </a>
            <a
              href={buildWhatsAppUrl("Hi, I want to buy a second-hand laptop. My budget is ₹")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/10"
            >
              Tell us your budget
            </a>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="container -mt-6 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECOND_HAND_TRUST.map((t, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <div key={t.title} className="bg-white border border-secondary-200 rounded-xl p-4 shadow-sm flex gap-3">
                <Icon className="w-6 h-6 text-primary-600 shrink-0" />
                <div>
                  <p className="font-semibold text-secondary-900">{t.title}</p>
                  <p className="text-sm text-secondary-600">{t.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Models */}
      <section id="models" className="container py-12 md:py-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">Popular second-hand models</h2>
        <p className="text-secondary-600 mb-6 max-w-2xl">
          Indicative starting prices for the configurations we source most often. Availability, grade and final price of a
          specific unit are confirmed on WhatsApp before you pay. Don't see what you need? Send us your budget and we'll
          source it.
        </p>

        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter laptops">
          {SECOND_HAND_SEGMENTS.map(s => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSegment(s.id)}
              className={
                'px-4 py-2 rounded-full text-sm border transition-colors ' +
                (segment === s.id
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'bg-white text-secondary-700 border-secondary-200 hover:border-primary-400')
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {models.map(m => (
            <article key={m.id} className="border border-secondary-200 rounded-xl overflow-hidden bg-white flex flex-col hover:shadow-lg transition-shadow group">
              <div className="relative aspect-[4/3] bg-secondary-50 p-4 flex items-center justify-center overflow-hidden">
                {m.imageUrl ? (
                  <img
                    src={m.imageUrl}
                    alt={`${m.brand} ${m.name} - certified second-hand refurbished laptop`}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <Laptop className="w-16 h-16 text-primary-500" strokeWidth={1.25} />
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">{m.brand}</span>
                <h3 className="text-lg font-semibold text-secondary-900 mt-1 mb-2">{m.name}</h3>
                <ul className="text-sm text-secondary-600 space-y-0.5 mb-4">
                  {m.specs.map(s => <li key={s}>• {s}</li>)}
                </ul>
                <p className="mt-auto mb-3">
                  <span className="text-xs text-secondary-500">From </span>
                  <span className="text-2xl font-bold text-secondary-900">{formatINR(m.priceFrom)}</span>
                </p>
                <a
                  href={buildWhatsAppUrl(`Hi, I'm interested in buying a second-hand ${m.brand} ${m.name} (from ${formatINR(m.priceFrom)}). Please share availability, grade and photos.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 hover:bg-primary-700 text-white text-center text-sm font-semibold py-2.5 rounded-lg"
                >
                  Check availability
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Grades */}
      <section className="bg-secondary-50 border-y border-secondary-200">
        <div className="container py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">How we grade every laptop</h2>
          <p className="text-secondary-600 mb-6 max-w-2xl">
            Honest grading so you know exactly what arrives. Both grades are fully functional — the difference is cosmetic only.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {SECOND_HAND_GRADES.map(g => (
              <div key={g.name} className="bg-white border border-secondary-200 rounded-xl p-6">
                <h3 className={'text-lg font-semibold mb-1 ' + (g.tone === 'green' ? 'text-green-600' : 'text-amber-600')}>{g.name}</h3>
                <p className="text-secondary-600">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">How buying works</h2>
        <p className="text-secondary-600 mb-6">Simple, transparent and on WhatsApp — no account needed.</p>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SECOND_HAND_STEPS.map((s, i) => (
            <li key={s.title} className="border border-secondary-200 rounded-xl p-5 bg-white">
              <span className="inline-flex w-8 h-8 rounded-full bg-primary-600 text-white font-bold items-center justify-center mb-3">{i + 1}</span>
              <h3 className="font-semibold text-secondary-900 mb-1">{s.title}</h3>
              <p className="text-sm text-secondary-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Rent vs buy */}
      <section className="bg-secondary-50 border-y border-secondary-200">
        <div className="container py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-6">Rent or buy second-hand?</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden text-sm md:text-base">
              <thead className="bg-primary-50 text-left">
                <tr><th className="p-3"></th><th className="p-3">Rent</th><th className="p-3">Buy second-hand</th></tr>
              </thead>
              <tbody className="[&_td]:p-3 [&_tr]:border-t [&_tr]:border-secondary-200">
                <tr><td className="font-semibold">Best for</td><td>Short projects, events, trials, teams scaling up</td><td>Use beyond 12 months, students, small offices</td></tr>
                <tr><td className="font-semibold">Upfront cost</td><td>Monthly rent + refundable deposit</td><td>One-time price</td></tr>
                <tr><td className="font-semibold">Ownership</td><td>Return when done</td><td>Yours to keep</td></tr>
                <tr><td className="font-semibold">Upgrades</td><td>Swap anytime</td><td>Exchange towards a new purchase</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            <Link to="/categories" className="text-primary-600 font-medium hover:underline">Prefer to rent? See all rental plans →</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-12 md:py-16 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-6">Frequently asked questions</h2>
        <div className="space-y-3">
          {SECOND_HAND_FAQS.map(f => (
            <details key={f.question} className="border border-secondary-200 rounded-lg p-4 bg-white">
              <summary className="font-semibold cursor-pointer text-secondary-900">{f.question}</summary>
              <p className="mt-2 text-secondary-600">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="container pb-16">
        <div className="bg-secondary-900 text-white rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Looking for a specific model?</h2>
          <p className="text-white/80 mb-6">Tell us your budget and requirement — we'll find the right second-hand laptop for you.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={buildWhatsAppUrl("Hi, I'm looking for a second-hand laptop")} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-semibold">
              <MessageCircle className="w-5 h-5" /> WhatsApp +91-78922-40243
            </a>
            <a href="tel:+917892240243" className="inline-flex items-center gap-2 bg-white text-secondary-900 px-5 py-3 rounded-lg font-semibold">
              <Phone className="w-5 h-5" /> Call us
            </a>
            <a href="mailto:connect@laptoponrent.online?subject=Second-hand%20laptop%20enquiry"
              className="inline-flex items-center gap-2 border border-white px-5 py-3 rounded-lg font-semibold">
              <Mail className="w-5 h-5" /> Email us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
