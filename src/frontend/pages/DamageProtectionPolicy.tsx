import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function DamageProtectionPolicy() {
  return (
    <>
      <Helmet>
        <title>Damage Protection &amp; Hardware Warranty Policy | LaptopRent (a brand of STAGE-X)</title>
        <meta
          name="description"
          content="Comprehensive damage protection, hardware defect replacement guarantee, and repair guidelines for LaptopRent operated by STAGE-X Bengaluru."
        />
        <link rel="canonical" href="https://laptoponrent.online/damage-protection-policy" />
      </Helmet>

      <div className="bg-secondary-50 py-12 border-b border-secondary-200">
        <div className="container">
          <nav className="text-sm text-secondary-500 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">Damage Protection</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 tracking-tight mb-2">
              Damage Protection &amp; Hardware Policy
            </h1>
            <p className="text-secondary-600 text-sm">
              Operated by STAGE-X &middot; Bengaluru, Karnataka &middot; Version 2.4 (October 2026)
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Policy Owner Banner */}
          <div className="bg-primary-50 border-l-4 border-primary-600 p-4 rounded-r-lg mb-8 text-secondary-900 text-sm leading-relaxed shadow-sm">
            <strong>
              These policies apply to laptoponrent.online, operated by STAGE-X (sole proprietorship), 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru 560038. Contact: <a href="mailto:connect@laptoponrent.online" className="underline text-primary-600">connect@laptoponrent.online</a>.
            </strong>
          </div>

          <div className="space-y-8 text-secondary-700 leading-relaxed text-sm md:text-base">
            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                1. Purpose &amp; Overview
              </h2>
              <p>
                At LaptopRent, we engineer our rental agreements for business continuity and peace of mind. Every device delivered under <strong>laptoponrent.online</strong> includes full operational hardware coverage, proactive maintenance support, and transparent policies regarding accidental vs. operational damage.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                2. 100% Free Hardware Defect Guarantee
              </h2>
              <p>
                All internal hardware malfunctions that arise through regular use are repaired or replaced <strong>at zero cost</strong> to the renter:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Core Components:</strong> SSD failures, RAM faults, processor throttling, or motherboard failures are 100% covered.
                </li>
                <li>
                  <strong>Battery Health:</strong> We guarantee battery capacity above 75% for all rentals. If battery degradation impairs portable work, we replace the battery free of charge.
                </li>
                <li>
                  <strong>Peripheral &amp; Thermal Wear:</strong> Cooling fan replacements, thermal re-pasting, keyboard key responsiveness, and hinge tension adjustments are executed free of charge during the rental term.
                </li>
                <li>
                  <strong>Swap Guarantee:</strong> If a defect cannot be diagnosed and resolved remotely within 24 hours, STAGE-X delivers an equivalent or upgraded replacement unit to your doorstep.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                3. Normal Wear and Tear vs. Physical Damage
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50/50 border border-green-200 p-4 rounded-lg">
                  <h3 className="font-bold text-green-900 mb-2">Accepted Wear &amp; Tear (Zero Cost)</h3>
                  <ul className="text-xs space-y-1.5 text-green-800 list-disc pl-4">
                    <li>Minor micro-scratches on outer lid or bottom casing.</li>
                    <li>Slight shine on frequently typed keyboard keys or trackpad.</li>
                    <li>Natural fading or loosening of rubber base feet.</li>
                    <li>Normal battery charge cycle count accumulation.</li>
                  </ul>
                </div>
                <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-lg">
                  <h3 className="font-bold text-amber-900 mb-2">Billable Physical Damage</h3>
                  <ul className="text-xs space-y-1.5 text-amber-800 list-disc pl-4">
                    <li>Cracked, shattered, or severely bleeding LCD/OLED display panels.</li>
                    <li>Liquid ingress or motherboard oxidation from beverage spills.</li>
                    <li>Deep chassis dents, broken hinge plastics from external drops.</li>
                    <li>Missing components (chargers, internal SSD, RAM modules).</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-secondary-500 mt-2">
                * Note: In case of physical damage, repairs are charged strictly at actual OEM service center rates with zero administrative markups.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                4. Unauthorized Modifications &amp; Data Security
              </h2>
              <p>
                To maintain device safety, firmware integrity, and enterprise security:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Renters must not open the chassis, alter BIOS serials, flash custom non-OEM firmware, or attempt unauthorized third-party repairs.
                </li>
                <li>
                  <strong>Data Privacy:</strong> STAGE-X performs certified DoD 5220.22-M / NIST SP 800-88 data sanitization on all drives upon return, ensuring zero remnant files before redistribution.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                5. Incident Reporting &amp; Claim Process
              </h2>
              <p>
                In the event of an operational malfunction or unexpected damage:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Report Promptly:</strong> Contact our support desk within 24 hours of the occurrence via WhatsApp (+91 78922 40243) or email (<a href="mailto:connect@laptoponrent.online" className="text-primary-600 underline">connect@laptoponrent.online</a>).
                </li>
                <li>
                  <strong>Diagnostic Evaluation:</strong> Share photos/videos and an engineer will initiate remote troubleshooting.
                </li>
                <li>
                  <strong>Resolution / Swap:</strong> If hardware intervention is required, a technician is dispatched or an exchange device is scheduled for doorstep replacement.
                </li>
              </ol>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                6. Contact Information &amp; Operational Desk
              </h2>
              <div className="bg-secondary-50 p-4 rounded-lg text-sm space-y-1">
                <p><strong>Operating Entity:</strong> STAGE-X</p>
                <p><strong>Registered Address:</strong> 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038, India</p>
                <p><strong>Support &amp; Claims:</strong> <a href="mailto:connect@laptoponrent.online" className="text-primary-600 underline">connect@laptoponrent.online</a></p>
                <p><strong>WhatsApp Support:</strong> +91 78922 40243 (Every day, 6:00 AM – 7:00 PM IST)</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
