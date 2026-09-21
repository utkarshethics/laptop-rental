export const ORGANIZATION = {
  name: 'LaptopRent',
  legalName: 'LaptopRent Technologies Private Limited',
  url: 'https://laptoponrent.online',
  logo: 'https://laptoponrent.online/assets/logo.svg',
  sameAs: [
    'https://www.linkedin.com/company/laptoprent',
    'https://twitter.com/laptoprent',
    'https://www.facebook.com/laptoprent',
    'https://www.instagram.com/laptoprent',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-80-8090-0666',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
    hoursAvailable: 'Mo-Sat 09:00-19:00',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Shiv Shakti Industrial Premises, NM Joshi Marg',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400011',
    addressCountry: 'IN',
  },
  foundingDate: '2024-01-01',
  founders: [{ '@type': 'Person', name: 'Utkarsh Gupta' }],
  knowsAbout: [
    'Laptop Rental',
    'MacBook Rental',
    'Gaming Laptop Rental',
    'Corporate Laptop Rental',
    'Student Laptop Rental',
    'Event Laptop Rental',
    'IT Equipment Rental',
  ],
};

export const SERVICE_AREAS = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune',
  'Kolkata', 'Ahmedabad', 'Gurgaon', 'Noida', 'Jaipur', 'Lucknow',
  'Indore', 'Bhopal', 'Coimbatore', 'Kochi', 'Chandigarh', 'Patna',
  'Nagpur', 'Surat', 'Visakhapatnam', 'Bhubaneswar', 'Mysore',
  'Guwahati', 'Jodhpur'
];

export const LAPTOP_CATEGORIES = [
  { id: 'macbook-rental', name: 'MacBook Rental', description: 'MacBook Air & Pro rentals with M1/M2/M3 chips', priceRange: '₹2,999 - ₹15,000/mo' },
  { id: 'gaming-laptop-rental', name: 'Gaming Laptop Rental', description: 'RTX 30/40 series high-performance gaming laptops', priceRange: '₹3,500 - ₹8,000/mo' },
  { id: 'business-laptop-rental', name: 'Business Laptop Rental', description: 'Office & corporate laptops with 16GB+ RAM', priceRange: '₹1,200 - ₹2,800/mo' },
  { id: 'student-laptop-rental', name: 'Student Laptop Rental', description: 'Affordable laptops for students & academics', priceRange: '₹849 - ₹1,500/mo' },
  { id: 'macbook-air-rental', name: 'MacBook Air Rental', description: 'M1, M2, M3 MacBook Air models', priceRange: '₹2,999 - ₹6,500/mo' },
  { id: 'macbook-pro-rental', name: 'MacBook Pro Rental', description: 'M1/M2/M3 Pro & Max chip models', priceRange: '₹4,500 - ₹15,000/mo' },
  { id: 'dell-laptop-rental', name: 'Dell Laptop Rental', description: 'XPS, Inspiron, Latitude, Vostro, Precision', priceRange: '₹999 - ₹4,500/mo' },
  { id: 'hp-laptop-rental', name: 'HP Laptop Rental', description: 'Spectre, Envy, Pavilion, ProBook, Omen', priceRange: '₹999 - ₹5,000/mo' },
  { id: 'lenovo-laptop-rental', name: 'Lenovo Laptop Rental', description: 'ThinkPad, IdeaPad, Yoga, Legion', priceRange: '₹1,199 - ₹4,800/mo' },
  { id: 'asus-laptop-rental', name: 'ASUS Laptop Rental', description: 'ZenBook, Vivobook, ROG, TUF Gaming', priceRange: '₹1,299 - ₹5,500/mo' },
  { id: 'acer-laptop-rental', name: 'Acer Laptop Rental', description: 'Swift, Aspire, Predator, Nitro Gaming', priceRange: '₹999 - ₹4,500/mo' },
  { id: 'microsoft-surface-rental', name: 'Surface Laptop Rental', description: 'Surface Laptop, Pro, Book, Go', priceRange: '₹1,499 - ₹4,500/mo' },
  { id: 'workstation-rental', name: 'Mobile Workstation Rental', description: 'RTX A-series, Xeon, 32GB+ RAM for AI/ML', priceRange: '₹5,000 - ₹15,000/mo' },
  { id: 'budget-laptop-rental', name: 'Budget Laptop Rental', description: 'Under ₹1,500/month laptops for basic use', priceRange: '₹849 - ₹1,500/mo' },
];

export const FAQ_QUESTIONS = [
  {
    question: 'What is the minimum rental period?',
    answer: 'We offer flexible rental periods starting from 1 day for events, weekly for projects, and monthly for ongoing needs. No long-term commitment required.',
  },
  {
    question: 'Do you provide same-day delivery?',
    answer: 'Yes, we offer same-day delivery in Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, and other major cities for orders placed before 2 PM.',
  },
  {
    question: 'Is there a security deposit?',
    answer: 'Yes, a refundable security deposit of 1-2 months rent is required. GST-registered companies on 12+ month rentals can get deposit waiver.',
  },
  {
    question: 'Do you provide GST invoices?',
    answer: 'Yes, all rentals include 18% GST invoice under HSN 997315. Registered businesses can claim full input tax credit.',
  },
  {
    question: 'What happens if the laptop gets damaged?',
    answer: 'We offer optional GadgetCare+ protection covering accidental damage, spills, and hardware failures. Without it, repair costs apply per our damage policy.',
  },
  {
    question: 'Can I extend my rental period?',
    answer: 'Yes, you can extend your rental anytime through your account dashboard or by contacting support. Extensions are subject to availability.',
  },
  {
    question: 'Do you provide pre-installed software?',
    answer: 'Yes, we offer custom software pre-installation (OS, Office, IDEs, design tools, etc.) at no extra cost for orders above 5 units.',
  },
  {
    question: 'Is there a minimum order quantity for corporate rentals?',
    answer: 'No minimum for individual rentals. Corporate bulk orders (10+ units) get volume discounts, free delivery, and dedicated account management.',
  },
];

export const INDIAN_CITIES = [
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka', shortName: 'BLR', lat: 12.9716, lng: 77.5946, tier: 1 },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra', shortName: 'BOM', lat: 19.0760, lng: 72.8777, tier: 1 },
  { slug: 'delhi', name: 'Delhi', state: 'Delhi', shortName: 'DEL', lat: 28.7041, lng: 77.1025, tier: 1 },
  { slug: 'hyderabad', name: 'Hyderabad', state: 'Telangana', shortName: 'HYD', lat: 17.3850, lng: 78.4867, tier: 1 },
  { slug: 'chennai', name: 'Chennai', state: 'Tamil Nadu', shortName: 'MAA', lat: 13.0827, lng: 80.2707, tier: 1 },
  { slug: 'pune', name: 'Pune', state: 'Maharashtra', shortName: 'PNQ', lat: 18.5204, lng: 73.8567, tier: 1 },
  { slug: 'kolkata', name: 'Kolkata', state: 'West Bengal', shortName: 'CCU', lat: 22.5726, lng: 88.3639, tier: 1 },
  { slug: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', shortName: 'AMD', lat: 23.0225, lng: 72.5714, tier: 1 },
  { slug: 'gurgaon', name: 'Gurgaon', state: 'Haryana', shortName: 'GGN', lat: 28.4595, lng: 77.0266, tier: 2 },
  { slug: 'noida', name: 'Noida', state: 'Uttar Pradesh', shortName: 'NCR', lat: 28.5355, lng: 77.3910, tier: 2 },
  { slug: 'jaipur', name: 'Jaipur', state: 'Rajasthan', shortName: 'JAI', lat: 26.9124, lng: 75.7873, tier: 2 },
  { slug: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', shortName: 'LKO', lat: 26.8467, lng: 80.9462, tier: 2 },
  { slug: 'indore', name: 'Indore', state: 'Madhya Pradesh', shortName: 'IDR', lat: 22.7196, lng: 75.8577, tier: 2 },
  { slug: 'bhopal', name: 'Bhopal', state: 'Madhya Pradesh', shortName: 'BHO', lat: 23.2599, lng: 77.4126, tier: 2 },
  { slug: 'coimbatore', name: 'Coimbatore', state: 'Tamil Nadu', shortName: 'CJB', lat: 11.0168, lng: 76.9558, tier: 2 },
  { slug: 'kochi', name: 'Kochi', state: 'Kerala', shortName: 'COK', lat: 9.9312, lng: 76.2673, tier: 2 },
  { slug: 'chandigarh', name: 'Chandigarh', state: 'Punjab', shortName: 'IXC', lat: 30.7333, lng: 76.7794, tier: 2 },
  { slug: 'patna', name: 'Patna', state: 'Bihar', shortName: 'PAT', lat: 25.5941, lng: 85.1376, tier: 2 },
  { slug: 'nagpur', name: 'Nagpur', state: 'Maharashtra', shortName: 'NAG', lat: 21.1458, lng: 79.0882, tier: 2 },
  { slug: 'surat', name: 'Surat', state: 'Gujarat', shortName: 'STV', lat: 21.1702, lng: 72.8311, tier: 1 },
  { slug: 'visakhapatnam', name: 'Visakhapatnam', state: 'Andhra Pradesh', shortName: 'VTZ', lat: 17.6868, lng: 83.2185, tier: 2 },
  { slug: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', shortName: 'BBI', lat: 20.2961, lng: 85.8245, tier: 3 },
  { slug: 'mysore', name: 'Mysore', state: 'Karnataka', shortName: 'MYQ', lat: 12.2958, lng: 76.6394, tier: 3 },
  { slug: 'guwahati', name: 'Guwahati', state: 'Assam', shortName: 'GAU', lat: 26.1445, lng: 91.7362, tier: 3 },
  { slug: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', shortName: 'JDH', lat: 26.2389, lng: 73.0243, tier: 3 },
];

export const CITY_META = {
  bangalore: { 
    name: 'Bangalore', 
    description: 'India\'s Silicon Valley - laptop rentals for startups, IT companies, students & events. Same-day delivery in Whitefield, Koramangala, HSR, Indiranagar, Electronic City.',
    keywords: ['laptop rental bangalore', 'macbook rental bangalore', 'laptop on rent bangalore', 'computer rental bangalore'],
    priceStart: '₹849/mo',
    areas: ['Whitefield', 'Koramangala', 'HSR Layout', 'Indiranagar', 'Electronic City', 'Marathahalli', 'Jayanagar', 'Malleshwaram'],
  },
  mumbai: { 
    name: 'Mumbai', 
    description: 'Financial capital - laptop rentals for corporate offices, events, production houses. Same-day delivery in Andheri, Bandra, Powai, Lower Parel, Thane, Borivali.',
    keywords: ['laptop rental mumbai', 'macbook rental mumbai', 'laptop on rent mumbai', 'computer rental mumbai'],
    priceStart: '₹999/mo',
    areas: ['Andheri', 'Bandra', 'Powai', 'Lower Parel', 'Thane', 'Borivali', 'Navi Mumbai', 'Goregaon'],
  },
  delhi: { 
    name: 'Delhi', 
    description: 'Capital region - laptop rentals for government, corporate, students, events. Same-day delivery in Gurgaon, Noida, Connaught Place, Nehru Place, Nehru Palace.',
    keywords: ['laptop rental delhi', 'macbook rental delhi', 'laptop on rent delhi', 'computer rental delhi'],
    priceStart: '₹899/mo',
    areas: ['Connaught Place', 'Nehru Place', 'Gurgaon', 'Noida', 'Nehru Palace', 'Karol Bagh', 'Dwarka', 'Rohini'],
  },
  hyderabad: { 
    name: 'Hyderabad', 
    description: 'Cyberabad hub - laptop rentals for IT parks, pharma, events. Same-day delivery in Hitech City, Gachibowli, Banjara Hills, Jubilee Hills, Secunderabad.',
    keywords: ['laptop rental hyderabad', 'macbook rental hyderabad', 'laptop on rent hyderabad', 'computer rental hyderabad'],
    priceStart: '₹899/mo',
    areas: ['Hitech City', 'Gachibowli', 'Banjara Hills', 'Jubilee Hills', 'Secunderabad', 'Madhapur', 'Kukatpally'],
  },
  chennai: { 
    name: 'Chennai', 
    description: 'Detroit of India - laptop rentals for auto, IT, manufacturing, events. Same-day delivery in OMR, Tidel Park, Guindy, Anna Nagar, T. Nagar.',
    keywords: ['laptop rental chennai', 'macbook rental chennai', 'laptop on rent chennai', 'computer rental chennai'],
    priceStart: '₹899/mo',
    areas: ['OMR', 'Tidel Park', 'Guindy', 'Anna Nagar', 'T. Nagar', 'Velachery', 'Porur', 'Ambattur'],
  },
  pune: { 
    name: 'Pune', 
    description: 'Oxford of the East - laptop rentals for IT, education, manufacturing. Same-day delivery in Hinjewadi, Magarpatta, Koregaon Park, Viman Nagar, Baner.',
    keywords: ['laptop rental pune', 'macbook rental pune', 'laptop on rent pune', 'computer rental pune'],
    priceStart: '₹849/mo',
    areas: ['Hinjewadi', 'Magarpatta', 'Koregaon Park', 'Viman Nagar', 'Baner', 'Kharadi', 'Wakad', 'Aundh'],
  },
  kolkata: { 
    name: 'Kolkata', 
    description: 'City of Joy - laptop rentals for corporate, education, events. Same-day delivery in Salt Lake, New Town, Park Street, Howrah, Rajarhat.',
    keywords: ['laptop rental kolkata', 'macbook rental kolkata', 'laptop on rent kolkata', 'computer rental kolkata'],
    priceStart: '₹899/mo',
    areas: ['Salt Lake', 'New Town', 'Park Street', 'Howrah', 'Rajarhat', 'Gariahat', 'Jadavpur', 'Behala'],
  },
};

export const BLOG_POSTS = [
  { slug: 'laptop-rental-vs-buying-india', title: 'Laptop Rental vs Buying in India: Complete Cost Analysis 2024', category: 'guides', date: '2024-01-15', readTime: '8 min' },
  { slug: 'best-laptops-for-students-rental', title: 'Best Laptops for Students on Rent in India (2024)', category: 'guides', date: '2024-01-20', readTime: '6 min' },
  { slug: 'macbook-rental-guide-india', title: 'MacBook Rental in India: Complete Guide 2024 (M1/M2/M3)', category: 'guides', date: '2024-01-25', readTime: '10 min' },
  { slug: 'gaming-laptop-rental-india', title: 'Gaming Laptop Rental in India: RTX 30/40 Series Guide', category: 'guides', date: '2024-02-01', readTime: '8 min' },
  { slug: 'laptop-rental-vs-emi-comparison', title: 'Laptop Rental vs EMI: Which Saves More Money in 2024?', category: 'comparisons', date: '2024-02-10', readTime: '7 min' },
  { slug: 'how-to-choose-rental-laptop', title: 'How to Choose the Right Rental Laptop for Your Needs', category: 'guides', date: '2024-02-15', readTime: '6 min' },
  { slug: 'bangalore-laptop-rental-guide', title: 'Laptop Rental in Bangalore: Complete City Guide 2024', category: 'city-guides', date: '2024-02-20', readTime: '8 min' },
  { slug: 'mumbai-laptop-rental-guide', title: 'Laptop Rental in Mumbai: Complete City Guide 2024', category: 'city-guides', date: '2024-02-25', readTime: '8 min' },
  { slug: 'delhi-laptop-rental-guide', title: 'Laptop Rental in Delhi NCR: Complete Guide 2024', category: 'city-guides', date: '2024-03-01', readTime: '8 min' },
  { slug: 'hyderabad-laptop-rental-guide', title: 'Laptop Rental in Hyderabad: Complete Guide 2024', category: 'city-guides', date: '2024-03-05', readTime: '8 min' },
  { slug: 'chennai-laptop-rental-guide', title: 'Laptop Rental in Chennai: Complete Guide 2024', category: 'city-guides', date: '2024-03-10', readTime: '8 min' },
  { slug: 'pune-laptop-rental-guide', title: 'Laptop Rental in Pune: Complete Guide 2024', category: 'city-guides', date: '2024-03-15', readTime: '8 min' },
  { slug: 'corporate-laptop-rental-benefits', title: 'Corporate Laptop Rental: Benefits for Startups & SMEs', category: 'business', date: '2024-03-20', readTime: '6 min' },
  { slug: 'event-laptop-rental-guide', title: 'Event Laptop Rental: Conferences, Training & Exams Guide', category: 'events', date: '2024-03-25', readTime: '7 min' },
  { slug: 'gst-laptop-rental-india', title: 'GST on Laptop Rental in India: 18% Input Credit Guide', category: 'business', date: '2024-03-30', readTime: '6 min' },
];