import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function PricingDisclaimer() {
  return (
    <>
      <Helmet>
        <title>Pricing &amp; Billing Disclaimer | LaptopRent (a brand of STAGE-X)</title>
        <meta
          name="description"
          content="Transparent monthly rental rates, ₹50 token credit policy, security deposit terms, and GST invoicing for LaptopRent operated by STAGE-X Bengaluru."
        />
        <link rel="canonical" href="https://laptoponrent.online/pricing-disclaimer" />
      </Helmet>

      <div className="bg-secondary-50 py-12 border-b border-secondary-200">
        <div className="container">
          <nav className="text-sm text-secondary-500 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">Pricing Disclaimer</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 tracking-tight mb-2">
              Pricing, Deposits &amp; Billing Disclaimer
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
            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                1. Transparent Monthly Rental Structure
              </h2>
              <p>
                All rental rates advertised on <strong>laptoponrent.online</strong> reflect competitive, monthly subscription pricing for top-tier enterprise, consumer, and creator laptops. Our rate cards are structured by laptop tier and hardware performance:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm border border-secondary-200 rounded-lg">
                  <thead className="bg-secondary-100 text-secondary-900 font-semibold">
                    <tr>
                      <th className="p-3 border-b">Device Category</th>
                      <th className="p-3 border-b">Typical Monthly Rent</th>
                      <th className="p-3 border-b">Target Use Cases</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-200">
                    <tr>
                      <td className="p-3 font-medium text-secondary-900">Student &amp; Basic Work</td>
                      <td className="p-3 text-primary-700 font-bold">₹849 – ₹1,500 / mo</td>
                      <td className="p-3 text-secondary-600">Browsing, Microsoft Office, Online Classes, Coding</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-secondary-900">Corporate &amp; Business Ultrabooks</td>
                      <td className="p-3 text-primary-700 font-bold">₹1,200 – ₹2,800 / mo</td>
                      <td className="p-3 text-secondary-600">Dell Latitude, Lenovo ThinkPad, HP EliteBook</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-secondary-900">Apple MacBook Air (M1 / M2 / M3)</td>
                      <td className="p-3 text-primary-700 font-bold">₹2,999 – ₹6,500 / mo</td>
                      <td className="p-3 text-secondary-600">Developers, Designers, Mobile Executives</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-secondary-900">Apple MacBook Pro (M-Series Pro/Max)</td>
                      <td className="p-3 text-primary-700 font-bold">₹4,500 – ₹15,000 / mo</td>
                      <td className="p-3 text-secondary-600">Video Editing, 3D Rendering, Machine Learning</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-secondary-900">Gaming &amp; Mobile Workstations</td>
                      <td className="p-3 text-primary-700 font-bold">₹3,500 – ₹8,000 / mo</td>
                      <td className="p-3 text-secondary-600">Dedicated RTX GPUs, Architecture CAD, VR/Simulation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-secondary-500">
                * Note: Exact pricing may vary depending on tenancy duration (1, 3, 6, or 12+ months), custom RAM/SSD configurations, bulk corporate volumes, and active promotional campaigns.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                2. ₹50 Reservation Token Advance
              </h2>
              <p>
                To reserve a specific laptop model and trigger doorstep dispatch logistics, users pay a nominal advance token fee of <strong>₹50</strong> via our integrated online checkout.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>100% Bill Credit:</strong> The ₹50 token fee is not an extra charge. It is credited directly against your first month&apos;s rental invoice upon doorstep handover.
                </li>
                <li>
                  <strong>Instant Cancellation Protection:</strong> If you cancel before device dispatch, or if verification fails, the ₹50 token is fully refunded within 24 to 48 hours to the source payment method.
                </li>
                <li>
                  <strong>Merchant Verification:</strong> All reservation token transactions are processed through Razorpay under our registered business name: <strong>STAGE-X</strong>.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                3. Security Deposit Policy
              </h2>
              <p>
                Security deposits safeguard high-value computing assets during the rental term:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Deposit Amount:</strong> Varies depending on retail device value, rental tenure, and applicant KYC profile (typically 0.5&times; to 1.5&times; the monthly rent).
                </li>
                <li>
                  <strong>Zero-Deposit Option:</strong> Available for verified corporate clients, GST-registered enterprises, and institutional accounts subject to credit evaluation.
                </li>
                <li>
                  <strong>Full Refund:</strong> Security deposits are refunded 100% within <strong>5 to 7 business days</strong> post return inspection, with zero deduction for normal wear-and-tear.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                4. Taxes &amp; GST Invoicing (18%)
              </h2>
              <p>
                All rentals, service subscriptions, and logistics services comply with Indian taxation statutes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Standard <strong>18% GST</strong> (Goods and Services Tax) is applicable to monthly rental fees and shown itemized on every invoice.
                </li>
                <li>
                  Registered businesses can provide their legal GSTIN during onboarding to receive compliant B2B tax invoices and claim full <strong>Input Tax Credit (ITC)</strong>.
                </li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                5. Payment Gateways &amp; Merchant Identity
              </h2>
              <p>
                Payments on this website are processed by <strong>STAGE-X</strong>. We partner with RBI-licensed payment aggregators (including Razorpay) to guarantee bank-grade 256-bit SSL encryption.
              </p>
              <p>
                Supported payment methods include:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-semibold text-secondary-800">
                <div className="p-3 bg-secondary-100 rounded-lg">UPI (GPay / PhonePe / Paytm)</div>
                <div className="p-3 bg-secondary-100 rounded-lg">Credit / Debit Cards (Visa / MC / RuPay)</div>
                <div className="p-3 bg-secondary-100 rounded-lg">50+ Net Banking Portals</div>
                <div className="p-3 bg-secondary-100 rounded-lg">Corporate IMPS / NEFT Transfer</div>
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                6. Contact for Billing &amp; Quotations
              </h2>
              <p>
                Need custom corporate quotes, bulk order discounts, or billing reconciliations? Connect with our accounts desk:
              </p>
              <div className="bg-secondary-50 p-4 rounded-lg text-sm space-y-1">
                <p><strong>Merchant Entity:</strong> STAGE-X</p>
                <p><strong>Registered Office:</strong> 2nd Floor, No. 235, 13th Cross Road, Binnamangala, Indiranagar 2nd Stage, Bengaluru, Karnataka 560038, India</p>
                <p><strong>Billing Desk:</strong> <a href="mailto:connect@laptoponrent.online" className="text-primary-600 underline">connect@laptoponrent.online</a></p>
                <p><strong>Phone / WhatsApp:</strong> +91 78922 40243 (Mon–Sun, 6:00 AM – 7:00 PM IST)</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
