import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function Terms() {
  return (
    <>
      <Helmet>
        <title>Rental Terms & Conditions | LaptopRent (a brand of STAGE-X)</title>
        <meta
          name="description"
          content="Rental Terms and Conditions for LaptopRent, operated by STAGE-X Bengaluru. Transparent security deposit, monthly leasing, maintenance, and refund policies."
        />
        <link rel="canonical" href="https://laptoponrent.online/terms" />
      </Helmet>

      <div className="bg-secondary-50 py-12 border-b border-secondary-200">
        <div className="container">
          <nav className="text-sm text-secondary-500 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">Terms &amp; Conditions</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 tracking-tight mb-2">
              Laptop Rental Terms &amp; Conditions
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
                1. Acceptance of Terms &amp; Business Entity
              </h2>
              <p>
                Welcome to <strong>LaptopRent</strong> (accessible via <code>laptoponrent.online</code>). This platform and its rental fulfillment services are owned and operated by <strong>STAGE-X</strong>, a sole proprietorship registered in Bengaluru, Karnataka, India.
              </p>
              <p>
                By reserving a device, paying a token booking fee, signing a digital rental contract, or accepting delivery of hardware, you agree to comply with and be legally bound by these Terms and Conditions.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                2. Scope of Services &amp; Hardware Ownership
              </h2>
              <p>
                LaptopRent provides on-demand leasing of laptops (Apple MacBook, Dell, HP, Lenovo, ASUS, Acer, MSI), desktop workstations, and related IT peripherals across India.
              </p>
              <p>
                All rented equipment remains the exclusive property of <strong>STAGE-X</strong> or its authorized equipment financing partners. The customer acquires no proprietary rights, title, or ownership interest in the rented equipment. Sub-leasing, pledging, or transferring the equipment to any third party without written consent is strictly prohibited.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                3. The ₹50 Token Fee &amp; KYC Verification
              </h2>
              <p>
                To reserve a specific laptop model and initiate KYC dispatch coordination, a nominal <strong>₹50 token reservation fee</strong> is paid online.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-secondary-600">
                <li><strong>Adjustment:</strong> The ₹50 token fee is 100% credited against your first month's rental invoice.</li>
                <li><strong>Refundability:</strong> If your booking is cancelled prior to physical dispatch, or if KYC verification cannot be completed, the ₹50 fee is 100% refunded to your original payment method.</li>
                <li><strong>KYC Requirement:</strong> Individual renters must provide valid government ID (Aadhaar / Driving License / Passport) and proof of employment or college enrollment. Corporate leases require GSTIN and company PAN.</li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                4. Security Deposits &amp; Refund Timelines
              </h2>
              <p>
                Depending on the laptop model and customer credit assessment, a refundable security deposit (typically 1 to 2 months' rental value) may be collected prior to equipment dispatch.
              </p>
              <p>
                <strong>Deposit Refund:</strong> Upon completion of the lease and return of the equipment, the device undergoes a 24-hour hardware and diagnostic inspection. The security deposit is refunded in full to the customer's bank account within <strong>5 to 7 business days</strong>, subject to deduction only for unresolved physical damage or unpaid lease arrears.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                5. Monthly Billing, Payment Gateway &amp; 18% GST
              </h2>
              <p>
                All prices are quoted in Indian Rupees (INR) and are subject to mandatory 18% Goods and Services Tax (GST) under HSN 997315. Tax invoices are issued monthly by STAGE-X with full input tax credit eligibility for GST-registered entities.
              </p>
              <p>
                <strong>Payment Gateway Notice:</strong> Payments on this website are processed by <strong>STAGE-X</strong> via secure Razorpay checkout (UPI, Credit/Debit Cards, Net Banking). Field delivery riders are not authorized to collect cash payments for rental leases.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                6. Maintenance Warranty &amp; Free On-Site Replacement
              </h2>
              <p>
                Every rented device includes comprehensive hardware warranty protection against inherent component failures, motherboard issues, battery degradation, and manufacturing defects.
              </p>
              <p>
                In the event of hardware malfunction during normal use, LaptopRent will dispatch a technician or deliver a <strong>free replacement laptop within 24 to 48 hours</strong> at zero additional charge.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                7. Cancellation &amp; Return Terms
              </h2>
              <p>
                Customers may cancel orders prior to hardware delivery with zero penalty, receiving a 100% refund of all advance payments within 24&ndash;48 banking hours. For mid-lease terminations or extensions, please refer to our <Link to="/cancellation-refund-policy" className="text-primary-600 underline">Cancellation &amp; Refund Policy</Link>.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                8. Governing Law &amp; Exclusive Jurisdiction
              </h2>
              <p>
                These Terms and Conditions shall be governed by, construed, and enforced in accordance with the laws of India. Any legal disputes or claims arising out of the rental contract shall be subject to the exclusive jurisdiction of the competent courts in <strong>Bengaluru, Karnataka, India</strong>.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                9. Contact Information
              </h2>
              <p>
                For contract inquiries, bulk leasing agreements, or grievance redressal, contact our legal desk:
              </p>
              <p className="text-sm">
                <strong>STAGE-X (LaptopRent Desk)</strong><br />
                2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038, India<br />
                Email: <a href="mailto:connect@laptoponrent.online" className="text-primary-600 underline">connect@laptoponrent.online</a><br />
                Phone: +91 78922 40243 &middot; Hours: 6:00 AM &ndash; 7:00 PM IST
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
