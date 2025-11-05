// constants.ts
import { Law } from './types';

export const LAW_CATEGORIES = [
  'Constitutional Law',
  'Criminal Law',
  'Civil Law',
  'Family Law',
  'Consumer Protection',
  'Property Law',
  'Cyber Law',
  'Labor Law',
  'Environmental Law',
  'Human Rights',
];

export const MOCK_LAWS: Law[] = [
  {
    id: 'law-1',
    category: 'Constitutional Law',
    title: 'Right to Equality',
    articleOrSection: 'Article 14',
    hindiTitle: 'समानता का अधिकार',
    hindiArticleOrSection: 'अनुच्छेद 14',
    explanation: 'Article 14 states that the State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. This means everyone is equal in the eyes of the law.',
    hindiExplanation: 'अनुच्छेद 14 कहता है कि राज्य भारत के क्षेत्र के भीतर किसी भी व्यक्ति को कानून के समक्ष समानता या कानूनों के समान संरक्षण से वंचित नहीं करेगा। इसका मतलब है कि कानून की नजर में हर कोई समान है।',
    keywords: ['equality', 'equal protection', 'fundamental rights', 'discrimination'],
    updatedAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'law-2',
    category: 'Criminal Law',
    title: 'Theft',
    articleOrSection: 'IPC Section 378',
    hindiTitle: 'चोरी',
    hindiArticleOrSection: 'आईपीसी धारा 378',
    explanation: 'Whoever intends to take dishonestly any movable property out of the possession of any person without that person’s consent, moves that property in order to such taking, is said to commit theft.',
    hindiExplanation: 'जो कोई भी बेईमानी से किसी व्यक्ति के कब्जे से उस व्यक्ति की सहमति के बिना कोई जंगम संपत्ति लेने का इरादा रखता है, ऐसी संपत्ति को इस तरह के लेने के लिए हटाता है, उसे चोरी करना कहा जाता है।',
    keywords: ['theft', 'movable property', 'dishonestly', 'consent'],
    updatedAt: '2023-02-20T11:30:00Z',
  },
  {
    id: 'law-3',
    category: 'Consumer Protection',
    title: 'Consumer Rights',
    articleOrSection: 'Consumer Protection Act, 2019',
    hindiTitle: 'उपभोक्ता अधिकार',
    hindiArticleOrSection: 'उपभोक्ता संरक्षण अधिनियम, 2019',
    explanation: 'The Consumer Protection Act, 2019, grants various rights to consumers, including the right to safety, the right to be informed, the right to choose, the right to be heard, the right to seek redressal, and the right to consumer education.',
    hindiExplanation: 'उपभोक्ता संरक्षण अधिनियम, 2019, उपभोक्ताओं को विभिन्न अधिकार प्रदान करता है, जिसमें सुरक्षा का अधिकार, सूचित किए जाने का अधिकार, चुनने का अधिकार, सुने जाने का अधिकार, निवारण मांगने का अधिकार और उपभोक्ता शिक्षा का अधिकार शामिल है।',
    keywords: ['consumer', 'rights', 'protection', 'goods', 'services'],
    updatedAt: '2023-03-10T14:45:00Z',
  },
  {
    id: 'law-4',
    category: 'Family Law',
    title: 'Marriage under Hindu Law',
    articleOrSection: 'Hindu Marriage Act, 1955',
    hindiTitle: 'हिंदू कानून के तहत विवाह',
    hindiArticleOrSection: 'हिंदू विवाह अधिनियम, 1955',
    explanation: 'The Hindu Marriage Act, 1955, codifies the law relating to marriage among Hindus and provides conditions for a valid marriage, registration, and divorce.',
    hindiExplanation: 'हिंदू विवाह अधिनियम, 1955, हिंदुओं के बीच विवाह से संबंधित कानून को संहिताबद्ध करता है और एक वैध विवाह, पंजीकरण और तलाक के लिए शर्तें प्रदान करता है।',
    keywords: ['marriage', 'divorce', 'hindu', 'family', 'act'],
    updatedAt: '2023-04-01T09:00:00Z',
  },
  {
    id: 'law-5',
    category: 'Property Law',
    title: 'Transfer of Property',
    articleOrSection: 'Transfer of Property Act, 1882',
    hindiTitle: 'संपत्ति का हस्तांतरण',
    hindiArticleOrSection: 'संपत्ति हस्तांतरण अधिनियम, 1882',
    explanation: 'This Act regulates the transfer of property by act of parties and defines terms like sale, mortgage, lease, exchange, and gift.',
    hindiExplanation: 'यह अधिनियम पक्षों के कार्य द्वारा संपत्ति के हस्तांतरण को नियंत्रित करता है और बिक्री, गिरवी, पट्टा, विनिमय और उपहार जैसे शब्दों को परिभाषित करता है।',
    keywords: ['property', 'transfer', 'sale', 'mortgage', 'lease'],
    updatedAt: '2023-05-22T16:00:00Z',
  },
  {
    id: 'law-6',
    category: 'Constitutional Law',
    title: 'Right to Life and Personal Liberty',
    articleOrSection: 'Article 21',
    hindiTitle: 'जीवन और व्यक्तिगत स्वतंत्रता का अधिकार',
    hindiArticleOrSection: 'अनुच्छेद 21',
    explanation: 'No person shall be deprived of his life or personal liberty except according to procedure established by law. This article is considered the heart of fundamental rights.',
    hindiExplanation: 'किसी भी व्यक्ति को उसके जीवन या व्यक्तिगत स्वतंत्रता से कानून द्वारा स्थापित प्रक्रिया के अनुसार ही वंचित किया जाएगा। इस अनुच्छेद को मौलिक अधिकारों का हृदय माना जाता है।',
    keywords: ['life', 'liberty', 'personal liberty', 'fundamental rights', 'procedure established by law'],
    updatedAt: '2023-06-18T08:30:00Z',
  },
  {
    id: 'law-7',
    category: 'Criminal Law',
    title: 'Assault',
    articleOrSection: 'IPC Section 351',
    hindiTitle: 'हमला',
    hindiArticleOrSection: 'आईपीसी धारा 351',
    explanation: 'Whoever makes any gesture, or any preparation intending or knowing it to be likely that such gesture or preparation will cause any person present to apprehend that he is about to use criminal force to that person, is said to commit an assault.',
    hindiExplanation: 'जो कोई भी कोई हावभाव या कोई तैयारी करता है, जिसका इरादा या यह जानते हुए कि इस तरह के हावभाव या तैयारी से उपस्थित किसी व्यक्ति को यह आशंका होगी कि वह उस व्यक्ति पर आपराधिक बल का प्रयोग करने वाला है, उसे हमला करना कहा जाता है।',
    keywords: ['assault', 'criminal force', 'gesture', 'preparation', 'apprehension'],
    updatedAt: '2023-07-01T10:15:00Z',
  },
  {
    id: 'law-8',
    category: 'Cyber Law',
    title: 'Cyber Bullying',
    articleOrSection: 'IT Act, 2000 (Sections 66A, 67)',
    hindiTitle: 'साइबर बुलिंग',
    hindiArticleOrSection: 'आईटी अधिनियम, 2000 (धारा 66ए, 67)',
    explanation: 'While "cyber bullying" is not explicitly defined, actions like sending offensive messages (Section 66A, though largely struck down), publishing obscene material (Section 67), or identity theft (Section 66C) are covered under the IT Act, 2000.',
    hindiExplanation: 'हालांकि "साइबर बुलिंग" को स्पष्ट रूप से परिभाषित नहीं किया गया है, लेकिन आपत्तिजनक संदेश भेजना (धारा 66ए, हालांकि काफी हद तक हटा दी गई), अश्लील सामग्री प्रकाशित करना (धारा 67), या पहचान की चोरी (धारा 66सी) जैसे कार्य आईटी अधिनियम, 2000 के तहत आते हैं।',
    keywords: ['cyber', 'bullying', 'online harassment', 'IT Act', 'obscenity'],
    updatedAt: '2023-08-14T13:00:00Z',
  },
  {
    id: 'law-9',
    category: 'Labor Law',
    title: 'Minimum Wages Act',
    articleOrSection: 'Minimum Wages Act, 1948',
    hindiTitle: 'न्यूनतम मजदूरी अधिनियम',
    hindiArticleOrSection: 'न्यूनतम मजदूरी अधिनियम, 1948',
    explanation: 'This Act provides for fixing minimum rates of wages in certain employments. It ensures fair wages for workers and prevents exploitation.',
    hindiExplanation: 'यह अधिनियम कुछ रोजगारों में मजदूरी की न्यूनतम दरें तय करने का प्रावधान करता है। यह श्रमिकों के लिए उचित मजदूरी सुनिश्चित करता है और शोषण को रोकता है।',
    keywords: ['wages', 'minimum', 'labor', 'employment', 'worker'],
    updatedAt: '2023-09-05T09:40:00Z',
  },
  {
    id: 'law-10',
    category: 'Environmental Law',
    title: 'Environmental Protection Act',
    articleOrSection: 'Environmental Protection Act, 1986',
    hindiTitle: 'पर्यावरण संरक्षण अधिनियम',
    hindiArticleOrSection: 'पर्यावरण संरक्षण अधिनियम, 1986',
    explanation: 'The Environmental Protection Act, 1986, aims to protect and improve the human environment, prevent hazards to human beings, other living creatures, plants, and property.',
    hindiExplanation: 'पर्यावरण संरक्षण अधिनियम, 1986 का उद्देश्य मानव पर्यावरण की रक्षा और सुधार करना, मनुष्यों, अन्य जीवित प्राणियों, पौधों और संपत्ति को होने वाले खतरों को रोकना है।',
    keywords: ['environment', 'pollution', 'protection', 'ecology', 'nature'],
    updatedAt: '2023-10-11T12:00:00Z',
  },
];

export const PRIVACY_POLICY_CONTENT_EN = `
  <h2 class="text-2xl font-bold mb-4">Privacy Policy for Samvidhan Setu</h2>
  <p class="mb-2"><strong>Last updated: October 26, 2023</strong></p>
  <p class="mb-4">Samvidhan Setu ("us", "we", or "our") operates the Samvidhan Setu website (the "Service").</p>

  <h3 class="text-xl font-semibold mb-3">Information Collection And Use</h3>
  <p class="mb-2">We collect several different types of information for various purposes to provide and improve our Service to you.</p>
  <h4 class="text-lg font-medium mb-2">Types of Data Collected</h4>
  <p class="mb-1"><strong>Personal Data</strong></p>
  <p class="mb-4">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
  <ul class="list-disc pl-6 mb-4">
    <li>Email address</li>
    <li>Usage Data (e.g., your problem descriptions, chat queries, search terms)</li>
  </ul>

  <p class="mb-1"><strong>Usage Data</strong></p>
  <p class="mb-4">We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

  <h3 class="text-xl font-semibold mb-3">Use of Data</h3>
  <p class="mb-4">Samvidhan Setu uses the collected data for various purposes:</p>
  <ul class="list-disc pl-6 mb-4">
    <li>To provide and maintain the Service</li>
    <li>To notify you about changes to our Service</li>
    <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
    <li>To provide customer care and support</li>
    <li>To provide analysis or valuable information so that we can improve the Service</li>
    <li>To monitor the usage of the Service</li>
    <li>To detect, prevent and address technical issues</li>
    <li>To deliver notifications about new or changed laws (if opted in)</li>
  </ul>

  <h3 class="text-xl font-semibold mb-3">Disclosure Of Data</h3>
  <p class="mb-4">We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
  <ul class="list-disc pl-6 mb-4">
    <li>To comply with a legal obligation</li>
    <li>To protect and defend the rights or property of Samvidhan Setu</li>
    <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
    <li>To protect the personal safety of users of the Service or the public</li>
    <li>To protect against legal liability</li>
  </ul>

  <h3 class="text-xl font-semibold mb-3">Security Of Data</h3>
  <p class="mb-4">The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

  <h3 class="text-xl font-semibold mb-3">Changes To This Privacy Policy</h3>
  <p class="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
  <p class="mb-4">You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
`;

export const PRIVACY_POLICY_CONTENT_HI = `
  <h2 class="text-2xl font-bold mb-4">संविधान सेतु की गोपनीयता नीति</h2>
  <p class="mb-2"><strong>अंतिम अपडेट: 26 अक्टूबर, 2023</strong></p>
  <p class="mb-4">संविधान सेतु ("हम", "हमें", या "हमारा") संविधान सेतु वेबसाइट ("सेवा") का संचालन करता है।</p>

  <h3 class="text-xl font-semibold mb-3">जानकारी का संग्रह और उपयोग</h3>
  <p class="mb-2">हम आपको हमारी सेवा प्रदान करने और सुधारने के लिए विभिन्न उद्देश्यों के लिए कई अलग-अलग प्रकार की जानकारी एकत्र करते हैं।</p>
  <h4 class="text-lg font-medium mb-2">एकत्रित डेटा के प्रकार</h4>
  <p class="mb-1"><strong>व्यक्तिगत डेटा</strong></p>
  <p class="mb-4">हमारी सेवा का उपयोग करते समय, हम आपसे कुछ व्यक्तिगत रूप से पहचान योग्य जानकारी प्रदान करने के लिए कह सकते हैं जिसका उपयोग आपसे संपर्क करने या आपकी पहचान करने के लिए किया जा सकता है ("व्यक्तिगत डेटा")। व्यक्तिगत रूप से पहचान योग्य जानकारी में शामिल हो सकते हैं, लेकिन इन्हीं तक सीमित नहीं हैं:</p>
  <ul class="list-disc pl-6 mb-4">
    <li>ईमेल पता</li>
    <li>उपयोग डेटा (जैसे, आपकी समस्या विवरण, चैट प्रश्न, खोज शब्द)</li>
  </ul>

  <p class="mb-1"><strong>उपयोग डेटा</strong></p>
  <p class="mb-4">जब भी आप हमारी सेवा पर जाते हैं या मोबाइल डिवाइस के माध्यम से सेवा तक पहुंचते हैं, तो आपका ब्राउज़र जो जानकारी भेजता है, उसे भी हम एकत्र कर सकते हैं ("उपयोग डेटा")। इस उपयोग डेटा में आपके कंप्यूटर का इंटरनेट प्रोटोकॉल पता (जैसे, आईपी पता), ब्राउज़र प्रकार, ब्राउज़र संस्करण, हमारी सेवा के वे पृष्ठ जिन्हें आप देखते हैं, आपकी यात्रा का समय और तारीख, उन पृष्ठों पर बिताया गया समय, अद्वितीय डिवाइस पहचानकर्ता और अन्य नैदानिक डेटा जैसी जानकारी शामिल हो सकती है।</p>

  <h3 class="text-xl font-semibold mb-3">डेटा का उपयोग</h3>
  <p class="mb-4">संविधान सेतु एकत्र किए गए डेटा का विभिन्न उद्देश्यों के लिए उपयोग करता है:</p>
  <ul class="list-disc pl-6 mb-4">
    <li>सेवा प्रदान करने और बनाए रखने के लिए</li>
    <li>हमारी सेवा में परिवर्तनों के बारे में आपको सूचित करने के लिए</li>
    <li>जब आप ऐसा करना चुनते हैं तो हमारी सेवा की इंटरैक्टिव सुविधाओं में भाग लेने की अनुमति देने के लिए</li>
    <li>ग्राहक सेवा और सहायता प्रदान करने के लिए</li>
    <li>विश्लेषण या मूल्यवान जानकारी प्रदान करने के लिए ताकि हम सेवा में सुधार कर सकें</li>
    <li>सेवा के उपयोग की निगरानी करने के लिए</li>
    <li>तकनीकी मुद्दों का पता लगाने, रोकने और उन्हें संबोधित करने के लिए</li>
    <li>नए या बदले हुए कानूनों के बारे में सूचनाएं देने के लिए (यदि ऑप्ट-इन किया गया हो)</li>
  </ul>

  <h3 class="text-xl font-semibold mb-3">डेटा का खुलासा</h3>
  <p class="mb-4">हम आपके व्यक्तिगत डेटा का खुलासा इस सद्भावना में कर सकते हैं कि ऐसी कार्रवाई आवश्यक है:</p>
  <ul class="list-disc pl-6 mb-4">
    <li>कानूनी दायित्व का पालन करने के लिए</li>
    <li>संविधान सेतु के अधिकारों या संपत्ति की रक्षा और बचाव के लिए</li>
    <li>सेवा के संबंध में संभावित गलत काम को रोकने या जांच करने के लिए</li>
    <li>सेवा के उपयोगकर्ताओं या जनता की व्यक्तिगत सुरक्षा की रक्षा के लिए</li>
    <li>कानूनी दायित्व से बचाने के लिए</li>
  </ul>

  <h3 class="text-xl font-semibold mb-3">डेटा की सुरक्षा</h3>
  <p class="mb-4">आपके डेटा की सुरक्षा हमारे लिए महत्वपूर्ण है, लेकिन याद रखें कि इंटरनेट पर संचरण का कोई भी तरीका, या इलेक्ट्रॉनिक स्टोरेज का तरीका 100% सुरक्षित नहीं है। जबकि हम आपके व्यक्तिगत डेटा की सुरक्षा के लिए व्यावसायिक रूप से स्वीकार्य साधनों का उपयोग करने का प्रयास करते हैं, हम इसकी पूर्ण सुरक्षा की गारंटी नहीं दे सकते।</p>

  <h3 class="text-xl font-semibold mb-3">इस गोपनीयता नीति में परिवर्तन</h3>
  <p class="mb-4">हम समय-समय पर अपनी गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई गोपनीयता नीति पोस्ट करके आपको किसी भी बदलाव के बारे में सूचित करेंगे।</p>
  <p class="mb-4">आपको किसी भी बदलाव के लिए इस गोपनीयता नीति की समय-समय पर समीक्षा करने की सलाह दी जाती है। इस गोपनीयता नीति में परिवर्तन तब प्रभावी होते हैं जब वे इस पृष्ठ पर पोस्ट किए जाते हैं।</p>
`;
