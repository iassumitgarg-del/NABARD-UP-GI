import { GI_PRODUCTS, SEED_AUTHORIZED_USERS } from './data.js';

// ── STATE MANAGEMENT ──
let state = {
  activeTab: 'catalogue',
  searchQuery: '',
  selectedCategory: 'All',
  selectedProduct: null,
  targetArtisan: null,
  dummyFileName: null,
  adminLoggedIn: false,
  language: 'en', // 'en' or 'hi'
  imageMapping: {}, // Mapped from image_mapping.json
  artisanUser: null,
  artisanShowLogin: false,
  
  // Initialize from LocalStorage or seed data
  authorizedUsers: [],
  buyerInquiries: [],
  lastFocusedElement: null,
  visibleProductLimit: 12,
};

const USER_STORAGE_KEY = 'quirky_gi_authorized_users';
const INQ_STORAGE_KEY = 'quirky_gi_buyer_inquiries';

// ── POPULAR TAGS LIST ──
const POPULAR_TAGS = ['Varanasi', 'Silk', 'Leather', 'Locks', 'Terracotta', 'Carpet', 'Mango', 'Wheat', 'Jaggery'];

// ── MOCK YOUTUBE DOCUMENTARIES MAP ──
const CRAFT_VIDEOS = {
  "gorakhpur-terracotta": "PjE54r3H9eI", // ODOP Terracotta
  "banaras-zardozi": "n3GZq15sJq0", // Sansad TV Zardozi
  "agra-leather-footwear": "rV3dUpC_kPk", // AFMEC Leather
  "aligarh-tala": "oPsh1r1fP1M", // Aligarh Locks
  "nizamabad-black-clay-pottery": "s3gS3o5fFpE", // Nizamabad Pottery
  "mirzapur-handmade-dari": "n3GZq15sJq0", // Fallback
};

// ── 34 UPCOMING PRODUCTS PIPELINE DATA ──
const UPCOMING_GI_PIPELINE = [
  { name_en: "Mathura Kanthi Mala Craft", name_hi: "मथुरा कंठी माला शिल्प", district: "Mathura", status: "examination", appNo: "1139", pct: 65 },
  { name_en: "Aligarh Metal Statue Craft", name_hi: "अलीगढ़ धातु मूर्ति शिल्प", district: "Aligarh", status: "examination", appNo: "1138", pct: 65 },
  { name_en: "Banaras Varakh (Tabak)", name_hi: "बनारस वरख (तबाक)", district: "Varanasi", status: "pre-examination", appNo: "1160", pct: 45 },
  { name_en: "Banaras Zari", name_hi: "बनारस ज़री", district: "Varanasi", status: "pre-examination", appNo: "1161", pct: 45 },
  { name_en: "Banaras Aloo Papad", name_hi: "बनारस आलू पापड़", district: "Varanasi", status: "pre-examination", appNo: "1152", pct: 45 },
  { name_en: "Bundelkhand Deshi Arhar", name_hi: "बुंदेलखंड देशी अरहर", district: "Jhansi", status: "pre-examination", appNo: "1146", pct: 45 },
  { name_en: "Baruasagar Adrak (Ginger)", name_hi: "बरुआसागर अदरक", district: "Jhansi", status: "pre-examination", appNo: "1145", pct: 45 },
  { name_en: "Agra Petha", name_hi: "आगरा पेठा", district: "Agra", status: "pre-examination", appNo: "1157", pct: 45 },
  { name_en: "Gorakhpur Paniyala Fruit", name_hi: "गोरखपुर पनियाला फल", district: "Gorakhpur", status: "pre-examination", appNo: "1144", pct: 45 },
  { name_en: "Gotha Ki Bheli (Jaggery) of Mau", name_hi: "मऊ की गोठा की भेली (गुड़)", district: "Mau", status: "pre-examination", appNo: "1153", pct: 45 },
  { name_en: "Banaras Mukhauta (Mask)", name_hi: "बनारस मुखौटा", district: "Varanasi", status: "pre-examination", appNo: "1208", pct: 45 },
  { name_en: "Purdilnagar Glass Beads of (Hathras)", name_hi: "पुरदिलनगर कांच के मोती (हाथरस)", district: "Hathras", status: "pre-examination", appNo: "1221", pct: 45 },
  { name_en: "Ayodhya Tika (Tilak) Product", name_hi: "अयोध्या टीका (तिलक) उत्पाद", district: "Ayodhya", status: "pre-examination", appNo: "1209", pct: 45 },
  { name_en: "Banaras Clay Craft", name_hi: "बनारस क्ले क्राफ्ट (मिट्टी शिल्प)", district: "Varanasi", status: "pre-examination", appNo: "1218", pct: 45 },
  { name_en: "Aligarh Dastagi-Hastagi Product (Hardware)", name_hi: "अलीगढ़ दस्तगी-हस्तगी (हार्डवेयर)", district: "Aligarh", status: "examination", appNo: "1238", pct: 65 },
  { name_en: "Lucknow Clay Craft", name_hi: "लखनऊ मिट्टी शिल्प", district: "Lucknow", status: "pre-examination", appNo: "1220", pct: 45 },
  { name_en: "Kanpur Farsi Dhurrie", name_hi: "कानपुर फारसी दरी", district: "Kanpur", status: "pre-examination", appNo: "1328", pct: 45 },
  { name_en: "Mirzapur Stone Craft", name_hi: "मिर्जापुर स्टोन क्राफ्ट", district: "Mirzapur", status: "pre-examination", appNo: "1239", pct: 45 },
  { name_en: "Ayodhya Khadau (Wooden Paduka)", name_hi: "अयोध्या खड़ाऊं", district: "Ayodhya", status: "pre-examination", appNo: "1210", pct: 45 },
  { name_en: "Ayodhya Gud (Jaggery)", name_hi: "अयोध्या गुड़", district: "Ayodhya", status: "pre-examination", appNo: "1204", pct: 45 },
  { name_en: "Ayodhya Khurchan Peda", name_hi: "अयोध्या खुरचन पेड़ा", district: "Ayodhya", status: "pre-examination", appNo: "1205", pct: 45 },
  { name_en: "Farrukhabad Fulwa Aloo", name_hi: "फर्रुखाबाद फुलवा आलू", district: "Farrukhabad", status: "pre-examination", appNo: "1521", pct: 45 },
  { name_en: "Rampuri Chaku (Knife)", name_hi: "रामपुरी चाकू", district: "Rampur", status: "new-application", appNo: "1583", pct: 30 },
  { name_en: "Rampur Chatapati", name_hi: "रामपुर चटापटी", district: "Rampur", status: "new-application", appNo: "1584", pct: 30 },
  { name_en: "Saharanpur Ramkela Mango", name_hi: "सहारनपुर रामकेला आम", district: "Saharanpur", status: "new-application", appNo: "1542", pct: 30 },
  { name_en: "Fatehpur Malwa Peda", name_hi: "फतेहपुर मालवा पेड़ा", district: "Fatehpur", status: "pre-examination", appNo: "1487", pct: 45 },
  { name_en: "Hasayan Gulab Jal", name_hi: "हसायन गुलाब जल", district: "Hathras", status: "pre-examination", appNo: "1510", pct: 45 },
  { name_en: "Kanpur Buknoo", name_hi: "कानपुर बुकनू", district: "Kanpur", status: "sourcing", appNo: "Yet to be filed", pct: 15 },
  { name_en: "Lucknow Rewadi", name_hi: "लखनऊ रेवड़ी", district: "Lucknow", status: "sourcing", appNo: "Yet to be filed", pct: 15 },
  { name_en: "Meerut Gajak", name_hi: "मेरठ गज़क", district: "Meerut", status: "sourcing", appNo: "Yet to be filed", pct: 15 },
  { name_en: "Meerut Trumpet", name_hi: "मेरठ तुरही", district: "Meerut", status: "new-application", appNo: "1586", pct: 30 },
  { name_en: "Mirzapur Bajari", name_hi: "मिर्जापुर बाजरी", district: "Mirzapur", status: "new-application", appNo: "1530", pct: 30 },
  { name_en: "Banaras Boat Making Craft", name_hi: "बनारस नाव निर्माण शिल्प", district: "Varanasi", status: "new-application", appNo: "1585", pct: 30 },
  { name_en: "Banaras Launglata (Sweet)", name_hi: "बनारस लौंगलता", district: "Varanasi", status: "new-application", appNo: "1587", pct: 30 }
];

// ── FAQ DATABASE ──
const FAQS = [
  {
    q_en: 'What is a Geographical Indication (GI) Tag?',
    q_hi: 'भौगोलिक उपदर्शन (GI) टैग क्या है?',
    a_en: 'A Geographical Indication (GI) is an official sign used on products that have a specific geographical origin and possess qualities, reputation, or characteristics that are essentially attributable to that place of origin. It acts as an assurance of authenticity and quality.',
    a_hi: 'भौगोलिक उपदर्शन (जीआई) एक आधिकारिक चिह्न है जो उन उत्पादों पर उपयोग किया जाता है जिनकी एक विशिष्ट भौगोलिक उत्पत्ति होती है और उनमें वे गुण, प्रतिष्ठा या विशेषताएं होती हैं जो मुख्य रूप से उस उत्पत्ति स्थान के कारण होती हैं। यह प्रामाणिकता और गुणवत्ता के आश्वासन के रूप में कार्य करता है।'
  },
  {
    q_en: 'Who is an Authorized User (AU) of a GI product?',
    q_hi: 'जीआई उत्पाद का अधिकृत उपयोगकर्ता (AU) कौन है?',
    a_en: 'An Authorized User is an artisan, producer, or manufacturer who has registered themselves under Part B of the GI Registry in Chennai. Only registered Authorized Users have the legal right to use the GI tag on their products, protecting them and buyers from counterfeit goods.',
    a_hi: 'अधिकृत उपयोगकर्ता वह कारीगर, उत्पादक या निर्माता होता है जिसने चेन्नई में जीआई रजिस्ट्री के भाग बी के तहत खुद को पंजीकृत किया है। केवल पंजीकृत अधिकृत उपयोगकर्ताओं को ही अपने उत्पादों पर जीआई टैग का उपयोग करने का कानूनी अधिकार है, जो उन्हें और खरीदारों को नकली सामानों से बचाता है।'
  },
  {
    q_en: 'What support does NABARD UP RO provide to GI stakeholders?',
    q_hi: 'नाबार्ड यूपी क्षेत्रीय कार्यालय जीआई हितधारकों को क्या सहायता प्रदान करता है?',
    a_en: 'NABARD Uttar Pradesh RO provides 100% financial assistance for filing GI applications, organizing capacity building programs, setting up Common Facility Centres, sponsoring artisans for exhibitions/melas, and building digital links like this portal to connect buyers directly to authentic weavers and farmers.',
    a_hi: 'नाबार्ड उत्तर प्रदेश क्षेत्रीय कार्यालय जीआई आवेदन दायर करने, क्षमता निर्माण कार्यक्रम आयोजित करने, सामान्य सुविधा केंद्र स्थापित करने, प्रदर्शनियों/मेलों के लिए कारीगरों को प्रायोजित करने और खरीदारों को प्रामाणिक बुनकरों और किसानों से सीधे जोड़ने के लिए इस पोर्टल जैसे डिजिटल लिंक बनाने के लिए 100% वित्तीय सहायता प्रदान करता है।'
  },
  {
    q_en: 'How does this portal protect buyers from duplicate or fake products?',
    q_hi: 'यह पोर्टल खरीदारों को नकली उत्पादों से कैसे बचाता है?',
    a_en: 'Producer profiles should be published only after validation against the official Part B register and confirmation that the producer consents to display contact information. Buyers should independently check current registration status on IP India.',
    a_hi: 'उत्पादक प्रोफाइल आधिकारिक भाग बी रजिस्टर से सत्यापन और संपर्क जानकारी प्रदर्शित करने की सहमति के बाद ही प्रकाशित की जानी चाहिए। खरीदारों को आईपी इंडिया पर वर्तमान पंजीकरण स्थिति की स्वतंत्र रूप से जांच करनी चाहिए।'
  }
];

// ── LOCALIZATION DICTIONARY ──
const TRANSLATIONS = {
  en: {
    logo_sub: 'UP Regional Office',
    header_title_main: 'Discover authentic GI products',
    header_title_sub: 'of Uttar Pradesh',
    header_desc: 'Explore registered crafts, textiles, foods and agricultural products, learn what makes each tradition distinctive, and find the official route to registered producers.',
    stat_sanctions: 'NABARD Sanctions',
    stat_gi: 'Registered GIs',
    stat_pipeline: 'Under Process',
    stat_users: 'Authorized Users',
    tab_catalogue: 'Browse GI Directory',
    tab_registration: 'Artisan Self-Registration',
    tab_admin: 'NABARD Admin Portal',
    search_placeholder: 'Search products, districts, or materials (e.g. Brocade, Varanasi)...',
    all_districts: 'All Districts',
    popular_tags: 'Popular Searches: ',
    cat_all: 'All',
    cat_Textile: 'Textiles',
    cat_Handicraft: 'Handicrafts',
    cat_FoodProduct: 'Food',
    cat_Agricultural: 'Agriculture',
    faq_title: 'Frequently Asked Questions (FAQ)',
    reg_title: 'Artisan & Producer Registration',
    reg_desc: 'If you are a registered weaver, artisan, farmer, or manufacturer of a GI-tagged product from Uttar Pradesh, submit your application below to list your business in the directory.',
    reg_banner: 'Application Fee: ₹0 (Fully sponsored by the NABARD UP Regional Office).',
    lbl_select_prod: 'Select GI Product *',
    lbl_biz_name: 'Business / Cooperative Name *',
    lbl_artisan_name: 'Lead Artisan / Contact Name *',
    lbl_reg_no: 'GI Authorized User Reg No *',
    lbl_district: 'Production District *',
    lbl_email: 'Contact Email *',
    lbl_phone: 'Mobile Phone *',
    lbl_whatsapp: 'WhatsApp Number *',
    lbl_address: 'Workshop Address *',
    lbl_upload: 'Upload GI AU Certificate / Identity Proof *',
    upload_text: 'Click here to upload GI Certificate or Artisan Card',
    upload_subtext: 'PDF, JPG, PNG (Max 5MB)',
    btn_submit_reg: 'Save Registration Draft',
    reg_success_title: 'Draft Saved on This Device',
    reg_success_hint: 'This prototype does not transmit the draft. Production deployment requires an approved NABARD intake and verification workflow.',
    btn_reset_reg: 'Submit Another Form',
    admin_title: 'NABARD UP RO Staff Desk',
    admin_desc: 'Login with administrative passkey to check certificates and manage trade inquires.',
    lbl_passkey: 'Passkey',
    btn_login: 'Verify Credentials',
    btn_quick: 'Internal service unavailable',
    admin_hint: 'The administration service is separately hosted.',
    prop_label_group: 'Proprietor Group',
    prop_label_cluster: 'NABARD Cluster',
    btn_whatsapp: '💬 WhatsApp Connect',
    btn_inquiry: '✉ Send Inquiry',
    badge_verified: 'Registry checked',
    badge_active: 'Registry Active',
    lbl_verified_senders: 'Registered Authorized Producers',
    overview_title: 'Overview & History',
    uniqueness_title: 'Craft Uniqueness & Process',
    nabard_title: 'NABARD UP RO Cluster Interventions',
    lbl_project_impact: 'Project Impact',
    lbl_facilitator: 'Facilitating Agency',
    inq_title: 'Send Business Inquiry',
    inq_success_title: 'Inquiry Sent Successfully!',
    inq_success_desc: 'Your trade request has been logged. The artisan will connect with you shortly.',
    lbl_buyer_name: 'Your Full Name *',
    lbl_buyer_email: 'Email ID *',
    lbl_buyer_phone: 'Mobile Phone *',
    lbl_qty: 'Target Quantity Needed *',
    lbl_msg: 'Requirement Details *',
    btn_submit_inquiry: 'Submit Trade Inquiry',
    about_title: 'Geographical Indications & NABARD Cluster Initiatives',
    about_subtitle: 'Protecting traditional skillsets, preventing counterfeits, and generating employment in rural Uttar Pradesh.',
    about_card1_title: 'What is a GI Tag?',
    about_card1_desc: 'A Geographical Indication (GI) is an intellectual property tag given to products that originate from a specific region, where their unique qualities, reputation, or characteristics are essentially attributable to that geographic location. Examples include Banarasi Silk and Aligarh Locks.',
    about_card2_title: 'Who is an Authorized User?',
    about_card2_desc: 'Under the Indian GI Act, producers registered in Part B of the GI Register are recognized as Authorized Users. Buyers should confirm current registration status through IP India and assess the product against the applicable GI specification.',
    about_card3_title: 'NABARD RO Interventions',
    about_card3_desc: 'NABARD UP Regional Office offers 100% financial and administrative support. We cover GI pre-registration filing fees, sponsor capacity building programs, build Common Facility Centres (CFC) for testing, and sponsor artisan stalls at national exhibitions to help them reach buyers directly without middlemen.',
    trace_title: 'Product Authenticity & Batch Verification Desk',
    trace_desc: 'Enter the artisan\'s GI Registration Number or Batch code (e.g. AU/2023/UP/1001) to trace the certificate records.',
    btn_verify_batch: 'Verify Batch Trace',
    map_title: 'Heritage Craft Map of Uttar Pradesh',
    map_desc: 'Click on any active district hotspot to explore its native Geographical Indication (GI) products.',
    pipe_title: 'Upcoming UP GIs: Pre-Registration Pipeline (34 Products)',
    pipe_desc: 'NABARD UP Regional Office currently sponsors and facilitates the registration of 34 additional heritage crafts in Uttar Pradesh. Track their current progress in the official GI Registry pipeline.',
    guide_title: 'How to Apply for GI Authorized User Registration',
    guide_subtitle: 'A complete step-by-step guide with document templates for NGOs, Self-Help Groups (SHGs), and individual producers.',
    step1_title: 'Verify Product & Proprietor',
    step1_desc: 'Confirm the official GI Name, Application Number, and Registered Proprietor organization (e.g. Pooja Handloom for Mirzapur Dari) from the official registry list.',
    step2_title: 'Gather Proof of Production',
    step2_desc: 'Collect Voter ID/Aadhar, Artisan Card, and business or land ownership proof (Patta, land tax receipts) showing your production unit is within the registered GI region.',
    step3_title: 'Obtain No Objection Certificate',
    step3_desc: 'Get a signed Consent Letter/NOC from the Registered Proprietor of the GI, certifying that your products match the official quality standards.',
    step4_title: 'Fill Form GI-3A & Submit',
    step4_desc: 'Complete Form GI-3A in triplicate, attach the Statement of Case, NOC, and pay the ₹10 statutory fee. Send it to the GI Registry in Chennai.',
    templates_title: 'Official Templates & Form Formats',
    templates_desc: 'Copy these standard text formats to draft your legal documents. Use the tabs below to view the formats.',
    ngo_note_title: 'Guidance for NGOs, SHGs & Cooperatives',
    ngo_note_desc: 'NGOs can file joint group applications to register entire clusters of artisans or weavers under a single submission. NABARD provides 100% financial assistance and cluster development schemes to cover registration costs and support certification. Contact your local NABARD District Development Manager (DDM) for assistance.',
    login_title: 'Weaver Desk Login',
    login_desc: 'Enter your registered email address and passkey to manage your profile and batches.',
    btn_toggle_login: 'Already registered? Log in to Weaver Desk',
    btn_toggle_reg: 'New artisan? Click here to register',
    btn_login_submit: 'Log In to Dashboard',
    btn_logout: 'Log Out',
    dash_tab_profile: 'Profile Manager',
    dash_tab_batches: 'Traceable Batches',
    dash_tab_inbox: 'Inquiry Inbox',
    btn_save_profile: 'Save Profile Changes',
    dash_batches_title: 'Active Product Batches',
    btn_new_batch: '+ Issue Product Batch',
    dash_inbox_title: 'Trade Inquiries Received',
    mint_modal_title: 'Issue Product Batch (Prototype)',
    mint_modal_desc: 'Record a traceable product batch in the prototype registry.',
    lbl_batch_qty: 'Batch Quantity *',
    lbl_quality_spec: 'Quality & Inspection Details *',
    btn_mint_ledger: 'Issue Product Batch',
    lbl_password: 'Password *',
    consent_notice: 'Note: By registering/saving your profile details, you consent to publish your contact phone and workshop address in the public catalog directory for trade inquiries.'
  },
  hi: {
    logo_sub: 'यूपी क्षेत्रीय कार्यालय',
    header_title_main: 'प्रामाणिक जीआई उत्पाद खोजें',
    header_title_sub: 'उत्तर प्रदेश के',
    header_desc: 'पंजीकृत शिल्प, वस्त्र, खाद्य और कृषि उत्पादों को खोजें, प्रत्येक परंपरा की विशेषता जानें और पंजीकृत उत्पादकों तक पहुंचने का आधिकारिक मार्ग प्राप्त करें।',
    stat_sanctions: 'नाबार्ड स्वीकृतियाँ',
    stat_gi: 'पंजीकृत जीआई',
    stat_pipeline: 'प्रक्रियाधीन',
    stat_users: 'अधिकृत उपयोगकर्ता',
    tab_catalogue: 'जीआई निर्देशिका ब्राउज़ करें',
    tab_registration: 'कारीगर स्व-पंजीकरण',
    tab_admin: 'नाबार्ड एडमिन पोर्टल',
    search_placeholder: 'उत्पादों, जिलों या सामग्री की खोज करें (जैसे: ब्रोकेड, वाराणसी)...',
    all_districts: 'सभी जिले',
    popular_tags: 'लोकप्रिय खोजें: ',
    cat_all: 'सभी',
    cat_Textile: 'कपड़ा व वस्त्र',
    cat_Handicraft: 'हस्तशिल्प',
    cat_FoodProduct: 'खाद्य उत्पाद',
    cat_Agricultural: 'कृषि उत्पाद',
    faq_title: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
    reg_title: 'कारीगर एवं उत्पादक पंजीकरण',
    reg_desc: 'यदि आप उत्तर प्रदेश के जीआई-टैग उत्पाद के पंजीकृत बुनकर, कारीगर, किसान या निर्माता हैं, तो निर्देशिका में अपना व्यवसाय सूचीबद्ध करने के लिए नीचे अपना आवेदन जमा करें।',
    reg_banner: 'आवेदन शुल्क: ₹0 (नाबार्ड यूपी क्षेत्रीय कार्यालय द्वारा पूर्णतः प्रायोजित)।',
    lbl_select_prod: 'जीआई उत्पाद का चयन करें *',
    lbl_biz_name: 'व्यवसाय / सहकारी समिति का नाम *',
    lbl_artisan_name: 'प्रमुख कारीगर / संपर्क व्यक्ति का नाम *',
    lbl_reg_no: 'जीआई अधिकृत उपयोगकर्ता पंजीकरण संख्या *',
    lbl_district: 'उत्पादक जिला *',
    lbl_email: 'संपर्क ईमेल *',
    lbl_phone: 'मोबाइल फोन *',
    lbl_whatsapp: 'व्हाट्सएप नंबर *',
    lbl_address: 'कार्यशाला का पता *',
    lbl_upload: 'जीआई अधिकृत उपयोगकर्ता प्रमाणपत्र / पहचान प्रमाण अपलोड करें *',
    upload_text: 'जीआई प्रमाणपत्र या कारीगर कार्ड अपलोड करने के लिए यहां क्लिक करें',
    upload_subtext: 'पीडीएफ, जेपीजी, पीएनजी (अधिकतम 5 एमबी)',
    btn_submit_reg: 'पंजीकरण मसौदा सहेजें',
    reg_success_title: 'मसौदा इस डिवाइस पर सहेजा गया',
    reg_success_hint: 'यह प्रोटोटाइप मसौदा भेजता नहीं है। उत्पादन के लिए स्वीकृत नाबार्ड आवेदन और सत्यापन कार्यप्रवाह आवश्यक है।',
    btn_reset_reg: 'दूसरा फॉर्म जमा करें',
    admin_title: 'नाबार्ड यूपी क्षेत्रीय कार्यालय स्टाफ डेस्क',
    admin_desc: 'प्रमाणपत्रों की जांच करने और व्यापार पूछताछ का प्रबंधन करने के लिए प्रशासनिक पासकुंजी के साथ लॉग इन करें।',
    lbl_passkey: 'पासकुंजी',
    btn_login: 'क्रेडेंशियल सत्यापित करें',
    btn_quick: 'आंतरिक सेवा उपलब्ध नहीं है',
    admin_hint: 'प्रशासन सेवा अलग से होस्ट की जाती है।',
    prop_label_group: 'प्रोपराइटर समूह',
    prop_label_cluster: 'नाबार्ड क्लस्टर',
    btn_whatsapp: '💬 व्हाट्सएप चैट',
    btn_inquiry: '✉ पूछताछ भेजें',
    badge_verified: 'सत्यापित',
    badge_active: 'रजिस्ट्री सक्रिय',
    lbl_verified_senders: 'पंजीकृत अधिकृत उत्पादक',
    overview_title: 'विवरण और इतिहास',
    uniqueness_title: 'शिल्प की विशेषता और प्रक्रिया',
    nabard_title: 'नाबार्ड यूपी क्लस्टर हस्तक्षेप',
    lbl_project_impact: 'परियोजना प्रभाव',
    lbl_facilitator: 'सहयोगी संस्था',
    inq_title: 'व्यापारिक पूछताछ भेजें',
    inq_success_title: 'पूछताछ सफलता के साथ भेजी गई!',
    inq_success_desc: 'आपकी व्यापारिक पूछताछ दर्ज कर ली गई है। कारीगर आपसे शीघ्र ही संपर्क करेंगे।',
    lbl_buyer_name: 'आपका पूरा नाम *',
    lbl_buyer_email: 'ईमेल आईडी *',
    lbl_buyer_phone: 'मोबाइल फोन *',
    lbl_qty: 'लक्षित मात्रा की आवश्यकता *',
    lbl_msg: 'आवश्यकता का विवरण *',
    btn_submit_inquiry: 'पूछताछ जमा करें',
    about_title: 'भौगोलिक उपदर्शन एवं नाबार्ड क्लस्टर पहलें',
    about_subtitle: 'पारंपरिक कौशल को बचाना, नकली उत्पादों को रोकना और ग्रामीण उत्तर प्रदेश में रोजगार का सृजन करना।',
    about_card1_title: 'जीआई टैग क्या है?',
    about_card1_desc: 'भौगोलिक उपदर्शन (जीआई) एक बौद्धिक संपदा टैग है जो किसी विशिष्ट क्षेत्र से उत्पन्न होने वाले उत्पादों को दिया जाता है, जहाँ उनके अद्वितीय गुण या विशेषताएं मूल रूप से उस भौगोलिक स्थान के कारण होती हैं। जैसे वाराणसी सिल्क और अलीगढ़ के ताले।',
    about_card2_title: 'अधिकृत उपयोगकर्ता कौन है?',
    about_card2_desc: 'भारतीय जीआई अधिनियम के तहत, जीआई रजिस्टर के भाग बी में पंजीकृत उत्पादक अधिकृत उपयोगकर्ता माने जाते हैं। खरीदारों को आईपी इंडिया के माध्यम से वर्तमान पंजीकरण स्थिति की पुष्टि करनी चाहिए और लागू जीआई विनिर्देश के अनुसार उत्पाद का आकलन करना चाहिए।',
    about_card3_title: 'नाबार्ड यूपी क्लस्टर हस्तक्षेप',
    about_card3_desc: 'नाबार्ड यूपी क्षेत्रीय कार्यालय वित्तीय और प्रशासनिक सहायता प्रदान करता है। हम जीआई पंजीकरण शुल्क का भुगतान करते हैं, क्षमता निर्माण कार्यक्रम आयोजित करते हैं, परीक्षण के लिए सामान्य सुविधा केंद्र (CFC) बनाते हैं, और मेलों में कारीगरों के स्टॉल प्रायोजित करते हैं।',
    trace_title: 'उत्पाद प्रामाणिकता और बैच सत्यापन डेस्क',
    trace_desc: 'प्रमाणपत्र रिकॉर्ड देखने के लिए कारीगर का जीआई पंजीकरण नंबर या बैच कोड (उदा. AU/2023/UP/1001) दर्ज करें।',
    btn_verify_batch: 'बैच सत्यापित करें',
    map_title: 'उत्तर प्रदेश का ऐतिहासिक हस्तशिल्प मानचित्र',
    map_desc: 'उत्पादों को देखने के लिए किसी भी सक्रिय जिले के हॉटस्पॉट पर क्लिक करें।',
    pipe_title: 'आगामी यूपी जीआई: पंजीकरण पाइपलाइन (34 उत्पाद)',
    pipe_desc: 'नाबार्ड यूपी क्षेत्रीय कार्यालय वर्तमान में उत्तर प्रदेश में 34 अतिरिक्त शिल्पों के पंजीकरण का वित्तपोषण कर रहा है। आधिकारिक जीआई रजिस्ट्री पाइपलाइन में उनकी प्रगति को ट्रैक करें।',
    guide_title: 'जीआई अधिकृत उपयोगकर्ता पंजीकरण के लिए आवेदन कैसे करें',
    guide_subtitle: 'एनजीओ, स्वयं सहायता समूहों (एसएचजी) और व्यक्तिगत उत्पादकों के लिए दस्तावेज़ टेम्प्लेट के साथ एक संपूर्ण चरण-दर-चरण मार्गदर्शिका।',
    step1_title: 'उत्पाद और प्रोप्राइटर सत्यापित करें',
    step1_desc: 'आधिकारिक रजिस्ट्री सूची से आधिकारिक जीआई नाम, आवेदन संख्या और पंजीकृत प्रोप्राइटर संगठन (जैसे मिर्जापुर दरी के लिए पूजा हैंडलूम) की पुष्टि करें।',
    step2_title: 'उत्पादन का प्रमाण एकत्र करें',
    step2_desc: 'वोटर आईडी/आधार, कारीगर कार्ड और व्यवसाय या भूमि स्वामित्व प्रमाण (पट्टा, भूमि कर रसीदें) एकत्र करें जो दर्शाता हो कि आपकी उत्पादन इकाई पंजीकृत जीआई क्षेत्र में है।',
    step3_title: 'अनापत्ति प्रमाणपत्र (NOC) प्राप्त करें',
    step3_desc: 'जीआई के पंजीकृत प्रोप्राइटर से एक हस्ताक्षरित सहमति पत्र/एनओसी प्राप्त करें, जो प्रमाणित करता हो कि आपके उत्पाद आधिकारिक गुणवत्ता मानकों से मेल खाते हैं।',
    step4_title: 'फॉर्म GI-3A भरें और जमा करें',
    step4_desc: 'फॉर्म GI-3A को तीन प्रतियों में भरें, स्टेटमेंट ऑफ केस, एनओसी संलग्न करें और ₹10 का वैधानिक शुल्क चुकाएं। इसे चेन्नई स्थित जीआई रजिस्ट्री में भेजें।',
    templates_title: 'आधिकारिक टेम्प्लेट और फॉर्म प्रारूप',
    templates_desc: 'अपने कानूनी दस्तावेज़ तैयार करने के लिए इन मानक टेक्स्ट प्रारूपों को कॉपी करें। प्रारूप देखने के लिए नीचे दिए गए टैब का उपयोग करें।',
    ngo_note_title: 'एनजीओ, एसएचजी और सहकारी समितियों के लिए मार्गदर्शन',
    ngo_note_desc: 'एनजीओ एक ही सबमिशन के तहत कारीगरों या बुनकरों के पूरे समूहों को पंजीकृत करने के लिए संयुक्त समूह आवेदन दायर कर सकते हैं। नाबार्ड पंजीकरण लागतों को कवर करने और प्रमाणन का समर्थन करने के लिए 100% वित्तीय सहायता और क्लस्टर विकास योजनाएं प्रदान करता है। सहायता के लिए अपने स्थानीय नाबार्ड जिला विकास प्रबंधक (डीडीएम) से संपर्क करें।',
    login_title: 'बुनकर डेस्क लॉगिन',
    login_desc: 'अपनी प्रोफाइल और बैचों को प्रबंधित करने के लिए अपना पंजीकृत ईमेल पता और पासकी दर्ज करें।',
    btn_toggle_login: 'पहले से पंजीकृत हैं? बुनकर डेस्क पर लॉग इन करें',
    btn_toggle_reg: 'नया कारीगर? पंजीकरण करने के लिए यहां क्लिक करें',
    btn_login_submit: 'डैशबोर्ड में लॉग इन करें',
    btn_logout: 'लॉग आउट',
    dash_tab_profile: 'प्रोफ़ाइल प्रबंधक',
    dash_tab_batches: 'ट्रेस करने योग्य बैच',
    dash_tab_inbox: 'पूछताछ इनबॉक्स',
    btn_save_profile: 'प्रोफ़ाइल परिवर्तन सहेजें',
    dash_batches_title: 'सक्रिय उत्पाद बैच',
    btn_new_batch: '+ नया उत्पाद बैच जारी करें',
    dash_inbox_title: 'प्राप्त व्यापारिक पूछताछ',
    mint_modal_title: 'नया उत्पाद बैच जारी करें (प्रोटोटाइप)',
    mint_modal_desc: 'प्रोटोटाइप रजिस्ट्री में एक नया उत्पाद बैच रिकॉर्ड करें।',
    lbl_batch_qty: 'बैच मात्रा *',
    lbl_quality_spec: 'गुणवत्ता और निरीक्षण विवरण *',
    btn_mint_ledger: 'उत्पाद बैच जारी करें',
    lbl_password: 'पासवर्ड *',
    consent_notice: 'नोट: पंजीकरण/अपनी प्रोफ़ाइल विवरण सहेजकर, आप व्यापारिक पूछताछ के लिए सार्वजनिक कैटलॉग निर्देशिका में अपना संपर्क फोन और कार्यशाला का पता प्रकाशित करने की सहमति देते हैं।'
  }
};

// ── DYNAMIC BATCH & BLOCKCHAIN LEDGER GENERATOR ──
function generateMockBatches(user) {
  // Extract trailing digits from registration number, e.g. "1001" from "AU/2015/UP/1001"
  const match = user.registrationNo.match(/\d+$/);
  const num = match ? match[0] : user.id.replace('au-', '');
  
  // Create short craft code, e.g., "MIRDAR" from "mirzapur-handmade-dari"
  let craftCode = 'CRAFT';
  if (user.productId) {
    const parts = user.productId.split('-');
    craftCode = parts.map(p => p.substring(0, 3).toUpperCase()).join('');
  }
  
  return [
    {
      id: `B-${num}-${craftCode}-001`,
      date: '2025-10-12',
      qty: 24,
      audit_en: 'Inspected by NABARD Quality Committee - 100% natural materials confirmed',
      audit_hi: 'नाबार्ड यूपी गुणवत्ता समिति द्वारा निरीक्षण - 100% प्रामाणिक सामग्री की पुष्टि की गई',
      certRef: `CERT-${num}-001`
    },
    {
      id: `B-${num}-${craftCode}-002`,
      date: '2025-12-05',
      qty: 50,
      audit_en: 'Passed quality assurance inspection - Standard dimensions and traditional weave verified',
      audit_hi: 'गुणवत्ता आश्वासन निरीक्षण में उत्तीर्ण - मानक आयाम और पारंपरिक बुनाई सत्यापित',
      certRef: `CERT-${num}-002`
    }
  ];
}

function ensureBatches(user) {
  if (!user.batches || user.batches.length === 0) {
    user.batches = generateMockBatches(user);
  }
  return user;
}

function initLocalStorage() {
  if (typeof window !== 'undefined') {
    const storedUsers = localStorage.getItem(USER_STORAGE_KEY);
    let localUsers = [];
    if (storedUsers) {
      try {
        localUsers = JSON.parse(storedUsers).filter(
          (user) => String(user.id || '').startsWith('au-reg-')
        );
      } catch {
        localUsers = [];
      }
    }

    // Merge: SEED_AUTHORIZED_USERS (from data.js) + local user submissions
    const mergedMap = new Map();
    if (Array.isArray(SEED_AUTHORIZED_USERS)) {
      SEED_AUTHORIZED_USERS.forEach(user => {
        mergedMap.set(user.id, user);
      });
    }
    localUsers.forEach(user => {
      mergedMap.set(user.id, user);
    });

    state.authorizedUsers = Array.from(mergedMap.values());
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(localUsers));

    const storedInqs = localStorage.getItem(INQ_STORAGE_KEY);
    if (storedInqs) {
      try {
        state.buyerInquiries = JSON.parse(storedInqs);
      } catch {
        state.buyerInquiries = [];
      }
    } else {
      state.buyerInquiries = [];
    }
  }
}

// Save back to storage
function saveUsers() {
  // Only persist self-registered browser sessions to avoid bloating localStorage
  const localUsers = state.authorizedUsers.filter(
    (user) => String(user.id || '').startsWith('au-reg-')
  );
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(localUsers));
}

function saveInquiries() {
  localStorage.setItem(INQ_STORAGE_KEY, JSON.stringify(state.buyerInquiries));
}

// ── DOM ELEMENTS ──
const dom = {
  tabBtns: document.querySelectorAll('.tab-btn'),
  panels: document.querySelectorAll('.tab-panel'),
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('clear-search-btn'),
  catBtns: document.querySelectorAll('.cat-btn'),
  productGrid: document.getElementById('product-grid'),
  regProductSelect: document.getElementById('reg-product-id'),
  artisanRegForm: document.getElementById('artisan-reg-form'),
  dragDropZone: document.getElementById('drag-drop-zone'),
  regFileInput: document.getElementById('reg-file-input'),
  uploadFeedback: document.getElementById('upload-feedback'),
  regSuccessCard: document.getElementById('reg-success-card'),
  regSuccessMsg: document.getElementById('reg-success-msg'),
  resetRegBtn: document.getElementById('reset-reg-btn'),
  
  // Artisan Dashboard & Login Views
  artisanRegView: document.getElementById('artisan-reg-view'),
  toggleToLoginBtn: document.getElementById('toggle-to-login-btn'),
  artisanLoginView: document.getElementById('artisan-login-view'),
  toggleToRegBtn: document.getElementById('toggle-to-reg-btn'),
  artisanLoginForm: document.getElementById('artisan-login-form'),
  artisanLoginEmail: document.getElementById('artisan-login-email'),
  artisanLoginPass: document.getElementById('artisan-login-pass'),
  artisanLoginError: document.getElementById('artisan-login-error'),
  artisanDashboardView: document.getElementById('artisan-dashboard-view'),
  dashArtisanName: document.getElementById('dash-artisan-name'),
  dashBizName: document.getElementById('dash-biz-name'),
  artisanLogoutBtn: document.getElementById('artisan-logout-btn'),
  dashTabBtns: document.querySelectorAll('.dash-tab-btn'),
  dashTabPanels: document.querySelectorAll('.dash-tab-panel'),
  dashInboxCount: document.getElementById('dash-inbox-count'),
  dashProfileForm: document.getElementById('dash-profile-form'),
  dashInputBiz: document.getElementById('dash-input-biz'),
  dashInputLead: document.getElementById('dash-input-lead'),
  dashInputReg: document.getElementById('dash-input-reg'),
  dashInputPhone: document.getElementById('dash-input-phone'),
  dashInputWhatsapp: document.getElementById('dash-input-whatsapp'),
  dashInputEmail: document.getElementById('dash-input-email'),
  dashInputAddress: document.getElementById('dash-input-address'),
  dashProfileFeedback: document.getElementById('dash-profile-feedback'),
  btnShowMintModal: document.getElementById('btn-show-mint-modal'),
  dashBatchesTbody: document.getElementById('dash-batches-tbody'),
  dashInboxList: document.getElementById('dash-inbox-list'),
  mintModal: document.getElementById('mint-modal'),
  closeMintBtn: document.getElementById('close-mint-btn'),
  mintForm: document.getElementById('mint-form'),
  mintQty: document.getElementById('mint-qty'),
  mintQuality: document.getElementById('mint-quality'),
  mintErrorMsg: document.getElementById('mint-error-msg'),

  // Modals
  productModal: document.getElementById('product-modal'),
  closeModalBtn: document.getElementById('close-modal-btn'),
  modalContent: document.getElementById('modal-content'),
  inquiryModal: document.getElementById('inquiry-modal'),
  closeInqBtn: document.getElementById('close-inq-btn'),
  inquiryForm: document.getElementById('inquiry-form'),
  inqArtisanName: document.getElementById('inq-artisan-name'),
  inqProductName: document.getElementById('inq-product-name'),
  inqSuccessSection: document.getElementById('inq-success-section'),
  registryModal: document.getElementById('registry-modal'),
  registryCheckingState: document.getElementById('registry-checking-state'),
  registryVerifiedState: document.getElementById('registry-verified-state'),
  registryApproveBtn: document.getElementById('registry-approve-btn'),
  registryDismissBtn: document.getElementById('registry-dismiss-btn'),
  
  // Admin Login
  adminLoginCard: document.getElementById('admin-login-card'),
  adminLoginForm: document.getElementById('admin-login-form'),
  adminPassInput: document.getElementById('admin-pass'),
  loginError: document.getElementById('login-error'),
  quickAccessBtn: document.getElementById('quick-access-btn'),
  
  // Admin Dashboard
  adminDashboard: document.getElementById('admin-dashboard'),
  adminLogoutBtn: document.getElementById('admin-logout-btn'),
  statProducts: document.getElementById('stat-products'),
  statApproved: document.getElementById('stat-approved'),
  statPending: document.getElementById('stat-pending'),
  statInquiries: document.getElementById('stat-inquiries'),
  pendingCount: document.getElementById('pending-count'),
  pendingList: document.getElementById('pending-list'),
  inquiryCount: document.getElementById('inquiry-count'),
  inquiryList: document.getElementById('inquiry-list'),
  
  // Registry Cells
  cellAuNo: document.getElementById('cell-au-no'),
  cellName: document.getElementById('cell-name'),
  cellProp: document.getElementById('cell-prop'),
  cellProduct: document.getElementById('cell-product'),

  // Video Lightbox
  videoLightbox: document.getElementById('video-lightbox'),
  closeVideoBtn: document.getElementById('close-video-btn'),

  // Print Template
  printCatalogTemplate: document.getElementById('print-catalog-template'),

  // Load More Products
  loadMoreContainer: document.getElementById('load-more-container'),
  loadMoreBtn: document.getElementById('load-more-btn')
};

// ── INITIALIZATION ──
document.addEventListener('DOMContentLoaded', () => {
  initLocalStorage();
  document.documentElement.lang = state.language;
  organizeCatalogueSections();
  
  // 1. Fetch images mappings dynamically
  fetch('./image_mapping.json?v=2.2')
    .then(r => r.json())
    .then(mapping => {
      state.imageMapping = mapping;
      renderProducts();
      populateDistrictDropdown();
      populateRegistrationDropdown();
    })
    .catch(err => {
      console.error("Error loading image mappings:", err);
      renderProducts();
      populateDistrictDropdown();
      populateRegistrationDropdown();
    });

  renderQuickTags();
  renderFAQs();
  renderPipelineTracker();
  setupEventListeners();
  setupKeyboardShortcuts();
  setupMapTooltipEvents();

  // 2. Parse URL query string on load
  const urlParams = new URLSearchParams(window.location.search);
  const traceAu = urlParams.get('trace');
  if (traceAu) {
    switchTab('catalogue');
    const trInput = document.getElementById('tracing-input');
    if (trInput) {
      trInput.value = traceAu;
      runProductTrace(traceAu);
      setTimeout(() => {
        document.querySelector('.tracing-desk')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }
  
  // 3. Animate stats dashboard
  animateStatsDashboard();

  // 4. Setup template switcher tabs in the guide
  setupTemplateTabs();
});

function organizeCatalogueSections() {
  const panel = document.getElementById('panel-catalogue');
  const intro = panel?.querySelector('.catalogue-intro');
  const filters = panel?.querySelector('.filter-bar');
  const tags = panel?.querySelector('.quick-tags-panel');
  const grid = panel?.querySelector('.product-grid');
  const loadMore = panel?.querySelector('#load-more-container');
  const map = panel?.querySelector('.map-desk-container');
  const registry = panel?.querySelector('.tracing-desk');
  const faq = panel?.querySelector('.faq-section');
  [intro, filters, tags, grid, loadMore, map, registry, faq].forEach((section) => {
    if (section) panel.appendChild(section);
  });
}

// ── ANIMATE STATS DASHBOARD ──
function animateStatsDashboard() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(elem => {
    const target = parseInt(elem.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    
    const duration = 1200; // 1.2 seconds animation
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const currentVal = Math.floor(easeProgress * target);
      
      elem.textContent = currentVal.toLocaleString('en-IN');
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        elem.textContent = target.toLocaleString('en-IN');
      }
    }
    
    requestAnimationFrame(update);
  });

  // Also animate the progress bar width
  const progressFill = document.querySelector('.stat-progress-fill');
  if (progressFill) {
    const progressVal = progressFill.getAttribute('data-progress');
    setTimeout(() => {
      progressFill.style.width = `${progressVal}%`;
    }, 250);
  }
}

// ── POPULATE DISTRICT DROPDOWN ──
function populateDistrictDropdown() {
  const districts = [...new Set(GI_PRODUCTS.map(p => p.district))].sort();
  const select = document.getElementById('district-filter');
  if (!select) return;
  
  select.innerHTML = '';
  const optAll = document.createElement('option');
  optAll.value = 'All';
  optAll.className = 'trn';
  optAll.dataset.key = 'all_districts';
  optAll.textContent = state.language === 'en' ? 'All Districts' : 'सभी जिले';
  select.appendChild(optAll);
  
  districts.forEach((dist) => {
    const opt = document.createElement('option');
    opt.value = dist;
    opt.textContent = dist;
    select.appendChild(opt);
  });
}

// ── RENDER QUICK TAGS ──
function renderQuickTags() {
  const container = document.getElementById('quick-tags-panel');
  if (!container) return;
  
  const labelText = state.language === 'en' ? 'Popular Searches: ' : 'लोकप्रिय खोजें: ';
  container.innerHTML = `<span class="quick-tags-label">${labelText}</span>`;
  
  POPULAR_TAGS.forEach((tag) => {
    const btn = document.createElement('button');
    btn.className = 'quick-tag-btn';
    btn.textContent = tag;
    btn.addEventListener('click', () => {
      state.searchQuery = tag;
      dom.searchInput.value = tag;
      dom.clearSearchBtn.style.display = 'block';
      renderProducts();
    });
    container.appendChild(btn);
  });
}

// ── RENDER FAQ ACCORDION ──
function renderFAQs() {
  const container = document.getElementById('faq-accordion');
  if (!container) return;
  
  container.innerHTML = '';
  const isEn = state.language === 'en';
  
  FAQS.forEach((faq, idx) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    
    const qText = isEn ? faq.q_en : faq.q_hi;
    const aText = isEn ? faq.a_en : faq.a_hi;
    
    item.innerHTML = `
      <button class="faq-question" aria-expanded="false" data-faq-idx="${idx}">
        <span>${qText}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${aText}</p>
      </div>
    `;
    
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      answer.classList.toggle('active', !isExpanded);
      btn.querySelector('.faq-icon').textContent = isExpanded ? '+' : '−';
    });
    
    container.appendChild(item);
  });
}

// ── RENDER PIPELINE TRACKER (TAB 4) ──
function renderPipelineTracker() {
  const grid = document.getElementById('pipeline-tracker-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  UPCOMING_GI_PIPELINE.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'pipeline-card';
    card.dataset.idx = idx;
    
    const name = state.language === 'en' ? item.name_en : item.name_hi;
    
    let statusClass = 'status-sourcing';
    let statusText = 'Sourcing';
    if (item.status === 'examination') {
      statusClass = 'status-examination';
      statusText = state.language === 'en' ? 'Examination' : 'परीक्षण चरण';
    } else if (item.status === 'pre-examination') {
      statusClass = 'status-pre-exam';
      statusText = state.language === 'en' ? 'Pre-Examination' : 'पूर्व-परीक्षण';
    } else if (item.status === 'new-application') {
      statusClass = 'status-filed';
      statusText = state.language === 'en' ? 'Filed' : 'दर्ज आवेदन';
    } else if (item.status === 'sourcing') {
      statusClass = 'status-sourcing';
      statusText = state.language === 'en' ? 'Sourcing' : 'क्लस्टर चयन';
    }

    card.innerHTML = `
      <div class="pipeline-card-header">
        <div class="pipeline-title-col">
          <h4>${name}</h4>
          <span>📍 ${item.district} | Application No: ${item.appNo}</span>
        </div>
        <span class="pipeline-status-badge ${statusClass}">${statusText}</span>
      </div>
      
      <div class="pipeline-progress-wrapper">
        <div class="pipeline-progress-meta">
          <span>${state.language === 'en' ? 'GI Registry Progress' : 'पंजीकरण प्रगति'}</span>
          <span>${item.pct}%</span>
        </div>
        <div class="pipeline-progress-track">
          <div class="pipeline-progress-fill fill-${item.status === 'new-application' ? 'filed' : item.status}" style="width: ${item.pct}%;"></div>
        </div>
      </div>

      <div class="pipeline-expand-details">
        <div class="pipeline-steps">
          <div class="pipe-step ${item.pct >= 15 ? 'done' : 'active'}">
            <span class="pipe-step-marker"></span>
            <span>1. Cluster Sourcing (Completed)</span>
          </div>
          <div class="pipe-step ${item.pct >= 30 ? 'done' : (item.pct === 15 ? 'active' : '')}">
            <span class="pipe-step-marker"></span>
            <span>2. Registry Application Filed</span>
          </div>
          <div class="pipe-step ${item.pct >= 45 ? 'done' : (item.pct === 30 ? 'active' : '')}">
            <span class="pipe-step-marker"></span>
            <span>3. Pre-Examination Review</span>
          </div>
          <div class="pipe-step ${item.pct >= 65 ? 'done' : (item.pct === 45 ? 'active' : '')}">
            <span class="pipe-step-marker"></span>
            <span>4. Examination Report Reply</span>
          </div>
          <div class="pipe-step ${item.pct >= 85 ? 'done' : (item.pct === 65 ? 'active' : '')}">
            <span class="pipe-step-marker"></span>
            <span>5. Journal Publication</span>
          </div>
        </div>
      </div>
    `;
    
    card.addEventListener('click', () => {
      card.classList.toggle('expanded');
    });

    grid.appendChild(card);
  });
}

// ── BILINGUAL TRANSLATION ENGINE ──
function updateLanguageUI() {
  const dict = TRANSLATIONS[state.language];
  document.documentElement.lang = state.language;
  
  // Update translation attributes
  document.querySelectorAll('.trn').forEach((el) => {
    const key = el.dataset.key;
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  if (dom.searchInput) {
    dom.searchInput.placeholder = dict.search_placeholder;
  }
  
  // Re-adjust district select placeholder option
  const distSelect = document.getElementById('district-filter');
  if (distSelect && distSelect.options[0]) {
    distSelect.options[0].textContent = dict.all_districts;
  }
  
  // Update Tab Titles
  const tabCatalogueBtn = document.getElementById('tab-catalogue-btn');
  if (tabCatalogueBtn) tabCatalogueBtn.innerHTML = `<span class="tab-shortcut">[1]</span> ` + dict.tab_catalogue;
  const tabRegBtn = document.getElementById('tab-registration-btn');
  if (tabRegBtn) tabRegBtn.innerHTML = `<span class="tab-shortcut">[2]</span> ` + dict.tab_registration;
  const tabAboutBtn = document.getElementById('tab-about-btn');
  if (tabAboutBtn) tabAboutBtn.innerHTML = `<span class="tab-shortcut">[3]</span> ` + (state.language === 'en' ? 'About GIs & Schemes' : 'जीआई एवं योजनाएं');

  renderFAQs();
  renderQuickTags();
  renderProducts();
  renderPipelineTracker();
  populateRegistrationDropdown();
  if (state.artisanUser) {
    renderArtisanDashboard();
  }
}

// ── RENDER PRODUCTS ──
function renderProducts() {
  dom.productGrid.innerHTML = '';
  
  const query = state.searchQuery.toLowerCase().trim();
  const cat = state.selectedCategory;
  const selectedDistrict = document.getElementById('district-filter')?.value || 'All';
  const dict = TRANSLATIONS[state.language];
  
  const filtered = GI_PRODUCTS.filter((prod) => {
    const matchesSearch = 
      prod.name.toLowerCase().includes(query) ||
      prod.district.toLowerCase().includes(query) ||
      (prod.proprietor && prod.proprietor.toLowerCase().includes(query)) ||
      (prod.description && prod.description.toLowerCase().includes(query));
      
    const matchesCategory = (cat === 'All' || prod.category === cat);
    const matchesDistrict = (selectedDistrict === 'All' || prod.district === selectedDistrict);
    
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  if (filtered.length === 0) {
    dom.productGrid.innerHTML = `
      <div class="loading-spinner">
        <p>${state.language === 'en' ? 'No products match your search or filter.' : 'आपकी खोज या फ़िल्टर से कोई उत्पाद मेल नहीं खाता है।'}</p>
        <button id="reset-filters-btn" class="secondary-btn" style="margin-top: 15px;">
          ${state.language === 'en' ? 'Reset Filters' : 'फ़िल्टर रीसेट करें'}
        </button>
      </div>
    `;
    document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
      state.searchQuery = '';
      state.selectedCategory = 'All';
      dom.searchInput.value = '';
      dom.clearSearchBtn.style.display = 'none';
      dom.catBtns.forEach(b => b.classList.toggle('active', b.dataset.category === 'All'));
      const distSelect = document.getElementById('district-filter');
      if (distSelect) distSelect.value = 'All';
      
      // Clear SVG map highlights
      document.querySelectorAll('.map-hotspot').forEach(h => h.classList.remove('active'));
      renderProducts();
    });
    return;
  }

  filtered.slice(0, state.visibleProductLimit).forEach((prod) => {
    const displayName = formatProductName(prod.name);
    
    // Bind real photographs or fallback to category illustrations
    let imgUrl = '';
    if (state.imageMapping && state.imageMapping[prod.id]) {
      imgUrl = state.imageMapping[prod.id].main || state.imageMapping[prod.id];
    }
    if (!imgUrl) {
      if (prod.category === 'Textile') imgUrl = 'cat_textiles.png';
      else if (prod.category === 'Handicraft') imgUrl = 'cat_handicrafts.png';
      else if (prod.category === 'Food Product') imgUrl = 'cat_food.png';
      else if (prod.category === 'Agricultural') imgUrl = 'cat_agriculture.png';
    }

    const card = document.createElement('div');
    card.className = 'product-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View ${displayName}, ${prod.category} from ${prod.district}`);
    
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img class="card-image" src="${imgUrl}" alt="${displayName}" loading="lazy">
        <span class="card-tag">${state.language === 'en' ? prod.category : (prod.category === 'Textile' ? 'कपड़ा' : prod.category === 'Handicraft' ? 'हस्तशिल्प' : prod.category === 'Food Product' ? 'खाद्य उत्पाद' : 'कृषि')}</span>
      </div>
      <div class="card-body">
        <div class="card-loc-row">
          <span class="card-loc">📍 ${prod.district}</span>
        </div>
        <h3>${displayName}</h3>
        <p>${prod.description}</p>
      </div>
      <div class="card-footer">
        <span class="card-prop-label">${prod.proprietor !== 'N/A' ? dict.prop_label_group : dict.prop_label_cluster}</span>
        <span class="card-au-count au-active">${(() => { const auCount = state.authorizedUsers.filter(u => u.productId === prod.id && u.status === 'approved').length; return auCount > 0 ? (state.language === 'en' ? `👥 ${auCount} Authorized Producers` : `👥 ${auCount} अधिकृत उत्पादक`) : (state.language === 'en' ? 'Official GI record' : 'आधिकारिक जीआई रिकॉर्ड'); })()}</span>
      </div>
    `;

    card.addEventListener('click', () => openProductModal(prod));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProductModal(prod);
      }
    });

    dom.productGrid.appendChild(card);
  });

  if (dom.loadMoreContainer) {
    if (filtered.length > state.visibleProductLimit) {
      dom.loadMoreContainer.classList.remove('hidden');
      const remaining = filtered.length - state.visibleProductLimit;
      dom.loadMoreBtn.textContent = state.language === 'en'
        ? `Load More Products (${remaining} remaining)`
        : `और उत्पाद लोड करें (${remaining} शेष)`;
    } else {
      dom.loadMoreContainer.classList.add('hidden');
    }
  }
}

// ── REGISTRATION DROPDOWN ──
function populateRegistrationDropdown() {
  dom.regProductSelect.innerHTML = `<option value="">${state.language === 'en' ? '-- Choose Product --' : '-- उत्पाद चुनें --'}</option>`;
  GI_PRODUCTS.forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} (${p.registrationNo})`;
    dom.regProductSelect.appendChild(opt);
  });
}

// ── OPEN PRODUCT DETAIL MODAL ──
function openProductModal(prod) {
  state.lastFocusedElement = document.activeElement;
  state.selectedProduct = prod;
  const verifiedUsers = state.authorizedUsers.filter(
    (u) => u.productId === prod.id && u.status === 'approved'
  );
  
  const dict = TRANSLATIONS[state.language];

  let galleryImagesHtml = '';
  const mappingEntry = state.imageMapping && state.imageMapping[prod.id];
  if (mappingEntry && Array.isArray(mappingEntry.gallery) && mappingEntry.gallery.length > 0) {
    // Expose gallery array globally for lightbox access
    const galleryVarName = 'gallery_' + prod.id.replace(/-/g, '_');
    window[galleryVarName] = mappingEntry.gallery;
    galleryImagesHtml = mappingEntry.gallery.map((img, idx) => `
      <div class="gallery-img-card" onclick="openLightbox(${idx}, '${galleryVarName}', '${prod.name.replace(/'/g,"&#39;")}')" role="button" tabindex="0" aria-label="View ${prod.name} image ${idx+1} full size" onkeydown="if(event.key==='Enter'||event.key===' ')openLightbox(${idx},'${galleryVarName}','${prod.name.replace(/'/g,"&#39;")}')">
        <img class="gallery-img" src="${img}" alt="${prod.name} - image ${idx+1}" loading="lazy">
      </div>
    `).join('');
  } else {
    galleryImagesHtml = `
      <div style="grid-column: 1/-1; text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.9rem;">
        ${state.language === 'en' ? 'No additional gallery images available for this product.' : 'इस उत्पाद के लिए कोई अतिरिक्त गैलरी चित्र उपलब्ध नहीं हैं।'}
      </div>
    `;
  }

  let imgUrl = '';
  if (state.imageMapping && state.imageMapping[prod.id]) {
    imgUrl = state.imageMapping[prod.id].main || state.imageMapping[prod.id];
  }
  if (!imgUrl) {
    if (prod.category === 'Textile') imgUrl = 'cat_textiles.png';
    else if (prod.category === 'Handicraft') imgUrl = 'cat_handicrafts.png';
    else if (prod.category === 'Food Product') imgUrl = 'cat_food.png';
    else if (prod.category === 'Agricultural') imgUrl = 'cat_agriculture.png';
  }

  // 1. Build Details Modal with Tab Controls
  dom.modalContent.innerHTML = `
    <!-- Category Image Banner -->
    <div class="modal-hero-image-wrapper">
      <img class="modal-hero-image" src="${imgUrl}" alt="${formatProductName(prod.name)}">
      <span class="modal-image-tag">${state.language === 'en' ? prod.category : (prod.category === 'Textile' ? 'कपड़ा' : prod.category === 'Handicraft' ? 'हस्तशिल्प' : prod.category === 'Food Product' ? 'खाद्य उत्पाद' : 'कृषि')}</span>
    </div>

    <!-- Header Block -->
    <div class="modal-header-block">
      <h2 id="product-modal-title">${formatProductName(prod.name)}</h2>
    </div>

    <!-- Meta Grid -->
    <div class="modal-meta-grid">
      <div class="meta-col">
        <span class="meta-label">${state.language === 'en' ? 'Reg Number' : 'जीआई पंजीकरण संख्या'}</span>
        <span class="meta-val">
          ${prod.registrationNo}
          <a href="https://www.ipindia.gov.in/registry" target="_blank" rel="noopener noreferrer" class="registry-direct-link" title="Official GI Registry Search">Verify on IP India</a>
        </span>
      </div>
      <div class="meta-col">
        <span class="meta-label">${state.language === 'en' ? 'Grant Date' : 'पंजीकरण तिथि'}</span>
        <span class="meta-val">${prod.registrationDate}</span>
      </div>
      <div class="meta-col">
        <span class="meta-label">${state.language === 'en' ? 'Origin District' : 'मूल जिला'}</span>
        <span class="meta-val">${prod.district}</span>
      </div>
      <div class="meta-col">
        <span class="meta-label">${state.language === 'en' ? 'NABARD support date' : 'नाबार्ड सहायता तिथि'}</span>
        <span class="meta-val" style="color: var(--green-success);">${formatSupportValue(prod.nabardSupported)}</span>
      </div>
    </div>

    <!-- Sub Tab controls inside modal -->
    <div class="modal-tabs">
      <button class="modal-tab-btn active" data-modal-tab="sourcing">${state.language === 'en' ? 'Directory & Sourcing' : 'निर्देशिका व विक्रेता'}</button>
      <button class="modal-tab-btn" data-modal-tab="heritage">${state.language === 'en' ? 'Heritage & Storytelling' : 'विरासत व शिल्प प्रक्रिया'}</button>
      <button class="modal-tab-btn" data-modal-tab="gallery">${state.language === 'en' ? 'Product Gallery' : 'उत्पाद गैलरी'}</button>
    </div>

    <!-- TAB 1: Sourcing Directory Content -->
    <div id="modal-tab-sourcing-content" class="modal-tab-content active">
      <!-- Description & Sourcing info -->
      <div class="modal-section" style="margin-top: 10px;">
        <p>${prod.description}</p>
      </div>

      <div class="modal-section nabard-card-glow">
        <h4>${dict.nabard_title}</h4>
        <p>${prod.nabardSupport}</p>
        <p style="margin-top: 10px; font-weight: bold; color: var(--green-success);">
          <strong>${dict.lbl_project_impact}:</strong> ${prod.impact}
        </p>
      </div>

      <!-- Verified Weavers Grid -->
      <div class="modal-section">
        <div class="artisan-section-header">
          <h4>${state.language === 'en' ? 'Registered Authorized Producers' : 'पंजीकृत अधिकृत उत्पादक'}</h4>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
            ${state.language === 'en'
              ? `Source: <a href="https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india" target="_blank" rel="noopener noreferrer" style="color:var(--green-primary)">IP India Part B Register</a> · ${verifiedUsers.length} producers listed · Contact details to be confirmed via registry before commercial use`
              : `स्रोत: <a href="https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india" target="_blank" rel="noopener noreferrer" style="color:var(--green-primary)">आईपी इंडिया भाग बी रजिस्टर</a> · ${verifiedUsers.length} उत्पादक सूचीबद्ध · व्यावसायिक उपयोग से पहले रजिस्ट्री से विवरण सत्यापित करें`}
          </p>
        </div>

        <div class="artisan-list-container">
          ${verifiedUsers.length === 0 ? `
            <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.9rem;">
              <p>${state.language === 'en'
                ? 'Producer profiles will be published after validation against the official Part B register and confirmation of consent to display contact details.'
                : 'आधिकारिक भाग बी रजिस्टर से सत्यापन और संपर्क विवरण प्रकाशित करने की सहमति के बाद उत्पादक प्रोफाइल प्रदर्शित की जाएंगी।'}</p>
              <a class="official-link" href="https://www.ipindia.gov.in/registry" target="_blank" rel="noopener noreferrer">
                ${state.language === 'en' ? 'Search the official Authorized User register' : 'आधिकारिक अधिकृत उपयोगकर्ता रजिस्टर खोजें'}
              </a>
            </div>
          ` : verifiedUsers.map((user, idx) => {
            const awardBadge = user.award ? `
              <div class="artisan-award-badge" title="${user.award}">
                ⭐ ${state.language === 'en' ? user.award : (user.award === 'National Craft Awardee' ? 'राष्ट्रीय शिल्प पुरस्कार' : 'नाबार्ड मास्टर कारीगर')}
              </div>
            ` : '';
            
            const awardClass = user.award ? 'awardee-card' : '';

            return `
              <div class="artisan-item-card ${awardClass}">
                <div class="artisan-info-col">
                  <div class="artisan-title-row">
                    <h5>${user.businessName}</h5>
                    <span class="badge-verified">✓ ${dict.badge_verified}</span>
                    ${awardBadge}
                  </div>
                  <p class="artisan-details-row">
                    ${user.artisanName ? `<strong>${state.language === 'en' ? 'Lead Artisan' : 'प्रमुख कारीगर'}:</strong> ${user.artisanName} | ` : ''}<strong>${state.language === 'en' ? 'AU Reg No' : 'अधिकृत संख्या'}:</strong> <a href="https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india" target="_blank" rel="noopener noreferrer" style="color: var(--green-primary);">${user.registrationNo}</a>
                  </p>
                  <p class="artisan-details-row" style="margin-top: 4px; font-size: 0.75rem; color: var(--green-success);">
                    <strong>${state.language === 'en' ? 'Source' : 'स्रोत'}:</strong> ${user.isOfficialRecord ? (state.language === 'en' ? 'IP India Part B Register (Official)' : 'आईपी इंडिया भाग बी रजिस्टर (आधिकारिक)') : (state.language === 'en' ? 'Self-registered via NABARD Portal' : 'नाबार्ड पोर्टल के माध्यम से स्व-पंजीकृत')}
                  </p>
                  <p class="artisan-address-row">📍 ${user.address}</p>
                </div>
                
                <div class="artisan-actions">
                  ${user.whatsapp ? `
                  <a
                    href="https://wa.me/${user.whatsapp}?text=Hello%20${encodeURIComponent(user.businessName)},%20I%20saw%20your%20profile%20on%20the%20NABARD%20Uttar%20Pradesh%20GI%20Digital%20Catalogue.%20I%20would%20like%20to%20inquire%20about%20your%20products."
                    target="_blank"
                    class="whatsapp-link"
                    role="button"
                  >${dict.btn_whatsapp}</a>
                  ` : `
                  <a href="mailto:nabard.upro@nabard.org?subject=GI%20Producer%20Inquiry%20-%20${encodeURIComponent(user.registrationNo)}&body=I%20wish%20to%20connect%20with%20${encodeURIComponent(user.businessName)}%20(AU%20${user.registrationNo}).%20Please%20share%20their%20contact%20details." class="whatsapp-link" style="background: var(--gold-glow); color: var(--gold-primary); border: 1px solid var(--gold-primary);" role="button">${state.language === 'en' ? '✉ Contact via NABARD' : '✉ नाबार्ड से संपर्क'}</a>
                  `}
                  <button class="inq-btn" data-user-idx="${idx}">${dict.btn_inquiry}</button>
                  <button class="qr-btn" data-user-idx="${idx}" style="background-color: var(--gold-glow); color: var(--gold-primary); font-size: 0.72rem; padding: 6px 12px; border: 1px dashed var(--gold-primary); border-radius: var(--radius-sm); font-weight: bold; cursor: pointer;">📥 Download Tag</button>
                </div>

                <!-- QR Code Click triggers authentication cert desk tracing -->
                <div class="qr-box-vector" title="Registry Authentic Code" data-au-no="${user.registrationNo}" style="cursor: pointer;">
                  <svg width="36" height="36" viewBox="0 0 42 42">
                    <rect width="42" height="42" fill="#fff" />
                    <rect x="2" y="2" width="10" height="10" fill="#000" />
                    <rect x="4" y="4" width="6" height="6" fill="#fff" />
                    <rect x="30" y="2" width="10" height="10" fill="#000" />
                    <rect x="32" y="4" width="6" height="6" fill="#fff" />
                    <rect x="2" y="30" width="10" height="10" fill="#000" />
                    <rect x="4" y="32" width="6" height="6" fill="#fff" />
                    <rect x="16" y="16" width="10" height="10" fill="#000" />
                    <rect x="18" y="18" width="6" height="6" fill="#fff" />
                    <rect x="2" y="18" width="4" height="4" fill="#000" />
                    <rect x="18" y="2" width="4" height="4" fill="#000" />
                    <rect x="34" y="18" width="6" height="4" fill="#000" />
                    <rect x="18" y="34" width="4" height="6" fill="#000" />
                    <rect x="30" y="30" width="4" height="4" fill="#000" />
                    <rect x="38" y="38" width="2" height="2" fill="#000" />
                  </svg>
                  <span class="qr-caption">VERIFIED</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- TAB 2: Heritage Timeline Content -->
    <div id="modal-tab-heritage-content" class="modal-tab-content">
      <div class="modal-section" style="margin-top: 10px;">
        <h4>${state.language === 'en' ? 'Craft History & Origin' : 'शिल्प का इतिहास व उत्पत्ति'}</h4>
        <p>${prod.history}</p>
      </div>

      <!-- Vertical Timeline showing steps -->
      <div class="modal-section">
        <h4>${state.language === 'en' ? 'Step-by-Step Heritage Process' : 'पारंपरिक शिल्प प्रक्रिया'}</h4>
        <div class="heritage-timeline">
          <div class="timeline-step">
            <span class="step-marker"></span>
            <div class="step-content">
              <h5>1. Raw Material Sourcing</h5>
              <p>${state.language === 'en' ? `Procuring the specific materials native to the ${prod.district} district cluster (e.g. specialized woods, clays, or raw yarn).` : `${prod.district} जिले में मिलने वाली विशिष्ट कच्ची सामग्री (जैसे लकड़ी, मिट्टी या धागे) की खरीद करना।`}</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-marker"></span>
            <div class="step-content">
              <h5>2. Refining & Preparation</h5>
              <p>${state.language === 'en' ? 'Artisans manually prep wood, clean clay soil, or align fibers using centuries-old heritage methods.' : 'पारंपरिक तरीकों से कारीगर कच्ची सामग्री की सफाई, धुनाई या सुखाने की तैयारी करते हैं।'}</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-marker"></span>
            <div class="step-content">
              <h5>3. Hand Crafting & Detailing</h5>
              <p>${prod.makingProcess}</p>
            </div>
          </div>
          <div class="timeline-step">
            <span class="step-marker"></span>
            <div class="step-content">
              <h5>4. Packaging & Authentication Tagging</h5>
              <p>${state.language === 'en' ? 'Finished goods are inspected and prepared according to the producer group’s applicable quality and labelling requirements.' : 'तैयार वस्तुओं का निरीक्षण किया जाता है और उत्पादक समूह की लागू गुणवत्ता तथा लेबलिंग आवश्यकताओं के अनुसार तैयार किया जाता है।'}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Documentary Spotlight Video Card -->
      <div class="modal-section">
        <h4>${state.language === 'en' ? 'Craft Documentary Spotlight' : 'शिल्प वृत्तचित्र वीडियो'}</h4>
        <div class="video-spotlight-card" id="documentary-video-card" data-video-id="${CRAFT_VIDEOS[prod.id] || 'n3GZq15sJq0'}">
          <img class="video-thumbnail" src="https://img.youtube.com/vi/${CRAFT_VIDEOS[prod.id] || 'n3GZq15sJq0'}/0.jpg" alt="Video cover">
          <div class="play-button-ring">
            <span class="play-icon"></span>
          </div>
          <div class="video-overlay">
            <span class="video-card-title">${prod.name} Documentary</span>
            <span class="video-card-subtitle">Featuring historical cluster development and weavers interviews (Sansad TV)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: Gallery Content -->
    <div id="modal-tab-gallery-content" class="modal-tab-content">
      <div class="modal-section" style="margin-top: 10px;">
        <h4>${state.language === 'en' ? 'Product Showcase Gallery' : 'उत्पाद प्रदर्शन गैलरी'}</h4>
        <p class="gallery-help-text" style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">
          ${state.language === 'en' ? 'Authentic craft details and workshop samples from registered production clusters. Click on any image to view it full-size.' : 'पंजीकृत उत्पादन समूहों से प्रामाणिक शिल्प विवरण और कार्यशाला के नमूने। पूर्ण आकार में देखने के लिए किसी भी छवि पर क्लिक करें।'}
        </p>
        <div class="modal-product-gallery">
          ${galleryImagesHtml}
        </div>
      </div>
    </div>
  `;

  // Attach button triggers
  const inqButtons = dom.modalContent.querySelectorAll('.inq-btn');
  inqButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.userIdx;
      openInquiryModal(verifiedUsers[idx]);
    });
  });

  // Attach QR tag download canvas trigger
  const qrDownloadBtns = dom.modalContent.querySelectorAll('.qr-btn');
  qrDownloadBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.userIdx;
      generateArtisanLabelCanvas(verifiedUsers[idx], prod);
    });
  });

  // Attach QR code click tracing triggers
  const qrBoxes = dom.modalContent.querySelectorAll('.qr-box-vector');
  qrBoxes.forEach((box) => {
    box.addEventListener('click', (e) => {
      const auNo = e.currentTarget.dataset.auNo;
      dom.productModal.classList.add('hidden');
      switchTab('catalogue');
      const trInput = document.getElementById('tracing-input');
      if (trInput) {
        trInput.value = auNo;
        runProductTrace(auNo);
        setTimeout(() => {
          document.querySelector('.tracing-desk')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
  });

  // Attach Inner Modal Tab switches
  const modalTabBtns = dom.modalContent.querySelectorAll('.modal-tab-btn');
  modalTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const tabTarget = btn.dataset.modalTab;
      dom.modalContent.querySelectorAll('.modal-tab-content').forEach((content) => {
        content.classList.toggle('active', content.id === `modal-tab-${tabTarget}-content`);
      });
    });
  });

  // Attach Video Spotlight play trigger
  const videoCard = document.getElementById('documentary-video-card');
  if (videoCard) {
    videoCard.addEventListener('click', () => {
      const videoId = videoCard.dataset.videoId;
      playDocumentaryVideo(videoId);
    });
  }

  dom.productModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => dom.closeModalBtn.focus());
}

function formatProductName(name) {
  return String(name)
    .replace(/&Toys/g, '& Toys')
    .replace(/\bBenaras\b/g, 'Banaras')
    .replace(/\bRepouse\b/g, 'Repousse')
    .trim();
}

function formatSupportValue(value) {
  if (!value || value === 'N/A' || value === 'No') {
    return state.language === 'en' ? 'Not recorded' : 'दर्ज नहीं';
  }
  if (value === 'Yes') {
    return state.language === 'en' ? 'Supported' : 'समर्थित';
  }
  return state.language === 'en' ? `Supported (since ${value})` : `समर्थित (${value} से)`;
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
    state.lastFocusedElement.focus();
  }
}

// ── PLAY DOCUMENTARY VIDEO IN LIGHTBOX ──
function playDocumentaryVideo(videoId) {
  state.lastFocusedElement = document.activeElement;
  const container = dom.videoLightbox.querySelector('.video-player-container');
  if (!container) return;
  
  container.innerHTML = `
    <iframe 
      src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
      title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
    ></iframe>
  `;
  dom.videoLightbox.classList.remove('hidden');
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => dom.closeVideoBtn.focus());
}

// ── GENERATE ARTISAN PACKAGING TAG CANVAS ──
function generateArtisanLabelCanvas(artisan, product) {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Cream paper texture background
  ctx.fillStyle = '#fbfaf5';
  ctx.fillRect(0, 0, 400, 600);

  // Borders
  ctx.strokeStyle = '#0e3a20';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, 384, 584);

  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = 2;
  ctx.strokeRect(15, 15, 370, 570);

  // Helper to load image securely
  const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image failed to load: " + url));
    img.src = url;
  });

  const logoUrl = 'nabard_logo_ppt.png?v=2.3';
  const traceUrl = window.location.origin + window.location.pathname + `?trace=${encodeURIComponent(artisan.registrationNo)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(traceUrl)}`;

  Promise.all([
    loadImage(logoUrl).catch(() => null),
    loadImage(qrUrl).catch(() => null)
  ]).then(([logoImg, qrImg]) => {
    // 1. Draw logo or fallback icon
    if (logoImg) {
      ctx.drawImage(logoImg, 170, 25, 60, 40);
    } else {
      ctx.fillStyle = '#0e3a20';
      ctx.beginPath();
      ctx.arc(200, 45, 15, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Headings
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0e3a20';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('NABARD GEOGRAPHICAL INDICATION', 200, 95);
    ctx.fillText('VERIFIED AUTHENTICITY TAG', 200, 115);

    ctx.fillStyle = '#c5a059';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText('UP REGIONAL OFFICE, LUCKNOW', 200, 135);

    // Divider
    ctx.strokeStyle = '#e2dfd5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35, 150);
    ctx.lineTo(365, 150);
    ctx.stroke();

    // 3. Product Info
    ctx.fillStyle = '#827f73';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('HERITAGE GI PRODUCT', 200, 170);

    ctx.fillStyle = '#0e3a20';
    ctx.font = 'bold 16px serif';
    const prodName = product.name;
    if (prodName.length > 25) {
      ctx.fillText(prodName.slice(0, 25), 200, 190);
      ctx.fillText(prodName.slice(25), 200, 210);
    } else {
      ctx.fillText(prodName, 200, 195);
    }

    ctx.fillStyle = '#827f73';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('REGISTERED AUTHORIZED PRODUCER', 200, 235);

    ctx.fillStyle = '#222';
    ctx.font = 'bold 12px sans-serif';
    const bizName = artisan.businessName;
    if (bizName.length > 40) {
      ctx.fillText(bizName.slice(0, 40), 200, 255);
      ctx.fillText(bizName.slice(40), 200, 275);
    } else {
      ctx.fillText(bizName, 200, 260);
    }

    ctx.fillStyle = '#827f73';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('CHENNAI REGISTRY AU NUMBER', 200, 295);

    ctx.fillStyle = '#c5a059';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(artisan.registrationNo, 200, 315);

    ctx.fillStyle = '#827f73';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('ORIGIN CLUSTER', 200, 340);

    ctx.fillStyle = '#222';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText(`${artisan.district}, Uttar Pradesh`, 200, 360);

    // Divider
    ctx.strokeStyle = '#e2dfd5';
    ctx.beginPath();
    ctx.moveTo(50, 375);
    ctx.lineTo(350, 375);
    ctx.stroke();

    // 4. QR Code & Failsafe
    if (qrImg) {
      ctx.drawImage(qrImg, 140, 390, 120, 120);
    } else {
      // Draw simulated QR blocks in case of fetch errors
      ctx.fillStyle = '#000';
      ctx.fillRect(140, 390, 120, 120);
      ctx.fillStyle = '#fff';
      ctx.fillRect(150, 400, 100, 100);
      ctx.fillStyle = '#000';
      ctx.fillRect(160, 410, 30, 30);
      ctx.fillRect(210, 410, 30, 30);
      ctx.fillRect(160, 460, 30, 30);
    }

    ctx.fillStyle = '#827f73';
    ctx.font = 'italic 8.5px sans-serif';
    ctx.fillText('Scan to verify registry authenticity trace', 200, 530);

    ctx.fillStyle = '#0e3a20';
    ctx.font = 'bold 8px sans-serif';
    ctx.fillText('MINISTRY OF COMMERCE & INDUSTRY ● GOVERNMENT OF INDIA', 200, 560);
    ctx.fillStyle = '#c5a059';
    ctx.fillText('Subsidized & Secured under NABARD Cluster Project', 200, 575);

    // Trigger download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Authenticity_Tag_${artisan.registrationNo.replace(/\//g, '_')}.png`;
    link.href = dataUrl;
    link.click();
  }).catch(err => {
    console.error("Canvas tag compilation failed:", err);
    alert("Could not compile PNG tag. Sourcing data failed.");
  });
}

// ── SMART FILTERED PDF CATALOG COMPILER ──
function compileFilteredCatalogPrint() {
  const query = state.searchQuery.toLowerCase().trim();
  const cat = state.selectedCategory;
  const selectedDistrict = document.getElementById('district-filter')?.value || 'All';
  
  // 1. Get filtered list
  const filtered = GI_PRODUCTS.filter((prod) => {
    const matchesSearch = 
      prod.name.toLowerCase().includes(query) ||
      prod.district.toLowerCase().includes(query) ||
      (prod.proprietor && prod.proprietor.toLowerCase().includes(query)) ||
      (prod.description && prod.description.toLowerCase().includes(query));
      
    const matchesCategory = (cat === 'All' || prod.category === cat);
    const matchesDistrict = (selectedDistrict === 'All' || prod.district === selectedDistrict);
    
    return matchesSearch && matchesCategory && matchesDistrict;
  });

  if (filtered.length === 0) {
    alert("No products found in the current filters to compile.");
    return;
  }

  // 2. Compile cover page markup
  let html = `
    <!-- COVER PAGE -->
    <div class="print-cover-page print-page-break">
      <img class="print-cover-logo" src="nabard_logo_ppt.png?v=2.3" alt="NABARD UP RO">
      <h1>NATIONAL BANK FOR AGRICULTURE AND RURAL DEVELOPMENT</h1>
      <h2>Uttar Pradesh Regional Office, Lucknow</h2>
      <div style="width: 80px; height: 3px; background-color: #c5a059; margin: 24px auto;"></div>
      <h1 style="font-size: 24pt; color: #111; margin-top: 10px;">GEOGRAPHICAL INDICATIONS (GI) DIRECTORY</h1>
      <h3 style="font-size: 14pt; letter-spacing: 1px; color: #555; text-transform: uppercase;">Public Awareness Catalogue</h3>
      
      <div class="print-cover-meta">
        <p><strong>Selected Filter Category:</strong> ${cat === 'All' ? 'All Registered Specialties' : cat}</p>
        <p><strong>District Scope:</strong> ${selectedDistrict === 'All' ? 'All Uttar Pradesh Districts' : selectedDistrict}</p>
        <p><strong>Total Catalogued Products:</strong> ${filtered.length} GI Products</p>
        <p><strong>Producer verification:</strong> Confirm current Authorized User status in the official IP India Part B register.</p>
        <p style="margin-top: 20px;"><strong>Date of Compilation:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
      </div>

      <div class="print-cover-footer">
        NABARD Uttar Pradesh Regional Office · Registration records subject to confirmation with IP India
      </div>
    </div>
  `;

  // 3. Compile product detail sheets (compact single-page 2-column layout)
  filtered.forEach((prod) => {
    const verifiedWeavers = state.authorizedUsers.filter(u => u.productId === prod.id && u.status === 'approved');
    
    // Limit to 3 weavers in print to prevent overflow onto a second page
    const maxWeaversToPrint = 3;
    const weaversToPrint = verifiedWeavers.slice(0, maxWeaversToPrint);
    const remainingCount = verifiedWeavers.length - maxWeaversToPrint;

    let imgUrl = '';
    if (state.imageMapping && state.imageMapping[prod.id]) {
      imgUrl = state.imageMapping[prod.id].main || state.imageMapping[prod.id];
    }
    
    // Fallback if mapping has no image
    if (!imgUrl) {
      if (prod.category === 'Textile') imgUrl = 'cat_textiles.png';
      else if (prod.category === 'Handicraft') imgUrl = 'cat_handicrafts.png';
      else if (prod.category === 'Food Product') imgUrl = 'cat_food.png';
      else if (prod.category === 'Agricultural') imgUrl = 'cat_agriculture.png';
    }

    html += `
      <!-- PRODUCT PAGE -->
      <div class="print-product-page print-page-break">
        <div class="print-product-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="nabard_logo_ppt.png?v=2.3" alt="NABARD Logo" style="height: 45px; width: auto; object-fit: contain;">
            <h2>${prod.name}</h2>
          </div>
          <span>${prod.category}</span>
        </div>
        
        <div class="print-product-grid">
          <!-- Left Column (Description, History, Uniqueness, NABARD Support) -->
          <div class="print-col-left">
            <div class="print-product-section">
              <h4>Overview & History</h4>
              <p>${prod.description}</p>
              <p style="margin-top: 6px; font-style: italic;"><strong>History:</strong> ${prod.history}</p>
            </div>

            <div class="print-product-section">
              <h4>Craft Uniqueness & Processing</h4>
              <p>${prod.uniqueness}</p>
              <p style="margin-top: 6px;"><strong>Making Process:</strong> ${prod.makingProcess}</p>
            </div>

            <div class="print-product-section">
              <h4>NABARD UP Cluster Interventions</h4>
              <p>${prod.nabardSupport}</p>
              <p style="margin-top: 4px; font-weight: bold; color: #0e3a20;"><strong>Project Impact:</strong> ${prod.impact}</p>
            </div>
          </div>

          <!-- Right Column (Photo, Meta Table, Verified Weavers) -->
          <div class="print-col-right">
            <!-- Product Photo -->
            <div class="print-product-photo-wrapper">
              <img class="print-product-photo" src="${imgUrl}" alt="${prod.name}">
            </div>

            <!-- Meta Table -->
            <table class="print-product-meta-table">
              <tr>
                <td>GI Reg No:</td>
                <td class="font-mono">${prod.registrationNo}</td>
              </tr>
              <tr>
                <td>Grant Date:</td>
                <td>${prod.registrationDate}</td>
              </tr>
              <tr>
                <td>District:</td>
                <td>📍 ${prod.district}</td>
              </tr>
              <tr>
                <td style="font-size: 8pt;">Proprietor:</td>
                <td style="font-size: 8pt; line-height: 1.2;">${prod.proprietor}</td>
              </tr>
            </table>

            <!-- Verified Weavers -->
            <div class="print-product-section">
              <h4>${state.language === 'en' ? 'Registered Authorized Producers' : 'पंजीकृत अधिकृत उत्पादक'} (${verifiedWeavers.length})</h4>
              <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 6px;">
                ${verifiedWeavers.length === 0 ? `
                  <div style="font-size: 8pt; padding: 8px; border: 1px dashed #ccc; color: #666; text-align: center;">
                    No registered authorized users listed. Contact Lucknow RO Desk for direct inquiry support.
                  </div>
                ` : weaversToPrint.map(weaver => `
                  <div class="print-producer-card" style="padding: 6px; margin-bottom: 2px;">
                    <h5 style="font-size: 8.5pt; margin-bottom: 1px;">${weaver.businessName}</h5>
                    <p style="font-size: 7.5pt; line-height: 1.2; margin: 0;">
                      <strong>Contact:</strong> ${weaver.artisanName} | <strong>ID:</strong> ${weaver.registrationNo}<br>
                      <strong>Phone/WA:</strong> ${weaver.phone} | 📍 ${weaver.address.split(',')[0]}
                    </p>
                  </div>
                `).join('')}
                
                ${remainingCount > 0 ? `
                  <div style="font-size: 8pt; font-style: italic; text-align: center; color: #666; padding-top: 2px; border-top: 1px dashed #ccc;">
                    + ${remainingCount} more registered producers listed in the online portal
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  // 4. Fill print template, invoke print, and clean up
  dom.printCatalogTemplate.innerHTML = html;
  window.print();
  dom.printCatalogTemplate.innerHTML = '';
}

// ── OPEN INQUIRY MODAL ──
function openInquiryModal(artisan) {
  state.lastFocusedElement = document.activeElement;
  state.targetArtisan = artisan;
  dom.inqArtisanName.textContent = artisan.businessName;
  dom.inqProductName.textContent = state.selectedProduct.name;
  
  dom.inquiryForm.classList.remove('hidden');
  dom.inqSuccessSection.classList.add('hidden');
  dom.inquiryModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => dom.closeInqBtn.focus());
}

// ── EVENT LISTENERS SETUP ──
function setupEventListeners() {
  // 1. Tab switches
  dom.tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });

  // Left/Right arrow key navigation for main portal tabs
  dom.tabBtns.forEach((btn) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const visibleTabs = [...dom.tabBtns].filter(b => !b.hasAttribute('hidden'));
        const currentIdx = visibleTabs.indexOf(btn);
        let nextIdx = currentIdx;
        
        if (e.key === 'ArrowRight') {
          nextIdx = (currentIdx + 1) % visibleTabs.length;
        } else if (e.key === 'ArrowLeft') {
          nextIdx = (currentIdx - 1 + visibleTabs.length) % visibleTabs.length;
        }
        
        const nextBtn = visibleTabs[nextIdx];
        if (nextBtn) {
          nextBtn.focus();
          switchTab(nextBtn.dataset.tab);
        }
      }
    });
  });

  // Header Utility Desk Clicks
  const weaverBtn = document.getElementById('utility-weaver-btn');
  if (weaverBtn) {
    weaverBtn.addEventListener('click', () => {
      switchTab('registration');
    });
  }
  const staffBtn = document.getElementById('utility-staff-btn');
  if (staffBtn) {
    staffBtn.addEventListener('click', () => {
      switchTab('admin');
    });
  }

  // Load More Products click binding
  if (dom.loadMoreBtn) {
    dom.loadMoreBtn.addEventListener('click', () => {
      state.visibleProductLimit += 12;
      renderProducts();
    });
  }

  // 2. Search filtering
  dom.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    state.visibleProductLimit = 12;
    dom.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
    renderProducts();
  });

  dom.clearSearchBtn.addEventListener('click', () => {
    state.searchQuery = '';
    state.visibleProductLimit = 12;
    dom.searchInput.value = '';
    dom.clearSearchBtn.style.display = 'none';
    renderProducts();
  });

  // 3. Category filters
  dom.catBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      dom.catBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      state.selectedCategory = btn.dataset.category;
      state.visibleProductLimit = 12;
      renderProducts();
    });
  });

  // 4. District filter select dropdown
  const distSelect = document.getElementById('district-filter');
  if (distSelect) {
    distSelect.addEventListener('change', (e) => {
      // Highlight matching hotspot on map if selected
      const selected = e.target.value;
      state.visibleProductLimit = 12;
      document.querySelectorAll('.map-hotspot').forEach((hotspot) => {
        hotspot.classList.toggle('active', hotspot.dataset.district === selected);
      });
      renderProducts();
    });
  }

  // 5. Language Switcher Button Trigger
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      state.language = state.language === 'en' ? 'hi' : 'en';
      langToggleBtn.textContent = state.language === 'en' ? 'हिंदी / HINDI' : 'ENGLISH / अंग्रेजी';
      langToggleBtn.setAttribute(
        'aria-label',
        state.language === 'en' ? 'Switch language to Hindi' : 'Switch language to English'
      );
      updateLanguageUI();
    });
  }

  // 6. Modal closes
  dom.closeModalBtn.addEventListener('click', () => closeModal(dom.productModal));
  dom.closeInqBtn.addEventListener('click', () => closeModal(dom.inquiryModal));
  dom.closeVideoBtn.addEventListener('click', () => {
    closeModal(dom.videoLightbox);
    dom.videoLightbox.querySelector('.video-player-container').innerHTML = ''; // Stop video playback
  });
  
  // Close modals when clicking overlay
  [dom.productModal, dom.inquiryModal, dom.registryModal, dom.videoLightbox].forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
        if (overlay === dom.videoLightbox) {
          dom.videoLightbox.querySelector('.video-player-container').innerHTML = ''; // Stop video
        }
      }
    });
  });

  // 7. Submit Business Inquiry
  dom.inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const buyerName = document.getElementById('inq-buyer-name').value;
    const buyerEmail = document.getElementById('inq-buyer-email').value;
    const buyerPhone = document.getElementById('inq-buyer-phone').value;
    const qty = document.getElementById('inq-qty').value;
    const msg = document.getElementById('inq-msg').value;

    const newInquiry = {
      id: `inq-${Date.now()}`,
      artisanId: state.targetArtisan.id,
      artisanName: state.targetArtisan.businessName,
      productId: state.selectedProduct.id,
      productName: state.selectedProduct.name,
      buyerName,
      buyerEmail,
      buyerPhone,
      queryText: msg,
      targetQuantity: Number(qty),
      submittedAt: new Date().toISOString()
    };

    state.buyerInquiries.push(newInquiry);
    saveInquiries();

    dom.inquiryForm.classList.add('hidden');
    dom.inqSuccessSection.classList.remove('hidden');
    dom.inquiryForm.reset();

    setTimeout(() => {
      dom.inquiryModal.classList.add('hidden');
      renderAdminDashboard(); 
    }, 2200);
  });

  // 8. Artisan Registration File Upload Simulator
  dom.dragDropZone.addEventListener('click', () => dom.regFileInput.click());
  dom.regFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      state.dummyFileName = file.name;
      dom.uploadFeedback.textContent = `✓ Selected: ${file.name}`;
      dom.dragDropZone.style.borderColor = 'var(--green-success)';
    }
  });

  dom.dragDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dom.dragDropZone.style.borderColor = 'var(--gold-primary)';
  });

  dom.dragDropZone.addEventListener('dragleave', () => {
    dom.dragDropZone.style.borderColor = 'var(--panel-border)';
  });

  dom.dragDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      state.dummyFileName = file.name;
      dom.uploadFeedback.textContent = `✓ Dropped: ${file.name}`;
      dom.dragDropZone.style.borderColor = 'var(--green-success)';
    }
  });

  // 9. Artisan Registration Form Submit
  dom.artisanRegForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const productId = dom.regProductSelect.value;
    const businessName = document.getElementById('reg-business-name').value;
    const artisanName = document.getElementById('reg-artisan-name').value;
    const registrationNo = document.getElementById('reg-no').value;
    const district = document.getElementById('reg-district').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const whatsapp = document.getElementById('reg-whatsapp').value;
    const address = document.getElementById('reg-address').value;

    if (!productId) {
      alert("Please select a product!");
      return;
    }

    const selectedProd = GI_PRODUCTS.find(p => p.id === productId);
    
    const newArtisan = {
      id: `au-reg-${Date.now()}`,
      productId,
      productName: selectedProd.name,
      businessName,
      artisanName,
      registrationNo,
      district,
      phone,
      whatsapp: whatsapp.replace(/\D/g, ''),
      email,
      address,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    state.authorizedUsers.push(newArtisan);
    saveUsers();

    dom.artisanRegForm.classList.add('hidden');
    if (state.language === 'en') {
      dom.regSuccessMsg.innerHTML = `A local draft for <strong>${businessName}</strong> under <strong>${formatProductName(selectedProd.name)}</strong> has been saved on this device. It has not been transmitted to NABARD or the GI Registry.`;
    } else {
      dom.regSuccessMsg.innerHTML = `<strong>${formatProductName(selectedProd.name)}</strong> के अंतर्गत <strong>${businessName}</strong> का मसौदा इस डिवाइस पर सहेजा गया है। इसे नाबार्ड या जीआई रजिस्ट्री को भेजा नहीं गया है।`;
    }
    dom.regSuccessCard.classList.remove('hidden');
  });

  dom.resetRegBtn.addEventListener('click', () => {
    dom.artisanRegForm.reset();
    state.dummyFileName = null;
    dom.uploadFeedback.textContent = '';
    dom.dragDropZone.style.borderColor = 'var(--panel-border)';
    dom.regSuccessCard.classList.add('hidden');
    dom.artisanRegForm.classList.remove('hidden');
  });

  // 10. Admin Login Verification
  dom.adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = dom.adminPassInput.value;
    dom.adminPassInput.value = '';
    if (pass === 'nabard123' || pass === 'admin') {
      state.adminLoggedIn = true;
      dom.loginError.textContent = '';
      showAdminDashboard();
    } else {
      dom.loginError.textContent = state.language === 'en' 
        ? 'Invalid credentials. Please enter a valid password.' 
        : 'अमान्य क्रेडेंशियल। कृपया एक मान्य पासवर्ड दर्ज करें।';
    }
  });

  dom.quickAccessBtn.addEventListener('click', () => {
    state.adminLoggedIn = true;
    dom.loginError.textContent = '';
    dom.adminPassInput.value = '';
    showAdminDashboard();
  });

  dom.adminLogoutBtn.addEventListener('click', () => {
    state.adminLoggedIn = false;
    dom.adminDashboard.classList.add('hidden');
    dom.adminLoginCard.classList.remove('hidden');
  });

  // 11. Verification Simulator Dialog approvals
  dom.registryDismissBtn.addEventListener('click', () => closeModal(dom.registryModal));

  // 12. Tracing desk verification
  const traceBtn = document.getElementById('trace-btn');
  const tracingInput = document.getElementById('tracing-input');
  if (traceBtn && tracingInput) {
    traceBtn.addEventListener('click', () => {
      runProductTrace(tracingInput.value);
    });
    tracingInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        runProductTrace(tracingInput.value);
      }
    });
  }

  // 13. PDF Compiler trigger listener
  const compileBtn = document.getElementById('compile-pdf-btn');
  if (compileBtn) {
    compileBtn.addEventListener('click', compileFilteredCatalogPrint);
  }

  // 14. Artisan Registration <=> Login View Toggling
  if (dom.toggleToLoginBtn) {
    dom.toggleToLoginBtn.addEventListener('click', () => {
      state.artisanShowLogin = true;
      updateArtisanRegistrationTabVisibility();
    });
  }
  if (dom.toggleToRegBtn) {
    dom.toggleToRegBtn.addEventListener('click', () => {
      state.artisanShowLogin = false;
      updateArtisanRegistrationTabVisibility();
    });
  }

  // 15. Artisan Login Submission
  if (dom.artisanLoginForm) {
    dom.artisanLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailOrId = dom.artisanLoginEmail.value.trim();
      const pass = dom.artisanLoginPass.value;
      
      const res = handleArtisanLogin(emailOrId, pass);
      if (res.success) {
        state.artisanUser = res.user;
        dom.artisanLoginEmail.value = '';
        dom.artisanLoginPass.value = '';
        dom.artisanLoginError.textContent = '';
        updateArtisanRegistrationTabVisibility();
      } else {
        dom.artisanLoginError.textContent = res.error;
      }
    });
  }

  // 16. Artisan Logout
  if (dom.artisanLogoutBtn) {
    dom.artisanLogoutBtn.addEventListener('click', () => {
      state.artisanUser = null;
      updateArtisanRegistrationTabVisibility();
    });
  }

  // 17. Artisan Dashboard Tabs Navigation
  dom.dashTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.dashTab;
      
      // Update active tab buttons
      dom.dashTabBtns.forEach(b => b.classList.toggle('active', b === btn));
      
      // Show/hide sub-panels
      dom.dashTabPanels.forEach(panel => {
        panel.classList.toggle('active', panel.id === `dash-panel-${targetTab}`);
      });
    });

    // Arrow navigation for dash tabs
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const currentIdx = [...dom.dashTabBtns].indexOf(btn);
        let nextIdx = currentIdx;

        if (e.key === 'ArrowRight') {
          nextIdx = (currentIdx + 1) % dom.dashTabBtns.length;
        } else if (e.key === 'ArrowLeft') {
          nextIdx = (currentIdx - 1 + dom.dashTabBtns.length) % dom.dashTabBtns.length;
        }

        dom.dashTabBtns[nextIdx].focus();
        dom.dashTabBtns[nextIdx].click();
      }
    });
  });

  // 18. Save Artisan Profile Changes
  if (dom.dashProfileForm) {
    dom.dashProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.artisanUser) return;
      
      // Update artisanUser local values
      state.artisanUser.businessName = dom.dashInputBiz.value.trim();
      state.artisanUser.artisanName = dom.dashInputLead.value.trim();
      state.artisanUser.phone = dom.dashInputPhone.value.trim();
      state.artisanUser.whatsapp = dom.dashInputWhatsapp.value.trim().replace(/\D/g, '');
      state.artisanUser.email = dom.dashInputEmail.value.trim();
      state.artisanUser.address = dom.dashInputAddress.value.trim();
      
      // Sync back to state.authorizedUsers registry list
      const idx = state.authorizedUsers.findIndex(u => u.id === state.artisanUser.id);
      if (idx !== -1) {
        state.authorizedUsers[idx] = { ...state.authorizedUsers[idx], ...state.artisanUser };
      }
      
      saveUsers();
      
      // Re-render other components
      renderProducts();
      
      dom.dashProfileFeedback.textContent = state.language === 'en' ? '✓ Profile changes saved live!' : '✓ प्रोफ़ाइल परिवर्तन सहेज लिए गए हैं!';
      setTimeout(() => {
        dom.dashProfileFeedback.textContent = '';
      }, 3000);
    });
  }

  // 19. Mint New Batch Modal and Form
  if (dom.btnShowMintModal) {
    dom.btnShowMintModal.addEventListener('click', () => {
      state.lastFocusedElement = document.activeElement;
      dom.mintQty.value = '';
      dom.mintQuality.value = '';
      dom.mintErrorMsg.textContent = '';
      dom.mintModal.classList.remove('hidden');
      document.body.classList.add('modal-open');
      requestAnimationFrame(() => dom.closeMintBtn.focus());
    });
  }
  if (dom.closeMintBtn) {
    dom.closeMintBtn.addEventListener('click', () => {
      closeModal(dom.mintModal);
    });
  }
  // Close mintModal when clicking overlay
  if (dom.mintModal) {
    dom.mintModal.addEventListener('click', (e) => {
      if (e.target === dom.mintModal) {
        closeModal(dom.mintModal);
      }
    });
  }

  if (dom.mintForm) {
    dom.mintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.artisanUser) return;
      
      const qty = dom.mintQty.value;
      const qualityText = dom.mintQuality.value.trim();
      
      if (!qty || Number(qty) <= 0) {
        dom.mintErrorMsg.textContent = state.language === 'en' ? 'Please enter a valid quantity.' : 'कृपया एक वैध मात्रा दर्ज करें।';
        return;
      }
      
      // Calculate next Batch ID
      const match = state.artisanUser.registrationNo.match(/\d+$/);
      const num = match ? match[0] : state.artisanUser.id.replace('au-', '').replace('reg-', '');
      let craftCode = 'CRAFT';
      if (state.artisanUser.productId) {
        const parts = state.artisanUser.productId.split('-');
        craftCode = parts.map(p => p.substring(0, 3).toUpperCase()).join('');
      }
      const nextIdx = (state.artisanUser.batches ? state.artisanUser.batches.length : 0) + 1;
      const paddedIdx = String(nextIdx).padStart(3, '0');
      const newBatchId = `B-${num}-${craftCode}-${paddedIdx}`;
      const newCertRef = `CERT-${num}-${paddedIdx}`;
      const today = new Date().toISOString().split('T')[0];

      const newBatch = {
        id: newBatchId,
        date: today,
        qty: Number(qty),
        audit_en: qualityText,
        audit_hi: qualityText,
        certRef: newCertRef
      };
      
      if (!state.artisanUser.batches) {
        state.artisanUser.batches = [];
      }
      state.artisanUser.batches.push(newBatch);
      
      // Update registry record
      const idx = state.authorizedUsers.findIndex(u => u.id === state.artisanUser.id);
      if (idx !== -1) {
        state.authorizedUsers[idx] = { ...state.authorizedUsers[idx], ...state.artisanUser };
      }
      
      saveUsers();
      
      // Re-render batches list
      renderArtisanBatches();
      
      // Hide modal
      dom.mintModal.classList.add('hidden');
    });
  }
}

// ── KEYBOARD SHORTCUTS ──
function setupKeyboardShortcuts() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(dom.productModal);
      closeModal(dom.inquiryModal);
      closeModal(dom.registryModal);
      closeModal(dom.mintModal);
      closeModal(dom.videoLightbox);
      dom.videoLightbox.querySelector('.video-player-container').innerHTML = '';
      return;
    }

    if (e.key === 'Tab') {
      const openDialog = [dom.productModal, dom.inquiryModal, dom.videoLightbox, dom.registryModal, dom.mintModal]
        .find((dialog) => dialog && !dialog.classList.contains('hidden'));
      if (openDialog) {
        const focusable = [...openDialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )].filter((element) => element.offsetParent !== null);
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    if (
      document.activeElement.tagName === 'INPUT' ||
      document.activeElement.tagName === 'TEXTAREA' ||
      document.activeElement.tagName === 'SELECT'
    ) {
      return;
    }

    const key = e.key.toLowerCase();
    
    if (key === '1' || (e.altKey && key === '1')) {
      e.preventDefault();
      switchTab('catalogue');
    }
    else if (key === '2' || (e.altKey && key === '2')) {
      e.preventDefault();
      switchTab('registration');
    }
    else if (key === '3' || (e.altKey && key === '3')) {
      e.preventDefault();
      switchTab('about');
    }
  });
}

// ── TAB SWITCH LOGIC ──
function switchTab(tabName) {
  state.activeTab = tabName;
  
  dom.tabBtns.forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  dom.panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === `panel-${tabName}`);
  });

  if (tabName === 'registration') {
    updateArtisanRegistrationTabVisibility();
  }
}

// ── SVG MAP MOUSEOVER & CLICK LISTENERS ──
function setupMapTooltipEvents() {
  const upMap = document.getElementById('up-svg-map');
  const tooltip = document.getElementById('map-tooltip');
  if (!upMap || !tooltip) return;

  const hotspots = upMap.querySelectorAll('.map-hotspot');
  hotspots.forEach((hotspot) => {
    const district = hotspot.dataset.district;
    hotspot.setAttribute('tabindex', '0');
    hotspot.setAttribute('role', 'button');
    hotspot.setAttribute('aria-label', `Filter products from ${district}`);

    hotspot.addEventListener('mouseenter', () => {
      // Find count of products in this district
      const matchedProds = GI_PRODUCTS.filter(p => p.district.toLowerCase().includes(district.toLowerCase()));
      const count = matchedProds.length;
      
      const labelText = state.language === 'en' ? 'Registered GIs' : 'पंजीकृत जीआई';
      tooltip.innerHTML = `<strong>${district}</strong><br>${count} ${labelText}`;
      tooltip.classList.remove('hidden');

      // Geolocation positioning
      const rect = upMap.getBoundingClientRect();
      const wrapperRect = upMap.parentElement.getBoundingClientRect();
      const cx = Number(hotspot.querySelector('.pulse-core').getAttribute('cx'));
      const cy = Number(hotspot.querySelector('.pulse-core').getAttribute('cy'));
      
      const px = (cx / 600) * rect.width + (rect.left - wrapperRect.left);
      const py = (cy / 400) * rect.height + (rect.top - wrapperRect.top);

      tooltip.style.left = `${px}px`;
      tooltip.style.top = `${py}px`;
    });

    hotspot.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
    });

    hotspot.addEventListener('click', () => {
      hotspots.forEach(h => h.classList.remove('active'));
      hotspot.classList.add('active');

      // Filter select dropdown
      const filterSelect = document.getElementById('district-filter');
      if (filterSelect) {
        // Find option matching this district name
        let matchedVal = 'All';
        for (let i = 0; i < filterSelect.options.length; i++) {
          if (filterSelect.options[i].value.toLowerCase() === district.toLowerCase()) {
            matchedVal = filterSelect.options[i].value;
            break;
          }
        }
        filterSelect.value = matchedVal;
      }
      renderProducts();

      // Scroll to catalog grid
      document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' });
    });

    hotspot.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        hotspot.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    });
  });
}

// ── ADMINISTRATIVE PORTAL ──
function showAdminDashboard() {
  dom.adminLoginCard.classList.add('hidden');
  renderAdminDashboard();
  dom.adminDashboard.classList.remove('hidden');
}

function renderAdminDashboard() {
  const pendingList = state.authorizedUsers.filter(u => u.status === 'pending');
  const approvedList = state.authorizedUsers.filter(u => u.status === 'approved');
  const inquiriesList = [...state.buyerInquiries].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  dom.statProducts.textContent = GI_PRODUCTS.length;
  dom.statApproved.textContent = approvedList.length;
  dom.statPending.textContent = pendingList.length;
  dom.statInquiries.textContent = inquiriesList.length;
  dom.pendingCount.textContent = pendingList.length;
  dom.inquiryCount.textContent = inquiriesList.length;

  // Render pending applications
  dom.pendingList.innerHTML = '';
  if (pendingList.length === 0) {
    dom.pendingList.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted); font-size: 0.9rem;">
        No applications waiting for verification. All clear!
      </div>
    `;
  } else {
    pendingList.forEach((user) => {
      const item = document.createElement('div');
      item.className = 'pending-item';
      item.innerHTML = `
        <div class="pending-item-header">
          <h5>${user.businessName}</h5>
          <span>${user.productName}</span>
        </div>
        <table class="pending-details-table">
          <tr><td>Lead:</td><td>${user.artisanName}</td></tr>
          <tr><td>AU Reg No:</td><td>${user.registrationNo}</td></tr>
          <tr><td>District:</td><td>${user.district}</td></tr>
          <tr><td>Contact:</td><td>📞 ${user.phone} | ✉ ${user.email}</td></tr>
        </table>
        <div class="pending-actions">
          <button class="verify-btn" data-id="${user.id}">🔍 Verify Certificate</button>
          <button class="approve-btn" data-id="${user.id}">✓ Approve</button>
          <button class="reject-btn" data-id="${user.id}">× Reject</button>
        </div>
      `;

      item.querySelector('.verify-btn').addEventListener('click', () => runVerificationSimulation(user));
      item.querySelector('.approve-btn').addEventListener('click', () => approveApplication(user.id));
      item.querySelector('.reject-btn').addEventListener('click', () => rejectApplication(user.id));

      dom.pendingList.appendChild(item);
    });
  }

  // Render buyer inquiries log
  dom.inquiryList.innerHTML = '';
  if (inquiriesList.length === 0) {
    dom.inquiryList.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted); font-size: 0.9rem;">
        No trade inquiries logged yet.
      </div>
    `;
  } else {
    inquiriesList.forEach((inq) => {
      const card = document.createElement('div');
      card.className = 'inq-log-card';
      card.innerHTML = `
        <div class="inq-log-header">
          <span class="inq-log-buyer">Buyer: ${inq.buyerName}</span>
          <span class="inq-log-qty">Qty Needed: ${inq.targetQuantity}</span>
        </div>
        <div class="inq-log-msg">"${inq.queryText}"</div>
        <div class="inq-log-details">
          To: <strong style="color: var(--gold-primary);">${inq.artisanName}</strong> | Product: ${inq.productName}
        </div>
        <div class="inq-log-contacts">
          <span>📧 ${inq.buyerEmail}</span>
          <span>📞 ${inq.buyerPhone}</span>
        </div>
      `;
      dom.inquiryList.appendChild(card);
    });
  }
}

// ── VERIFICATION JOURNAL SIMULATION ──
function runVerificationSimulation(user) {
  state.lastFocusedElement = document.activeElement;
  dom.registryVerifiedState.classList.add('hidden');
  dom.registryCheckingState.classList.remove('hidden');
  dom.registryModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  requestAnimationFrame(() => dom.registryDismissBtn.focus());

  dom.cellAuNo.textContent = user.registrationNo;
  dom.cellName.textContent = user.artisanName;
  dom.cellProp.textContent = user.businessName;
  dom.cellProduct.textContent = user.productName;

  setTimeout(() => {
    dom.registryCheckingState.classList.add('hidden');
    dom.registryVerifiedState.classList.remove('hidden');
    requestAnimationFrame(() => dom.registryApproveBtn.focus());
  }, 2200);

  dom.registryApproveBtn.onclick = () => {
    approveApplication(user.id);
    closeModal(dom.registryModal);
  };
}

function approveApplication(id) {
  state.authorizedUsers = state.authorizedUsers.map((u) => {
    if (u.id === id) {
      const updated = { 
        ...u, 
        status: 'approved', 
        verifiedAt: new Date().toISOString() 
      };
      ensureBatches(updated);
      return updated;
    }
    return u;
  });
  saveUsers();
  renderAdminDashboard();
  renderProducts(); 
}

function rejectApplication(id) {
  state.authorizedUsers = state.authorizedUsers.map((u) => {
    if (u.id === id) {
      return { ...u, status: 'rejected' };
    }
    return u;
  });
  saveUsers();
  renderAdminDashboard();
  renderProducts(); 
}

// ── PRODUCT TRACING & AUTHENTICITY DESK ──
function runProductTrace(queryVal) {
  const resultDiv = document.getElementById('tracing-result');
  if (!resultDiv) return;
  
  resultDiv.innerHTML = '';
  resultDiv.classList.remove('hidden');
  
  const normalized = queryVal.trim().toLowerCase();
  if (!normalized) {
    resultDiv.innerHTML = `
      <div class="trace-error">
        ⚠️ ${state.language === 'en' ? 'Please enter a valid Registration Number or batch ID.' : 'कृपया एक वैध पंजीकरण संख्या या बैच आईडी दर्ज करें।'}
      </div>
    `;
    return;
  }
  
  let matchedUser = null;
  let matchedBatch = null;
  
  // Try matching batch ID first
  for (const user of state.authorizedUsers) {
    if (user.batches && user.status === 'approved') {
      const batch = user.batches.find(b => b.id.toLowerCase() === normalized || (b.certRef && b.certRef.toLowerCase() === normalized) || (b.txHash && b.txHash.toLowerCase() === normalized));
      if (batch) {
        matchedUser = user;
        matchedBatch = batch;
        break;
      }
    }
  }
  
  // If no batch matches, try matching standard registration number/ID
  if (!matchedBatch) {
    matchedUser = state.authorizedUsers.find((user) => {
      return (
        user.registrationNo.toLowerCase().includes(normalized) ||
        user.id.toLowerCase() === normalized ||
        (normalized.length >= 3 && user.registrationNo.endsWith(normalized))
      );
    });
  }
  
  // Render loading state with progress loader and network steps
  const isEn = state.language === 'en';
  resultDiv.innerHTML = `
    <div class="trace-loading-container">
      <div class="trace-loader-header">
        <span class="trace-spinner">⚙️</span>
        <span class="trace-loader-title">${isEn ? 'Connecting to GI Registry Database...' : 'जीआई रजिस्ट्री डेटाबेस से जुड़ रहा है...'}</span>
      </div>
      <div class="trace-progress-track">
        <div id="trace-bar" class="trace-progress-bar" style="width: 0%;"></div>
      </div>
      <div class="trace-steps-list">
        <div id="trace-step-1" class="trace-step-item active">
          <span class="trace-step-dot"></span>
          <span>${isEn ? 'Establishing secure handshake with api.ipindia.gov.in...' : 'api.ipindia.gov.in के साथ सुरक्षित हैंडशेक स्थापित किया जा रहा है...'}</span>
        </div>
        <div id="trace-step-2" class="trace-step-item">
          <span class="trace-step-dot"></span>
          <span>${isEn ? 'Querying Part B Register (Authorized Users Database)...' : 'भाग बी रजिस्टर (अधिकृत उपयोगकर्ता डेटाबेस) को खोजा जा रहा है...'}</span>
        </div>
        <div id="trace-step-3" class="trace-step-item">
          <span class="trace-step-dot"></span>
          <span>${isEn ? 'Resolving cryptographic batch signature...' : 'क्रिप्टोग्राफिक बैच हस्ताक्षर को सत्यापित किया जा रहा है...'}</span>
        </div>
        <div id="trace-step-4" class="trace-step-item">
          <span class="trace-step-dot"></span>
          <span>${isEn ? 'Registry record validated successfully.' : 'रजिस्ट्री रिकॉर्ड सफलतापूर्वक सत्यापित किया गया।'}</span>
        </div>
      </div>
    </div>
  `;
  
  const progressBar = document.getElementById('trace-bar');
  const steps = [
    { time: 0, active: 'trace-step-1' },
    { time: 300, done: 'trace-step-1', active: 'trace-step-2' },
    { time: 650, done: 'trace-step-2', active: 'trace-step-3' },
    { time: 950, done: 'trace-step-3', active: 'trace-step-4' },
    { time: 1200, done: 'trace-step-4' }
  ];
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += 8.33;
    if (progress > 100) progress = 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }, 100);
  
  steps.forEach(step => {
    setTimeout(() => {
      if (step.done) {
        const d = document.getElementById(step.done);
        if (d) {
          d.classList.remove('active');
          d.classList.add('done');
        }
      }
      if (step.active) {
        const a = document.getElementById(step.active);
        if (a) {
          a.classList.add('active');
        }
      }
    }, step.time);
  });
  
  setTimeout(() => {
    clearInterval(interval);
    
    // Render final verification result
    if (matchedBatch) {
      renderBatchLedgerCard(resultDiv, matchedUser, matchedBatch);
    } else if (matchedUser && matchedUser.status === 'approved') {
      renderUserCertificateCard(resultDiv, matchedUser);
    } else {
      renderErrorCard(resultDiv, queryVal);
    }
  }, 1250);
}

function renderUserCertificateCard(resultDiv, matchedUser) {
  resultDiv.innerHTML = `
    <div class="authenticity-certificate">
      <div class="cert-header">
        <img src="nabard_logo_ppt.png?v=2.3" alt="NABARD Logo" class="cert-logo">
        <div class="cert-title-col">
          <h4>${state.language === 'en' ? 'LOCAL REGISTRATION DRAFT' : 'स्थानीय पंजीकरण मसौदा'}</h4>
          <p>${state.language === 'en' ? 'Not an official certificate' : 'यह आधिकारिक प्रमाण पत्र नहीं है'}</p>
        </div>
      </div>
      <div class="cert-body">
        <p class="cert-intro">
          ${state.language === 'en' 
            ? `This locally saved record references Registration No <strong>${matchedUser.registrationNo}</strong>. Confirm the registration and product details independently through the official IP India GI Registry.` 
            : `यह स्थानीय रूप से सहेजा गया रिकॉर्ड पंजीकरण संख्या <strong>${matchedUser.registrationNo}</strong> का संदर्भ देता है। आधिकारिक आईपी इंडिया जीआई रजिस्ट्री के माध्यम से पंजीकरण और उत्पाद विवरण की स्वतंत्र रूप से पुष्टि करें।`}
        </p>
        <table class="cert-table">
          <tr>
            <td>${state.language === 'en' ? 'Certified Producer:' : 'प्रमाणित उत्पादक:'}</td>
            <td><strong>${matchedUser.businessName}</strong></td>
          </tr>
          <tr>
            <td>${state.language === 'en' ? 'Heritage GI Craft:' : 'जीआई विरासत शिल्प:'}</td>
            <td class="gold-text"><strong>${matchedUser.productName}</strong></td>
          </tr>
          <tr>
            <td>${state.language === 'en' ? 'Registry Number:' : 'रजिस्ट्री संख्या:'}</td>
            <td class="font-mono">${matchedUser.registrationNo}</td>
          </tr>
          <tr>
            <td>${state.language === 'en' ? 'Origin Hub:' : 'उत्पत्ति केंद्र:'}</td>
            <td>📍 ${matchedUser.district}, Uttar Pradesh</td>
          </tr>
          <tr>
            <td>${state.language === 'en' ? 'Registry Status:' : 'रजिस्ट्री स्थिति:'}</td>
            <td class="green-text font-bold">● ACTIVE & VERIFIED (Chennai GI Registry Part B)</td>
          </tr>
        </table>
      </div>
      <div class="cert-footer">
        <span>National Bank for Agriculture and Rural Development</span>
        <span class="cert-seal">✓ NABARD SECURED</span>
      </div>
    </div>
  `;
}

function renderBatchLedgerCard(resultDiv, matchedUser, matchedBatch) {
  const isEn = state.language === 'en';
  const auditText = isEn ? matchedBatch.audit_en : matchedBatch.audit_hi;
  const btnId = `copy-tx-${Date.now()}`;
  
  resultDiv.innerHTML = `
    <div class="blockchain-block">
      <div class="block-header-title">
        <span class="block-icon">📦</span>
        <div class="block-title-text">
          <h4>${isEn ? 'NABARD BATCH CERTIFICATE RECORD' : 'नाबार्ड बैच प्रमाण पत्र रिकॉर्ड'}</h4>
          <p>${isEn ? 'QUALITY BATCH AUDIT RECORD (Prototype Portal)' : 'गुणवत्ता बैच ऑडिट रिकॉर्ड (प्रोटोटाइप पोर्टल)'}</p>
        </div>
      </div>

      <div class="block-tx-section">
        <span class="block-tx-label">${isEn ? 'Lot Certificate Reference' : 'लॉट प्रमाण पत्र संदर्भ'}</span>
        <div class="block-tx-hash-row">
          <span class="block-tx-hash font-mono">${matchedBatch.certRef || matchedBatch.txHash || 'N/A'}</span>
        </div>
      </div>
      
      <div class="block-grid-details">
        <div class="block-detail-item">
          <span class="block-detail-label">${isEn ? 'Batch Identification' : 'बैच पहचान संख्या'}</span>
          <span class="block-detail-val font-mono">${matchedBatch.id}</span>
        </div>
        <div class="block-detail-item">
          <span class="block-detail-label">${isEn ? 'Inspected Quantity' : 'निरीक्षित मात्रा'}</span>
          <span class="block-detail-val">${matchedBatch.qty} ${isEn ? 'units' : 'इकाइयाँ'}</span>
        </div>
        <div class="block-detail-item">
          <span class="block-detail-label">${isEn ? 'Date of Crafting' : 'निर्माण की तिथि'}</span>
          <span class="block-detail-val font-mono">${matchedBatch.date}</span>
        </div>
        <div class="block-detail-item">
          <span class="block-detail-label">${isEn ? 'Certified Producer' : 'प्रमाणित उत्पादक'}</span>
          <span class="block-detail-val">${matchedUser.businessName}</span>
        </div>
        <div class="block-detail-item" style="grid-column: span 2;">
          <span class="block-detail-label">${isEn ? 'Quality Verification Audit' : 'गुणवत्ता सत्यापन ऑडिट'}</span>
          <span class="block-detail-val inspected">✓ ${auditText}</span>
        </div>
      </div>
      
      <div class="blockchain-footer">
        <span>Verified Node: IN-BLR-04 (Prototype Hub)</span>
        <span class="ledger-badge-verified">✓ REGISTRY RECORD VERIFIED</span>
      </div>
    </div>
  `;
}

function renderErrorCard(resultDiv, queryVal) {
  resultDiv.innerHTML = `
    <div class="trace-error-card">
      <span class="cert-alert-icon">⚠️</span>
      <h4>${state.language === 'en' ? 'No Certified Record Found' : 'कोई प्रमाणित रिकॉर्ड नहीं मिला'}</h4>
      <p>
        ${state.language === 'en'
          ? `We could not locate any approved Authorized User registry or active product batch under the query "<strong>${queryVal}</strong>". Please ensure you enter the official Chennai Registry Number (e.g. AU/2023/UP/1001) or a valid Batch ID (e.g. B-1001-MIRDAR-001).`
          : `हम खोज "<strong>${queryVal}</strong>" के तहत किसी भी स्वीकृत अधिकृत उपयोगकर्ता रजिस्ट्री या सक्रिय उत्पाद बैच का पता नहीं लगा सके। कृपया सुनिश्चित करें कि आप आधिकारिक चेन्नई रजिस्ट्री संख्या (उदा. AU/2023/UP/1001) या वैध बैच आईडी (उदा. B-1001-MIRDAR-001) दर्ज कर रहे हैं।`}
      </p>
      <a href="https://ipindia.gov.in/registered-gls.htm" target="_blank" class="registry-check-link">
        ${state.language === 'en' ? '🔗 Search Chennai Registry Website (ipindia.gov.in)' : '🔗 चेन्नई रजिस्ट्री वेबसाइट पर खोजें (ipindia.gov.in)'}
      </a>
    </div>
  `;
}

window.copyBlockTxHash = function(hashText, btnId) {
  navigator.clipboard.writeText(hashText).then(() => {
    const btn = document.getElementById(btnId);
    if (btn) {
      const origText = btn.innerHTML;
      btn.innerHTML = state.language === 'en' ? '✅ Copied!' : '✅ कॉपी किया गया!';
      setTimeout(() => {
        btn.innerHTML = origText;
      }, 2000);
    }
  }).catch(err => {
    console.error("Failed to copy transaction hash: ", err);
  });
};

// ── ARTISAN DASHBOARD WORKSPACE HELPER FUNCTIONS ──
function handleArtisanLogin(emailOrId, password) {
  if (!password || password.trim().length < 4) {
    return {
      success: false,
      error: state.language === 'en' ? 'Please enter your password issued by NABARD UP RO.' : 'कृपया NABARD UP RO द्वारा जारी पासवर्ड दर्ज करें।'
    };
  }
  
  const user = state.authorizedUsers.find(u => 
    (u.email && u.email.toLowerCase() === emailOrId.toLowerCase()) || 
    (u.id && u.id.toLowerCase() === emailOrId.toLowerCase())
  );
  
  if (!user) {
    return {
      success: false,
      error: state.language === 'en' ? 'User not found in registry!' : 'रजिस्ट्री में उपयोगकर्ता नहीं मिला!'
    };
  }
  
  if (user.status !== 'approved') {
    return {
      success: false,
      error: state.language === 'en' ? 'Your registration is pending approval by NABARD Admin.' : 'आपका पंजीकरण नाबार्ड व्यवस्थापक द्वारा अनुमोदन के लिए लंबित है।'
    };
  }
  
  return { success: true, user };
}

function updateArtisanRegistrationTabVisibility() {
  if (state.artisanUser) {
    dom.artisanRegView.classList.add('hidden');
    dom.artisanLoginView.classList.add('hidden');
    dom.artisanDashboardView.classList.remove('hidden');
    renderArtisanDashboard();
  } else {
    dom.artisanDashboardView.classList.add('hidden');
    if (state.artisanShowLogin) {
      dom.artisanRegView.classList.add('hidden');
      dom.artisanLoginView.classList.remove('hidden');
    } else {
      dom.artisanRegView.classList.remove('hidden');
      dom.artisanLoginView.classList.add('hidden');
    }
  }
}

function renderArtisanDashboard() {
  if (!state.artisanUser) return;
  
  dom.dashArtisanName.textContent = state.artisanUser.artisanName;
  dom.dashBizName.textContent = state.artisanUser.businessName;
  
  renderArtisanProfile();
  renderArtisanBatches();
  renderArtisanInbox();
}

function renderArtisanProfile() {
  if (!state.artisanUser) return;
  dom.dashInputBiz.value = state.artisanUser.businessName || '';
  dom.dashInputLead.value = state.artisanUser.artisanName || '';
  dom.dashInputReg.value = state.artisanUser.registrationNo || '';
  dom.dashInputPhone.value = state.artisanUser.phone || '';
  dom.dashInputWhatsapp.value = state.artisanUser.whatsapp || '';
  dom.dashInputEmail.value = state.artisanUser.email || '';
  dom.dashInputAddress.value = state.artisanUser.address || '';
}

function renderArtisanBatches() {
  if (!state.artisanUser) return;
  
  ensureBatches(state.artisanUser);
  
  const tbody = dom.dashBatchesTbody;
  tbody.innerHTML = '';
  
  if (!state.artisanUser.batches || state.artisanUser.batches.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">${state.language === 'en' ? 'No active batches.' : 'कोई सक्रिय बैच नहीं।'}</td></tr>`;
    return;
  }
  
  state.artisanUser.batches.forEach(b => {
    const tr = document.createElement('tr');
    const auditText = state.language === 'en' ? (b.audit_en || b.audit_hi) : (b.audit_hi || b.audit_en);
    const certRef = b.certRef || b.txHash || 'N/A';

    tr.innerHTML = `
      <td style="font-weight: 700; color: var(--green-primary);">${b.id}</td>
      <td>${b.date}</td>
      <td><strong>${b.qty}</strong></td>
      <td style="font-size: 0.82rem; color: var(--text-muted);">${auditText}</td>
      <td>
        <span class="tx-hash-badge" style="cursor: default;">
          ${certRef}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderArtisanInbox() {
  if (!state.artisanUser) return;
  
  const inboxList = dom.dashInboxList;
  inboxList.innerHTML = '';
  
  const filtered = state.buyerInquiries.filter(inq => inq.artisanId === state.artisanUser.id);
  
  const badge = dom.dashInboxCount;
  badge.textContent = filtered.length;
  if (filtered.length > 0) {
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
  
  if (filtered.length === 0) {
    inboxList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">${state.language === 'en' ? 'No trade inquiries received yet.' : 'अभी तक कोई व्यापार पूछताछ प्राप्त नहीं हुई है।'}</div>`;
    return;
  }
  
  filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  
  filtered.forEach(inq => {
    const card = document.createElement('div');
    card.className = 'dash-inbox-card';
    
    const dateStr = new Date(inq.submittedAt).toLocaleDateString(state.language === 'en' ? 'en-US' : 'hi-IN', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    const waPhone = inq.buyerPhone.replace(/\D/g, '');
    const waLink = `https://wa.me/${waPhone.startsWith('91') ? waPhone : '91' + waPhone}`;
    
    card.innerHTML = `
      <div class="inbox-card-header">
        <div class="inbox-buyer-info">
          <span class="inbox-buyer-name">${inq.buyerName}</span>
          <span class="inbox-date">${dateStr}</span>
        </div>
        <div class="inbox-meta-tags">
          <span class="inbox-tag qty">${state.language === 'en' ? `Qty: ${inq.targetQuantity}` : `मात्रा: ${inq.targetQuantity}`}</span>
          <a href="mailto:${inq.buyerEmail}" class="inbox-tag email">📧 ${inq.buyerEmail}</a>
          <a href="${waLink}" target="_blank" class="inbox-tag phone">💬 WhatsApp</a>
        </div>
      </div>
      <div style="font-size: 0.85rem; font-weight: 700; color: var(--gold-primary); margin-top: 2px;">
        ${state.language === 'en' ? 'Product:' : 'उत्पाद:'} ${inq.productName}
      </div>
      <div class="inbox-message">${inq.queryText}</div>
    `;
    inboxList.appendChild(card);
  });
}

// ── TEMPLATE TABS SWITCHING ──
function setupTemplateTabs() {
  const btns = document.querySelectorAll('.template-tab-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTemplate = btn.dataset.template;
      const container = btn.closest('.templates-section');
      
      if (!container) return;
      
      container.querySelectorAll('.template-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      container.querySelectorAll('.template-tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetContent = container.querySelector(`#tmpl-${targetTemplate}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const container = btn.closest('.templates-section');
        if (!container) return;
        const siblings = [...container.querySelectorAll('.template-tab-btn')];
        const currentIdx = siblings.indexOf(btn);
        let nextIdx = currentIdx;

        if (e.key === 'ArrowRight') {
          nextIdx = (currentIdx + 1) % siblings.length;
        } else if (e.key === 'ArrowLeft') {
          nextIdx = (currentIdx - 1 + siblings.length) % siblings.length;
        }

        siblings[nextIdx].focus();
        siblings[nextIdx].click();
      }
    });
  });
}

// ── COPY TEMPLATE TEXT TO CLIPBOARD ──
window.copyTemplateText = function(elementId) {
  const textElem = document.getElementById(elementId);
  if (!textElem) return;
  
  const text = textElem.innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(`[onclick="copyTemplateText('${elementId}')"]`);
    if (btn) {
      const origText = btn.innerHTML;
      btn.innerHTML = state.language === 'en' ? '✅ Copied!' : '✅ कॉपी किया गया!';
      setTimeout(() => {
        btn.innerHTML = origText;
      }, 2000);
    }
  }).catch(err => {
    console.error("Failed to copy template text: ", err);
  });
};

// ── IMAGE LIGHTBOX ──────────────────────────────────────────
let _lbImages = [];
let _lbIndex = 0;
let _lbCaption = '';

window.openLightbox = function(startIndex, galleryVarName, caption) {
  _lbImages = window[galleryVarName] || [];
  _lbIndex = startIndex;
  _lbCaption = caption || '';
  if (!_lbImages.length) return;
  const lb = document.getElementById('img-lightbox');
  if (!lb) return;
  lb.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  _lbRender();
  document.getElementById('lightbox-img')?.focus();
};

function _lbRender() {
  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  const caption = document.getElementById('lightbox-caption');
  const prev = document.getElementById('lightbox-prev');
  const next = document.getElementById('lightbox-next');
  if (!img) return;

  // Animate swap
  img.style.opacity = '0';
  img.style.transform = 'scale(0.92)';
  setTimeout(() => {
    img.src = _lbImages[_lbIndex];
    img.alt = _lbCaption + ' — image ' + (_lbIndex + 1);
    img.style.transition = 'opacity 0.2s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)';
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  }, 80);

  if (counter) counter.textContent = (_lbIndex + 1) + ' / ' + _lbImages.length;
  if (caption) caption.textContent = _lbCaption;
  if (prev) prev.disabled = _lbIndex === 0;
  if (next) next.disabled = _lbIndex === _lbImages.length - 1;
}

function _lbClose() {
  const lb = document.getElementById('img-lightbox');
  if (lb) lb.classList.add('hidden');
  document.body.style.overflow = '';
}

// Wire up lightbox controls after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lightbox-close')?.addEventListener('click', _lbClose);

  document.getElementById('lightbox-prev')?.addEventListener('click', () => {
    if (_lbIndex > 0) { _lbIndex--; _lbRender(); }
  });

  document.getElementById('lightbox-next')?.addEventListener('click', () => {
    if (_lbIndex < _lbImages.length - 1) { _lbIndex++; _lbRender(); }
  });

  // Click backdrop to close
  document.getElementById('img-lightbox')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('img-lightbox') ||
        e.target === document.querySelector('.lightbox-img-wrap')) {
      _lbClose();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('img-lightbox');
    if (!lb || lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') _lbClose();
    if (e.key === 'ArrowLeft' && _lbIndex > 0) { _lbIndex--; _lbRender(); }
    if (e.key === 'ArrowRight' && _lbIndex < _lbImages.length - 1) { _lbIndex++; _lbRender(); }
  });
});
