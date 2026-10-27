import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ORIGIN = 'https://laptoponrent.online';
const ROOT = resolve(process.cwd());

export const LAPTOP_LANGUAGES = [
  {
    code: 'hi',
    hreflang: 'hi-IN',
    name: 'हिन्दी',
    englishName: 'Hindi',
    path: '/hi/',
    metaTitle: 'लैपटॉप किराए पर कैसे लें | Laptop & MacBook on Rent ₹1,499/माह',
    metaDesc: 'कोडिंग, वर्क फ्रॉम होम और छात्रों के लिए लैपटॉप किराए पर। bangalore me laptop rent pe kaise le. मैकबुक, i5, i7 लैपटॉप बिना सिक्योरिटी डिपॉजिट।',
    h1: 'लैपटॉप किराए पर कैसे लें (Laptop on Rent)',
    tagline: 'कोडिंग, स्टार्टअप और बिजनेस के लिए मैकबुक और लैपटॉप किराए पर - ₹1,499/माह से शुरू',
    voiceAnswerLead: 'laptoponrent.online आपको बेंगलुरु, मुंबई, हैदराबाद और दिल्ली एनसीआर में लैपटॉप और मैकबुक किराए पर प्रदान करता है। Core i5, Core i7, और Apple MacBook M2/M3 मशीनें मात्र ₹1,499/माह से उपलब्ध हैं। नो-सिक्योरिटी डिपॉजिट विकल्प, 18% जीएसटी इनवॉइस और सेम-डे डोरस्टेप डिलीवरी की सुविधा उपलब्ध है।',
    pricingLead: 'Core i5 16GB रैम ₹1,499/माह, Core i7 ₹2,499/माह, MacBook M2 ₹2,999/माह। जीरो डिपॉजिट विकल्प।',
    whatsappText: 'नमस्ते laptoponrent, मुझे किराए पर लैपटॉप / मैकबुक चाहिए।',
    textSearchKeywords: 'bangalore me laptop rent pe kaise le, 1 mahine ke liye laptop rent kitna hoga, bina security deposit laptop rent par mil sakta hai kya, coding ke liye i7 laptop kiraye par, macbook rent par lene ke rules, laptop on rent price per month',
    typedSearches: [
      {
        romanQuery: 'bangalore me laptop rent pe kaise le',
        nativeQuery: 'लैपटॉप किराए पर कैसे लें?',
        answer: 'laptoponrent.online वेबसाइट या व्हाट्सएप पर अपना पसंदीदा मॉडल (i5/i7/MacBook) चुनें, बेसिक आधार/पैन केवाईसी सबमिट करें और सेम-डे डिलीवरी प्राप्त करें।'
      },
      {
        romanQuery: 'laptop on rent price per month kitna hoga',
        nativeQuery: 'लैपटॉप का महीने का किराया कितना है?',
        answer: 'Intel Core i5 लैपटॉप ₹1,499/माह, Core i7 16GB रैम ₹2,499/माह, और Apple MacBook Air M2 ₹2,999/माह से शुरू होते हैं।'
      },
      {
        romanQuery: 'bina security deposit laptop rent par mil sakta hai kya',
        nativeQuery: 'बिना सिक्योरिटी डिपॉजिट लैपटॉप मिल सकता है क्या?',
        answer: 'हाँ, कॉर्पोरेट एम्प्लॉई और वेरीफाइड स्टार्टअप्स के लिए जीरो सिक्योरिटी डिपॉजिट (Zero Deposit) विकल्प उपलब्ध है।'
      },
      {
        romanQuery: 'laptop kharab hone par replacement milta hai kya',
        nativeQuery: 'अगर लैपटॉप में खराबी आ जाए तो क्या होगा?',
        answer: 'हम 24 घंटे के अंदर फ्री ऑन-साइट रिपेयर या तुरंत रिप्लेसमेंट मशीन प्रदान करते हैं ताकि आपका काम न रुके।'
      },
      {
        romanQuery: 'students ke liye laptop rent lene ke rules',
        nativeQuery: 'छात्रों (Students) के लिए क्या नियम हैं?',
        answer: 'कॉलेज आईडी कार्ड और बेसिक केवाईसी पर स्टूडेंट स्पेशल डिस्काउंटेड रेट पर लैपटॉप किराए पर ले सकते हैं।'
      }
    ]
  },
  {
    code: 'kn',
    hreflang: 'kn-IN',
    name: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    path: '/kn/',
    metaTitle: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಲ್ಯಾಪ್ಟಾಪ್ ಬಾಡಿಗೆಗೆ | Laptop on Rent Bangalore ₹1,499/ತಿಂಗಳು',
    metaDesc: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಕೋಡಿಂಗ್, ಐಟಿ ಕೆಲಸಕ್ಕೆ ಲ್ಯಾಪ್ಟಾಪ್ ಮತ್ತು ಮ್ಯಾಕ್‌ಬುಕ್ ಬಾಡಿಗೆಗೆ. bangalore nalli laptop baadhigege elli sigutte. ಡೆಪಾಸಿಟ್ ಇಲ್ಲದೆ ಸೇವೆ.',
    h1: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಲ್ಯಾಪ್ಟಾಪ್ ಬಾಡಿಗೆಗೆ (Laptop on Rent Bangalore)',
    tagline: 'ಕೋಡಿಂಗ್, ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಸ್ಟಾರ್ಟ್‌ಅಪ್‌ಗಳಿಗೆ ಲ್ಯಾಪ್ಟಾಪ್ ಬಾಡಿಗೆ - ತಿಂಗಳಿಗೆ ₹1,499 ರಿಂದ',
    voiceAnswerLead: 'laptoponrent.online ಬೆಂಗಳೂರಿನ ವೈಟ್‌ಫೀಲ್ಡ್, ಎಚ್‌ಎಸ್‌ಆರ್, ಕೋರಮಂಗಲ ಸೇರಿದಂತೆ ಎಲ್ಲಾ ಕಡೆ ಲ್ಯಾಪ್ಟಾಪ್ ಮತ್ತು ಮ್ಯಾಕ್‌ಬುಕ್ ಬಾಡಿಗೆಗೆ ನೀಡುತ್ತದೆ. Core i5, Core i7 ಮತ್ತು Apple MacBook ಗಳು ಕೇವಲ ₹1,499/ತಿಂಗಳಿಂದ ಲಭ್ಯ. ಡೆಪಾಸಿಟ್ ಇಲ್ಲದ ಸೌಲಭ್ಯ ಮತ್ತು ಉಚಿತ ಹೋಮ್ ಡೆಲಿವರಿ.',
    pricingLead: 'Core i5 ಲ್ಯಾಪ್ಟಾಪ್ ₹1,499/ತಿಂಗಳು, i7 ₹2,499/ತಿಂಗಳು, MacBook ₹2,999/ತಿಂಗಳು.',
    whatsappText: 'ನಮಸ್ಕಾರ laptoponrent, ನನಗೆ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಲ್ಯಾಪ್ಟಾಪ್ ಬಾಡಿಗೆಗೆ ಬೇಕು.',
    textSearchKeywords: 'bangalore nalli laptop baadhigege elli sigutte, laptop rent per month estu agutte, macbook baadhigege tagoloke documents enu beku, laptop on rent in whitefield bangalore, rent laptop in koramangala same day',
    typedSearches: [
      {
        romanQuery: 'bangalore nalli laptop baadhigege elli sigutte',
        nativeQuery: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಲ್ಯಾಪ್ಟಾಪ್ ಬಾಡಿಗೆಗೆ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?',
        answer: 'laptoponrent.online ಮೂಲಕ ಇಂದೇ ವೈಟ್‌ಫೀಲ್ಡ್, ಕೋರಮಂಗಲ, ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಸೇರಿದಂತೆ ಬೆಂಗಳೂರಿನಾದ್ಯಂತ ಮನೆ ಬಾಗಿಲಿಗೆ ಲ್ಯಾಪ್ಟಾಪ್ ಡೆಲಿವರಿ ಪಡೆಯಬಹುದು.'
      },
      {
        romanQuery: 'laptop rent per month estu agutte bangalore',
        nativeQuery: 'ಲ್ಯಾಪ್ಟಾಪ್ ತಿಂಗಳ ಬಾಡಿಗೆ ಎಷ್ಟು?',
        answer: 'Core i5 ತಿಂಗಳಿಗೆ ₹1,499, Core i7 ₹2,499 ಮತ್ತು MacBook M2 ₹2,999 ರಿಂದ ಪ್ರಾರಂಭ.'
      },
      {
        romanQuery: 'deposit illade laptop rent sigutta',
        nativeQuery: 'ಸೆಕ್ಯೂರಿಟಿ ಡೆಪಾಸಿಟ್ ಇಲ್ಲದೆ ಸಿಗುತ್ತದೆಯೇ?',
        answer: 'ಹೌದು, ಉದ್ಯೋಗಿಗಳು ಮತ್ತು ಪರಿಶೀಲಿಸಿದ ಕಂಪನಿಗಳಿಗೆ ಝೀರೋ ಡೆಪಾಸಿಟ್ ಆಯ್ಕೆ ಲಭ್ಯವಿದೆ.'
      },
      {
        romanQuery: 'laptop damage aadre replacement kodtara',
        nativeQuery: 'ಲ್ಯಾಪ್ಟಾಪ್ ಕೆಟ್ಟರೆ ಬದಲಿ ಲ್ಯಾಪ್ಟಾಪ್ ನೀಡುತ್ತೀರಾ?',
        answer: 'ಹೌದು, 24 ಗಂಟೆಗಳಲ್ಲಿ ಉಚಿತ ಸರ್ವೀಸ್ ಅಥವಾ ತಕ್ಷಣವೇ ಬೇರೆ ಲ್ಯಾಪ್ಟಾಪ್ ಬದಲಾಯಿಸಿ ನೀಡಲಾಗುತ್ತದೆ.'
      },
      {
        romanQuery: 'laptop rental booking maduvudu hege',
        nativeQuery: 'ಬುಕಿಂಗ್ ಮಾಡುವುದು ಹೇಗೆ?',
        answer: 'ವಾಟ್ಸಾಪ್ ಅಥವಾ ವೆಬ್‌ಸೈಟ್ ಮೂಲಕ ಐಡಿ ದಾಖಲೆ ನೀಡಿ ಸುಲಭವಾಗಿ ಪಡೆಯಬಹುದು.'
      }
    ]
  },
  {
    code: 'ta',
    hreflang: 'ta-IN',
    name: 'தமிழ்',
    englishName: 'Tamil',
    path: '/ta/',
    metaTitle: 'சென்னையில் லேப்டாப் வாடகைக்கு | Laptop on Rent Chennai ₹1,499/மாதம்',
    metaDesc: 'சென்னையில் லேப்டாப் மற்றும் மேக்புக் வாடகைக்கு. chennai la laptop vaadagaikku enga kidaikkum. டெபாசிட் இல்லாமல் வாடகை. கோடிங், ஐடி பணிகளுக்கு ஏற்றது.',
    h1: 'சென்னையில் லேப்டாப் வாடகைக்கு (Laptop on Rent Chennai)',
    tagline: 'கோடிங், மாணவர்கள் மற்றும் நிறுவனங்களுக்கு லேப்டாப் வாடகை - மாதம் ₹1,499 முதல்',
    voiceAnswerLead: 'laptoponrent.online சென்னை ஓஎம்ஆர், கிண்டி உள்ளிட்ட அனைத்து பகுதிகளிலும் லேப்டாப் மற்றும் ஆப்பிள் மேக்புக் வாடகைக்கு வழங்குகிறது. Core i5, Core i7 மற்றும் MacBook M2 கணினிகள் மாதம் ₹1,499 முதல் கிடைக்கின்றன. டெபாசிட் இல்லாத வாய்ப்பு மற்றும் ஒரே நாளில் டோர்ஸ்டெப் டெலிவரி.',
    pricingLead: 'Core i5 லேப்டாப் ₹1,499/மாதம், Core i7 ₹2,499/மாதம், MacBook ₹2,999/மாதம்.',
    whatsappText: 'வணக்கம் laptoponrent, எனக்கு சென்னையில் லேப்டாப் வாடகைக்கு வேண்டும்.',
    textSearchKeywords: 'chennai la laptop vaadagaikku enga kidaikkum, laptop monthly rent evvalo aagum, deposit illama laptop rental kidaikkuma, laptop on rent in omr chennai, macbook rental in guindy',
    typedSearches: [
      {
        romanQuery: 'chennai la laptop vaadagaikku enga kidaikkum',
        nativeQuery: 'சென்னையில் லேப்டாப் வாடகைக்கு எங்கு கிடைக்கும்?',
        answer: 'laptoponrent.online மூலம் சென்னை முழுவதும் ஒரே நாளில் வீட்டிற்கே டெலிவரி பெறலாம்.'
      },
      {
        romanQuery: 'laptop monthly rent evvalo aagum chennai',
        nativeQuery: 'லேப்டாப் மாத வாடகை எவ்வளவு?',
        answer: 'Core i5 லேப்டாப் மாதம் ₹1,499 முதல், Core i7 ₹2,499 முதல் மற்றும் MacBook M2 ₹2,999 முதல் தொடங்குகிறது.'
      },
      {
        romanQuery: 'deposit illama laptop rental kidaikkuma',
        nativeQuery: 'டெபாசிட் இல்லாமல் லேப்டாப் கிடைக்குமா?',
        answer: 'ஆம், பணிபுரியும் நபர்கள் மற்றும் நிறுவனங்களுக்கு ஜீரோ டெபாசிட் வசதி உள்ளது.'
      },
      {
        romanQuery: 'laptop complaint vandha replacement tharuvangala',
        nativeQuery: 'பழுது ஏற்பட்டால் மாற்றி தருவார்களா?',
        answer: '24 மணி நேரத்திற்குள் இலவச சர்வீஸ் அல்லது மாற்று லேப்டாப் வழங்கப்படும்.'
      },
      {
        romanQuery: 'laptop rental booking eppadi panradhu',
        nativeQuery: 'எப்படி முன்பதிவு செய்வது?',
        answer: 'வாட்ஸ்அப் அல்லது வலைத்தளம் மூலம் எளிதாக பதிவு செய்யலாம்.'
      }
    ]
  },
  {
    code: 'te',
    hreflang: 'te-IN',
    name: 'తెలుగు',
    englishName: 'Telugu',
    path: '/te/',
    metaTitle: 'హైదరాబాద్‌లో ల్యాప్‌టాప్ అద్దెకు | Laptop on Rent Hyderabad ₹1,499/నెల',
    metaDesc: 'హైదరాబాద్‌లో కోడింగ్ మరియు వర్క్ కోసం ల్యాప్‌టాప్, మ్యాక్‌బుక్ అద్దెకు. hyderabad lo laptop addheki ekkada dorukuthundi. డిపాజిట్ లేకుండా రెంటల్.',
    h1: 'హైదరాబాద్‌లో ల్యాప్‌టాప్ అద్దెకు (Laptop on Rent Hyderabad)',
    tagline: 'కోడింగ్, విద్యార్థులు మరియు స్టార్టప్‌లకు ల్యాప్‌టాప్ రెంటల్ - నెలకు ₹1,499 నుండి',
    voiceAnswerLead: 'laptoponrent.online హైదరాబాద్ హైటెక్ సిటీ, గచ్చిబౌలి సహా నగరమంతటా ల్యాప్‌టాప్‌లు మరియు మ్యాక్‌బుక్‌లను అద్దెకు అందిస్తుంది. Core i5, Core i7 మరియు Apple MacBook M2 మెషీన్లు నెలకు ₹1,499 నుండి లభిస్తాయి. జీరో సెక్యూరిటీ డిపాజిట్ మరియు సేమ్-డే డెలివరీ.',
    pricingLead: 'Core i5 ల్యాప్‌టాప్ ₹1,499/నెల, Core i7 ₹2,499/నెల, MacBook ₹2,999/నెల.',
    whatsappText: 'నమస్కారం laptoponrent, నాకు ల్యాప్‌టాప్ అద్దెకు కావాలి.',
    textSearchKeywords: 'hyderabad lo laptop addheki ekkada dorukuthundi, laptop monthly rental charges entha untundhi, deposit lekunda laptop rent ki isthara, laptop on rent in hitec city, macbook pro rental gachibowli',
    typedSearches: [
      {
        romanQuery: 'hyderabad lo laptop addheki ekkada dorukuthundi',
        nativeQuery: 'హైదరాబాద్‌లో ల్యాప్‌టాప్ అద్దెకు ఎక్కడ దొరుకుతుంది?',
        answer: 'laptoponrent.online ద్వారా హైటెక్ సిటీ, మాదాపూర్ సహా హైదరాబాద్ అంతటా హోమ్ డెలివరీ పొందవచ్చు.'
      },
      {
        romanQuery: 'laptop monthly rent entha untundhi hyderabad lo',
        nativeQuery: 'ల్యాప్‌టాప్ నెలకు ఎంత అద్దె ఉంటుంది?',
        answer: 'Core i5 నెలకు ₹1,499, Core i7 నెలకు ₹2,499 మరియు MacBook Air M2 నెలకు ₹2,999 నుండి ప్రారంభం.'
      },
      {
        romanQuery: 'security deposit lekunda laptop rent isthara',
        nativeQuery: 'సెక్యూరిటీ డిపాజిట్ లేకుండా ల్యాప్‌టాప్ ఇస్తారా?',
        answer: 'అవును, ఎంప్లాయీస్ మరియు స్టార్టప్‌లకు జీరో డిపాజిట్ ఆప్షన్ అందుబాటులో ఉంది.'
      },
      {
        romanQuery: 'laptop problem vasthe replacement untundha',
        nativeQuery: 'ల్యాప్‌టాప్ పాడైతే వెంటనే మార్చి ఇస్తారా?',
        answer: '24 గంటల్లో ఉచిత సర్వీసింగ్ లేదా వెంటనే వేరే ల్యాప్‌టాప్ రీప్లేస్ చేస్తాము.'
      },
      {
        romanQuery: 'laptop rental booking ela chesukovali',
        nativeQuery: 'ఎలా బుక్ చేసుకోవాలి?',
        answer: 'వెబ్‌సైట్ లేదా వాట్సాప్ ద్వారా ఆధార్ వివరాలు ఇచ్చి బుక్ చేసుకోవచ్చు.'
      }
    ]
  },
  {
    code: 'mr',
    hreflang: 'mr-IN',
    name: 'मराठी',
    englishName: 'Marathi',
    path: '/mr/',
    metaTitle: 'मुंबईत लॅपटॉप भाड्याने कुठे मिळेल | Laptop on Rent Mumbai ₹1,499/महिना',
    metaDesc: 'कोडिंग, वर्क फ्रॉम होम आणि व्यवसायासाठी लॅपटॉप व मॅकबुक भाड्याने. mumbai madhe laptop bhadya ne kasa ghyaycha. डिपॉझिट शिवाय सुविधा.',
    h1: 'मुंबईत लॅपटॉप भाड्याने कुठे मिळेल (Laptop on Rent Mumbai)',
    tagline: 'कोडिंग, विद्यार्थी आणि कंपन्यांसाठी लॅपटॉप भाड्याने - महिना ₹1,499 पासून सुरू',
    voiceAnswerLead: 'laptoponrent.online मुंबई, अंधेरी, बीकेसी, नवी मुंबई आणि पुण्यात लॅपटॉप आणि मॅकबुक भाड्याने देते. Core i5, Core i7 आणि Apple MacBook M2 मशिन्स फक्त ₹१,४९९/महिना पासून उपलब्ध आहेत. झिरो डिपॉझिट पर्याय आणि सेम-डे डिलिव्हरी.',
    pricingLead: 'Core i5 लॅपटॉप ₹१,४९९/महिना, i7 ₹२,४९९/महिना, MacBook ₹२,९९९/महिना.',
    whatsappText: 'नमस्कार laptoponrent, मला लॅपटॉप भाड्याने हवा आहे.',
    textSearchKeywords: 'mumbai madhe laptop bhadya ne kasa ghyaycha, laptop cha mahinyacha bhada kiti asto, deposit shivay laptop rental milto ka, laptop on rent in andheri west, macbook rental hinjewadi pune',
    typedSearches: [
      {
        romanQuery: 'mumbai madhe laptop bhadya ne kasa ghyaycha',
        nativeQuery: 'मुंबईत लॅपटॉप भाड्याने कुठे मिळेल?',
        answer: 'laptoponrent.online द्वारे मुंबई व पुण्यात थेट घरी लॅपटॉप डिलिव्हरी मिळते.'
      },
      {
        romanQuery: 'laptop cha mahinyacha rent kiti asto',
        nativeQuery: 'लॅपटॉपचे मासिक भाडे किती आहे?',
        answer: 'Core i5 ₹१,४९९/महिना, Core i7 ₹२,४९९/महिना आणि MacBook ₹२,९९९/महिना पासून सुरू.'
      },
      {
        romanQuery: 'security deposit shivay laptop rental milto ka',
        nativeQuery: 'डिपॉझिट शिवाय लॅपटॉप मिळतो का?',
        answer: 'होय, नोकरदार व्यक्ती आणि स्टार्टअप्ससाठी झिरो डिपॉझिट सुविधा आहे.'
      },
      {
        romanQuery: 'laptop kharab zalyas replacement milel ka',
        nativeQuery: 'लॅपटॉप बिघडल्यास काय करावे?',
        answer: '२४ तासांत मोफत दुरुस्ती किंवा तात्काळ दुसरा लॅपटॉप बदलून दिला जातो.'
      },
      {
        romanQuery: 'laptop rent booking kashi karaychi',
        nativeQuery: 'बुकिंग कसे करावे?',
        answer: 'वेबसाईट किंवा व्हॉट्सॲपवरून सोप्या केवायसीद्वारे लगेच बुक करा.'
      }
    ]
  },
  {
    code: 'bn',
    hreflang: 'bn-IN',
    name: 'বাংলা',
    englishName: 'Bengali',
    path: '/bn/',
    metaTitle: 'কলকাতায় ল্যাপটপ ভাড়ায় কোথায় পাওয়া যায় | Laptop on Rent Kolkata ₹1,499/মাস',
    metaDesc: 'কোডিং, পড়াশোনা এবং অফিসের জন্য ল্যাপটপ ও ম্যাকবুক ভাড়া। kolkata te laptop bhara ki bhabe pabo. নো সিকিউরিটি ডিপোজিট। কলকাতায় হোম ডেলিভারি।',
    h1: 'কলকাতায় ল্যাপটপ ভাড়ায় কোথায় পাওয়া যায় (Laptop on Rent Kolkata)',
    tagline: 'কোডিং, ছাত্রছাত্রী এবং স্টার্টআপের জন্য ল্যাপটপ ভাড়া - মাসে মাত্র ₹1,499 থেকে',
    voiceAnswerLead: 'laptoponrent.online কলকাতা, সল্টলেক এবং নিউ টাউন সহ সমস্ত এলাকায় ল্যাপটপ এবং ম্যাকবুক ভাড়া প্রদান করে। Core i5, Core i7 এবং Apple MacBook M2 মাত্র ₹১,৪৯৯/মাস থেকে উপলব্ধ। জিরো ডিপোজিট অপশন এবং একই দিনে হোম ডেলিভারি।',
    pricingLead: 'Core i5 ল্যাপটপ ₹১,৪৯৯/মাস, Core i7 ₹২,৪৯৯/মাস, MacBook ₹২,৯৯৯/মাস।',
    whatsappText: 'নমস্কার laptoponrent, আমি ল্যাপটপ ভাড়া নিতে চাই।',
    textSearchKeywords: 'kolkata te laptop bhara ki bhabe pabo, laptop er mashik bhara koto, deposit chara laptop rent pawa jaye ki, laptop on rent in salt lake sector v, macbook rental new town kolkata',
    typedSearches: [
      {
        romanQuery: 'kolkata te laptop bhara ki bhabe pabo',
        nativeQuery: 'কলকাতায় ল্যাপটপ ভাড়ায় কোথায় পাওয়া যায়?',
        answer: 'laptoponrent.online-এর মাধ্যমে ঘরে বসেই অনলাইন বুক করে সরাসরি ডেলিভারি পাওয়া যায়।'
      },
      {
        romanQuery: 'laptop rent er mashik khoroch koto',
        nativeQuery: 'ল্যাপটপের মাসিক ভাড়া কত?',
        answer: 'Core i5 ল্যাপটপ ₹১,৪৯৯/মাস, Core i7 ₹২,৪৯৯/মাস এবং MacBook M2 ₹২,৯৯৯/মাস থেকে শুরু।'
      },
      {
        romanQuery: 'security deposit chara laptop rent pawa jaye',
        nativeQuery: 'সিকিউরিটি ডিপোজিট ছাড়া ল্যাপটপ ভাড়া পাওয়া যায়?',
        answer: 'হ্যাঁ, চাকুরিজীবী ও ভেরিফাইড ব্যবসার জন্য নো-ডিপোজিট সুবিধা রয়েছে।'
      },
      {
        romanQuery: 'laptop nosto hole replacement pawa jabe',
        nativeQuery: 'ল্যাপটপ খারাপ হলে কি পরিবর্তন করে দেওয়া হবে?',
        answer: '২৪ ঘণ্টার মধ্যে সম্পূর্ণ বিনামূল্যে রিপ্লেসমেন্ট ল্যাপটপ দেওয়া হয়।'
      },
      {
        romanQuery: 'laptop rent booking ki bhabe korbo',
        nativeQuery: 'বুকিং কিভাবে করতে হয়?',
        answer: 'ওয়েবসাইট বা হোয়াটসঅ্যাপে সাধারণ পরিচয়পত্র জমা দিয়ে সহজেই বুক করা যায়।'
      }
    ]
  },
  {
    code: 'gu',
    hreflang: 'gu-IN',
    name: 'ગુજરાતી',
    englishName: 'Gujarati',
    path: '/gu/',
    metaTitle: 'અમદાવાદમાં લેપટોપ ભાડે ક્યાંથી મળે | Laptop on Rent Ahmedabad ₹1,499/મહિનો',
    metaDesc: 'કોડિંગ, બિઝનેસ અને વિદ્યાર્થીઓ માટે લેપટોપ અને મેકબુક ભાડે. ahmedabad ma laptop bhade kyathi male. ડિપોઝિટ વગર ભાડું. ફાસ્ટ હોમ ડિલિવરી.',
    h1: 'અમદાવાદમાં લેપટોપ ભાડે ક્યાંથી મળે (Laptop on Rent Ahmedabad)',
    tagline: 'કોડિંગ, વિદ્યાર્થીઓ અને કંપનીઓ માટે લેપટોપ ભાડે - દર મહિને ₹1,499 થી શરૂ',
    voiceAnswerLead: 'laptoponrent.online અમદાવાદ એસજી હાઇવે, પ્રહલાદ નગર અને સુરતમાં લેપટોપ અને એપલ મેકબુક ભાડે આપે છે. Core i5, Core i7 અને MacBook M2 મશીનો દર મહિને ₹૧,૪૯૯ થી ઉપલબ્ધ છે. કોઈ સિક્યોરિટી ડિપોઝિટ નહીં અને સેમ-ડે ડિલિવરી.',
    pricingLead: 'Core i5 ₹૧,૪૯૯/મહિનો, Core i7 ₹૨,૪૯૯/મહિનો, MacBook ₹૨,૯૯૯/મહિનો.',
    whatsappText: 'નમસ્તે laptoponrent, મારે લેપટોપ ભાડે જોઈએ છે.',
    textSearchKeywords: 'ahmedabad ma laptop bhade kyathi male, laptop nu mahinanu bhadu ketlu hoy, security deposit vagar laptop rental male ke nahi, laptop on rent in sg highway ahmedabad',
    typedSearches: [
      {
        romanQuery: 'ahmedabad ma laptop bhade kyathi male',
        nativeQuery: 'અમદાવાદમાં લેપટોપ ભાડે ક્યાંથી મળે?',
        answer: 'laptoponrent.online દ્વારા અમદાવાદમાં સીધા તમારા ઘરે લેપટોપ પહોંચાડવામાં આવે છે.'
      },
      {
        romanQuery: 'laptop rent nu monthly bhadu ketlu hoy',
        nativeQuery: 'લેપટોપનું મહિનાનું ભાડું કેટલું થાય?',
        answer: 'Core i5 ₹૧,૪૯૯, Core i7 ₹૨,૪૯૯ અને MacBook Air M2 ₹૨,૯૯૯ થી શરૂ થાય છે.'
      },
      {
        romanQuery: 'security deposit vagar laptop rent male ke nahi',
        nativeQuery: 'ડિપોઝિટ વગર લેપટોપ મળે કે નહીં?',
        answer: 'હા, નોકરી કરતા લોકો અને સ્ટાર્ટઅપ્સ માટે ઝીરો ડિપોઝિટ વિકલ્પ છે.'
      },
      {
        romanQuery: 'laptop kharab thay to replacement malse',
        nativeQuery: 'લેપટોપ બગડી જાય તો શું સર્વિસ મળશે?',
        answer: '૨૪ કલાકમાં ફ્રી રિપેરિંગ અથવા તરત જ બીજું લેપટોપ બદલી આપવામાં આવે છે.'
      },
      {
        romanQuery: 'laptop rental booking kevi rite karvu',
        nativeQuery: 'ઓર્ડર કેવી રીતે કરવો?',
        answer: 'વેબસાઇટ અથવા વોટ્સએપ પરથી સરળતાથી ઓનલાઇન બુક કરી શકો છો.'
      }
    ]
  }
];

function renderPage(lang) {
  const whatsappUrl = `https://wa.me/919988776655?text=${encodeURIComponent(lang.whatsappText)}`;
  const canonicalUrl = `${ORIGIN}${lang.path}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${ORIGIN}/#business`,
        'name': 'laptoponrent.online',
        'url': ORIGIN,
        'priceRange': '₹1499/mo - ₹₹₹',
        'telephone': '+919988776655'
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': lang.metaTitle,
        'description': lang.metaDesc,
        'inLanguage': lang.code,
        'keywords': `${lang.textSearchKeywords}, rent laptop online, macbook on rent`,
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['.voice-h1', '.voice-answer', '.faq-answer']
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        'inLanguage': lang.code,
        'mainEntity': lang.typedSearches.map(t => ({
          '@type': 'Question',
          'name': `${t.nativeQuery} (${t.romanQuery})`,
          'alternateName': t.romanQuery,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': t.answer
          }
        }))
      }
    ]
  };

  const hreflangs = [
    `<link rel="alternate" hreflang="en-IN" href="${ORIGIN}/">`,
    ...LAPTOP_LANGUAGES.map(l => `<link rel="alternate" hreflang="${l.hreflang}" href="${ORIGIN}${l.path}">`),
    `<link rel="alternate" hreflang="x-default" href="${ORIGIN}/">`
  ].join('\n    ');

  return `<!DOCTYPE html>
<html lang="${lang.code}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${lang.metaTitle}</title>
    <meta name="description" content="${lang.metaDesc}">
    <meta name="keywords" content="${lang.textSearchKeywords}">
    <link rel="canonical" href="${canonicalUrl}">
    ${hreflangs}
    <meta property="og:title" content="${lang.metaTitle}">
    <meta property="og:description" content="${lang.metaDesc}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="website">
    <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
    </script>
</head>
<body style="font-family:system-ui,-apple-system,sans-serif;margin:0;padding:0;color:#1e293b;background:#f8fafc;">
    <header style="background:#fff;border-bottom:1px solid #e2e8f0;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;">
        <a href="/" style="text-decoration:none;font-size:24px;font-weight:800;color:#2563eb;">LaptopOnRent<span style="color:#0f172a;">.online</span></a>
        <div>
            <a href="${whatsappUrl}" target="_blank" rel="noopener" style="background:#25D366;color:#fff;padding:8px 16px;border-radius:24px;text-decoration:none;font-weight:600;display:inline-flex;align-items:center;gap:6px;">
                <span>💬 WhatsApp Rent</span>
            </a>
        </div>
    </header>

    <main style="max-width:900px;margin:32px auto;padding:0 20px;">
        <div style="background:#eff6ff;color:#1d4ed8;display:inline-block;padding:6px 14px;border-radius:20px;font-weight:600;font-size:14px;margin-bottom:12px;">
            🎙️ &amp; ⌨️ Voice + Hinglish Text Search (${lang.name} - ${lang.englishName})
        </div>
        
        <h1 class="voice-h1" style="font-size:32px;color:#0f172a;line-height:1.2;margin:10px 0;">${lang.h1}</h1>
        <p style="font-size:18px;color:#64748b;margin-bottom:24px;">${lang.tagline}</p>

        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);margin-bottom:32px;">
            <div style="font-weight:700;color:#0f172a;margin-bottom:10px;display:flex;align-items:center;gap:8px;">
                <span>🎤</span>
                <span>Google Mic Voice &amp; Quick Spoken Answer:</span>
            </div>
            <p class="voice-answer" style="font-size:18px;line-height:1.6;color:#334155;margin:0;">
                ${lang.voiceAnswerLead}
            </p>
            <div style="margin-top:16px;background:#f0fdf4;border:1px solid #bbf7d0;padding:12px 16px;border-radius:8px;font-weight:600;color:#166534;">
                💰 ${lang.pricingLead}
            </div>
            <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap;">
                <a href="${whatsappUrl}" target="_blank" rel="noopener" style="background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">
                    Rent Laptop / WhatsApp Booking
                </a>
            </div>
        </div>

        <!-- Dedicated Section for Text Searchers (Hinglish / Romanized Queries) -->
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:32px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                <span style="font-size:20px;">⌨️</span>
                <h2 style="font-size:22px;color:#0f172a;margin:0;">Common Queries Typed by Text Searchers (Hinglish &amp; Romanized)</h2>
            </div>
            <p style="color:#64748b;margin-bottom:18px;">Direct answers to high-intent queries typed into Google Search:</p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:14px;">
                ${lang.typedSearches.map(t => `
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;">
                        <div style="font-family:monospace;font-size:13px;color:#2563eb;background:#eff6ff;padding:4px 8px;border-radius:4px;display:inline-block;margin-bottom:8px;font-weight:600;">
                            🔍 "${t.romanQuery}"
                        </div>
                        <div style="font-weight:700;color:#2563eb;font-size:15px;margin-bottom:6px;">
                            ${t.nativeQuery}
                        </div>
                        <p style="font-size:14px;line-height:1.5;color:#475569;margin:0;">
                            ${t.answer}
                        </p>
                    </div>
                `).join('')}
            </div>
        </div>

        <h2 style="font-size:24px;color:#0f172a;margin-bottom:16px;">Frequently Asked Questions (${lang.name} &amp; English)</h2>
        <div style="display:flex;flex-direction:column;gap:16px;">
            ${lang.typedSearches.map(t => `
                <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:18px;">
                    <h3 style="font-size:18px;color:#2563eb;margin:0 0 8px 0;display:flex;align-items:center;gap:8px;">
                        <span>❓</span>
                        <span>${t.nativeQuery} <small style="font-weight:400;color:#64748b;">("${t.romanQuery}")</small></span>
                    </h3>
                    <p class="faq-answer" style="font-size:16px;line-height:1.6;color:#475569;margin:0;">
                        ${t.answer}
                    </p>
                </div>
            `).join('')}
        </div>

        <div style="margin-top:40px;padding:24px;background:#fff;border:1px solid #e2e8f0;border-radius:12px;text-align:center;">
            <h3 style="margin-top:0;">Browse laptoponrent.online in Other Indian Languages</h3>
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px;">
                ${LAPTOP_LANGUAGES.map(l => `
                    <a href="${l.path}" style="padding:8px 16px;border-radius:6px;border:1px solid #cbd5e1;text-decoration:none;color:${l.code === lang.code ? '#fff' : '#0f172a'};background:${l.code === lang.code ? '#2563eb' : '#f8fafc'};font-weight:600;font-size:14px;">
                        ${l.name}
                    </a>
                `).join('')}
                <a href="/" style="padding:8px 16px;border-radius:6px;border:1px solid #cbd5e1;text-decoration:none;color:#0f172a;background:#f8fafc;font-weight:600;font-size:14px;">
                    English
                </a>
            </div>
        </div>
    </main>

    <footer style="background:#0f172a;color:#94a3b8;padding:32px 20px;text-align:center;margin-top:60px;">
        <p>&copy; 2026 laptoponrent.online — Laptop &amp; Hardware Rental Across India</p>
    </footer>
</body>
</html>`;
}

// Generate all pages into dist/frontend and public
const TARGET_DIRS = [
  join(ROOT, 'dist', 'frontend'),
  join(ROOT, 'public')
];

for (const dir of TARGET_DIRS) {
  for (const l of LAPTOP_LANGUAGES) {
    const langDir = join(dir, l.code);
    mkdirSync(langDir, { recursive: true });
    writeFileSync(join(langDir, 'index.html'), renderPage(l));
  }
}
console.log('Generated laptoponrent.online Dual Voice+Text Search pages for all 7 Indian languages.');
