// Second-hand laptop sales. Shared by the React page and scripts/prerender-seo.ts.
// Prices are indicative "from" prices for commonly sourced configurations.
// Update this list as real stock and pricing change.

export type SecondHandSegment = 'business' | 'student' | 'mac' | 'gaming';

export interface SecondHandModel {
  id: string;
  brand: string;
  name: string;
  segment: SecondHandSegment;
  specs: string[];
  priceFrom: number;
}

export const SECOND_HAND_ROUTE = '/category/second-hand-laptops';

export const SECOND_HAND_SEGMENTS: Array<{ id: 'all' | SecondHandSegment; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'business', label: 'Business' },
  { id: 'student', label: 'Student / Budget' },
  { id: 'mac', label: 'MacBook' },
  { id: 'gaming', label: 'Gaming' },
];

export const SECOND_HAND_MODELS: SecondHandModel[] = [
  { id: 'thinkpad-t480', brand: 'Lenovo', name: 'ThinkPad T480', segment: 'business',
    specs: ['Intel Core i5 8th Gen', '8 GB RAM · 256 GB SSD', '14" Full HD', 'Windows 11 Pro'], priceFrom: 16499 },
  { id: 'latitude-7490', brand: 'Dell', name: 'Latitude 7490', segment: 'business',
    specs: ['Intel Core i7 8th Gen', '16 GB RAM · 512 GB SSD', '14" Full HD', 'Windows 11 Pro'], priceFrom: 21999 },
  { id: 'elitebook-840-g5', brand: 'HP', name: 'EliteBook 840 G5', segment: 'business',
    specs: ['Intel Core i5 8th Gen', '8 GB RAM · 256 GB SSD', '14" Full HD', 'Windows 11 Pro'], priceFrom: 15499 },
  { id: 'latitude-5490', brand: 'Dell', name: 'Latitude 5490', segment: 'student',
    specs: ['Intel Core i5 7th Gen', '8 GB RAM · 256 GB SSD', '14" HD', 'Windows 11'], priceFrom: 12999 },
  { id: 'probook-440-g6', brand: 'HP', name: 'ProBook 440 G6', segment: 'student',
    specs: ['Intel Core i3 8th Gen', '8 GB RAM · 256 GB SSD', '14" HD', 'Windows 11'], priceFrom: 11499 },
  { id: 'macbook-air-m1', brand: 'Apple', name: 'MacBook Air M1 (2020)', segment: 'mac',
    specs: ['Apple M1 chip', '8 GB RAM · 256 GB SSD', '13.3" Retina', 'Battery health 85%+'], priceFrom: 44999 },
  { id: 'macbook-pro-m1', brand: 'Apple', name: 'MacBook Pro 13" M1', segment: 'mac',
    specs: ['Apple M1 chip', '8 GB RAM · 512 GB SSD', '13.3" Retina', 'Battery health 85%+'], priceFrom: 54999 },
  { id: 'asus-tuf-f15', brand: 'ASUS', name: 'TUF Gaming F15', segment: 'gaming',
    specs: ['Intel Core i5 10th Gen', '16 GB RAM · 512 GB SSD', 'GTX 1650 · 15.6" 144Hz', 'Windows 11'], priceFrom: 34999 },
];

export const SECOND_HAND_MIN_PRICE = Math.min(...SECOND_HAND_MODELS.map(m => m.priceFrom));

export const SECOND_HAND_TRUST = [
  { title: 'Multi-point quality check', text: 'Battery, screen, keyboard, ports, Wi-Fi, storage health' },
  { title: 'Warranty included', text: 'Hardware warranty on every unit' },
  { title: 'Doorstep delivery', text: 'Across 25+ Indian cities' },
  { title: '7-day replacement', text: 'Swap if anything is not as described' },
];

export const SECOND_HAND_GRADES = [
  { name: 'Grade A — Like New', tone: 'green' as const,
    text: 'Minimal or no visible marks. Screen flawless. Battery in good health. Best for gifting, client-facing work and MacBooks.' },
  { name: 'Grade B — Good', tone: 'amber' as const,
    text: 'Light scratches or scuffs on the body. Screen and keyboard work perfectly. Best value for students and office use.' },
];

export const SECOND_HAND_STEPS = [
  { title: 'Pick or ask', text: 'Choose a model below, or share your budget and use case on WhatsApp.' },
  { title: 'Get photos & video', text: 'We confirm availability and send real photos and a video of the exact unit before you commit.' },
  { title: 'Confirm & pay', text: 'Pay securely online. A proper invoice is issued for every purchase.' },
  { title: 'Delivered to you', text: 'Doorstep delivery with charger, warranty card and 7-day replacement.' },
];

export const SECOND_HAND_FAQS = [
  { question: 'Are your second-hand laptops tested?',
    answer: 'Yes. Every laptop goes through a multi-point check covering battery, display, keyboard, trackpad, ports, Wi-Fi, webcam, speakers and storage health before it is sold.' },
  { question: 'Do second-hand laptops come with warranty?',
    answer: 'Yes, every unit comes with a hardware warranty. The exact period is mentioned at the time of purchase.' },
  { question: 'Are the listed models always in stock?',
    answer: 'The models listed are the configurations we most commonly source, with indicative starting prices. Availability and the final price of a specific unit are confirmed on WhatsApp before you pay.' },
  { question: 'Can I see the actual laptop before buying?',
    answer: 'Yes. We share real photos and a video of the exact unit on WhatsApp before you pay.' },
  { question: "What if the laptop isn't as described?",
    answer: "You can request a replacement within 7 days of delivery if the laptop doesn't match what was shown and agreed." },
  { question: 'Can I sell or exchange my old laptop?',
    answer: "Yes. Send us your laptop's model, specs and photos on WhatsApp and we'll share a quote or exchange value." },
];

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;
