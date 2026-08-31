'use client';

import { useEffect, useState } from 'react';
import { LogoMark } from '@/components/delegate/logo';
import { KineticWord } from '@/components/delegate/kinetic-word';
import { Reveal } from '@/components/delegate/reveal';
import { HeroSection, TrustStrip } from '@/components/delegate/hero-section';
import { ActionCascadeMockup } from '@/components/delegate/action-cascade-mockup';
import { ProblemSection } from '@/components/delegate/problem-section';
import { HowItWorksSection } from '@/components/delegate/how-it-works-section';
import { BentoSection } from '@/components/delegate/bento-section';
import { ComparisonSection } from '@/components/delegate/comparison-section';
import { CaseStudySection } from '@/components/delegate/case-study-section';
import { PricingSection } from '@/components/delegate/pricing-section';
import { FaqSection } from '@/components/delegate/faq-section';
import { FinalCtaSection } from '@/components/delegate/final-cta-section';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#031427] text-[#F5F7FA] overflow-x-hidden">
      {/* ============= NAV ============= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav' : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto w-full h-16 px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <LogoMark className="h-8 w-8 transition-transform group-hover:scale-110" />
            <span className="font-semibold text-[17px] tracking-[-0.02em] text-[#F5F7FA]">
              Delegate
              <span className="ai-gradient-text">.ai</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[14px] text-[#A9B4C4]">
            <a href="#how" className="hover:text-[#F5F7FA] transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-[#F5F7FA] transition-colors">
              Platform
            </a>
            <a href="#pricing" className="hover:text-[#F5F7FA] transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-[#F5F7FA] transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/login"
              className="hidden sm:inline-flex px-4 py-2 rounded-full text-[14px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors"
            >
              Login
            </a>
            <a href="/signup" className="btn-primary text-[14px] py-2 px-5">
              Start free
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* ============= HERO ============= */}
        <HeroSection>
          <KineticWord
            words={['executed.', 'shipped.', 'done.', 'in motion.']}
            interval={2400}
            className="text-hero"
          />
        </HeroSection>

        {/* ============= LIVE PRODUCT MOCKUP ============= */}
        <section id="demo" className="relative pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal>
              <div className="relative">
                {/* Ambient glow behind mockup */}
                <div
                  className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(110deg, rgba(139,92,246,0.5), rgba(59,130,246,0.4))',
                  }}
                />
                <ActionCascadeMockup />
              </div>
            </Reveal>

            {/* Caption */}
            <Reveal delay={120}>
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#6B7689] font-mono">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                  Live agent simulation — pause on hover
                </span>
                <span>Real product render · not a screenshot</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============= TRUST + STATS ============= */}
        <TrustStrip />

        {/* ============= PROBLEM ============= */}
        <ProblemSection />

        {/* ============= HOW IT WORKS ============= */}
        <HowItWorksSection />

        {/* ============= BENTO ============= */}
        <BentoSection />

        {/* ============= COMPARISON ============= */}
        <ComparisonSection />

        {/* ============= CASE STUDY ============= */}
        <CaseStudySection />

        {/* ============= PRICING ============= */}
        <PricingSection />

        {/* ============= FAQ ============= */}
        <FaqSection />

        {/* ============= FINAL CTA ============= */}
        <FinalCtaSection />
      </main>

      {/* ============= FOOTER ============= */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[#031427] mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10">
            {/* Brand col */}
            <div className="col-span-2 md:col-span-2 flex flex-col gap-3">
              <a href="#" className="flex items-center gap-2 w-fit">
                <LogoMark className="h-8 w-8" />
                <span className="font-semibold text-[17px] tracking-[-0.02em] text-[#F5F7FA]">
                  Delegate<span className="ai-gradient-text">.ai</span>
                </span>
              </a>
              <p className="text-[13px] text-[#6B7689] leading-[1.6] max-w-xs">
                Your meeting notes, executed. The AI agent that ships work
                across Google Workspace.
              </p>
              <div className="flex items-center gap-3 mt-2 text-[#6B7689]">
                <a
                  href="#"
                  className="hover:text-[#F5F7FA] transition-colors"
                  aria-label="X"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                  >
                    close
                  </span>
                </a>
                <a
                  href="#"
                  className="hover:text-[#F5F7FA] transition-colors"
                  aria-label="GitHub"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                  >
                    code
                  </span>
                </a>
                <a
                  href="#"
                  className="hover:text-[#F5F7FA] transition-colors"
                  aria-label="LinkedIn"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                  >
                    work
                  </span>
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#6B7689] font-mono mb-1">
                Product
              </span>
              <a href="#how" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                How it works
              </a>
              <a href="#features" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Platform
              </a>
              <a href="#pricing" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Pricing
              </a>
              <a href="#cta" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Start free
              </a>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#6B7689] font-mono mb-1">
                Company
              </span>
              <a href="#" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                About
              </a>
              <a href="#" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Changelog
              </a>
              <a href="#" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Careers
              </a>
              <a href="#" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Contact
              </a>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-[0.12em] text-[#6B7689] font-mono mb-1">
                Legal
              </span>
              <a href="#" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Privacy
              </a>
              <a href="#" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Terms
              </a>
              <a href="#" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                Security
              </a>
              <a href="#" className="text-[13px] text-[#A9B4C4] hover:text-[#F5F7FA] transition-colors">
                SOC 2
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-[#6B7689] font-mono">
            <span>© 2026 Delegate.ai — All rights reserved.</span>
            <span className="inline-flex items-center gap-1.5">
              Powered by Gemini
              <span
                className="material-symbols-outlined text-[14px] text-[#c4abff]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                magic_button
              </span>
              &amp; Google Cloud
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
