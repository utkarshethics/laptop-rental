// Second-hand laptop sales. Shared by the React page and scripts/prerender-second-hand.ts.
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
  imageUrl: string;
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
  // --- Business Segment (15 models) ---
  { id: 'thinkpad-t480', brand: 'Lenovo', name: 'ThinkPad T480', segment: 'business',
    specs: ['Intel Core i5 8th Gen', '8 GB RAM · 256 GB SSD', '14" Full HD', 'Windows 11 Pro'], priceFrom: 16499,
    imageUrl: '/assets/products/lenovo/thinkpad-t480/hero.webp' },
  { id: 'thinkpad-t490', brand: 'Lenovo', name: 'ThinkPad T490', segment: 'business',
    specs: ['Intel Core i5 8th Gen', '16 GB RAM · 512 GB SSD', '14" Full HD', 'Windows 11 Pro'], priceFrom: 19999,
    imageUrl: '/assets/products/lenovo/thinkpad-t480/hero.webp' },
  { id: 'thinkpad-t14-gen1', brand: 'Lenovo', name: 'ThinkPad T14 Gen 1', segment: 'business',
    specs: ['Intel Core i5 10th Gen', '16 GB RAM · 512 GB SSD', '14" FHD IPS', 'Windows 11 Pro'], priceFrom: 24999,
    imageUrl: '/assets/products/lenovo/thinkpad-t14/hero.webp' },
  { id: 'thinkpad-x1-carbon-gen6', brand: 'Lenovo', name: 'ThinkPad X1 Carbon Gen 6', segment: 'business',
    specs: ['Intel Core i7 8th Gen', '16 GB RAM · 512 GB NVMe SSD', '14" FHD IPS · Ultra-light', 'Windows 11 Pro'], priceFrom: 27499,
    imageUrl: '/assets/products/lenovo/thinkpad-x1-carbon/hero.webp' },
  { id: 'thinkpad-x1-carbon-gen7', brand: 'Lenovo', name: 'ThinkPad X1 Carbon Gen 7', segment: 'business',
    specs: ['Intel Core i7 10th Gen', '16 GB RAM · 512 GB NVMe SSD', '14" FHD Low Power · Dolby Audio', 'Windows 11 Pro'], priceFrom: 32999,
    imageUrl: '/assets/products/lenovo/thinkpad-x1-carbon/hero.webp' },
  { id: 'latitude-7490', brand: 'Dell', name: 'Latitude 7490', segment: 'business',
    specs: ['Intel Core i7 8th Gen', '16 GB RAM · 512 GB SSD', '14" Full HD', 'Windows 11 Pro'], priceFrom: 21999,
    imageUrl: '/assets/products/dell/latitude-7450/hero.webp' },
  { id: 'latitude-7400', brand: 'Dell', name: 'Latitude 7400', segment: 'business',
    specs: ['Intel Core i5 8th Gen', '16 GB RAM · 256 GB NVMe SSD', '14" Full HD Carbon Finish', 'Windows 11 Pro'], priceFrom: 22499,
    imageUrl: '/assets/products/dell/latitude-7450/hero.webp' },
  { id: 'latitude-7410', brand: 'Dell', name: 'Latitude 7410', segment: 'business',
    specs: ['Intel Core i7 10th Gen', '16 GB RAM · 512 GB NVMe SSD', '14" FHD Super Low Power', 'Windows 11 Pro'], priceFrom: 28999,
    imageUrl: '/assets/products/dell/latitude-7450/hero.webp' },
  { id: 'latitude-5410', brand: 'Dell', name: 'Latitude 5410', segment: 'business',
    specs: ['Intel Core i5 10th Gen', '16 GB RAM · 512 GB SSD', '14" FHD Anti-Glare', 'Windows 11 Pro'], priceFrom: 23499,
    imageUrl: '/assets/products/dell/latitude-5430/hero.webp' },
  { id: 'dell-xps-13-9380', brand: 'Dell', name: 'Dell XPS 13 9380', segment: 'business',
    specs: ['Intel Core i7 8th Gen', '16 GB RAM · 512 GB SSD', '13.3" 4K UHD InfinityEdge', 'Windows 11 Pro'], priceFrom: 34999,
    imageUrl: '/assets/products/dell/xps-13-plus/hero.webp' },
  { id: 'elitebook-840-g5', brand: 'HP', name: 'EliteBook 840 G5', segment: 'business',
    specs: ['Intel Core i5 8th Gen', '8 GB RAM · 256 GB SSD', '14" Full HD Aluminium Body', 'Windows 11 Pro'], priceFrom: 15499,
    imageUrl: '/assets/products/hp/elitebook-840-g9/hero.webp' },
  { id: 'elitebook-840-g6', brand: 'HP', name: 'EliteBook 840 G6', segment: 'business',
    specs: ['Intel Core i5 8th Gen', '16 GB RAM · 512 GB SSD', '14" Full HD · Bang & Olufsen', 'Windows 11 Pro'], priceFrom: 18999,
    imageUrl: '/assets/products/hp/elitebook-840-g9/hero.webp' },
  { id: 'elitebook-840-g7', brand: 'HP', name: 'EliteBook 840 G7', segment: 'business',
    specs: ['Intel Core i5 10th Gen', '16 GB RAM · 512 GB NVMe SSD', '14" FHD Narrow Bezel', 'Windows 11 Pro'], priceFrom: 26499,
    imageUrl: '/assets/products/hp/elitebook-860-g9/hero.webp' },
  { id: 'hp-spectre-x360-13', brand: 'HP', name: 'HP Spectre x360 13', segment: 'business',
    specs: ['Intel Core i7 10th Gen', '16 GB RAM · 512 GB SSD', '13.3" FHD Touch 2-in-1 Gem Cut', 'Windows 11'], priceFrom: 36999,
    imageUrl: '/assets/products/hp/spectre-x360-14/hero.webp' },
  { id: 'dell-precision-3541', brand: 'Dell', name: 'Dell Precision 3541 Workstation', segment: 'business',
    specs: ['Intel Core i7 9th Gen 6-Core', '32 GB RAM · 512 GB NVMe SSD', 'NVIDIA Quadro P620 4GB · 15.6" FHD', 'Windows 11 Pro'], priceFrom: 34499,
    imageUrl: '/assets/products/dell/precision-3570/hero.webp' },

  // --- Student / Budget Segment (11 models) ---
  { id: 'latitude-5490', brand: 'Dell', name: 'Latitude 5490', segment: 'student',
    specs: ['Intel Core i5 7th Gen', '8 GB RAM · 256 GB SSD', '14" HD', 'Windows 11'], priceFrom: 12999,
    imageUrl: '/assets/products/dell/latitude-5430/hero.webp' },
  { id: 'latitude-5400', brand: 'Dell', name: 'Latitude 5400', segment: 'student',
    specs: ['Intel Core i5 8th Gen', '8 GB RAM · 256 GB SSD', '14" Full HD', 'Windows 11'], priceFrom: 15999,
    imageUrl: '/assets/products/dell/latitude-5430/hero.webp' },
  { id: 'latitude-3400', brand: 'Dell', name: 'Latitude 3400', segment: 'student',
    specs: ['Intel Core i3 8th Gen', '8 GB RAM · 256 GB SSD', '14" HD · Durable Chassis', 'Windows 11'], priceFrom: 11999,
    imageUrl: '/assets/products/dell/latitude-5430/hero.webp' },
  { id: 'dell-inspiron-3593', brand: 'Dell', name: 'Dell Inspiron 3593', segment: 'student',
    specs: ['Intel Core i5 10th Gen', '8 GB RAM · 512 GB SSD', '15.6" FHD Anti-glare', 'Windows 11'], priceFrom: 17999,
    imageUrl: '/assets/products/dell/inspiron-15/hero.webp' },
  { id: 'probook-440-g6', brand: 'HP', name: 'ProBook 440 G6', segment: 'student',
    specs: ['Intel Core i3 8th Gen', '8 GB RAM · 256 GB SSD', '14" HD', 'Windows 11'], priceFrom: 11499,
    imageUrl: '/assets/products/hp/probook-450/hero.webp' },
  { id: 'probook-450-g6', brand: 'HP', name: 'ProBook 450 G6', segment: 'student',
    specs: ['Intel Core i5 8th Gen', '8 GB RAM · 512 GB SSD', '15.6" FHD with NumPad', 'Windows 11'], priceFrom: 16999,
    imageUrl: '/assets/products/hp/probook-450/hero.webp' },
  { id: 'hp-14s-dy', brand: 'HP', name: 'HP 14s', segment: 'student',
    specs: ['Intel Core i3 11th Gen', '8 GB RAM · 512 GB NVMe SSD', '14" FHD Micro-edge', 'Windows 11'], priceFrom: 18499,
    imageUrl: '/assets/products/hp/pavilion-15/hero.webp' },
  { id: 'hp-pavilion-15-eg', brand: 'HP', name: 'HP Pavilion 15', segment: 'student',
    specs: ['Intel Core i5 11th Gen', '16 GB RAM · 512 GB SSD', '15.6" FHD IPS', 'Windows 11'], priceFrom: 24499,
    imageUrl: '/assets/products/hp/pavilion-15/hero.webp' },
  { id: 'thinkpad-l390', brand: 'Lenovo', name: 'ThinkPad L390', segment: 'student',
    specs: ['Intel Core i5 8th Gen', '8 GB RAM · 256 GB SSD', '13.3" FHD IPS Compact', 'Windows 11 Pro'], priceFrom: 14999,
    imageUrl: '/assets/products/lenovo/thinkpad-t480/hero.webp' },
  { id: 'ideapad-slim-3', brand: 'Lenovo', name: 'IdeaPad Slim 3', segment: 'student',
    specs: ['AMD Ryzen 5 5500U 6-Core', '8 GB RAM · 512 GB SSD', '15.6" FHD', 'Windows 11'], priceFrom: 19999,
    imageUrl: '/assets/products/lenovo/ideapad-slim-5/hero.webp' },
  { id: 'asus-vivobook-15-x515', brand: 'ASUS', name: 'ASUS VivoBook 15', segment: 'student',
    specs: ['Intel Core i3 11th Gen', '8 GB RAM · 256 GB NVMe SSD', '15.6" FHD NanoEdge', 'Windows 11'], priceFrom: 16499,
    imageUrl: '/assets/products/asus/vivobook-15/hero.webp' },

  // --- MacBook Segment (8 models) ---
  { id: 'macbook-air-2017', brand: 'Apple', name: 'MacBook Air 13" (2017)', segment: 'mac',
    specs: ['Intel Core i5 Dual-Core', '8 GB RAM · 128 GB SSD', '13.3" Display · MagSafe 2', 'macOS Monterey'], priceFrom: 18999,
    imageUrl: '/assets/products/apple/macbook-air-2017/hero.webp' },
  { id: 'macbook-pro-2019-13', brand: 'Apple', name: 'MacBook Pro 13" (2019)', segment: 'mac',
    specs: ['Intel Core i5 Quad-Core', '8 GB RAM · 256 GB SSD', '13.3" Retina · Touch Bar · 2 Thunderbolt 3', 'macOS Sonoma'], priceFrom: 31999,
    imageUrl: '/assets/products/apple/macbook-pro-13/hero.webp' },
  { id: 'macbook-air-m1', brand: 'Apple', name: 'MacBook Air M1 (2020)', segment: 'mac',
    specs: ['Apple M1 chip', '8 GB RAM · 256 GB SSD', '13.3" Retina', 'Battery health 85%+'], priceFrom: 44999,
    imageUrl: '/assets/products/apple/macbook-air-m1/hero.webp' },
  { id: 'macbook-air-m1-512', brand: 'Apple', name: 'MacBook Air M1 512GB', segment: 'mac',
    specs: ['Apple M1 chip 8-Core GPU', '8 GB RAM · 512 GB SSD', '13.3" Retina · Space Grey', 'Battery health 85%+'], priceFrom: 49999,
    imageUrl: '/assets/products/apple/macbook-air-m1/hero.webp' },
  { id: 'macbook-air-m1-16gb', brand: 'Apple', name: 'MacBook Air M1 16GB RAM', segment: 'mac',
    specs: ['Apple M1 chip', '16 GB Unified RAM · 512 GB SSD', '13.3" Retina · Dev Config', 'Battery health 85%+'], priceFrom: 56999,
    imageUrl: '/assets/products/apple/macbook-air-m1/hero.webp' },
  { id: 'macbook-pro-m1', brand: 'Apple', name: 'MacBook Pro 13" M1', segment: 'mac',
    specs: ['Apple M1 chip', '8 GB RAM · 512 GB SSD', '13.3" Retina · Touch Bar', 'Battery health 85%+'], priceFrom: 54999,
    imageUrl: '/assets/products/apple/macbook-pro-13/hero.webp' },
  { id: 'macbook-air-m2', brand: 'Apple', name: 'MacBook Air M2 (2022)', segment: 'mac',
    specs: ['Apple M2 chip', '8 GB Unified RAM · 256 GB SSD', '13.6" Liquid Retina · Midnight', 'Battery health 90%+'], priceFrom: 66999,
    imageUrl: '/assets/products/apple/macbook-air-m2/hero.webp' },
  { id: 'macbook-pro-14-m1-pro', brand: 'Apple', name: 'MacBook Pro 14" M1 Pro', segment: 'mac',
    specs: ['Apple M1 Pro 8-Core CPU', '16 GB Unified RAM · 512 GB SSD', '14.2" Liquid Retina XDR 120Hz Promotion', 'Battery health 88%+'], priceFrom: 89999,
    imageUrl: '/assets/products/apple/macbook-pro-14/hero.webp' },

  // --- Gaming Segment (8 models) ---
  { id: 'asus-tuf-f15', brand: 'ASUS', name: 'TUF Gaming F15', segment: 'gaming',
    specs: ['Intel Core i5 10th Gen', '16 GB RAM · 512 GB SSD', 'GTX 1650 4GB · 15.6" 144Hz', 'Windows 11'], priceFrom: 34999,
    imageUrl: '/assets/products/asus/tuf-f15/hero.webp' },
  { id: 'asus-tuf-a15', brand: 'ASUS', name: 'TUF Gaming A15', segment: 'gaming',
    specs: ['AMD Ryzen 7 4800H 8-Core', '16 GB RAM · 512 GB SSD', 'RTX 3050 4GB · 15.6" 144Hz', 'Windows 11'], priceFrom: 41999,
    imageUrl: '/assets/products/asus/tuf-f15/hero.webp' },
  { id: 'acer-nitro-5', brand: 'Acer', name: 'Nitro 5 Gaming', segment: 'gaming',
    specs: ['Intel Core i5 11th Gen', '16 GB RAM · 512 GB SSD', 'GTX 1650 4GB · 15.6" 144Hz IPS', 'Windows 11'], priceFrom: 33999,
    imageUrl: '/assets/products/acer/nitro-5/hero.webp' },
  { id: 'acer-nitro-v-15', brand: 'Acer', name: 'Nitro V 15', segment: 'gaming',
    specs: ['Intel Core i5 13th Gen', '16 GB RAM · 512 GB SSD', 'RTX 3050 6GB · 15.6" 144Hz', 'Windows 11'], priceFrom: 46999,
    imageUrl: '/assets/products/acer/nitro-5/hero.webp' },
  { id: 'hp-pavilion-gaming-15', brand: 'HP', name: 'Pavilion Gaming 15', segment: 'gaming',
    specs: ['AMD Ryzen 5 4600H', '8 GB RAM · 512 GB SSD', 'GTX 1650 4GB · 15.6" FHD', 'Windows 11'], priceFrom: 29999,
    imageUrl: '/assets/products/hp/victus-15/hero.webp' },
  { id: 'hp-victus-15-fb', brand: 'HP', name: 'Victus 15 Gaming', segment: 'gaming',
    specs: ['AMD Ryzen 5 5600H', '16 GB RAM · 512 GB SSD', 'RTX 3050 4GB · 15.6" 144Hz', 'Windows 11'], priceFrom: 39999,
    imageUrl: '/assets/products/hp/victus-15/hero.webp' },
  { id: 'lenovo-legion-5', brand: 'Lenovo', name: 'Legion 5 Gaming', segment: 'gaming',
    specs: ['AMD Ryzen 7 4800H', '16 GB RAM · 512 GB NVMe SSD', 'GTX 1660 Ti 6GB · 15.6" 144Hz', 'Windows 11'], priceFrom: 42999,
    imageUrl: '/assets/products/lenovo/legion-5-pro/hero.webp' },
  { id: 'msi-gf63-thin', brand: 'MSI', name: 'MSI GF63 Thin', segment: 'gaming',
    specs: ['Intel Core i5 11th Gen', '16 GB RAM · 512 GB NVMe SSD', 'RTX 3050 4GB · Thin & Light Gaming', 'Windows 11'], priceFrom: 36999,
    imageUrl: '/assets/products/msi/gf63-thin/hero.webp' },
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
