import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { LinkedinIcon } from '../icons/BrandIcons';
import { 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  Send, 
  Download, 
  Sparkles, 
  MapPin,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../../utils/audioFx';

export const ContactSection: React.FC = () => {
  const { data, t, isSoundEnabled } = usePortfolio();

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.personal.email);
    setCopied(true);
    if (isSoundEnabled) playSuccessChime();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      console.warn('Bot trapped.');
      return;
    }

    if (!formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (isSoundEnabled) playSuccessChime();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6B8E23', '#70A83B', '#ffffff', '#556B2F'],
      });
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      }, 5000);
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-900/10 dark:bg-white/[0.03] border border-[#6B8E23]/40 text-[#70A83B] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#70A83B]" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 dark:text-white font-heading tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Channels & CV Action */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury space-y-6">
              <h3 className="text-xl font-bold font-orbitron text-neutral-950 dark:text-white border-b border-neutral-200 dark:border-white/[0.08] pb-3">
                {t.contact.directChannels}
              </h3>

              {/* Direct Channels Cards */}
              <div className="space-y-3.5">
                {/* Email Channel */}
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-2.5 rounded-xl bg-[#6B8E23]/15 text-[#70A83B] border border-[#6B8E23]/30 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">Direct Email</div>
                      <a
                        href={`mailto:${data.personal.email}`}
                        className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-[#70A83B] transition-colors truncate block"
                      >
                        {data.personal.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-neutral-100 dark:bg-white/[0.05] hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all shrink-0"
                    title={t.contact.copyEmail}
                  >
                    {copied ? <Check className="w-4 h-4 text-[#70A83B]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Telephone / WhatsApp Channel */}
                <a
                  href="https://wa.me/212648727750"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] shadow-xs hover:border-[#6B8E23]/40 flex items-center justify-between gap-3 transition-colors block group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#6B8E23]/15 text-[#70A83B] border border-[#6B8E23]/30 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">Direct Phone & WhatsApp</div>
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#70A83B] transition-colors">
                        {data.personal.phone}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#70A83B] shrink-0" />
                </a>

                {/* LinkedIn Channel */}
                <a
                  href={data.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] shadow-xs hover:border-[#6B8E23]/40 flex items-center justify-between gap-3 transition-colors block group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10 shrink-0">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">Professional Network</div>
                      <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-[#70A83B] transition-colors">
                        linkedin.com/in/anass-bouras-0b0361285
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-[#70A83B] shrink-0" />
                </a>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] shadow-xs flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-white/10 shrink-0">
                    <MapPin className="w-4 h-4 text-[#70A83B]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-neutral-500 uppercase">Location</div>
                    <div className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                      Casablanca, Morocco (Open for On-site & Hybrid)
                    </div>
                  </div>
                </div>
              </div>

              {/* Download CV Action */}
              <div className="pt-2">
                <a
                  href={data.personal.cvUrl}
                  download="Cv_Anass_Bouras_Eng.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#6B8E23] hover:bg-[#556B2F] text-white text-xs font-orbitron font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(107,142,35,0.35)]"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Curriculum Vitae (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Message Form with Honeypot */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-3xl bg-neutral-50 dark:bg-[#08080a] border border-neutral-200 dark:border-white/10 backdrop-blur-xl shadow-md dark:shadow-luxury">
              <h3 className="text-xl font-bold font-orbitron text-neutral-950 dark:text-white border-b border-neutral-200 dark:border-white/[0.08] pb-3 mb-6">
                {t.contact.formTitle}
              </h3>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#6B8E23]/15 border border-[#6B8E23]/40 text-center space-y-3 animate-in fade-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-[#70A83B] mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold font-orbitron text-neutral-950 dark:text-white">
                    {t.contact.successTitle}
                  </h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 max-w-md mx-auto">
                    {t.contact.successMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-700 dark:text-neutral-400">
                        {t.contact.nameLabel} <span className="text-[#70A83B]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border border-neutral-300 dark:border-white/10 focus:border-[#6B8E23] text-neutral-900 dark:text-white text-xs outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-neutral-700 dark:text-neutral-400">
                        {t.contact.emailLabel} <span className="text-[#70A83B]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border border-neutral-300 dark:border-white/10 focus:border-[#6B8E23] text-neutral-900 dark:text-white text-xs outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-700 dark:text-neutral-400">
                      {t.contact.subjectLabel} <span className="text-[#70A83B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t.contact.subjectPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border border-neutral-300 dark:border-white/10 focus:border-[#6B8E23] text-neutral-900 dark:text-white text-xs outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 shadow-2xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-neutral-700 dark:text-neutral-400">
                      {t.contact.messageLabel} <span className="text-[#70A83B]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border border-neutral-300 dark:border-white/10 focus:border-[#6B8E23] text-neutral-900 dark:text-white text-xs outline-none transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-500 shadow-2xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-[#6B8E23] hover:bg-[#556B2F] text-white text-xs font-orbitron font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(107,142,35,0.35)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.sending}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.submitBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
