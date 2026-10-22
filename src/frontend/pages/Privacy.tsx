import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | LaptopRent (a brand of STAGE-X)</title>
        <meta
          name="description"
          content="Privacy Policy and data protection standards for LaptopRent, operated by STAGE-X Bengaluru in compliance with India's DPDP Act 2023."
        />
        <link rel="canonical" href="https://laptoponrent.online/privacy" />
      </Helmet>

      <div className="bg-secondary-50 py-12 border-b border-secondary-200">
        <div className="container">
          <nav className="text-sm text-secondary-500 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">Privacy Policy</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 tracking-tight mb-2">
              Privacy Policy &amp; Data Protection
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
                1. Data Protection Commitment &amp; Governing Law
              </h2>
              <p>
                <strong>STAGE-X</strong> (sole proprietorship, Bengaluru), operating under the trade name <strong>LaptopRent</strong>, is committed to safeguarding the privacy and digital identity of its customers.
              </p>
              <p>
                This Privacy Policy outlines our procedures for collecting, processing, and safeguarding your personal information in strict accordance with the <strong>Digital Personal Data Protection Act (DPDP Act 2023)</strong> and the Information Technology Act, 2000.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                2. Information We Collect
              </h2>
              <p>To fulfill laptop leases, conduct verification, and deliver hardware, we collect:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-secondary-600">
                <li><strong>Identity &amp; KYC Documentation:</strong> Full legal name, permanent address proof, government identity number (Aadhaar / Passport / Driving License), student ID card or corporate employment credentials.</li>
                <li><strong>Contact Details:</strong> Verified mobile telephone number, WhatsApp contact handle, and email address.</li>
                <li><strong>Delivery Location:</strong> Residential or commercial delivery address, society name, and postal PIN code.</li>
                <li><strong>Transaction Records:</strong> Booking token identifiers, deposit receipts, monthly lease invoice records, and payment method indicators. <em>(Note: Raw debit/credit card numbers and UPI PINs are never handled or stored on our servers; they are processed directly by PCI-DSS compliant banking partners.)</em></li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                3. Purpose of Processing Personal Data
              </h2>
              <p>We process your data strictly for legitimate business requirements:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-secondary-600">
                <li>Executing KYC verification and fraud prevention for high-value computer hardware.</li>
                <li>Coordinating doorstep delivery, on-site hardware setup, and scheduled return pickup.</li>
                <li>Generating statutory 18% GST tax invoices and accounting receipts.</li>
                <li>Issuing security deposit refunds, token credits, and warranty replacement tickets.</li>
                <li>Sending transactional status updates via SMS and WhatsApp.</li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                4. Data Sharing &amp; Non-Disclosure
              </h2>
              <p>
                <strong>We never sell, rent, license, or monetize your personal information to third parties.</strong> Data is shared only with verified operational partners:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-secondary-600">
                <li><strong>Delivery Partners &amp; Technicians:</strong> Provided strictly with recipient name, delivery address, and contact number solely to execute physical handover.</li>
                <li><strong>Payment Processors (Razorpay):</strong> Authorized gateway intermediaries processing financial transactions for STAGE-X.</li>
                <li><strong>Statutory Authorities:</strong> Disclosed only when strictly mandated under Indian law or a lawful court order.</li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                5. Device Sanitization &amp; Data Security
              </h2>
              <p>
                We maintain military-grade data sanitization protocols. When a rented laptop is returned at the end of a lease, its internal storage drive is subjected to a certified DoD 5220.22-M data wipe and fresh operating system reinstallation. No user files, login sessions, or temporary data persist across customers.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                6. Grievance Redressal &amp; Data Rights
              </h2>
              <p>
                In accordance with the DPDP Act 2023, you have the right to review, update, or request erasure of your non-statutory personal data. For privacy inquiries or grievance redressal, contact our designated officer:
              </p>
              <p className="text-sm">
                <strong>Data Grievance Officer: STAGE-X</strong><br />
                2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038, India<br />
                Email: <a href="mailto:connect@laptoponrent.online" className="text-primary-600 underline">connect@laptoponrent.online</a><br />
                Response Time: Within 24&ndash;48 business hours
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
