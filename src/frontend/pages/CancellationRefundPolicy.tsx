import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function CancellationRefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Cancellation & Refund Policy | LaptopRent (a brand of STAGE-X)</title>
        <meta
          name="description"
          content="Transparent cancellation, token booking refund, and security deposit return policies for LaptopRent by STAGE-X Bengaluru. 24-48 hr refund timelines."
        />
        <link rel="canonical" href="https://laptoponrent.online/cancellation-refund-policy" />
      </Helmet>

      <div className="bg-secondary-50 py-12 border-b border-secondary-200">
        <div className="container">
          <nav className="text-sm text-secondary-500 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">Cancellation &amp; Refund Policy</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 tracking-tight mb-2">
              Cancellation, Refund &amp; Deposit Policy
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
                1. Order Cancellation Prior to Hardware Dispatch
              </h2>
              <p>
                We understand that requirements can change unexpectedly. You may cancel your laptop rental booking at any time <strong>prior to hardware dispatch</strong> with zero penalty.
              </p>
              <p>
                Upon cancellation before dispatch, your <strong>₹50 token reservation fee</strong> and any prepaid rental amounts or security deposits will be <strong>100% refunded</strong> to your original payment method within 24 to 48 banking hours.
              </p>
              <p className="text-xs text-secondary-500">
                If cancellation occurs after the logistics rider is already in transit with the physical device, a nominal ₹150 transit fee may be deducted to cover one-way courier / rider fuel expenses.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                2. Security Deposit Refund Procedures &amp; Timelines
              </h2>
              <p>
                Security deposits collected for laptops and workstations are held in an escrow reserve account managed by <strong>STAGE-X</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-secondary-600">
                <li><strong>Inspection Window:</strong> When your rented device is returned at the end of the lease, our technical team conducts an automated diagnostic and physical condition check within 24 hours.</li>
                <li><strong>Refund Timeline:</strong> Once the hardware check confirms the device is in good working order (allowing for normal wear and tear), the security deposit is initiated back to your bank account within <strong>5 to 7 business days</strong>.</li>
                <li><strong>Deductions:</strong> Deductions occur only for verified unpaid rental dues or documented physical accidental damage (e.g. cracked display, liquid spillage) as outlined in our <Link to="/damage-protection-policy" className="text-primary-600 underline">Damage Protection Policy</Link>.</li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                3. Early Return &amp; Lease Tenure Adjustments
              </h2>
              <p>
                If you choose to return your rented laptop prior to the agreed lease expiry:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-secondary-600">
                <li><strong>Monthly Flexible Plans:</strong> You can return the device at the end of any active 30-day rental cycle with zero early exit penalties. Unused days within a pre-billed 30-day cycle are non-refundable.</li>
                <li><strong>Long-Term Discounted Leases (6–12 Months):</strong> If a long-term lease is terminated prematurely, the monthly rental will be recalculated based on standard short-term rates, and the difference adjusted against the refundable deposit.</li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                4. Defective Hardware: Free Replacement Guarantee
              </h2>
              <p>
                If a device experiences hardware failure, motherboard faults, or battery malfunctions not caused by customer mishandling, LaptopRent provides a <strong>guaranteed free replacement within 24 to 48 hours</strong>. If an acceptable replacement model cannot be provided, all unused rental charges and the full security deposit will be refunded immediately.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                5. Refund Payment Channels &amp; Verification
              </h2>
              <p>
                All refunds are issued directly by <strong>STAGE-X</strong> via Razorpay. Funds are credited back strictly to the originating bank account, UPI ID, or card:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-secondary-600">
                <li><strong>UPI &amp; Net Banking Reversals:</strong> 24 to 48 banking hours.</li>
                <li><strong>Credit &amp; Debit Cards:</strong> 5 to 7 business days, depending on issuing bank settlement cycles.</li>
              </ul>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                6. Refund Status Inquiries &amp; Support Desk
              </h2>
              <p>
                To request an order cancellation or check the status of your security deposit refund, contact our billing desk with your Order/Booking ID:
              </p>
              <p className="text-sm">
                <strong>STAGE-X (LaptopRent Refund Desk)</strong><br />
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
