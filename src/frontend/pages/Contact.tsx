import { useState, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Building, Send, MessageSquare } from 'lucide-react';

export function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [requirement, setRequirement] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const body = [
      `Name: ${name}`,
      `Mobile: ${phone}`,
      `Email: ${email}`,
      `City: ${city || 'Not specified'}`,
      `Requirement: ${requirement || 'General'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    window.location.href = `mailto:connect@laptoponrent.online?subject=${encodeURIComponent(
      `LaptopRent Inquiry from ${name}`
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | LaptopRent (a brand of STAGE-X)</title>
        <meta
          name="description"
          content="Contact LaptopRent customer support, sales, or franchise desk. Email connect@laptoponrent.online, phone +91 7892240243. STAGE-X Bengaluru."
        />
        <link rel="canonical" href="https://laptoponrent.online/contact" />
      </Helmet>

      <div className="bg-secondary-50 py-12 md:py-16 border-b border-secondary-200">
        <div className="container">
          <nav className="text-sm text-secondary-500 mb-4" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-900 font-medium">Contact Us</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary-900 tracking-tight mb-4">
              Get in Touch with LaptopRent
            </h1>
            <p className="text-lg text-secondary-600 leading-relaxed">
              Have questions about laptop availability, corporate leases, or custom configurations? Our dedicated desk is here to assist you every day.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-secondary-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-600 font-semibold">
                  <Building className="w-5 h-5" />
                  <span>Official Business Identity</span>
                </div>
                <h2 className="text-xl font-bold text-secondary-900">LaptopRent (a brand of STAGE-X)</h2>
                <p className="text-xs text-secondary-500">STAGE-X is a registered sole proprietorship based in Bengaluru. All payments are processed by STAGE-X.</p>
              </div>

              <div className="space-y-4 pt-2 border-t border-secondary-100 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Registered Office</h3>
                    <p className="text-secondary-600 leading-relaxed">
                      2nd Floor, No. 235, 13th Cross Road, Binnamangala,<br />
                      Indiranagar 2nd Stage, Bengaluru, Karnataka 560038, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Email Address</h3>
                    <p>
                      <a href="mailto:connect@laptoponrent.online" className="text-primary-600 hover:underline">
                        connect@laptoponrent.online
                      </a>
                    </p>
                    <p className="text-xs text-secondary-400 mt-0.5">Prompt response within business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Telephone &amp; WhatsApp</h3>
                    <p className="text-secondary-900 font-medium">
                      <a href="tel:+917892240243" className="hover:underline">+91 78922 40243</a>
                    </p>
                    <p className="mt-1">
                      <a
                        href="https://wa.me/917892240243?text=Hi%2C%20I%20have%20an%20inquiry%20regarding%20laptop%20rentals"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-primary-600 font-medium hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Chat on WhatsApp
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Operating Hours</h3>
                    <p className="text-secondary-600">Every day, 6:00 AM &ndash; 7:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-secondary-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Send us a Message</h2>
              <p className="text-secondary-600 text-sm mb-6">
                Fill in the details below and we will get back to you with custom quotes and device availability.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Your Name <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-lg border border-secondary-300 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Mobile Number <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className="w-full px-4 py-2.5 rounded-lg border border-secondary-300 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Email Address <span className="text-error-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-secondary-300 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      City
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-secondary-300 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                      <option value="">Select your city</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR (Delhi, Gurgaon, Noida)</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Pune">Pune</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Requirement Type
                  </label>
                  <select
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-secondary-300 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  >
                    <option value="Individual / Student">Individual / Student Rental</option>
                    <option value="MacBook Rental">Apple MacBook (Air / Pro)</option>
                    <option value="Gaming Laptop">High-FPS Gaming Laptop</option>
                    <option value="Corporate Bulk">Corporate Bulk Lease (5+ Laptops)</option>
                    <option value="Other">Other / Custom Workstation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Message / Specifications Needed <span className="text-error-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about RAM, processor, rental duration, or delivery pin code..."
                    className="w-full px-4 py-2.5 rounded-lg border border-secondary-300 text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>

                <p className="text-xs text-secondary-500 pt-2">
                  Sending opens your email application addressed directly to <strong>connect@laptoponrent.online</strong>. We reply the same day (6:00 AM &ndash; 7:00 PM IST).
                </p>

                {submitted && (
                  <div className="p-4 rounded-lg bg-success-50 border border-success-200 text-success-800 text-sm mt-4">
                    Your email client has been opened with your inquiry pre-filled. Press send in your email client and our team will get in touch with you shortly!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
