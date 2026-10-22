import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function DeliveryPolicy() {
  return (
    <>
      <Helmet>
        <title>Doorstep Delivery Policy | LaptopRent (a brand of STAGE-X)</title>
        <meta
          name="description"
          content="Doorstep delivery timelines, verification protocols, and coverage zones across 25+ Indian cities for LaptopRent operated by STAGE-X Bengaluru."
        />
        <link rel="canonical" href="https://laptoponrent.online/delivery-policy" />
      </Helmet>

      <div className="bg-secondary-50 py-12 border-b border-secondary-200">
        <div className="container">
          <nav className="text-sm text-secondary-500 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">Delivery Policy</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 tracking-tight mb-2">
              Laptop Delivery &amp; Logistics Policy
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
                1. Free Doorstep Delivery &amp; Pickup
              </h2>
              <p>
                LaptopRent provides 100% complimentary doorstep delivery and end-of-lease return collection across all our active operational cities. There are zero hidden courier fees or drop-off surcharges on standard rental contracts.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                2. Delivery Timelines
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-secondary-100 text-secondary-900 border-b border-secondary-200">
                      <th className="p-3 font-semibold">City Tier / Region</th>
                      <th className="p-3 font-semibold">Standard Turnaround</th>
                      <th className="p-3 font-semibold">Express Same-Day Option</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-200">
                    <tr>
                      <td className="p-3 font-medium">Bangalore, Mumbai, Delhi NCR</td>
                      <td className="p-3">24 Hours</td>
                      <td className="p-3 text-primary-700 font-semibold">Same-Day (Order by 2:00 PM)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Hyderabad, Pune, Chennai, Kolkata</td>
                      <td className="p-3">24 &ndash; 48 Hours</td>
                      <td className="p-3">Available for select inventory</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Tier-2 Cities (Jaipur, Ahmedabad, Indore, etc.)</td>
                      <td className="p-3">48 &ndash; 72 Hours</td>
                      <td className="p-3">Express air courier dispatch</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                3. Handover &amp; Device Testing Checklist
              </h2>
              <p>
                Upon delivery, our technician or rider will assist you in inspecting the laptop:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-secondary-600">
                <li>Physical body condition (absence of cracks or deep dents).</li>
                <li>Boot test, operating system activation, and display backlight check.</li>
                <li>Keyboard, trackpad, and webcam functionality test.</li>
                <li>Original power adapter and charging cable verification.</li>
              </ul>
              <p>
                Once satisfied, the customer signs an electronic delivery acknowledgement form (e-POD) confirming the device was received in pristine operating order.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                4. Transit Packaging &amp; Hardware Safety
              </h2>
              <p>
                Every device is shipped inside custom-molded, shock-absorbent laptop backpacks or reinforced transit cases. Chargers and accessories are packaged in separate moisture-proof protective sleeves.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                5. Rescheduling &amp; Recipient Absence
              </h2>
              <p>
                We coordinate arrival slots via WhatsApp and telephone 30 minutes in advance. If you are unavailable during your scheduled delivery slot, our dispatch team will reschedule for a subsequent delivery window with zero penalty fees.
              </p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-secondary-200 shadow-sm space-y-3">
              <h2 className="text-xl font-bold text-secondary-900 border-b border-secondary-100 pb-2">
                6. Logistics Support &amp; Delivery Tracking
              </h2>
              <p>
                For delivery queries or live rider tracking, email <a href="mailto:connect@laptoponrent.online" className="text-primary-600 underline">connect@laptoponrent.online</a> or message our WhatsApp support desk at <strong>+91 78922 40243</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
