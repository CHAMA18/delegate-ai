'use client';

import { Reveal } from './reveal';

/**
 * Pricing section (brief §8.1 §10) — ICP-named, transparent.
 * Solo / Team / Org. "Talk to sales" only for Org.
 */
export function PricingSection() {
  const tiers = [
    {
      name: 'Solo',
      price: '$0',
      cadence: 'free forever',
      blurb: 'For founders and independents living in Google Workspace.',
      features: [
        'Up to 25 actions / week',
        '1 connected Workspace account',
        '7-day audit history',
        'Email support',
      ],
      cta: 'Start free',
      featured: false,
    },
    {
      name: 'Team',
      price: '$24',
      cadence: 'per user / month',
      blurb: 'For execution-first teams that ship meeting outcomes.',
      features: [
        'Unlimited actions',
        'Shared agent memory across team',
        '90-day audit history',
        'Priority routing + approvals',
        'Slack + Linear integrations',
      ],
      cta: 'Start 14-day trial',
      featured: true,
    },
    {
      name: 'Org',
      price: 'Custom',
      cadence: 'annual',
      blurb: 'For organizations with security, SSO, and procurement.',
      features: [
        'Everything in Team',
        'SSO + SCIM',
        'Custom data residency',
        'SOC 2 Type II report',
        'Dedicated solutions engineer',
      ],
      cta: 'Talk to sales',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center flex flex-col gap-3 mb-14">
          <span className="text-eyebrow">Pricing</span>
          <h2 className="text-h2 text-[#F5F7FA]">Pay for execution, not seats</h2>
          <p className="text-[17px] text-[#A9B4C4] max-w-xl mx-auto leading-[1.6]">
            Start free. Upgrade when the agent is shipping real work for you.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div
                className={`relative h-full p-7 rounded-2xl flex flex-col gap-5 transition-all duration-300 ${
                  t.featured
                    ? 'gradient-border bg-[#102544] border-transparent shadow-glow-violet md:-translate-y-2'
                    : 'border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] hover:border-[rgba(139,92,246,0.3)]'
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-[10px] uppercase tracking-[0.12em] font-semibold text-white font-mono">
                    Most popular
                  </span>
                )}

                <div>
                  <div className="text-[13px] uppercase tracking-[0.1em] text-[#6B7689] font-mono mb-2">
                    {t.name}
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[40px] font-semibold text-[#F5F7FA] tracking-[-0.03em]">
                      {t.price}
                    </span>
                    <span className="text-[12px] text-[#6B7689]">{t.cadence}</span>
                  </div>
                  <p className="text-[13px] text-[#A9B4C4] leading-[1.5]">
                    {t.blurb}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5 text-[13px] text-[#A9B4C4] flex-grow">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className="material-symbols-outlined text-[16px] text-[#34D399] mt-0.5"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                      >
                        check_circle
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-auto ${t.featured ? 'btn-primary' : 'btn-secondary'} w-full justify-center`}
                >
                  {t.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
