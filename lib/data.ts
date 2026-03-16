export type PartyId = "DMK" | "AIADMK" | "TVK" | "BJP" | "NTK" | "INC";

export interface Party {
  id: PartyId;
  name: string;
  nameTa: string;
  fullName: string;
  fullNameTa: string;
  alliance: string;
  allianceShort: string;
  gradient: string;
  flagDesc: string;
  flagUrl: string;
  dataYear: number | "2026-partial";
  dataNote?: string;
  partial?: boolean;
}

export interface PolicyOption {
  partyId: PartyId;
  text: string;
  textTa: string;
  partial?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  question: string;
  questionTa: string;
  parties: PartyId[];
  options: PolicyOption[];
}

export const PARTIES: Record<PartyId, Party> = {
  DMK: {
    id: "DMK",
    name: "DMK",
    nameTa: "திமுக",
    fullName: "Dravida Munnetra Kazhagam",
    fullNameTa: "திராவிட முன்னேற்றக் கழகம்",
    alliance: "INDIA Alliance — Secular Progressive Alliance",
    allianceShort: "INDIA Alliance",
    gradient: "linear-gradient(135deg, #111111 0%, #CC1A1A 100%)",
    flagDesc: "Black (top) → Red (bottom). Black = darkness of oppression. Red = rising sun that removes it.",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_DMK.svg/250px-Flag_DMK.svg.png",
    dataYear: 2021,
    dataNote: "Full 505-promise manifesto — sourced directly from official DMK PDF.",
  },
  AIADMK: {
    id: "AIADMK",
    name: "AIADMK",
    nameTa: "அதிமுக",
    fullName: "All India Anna Dravida Munnetra Kazhagam",
    fullNameTa: "அனைத்திந்திய அண்ணா திராவிட முன்னேற்றக் கழகம்",
    alliance: "NDA Alliance — National Democratic Alliance",
    allianceShort: "NDA Alliance",
    gradient: "linear-gradient(135deg, #111111 0%, #BB1A1A 50%, #d0d0d0 100%)",
    flagDesc: "Black → Red → White tricolour with two-leaves symbol in green.",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/AIADMK_Flag.svg/250px-AIADMK_Flag.svg.png",
    dataYear: 2021,
    dataNote: "164-promise manifesto — sourced from TNM, Business Standard, Scroll, India.com (March 2021).",
  },
  TVK: {
    id: "TVK",
    name: "TVK",
    nameTa: "தவெக",
    fullName: "Tamilaga Vettri Kazhagam",
    fullNameTa: "தமிழக வெற்றிக் கழகம்",
    alliance: "Independent — No alliance",
    allianceShort: "Independent",
    gradient: "linear-gradient(135deg, #8B1010 0%, #F5C518 100%)",
    flagDesc: "Red (top + bottom) → Yellow (middle). Two elephants flanking the Vaagai flower — symbol of Tamil victory.",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/TVK_Official_Flag.jpg/250px-TVK_Official_Flag.jpg",
    dataYear: "2026-partial",
    dataNote: "Party founded Feb 2, 2024 — no 2021 data exists. Women's promises from Mar 7, 2026 official event. Other positions from official party statements. Full manifesto not yet released.",
    partial: true,
  },
  BJP: {
    id: "BJP",
    name: "BJP",
    nameTa: "பாஜக",
    fullName: "Bharatiya Janata Party (Tamil Nadu)",
    fullNameTa: "பாரதிய ஜனதா கட்சி (தமிழ்நாடு)",
    alliance: "NDA Alliance — National Democratic Alliance",
    allianceShort: "NDA Alliance",
    gradient: "linear-gradient(135deg, #FF6000 0%, #FFB800 100%)",
    flagDesc: "Saffron → deep orange. Lotus symbol.",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Logo_of_the_Bharatiya_Janata_Party.svg/250px-Logo_of_the_Bharatiya_Janata_Party.svg.png",
    dataYear: 2021,
    dataNote: "Contested 20 of 234 seats in 2021. Manifesto sourced from The News Minute (March 22, 2021).",
  },
  NTK: {
    id: "NTK",
    name: "NTK",
    nameTa: "நாதக",
    fullName: "Naam Tamilar Katchi",
    fullNameTa: "நாம் தமிழர் கட்சி",
    alliance: "Independent — Contesting all 234 seats solo",
    allianceShort: "Independent",
    gradient: "linear-gradient(135deg, #CC0000 0%, #FFD700 100%)",
    flagDesc: "Red flag with golden leaping tiger surrounded by radiating gold rays. Derived symbolically from Chola dynasty tiger.",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Naam_Tamilar_Katchi_Flag.jpg/250px-Naam_Tamilar_Katchi_Flag.jpg",
    dataYear: "2026-partial",
    dataNote: "No formal numbered manifesto. Positions from official party website, Seeman speeches, Wikipedia (ECI-recognised state party since May 2025).",
    partial: true,
  },
  INC: {
    id: "INC",
    name: "INC",
    nameTa: "காங்கிரஸ்",
    fullName: "Indian National Congress (Tamil Nadu)",
    fullNameTa: "இந்திய தேசிய காங்கிரஸ் (தமிழ்நாடு)",
    alliance: "INDIA Alliance — Secular Progressive Alliance",
    allianceShort: "INDIA Alliance",
    gradient: "linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)",
    flagDesc: "Saffron, white and green tricolour with the right hand symbol in the centre.",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Indian_National_Congress_Flag.svg/250px-Indian_National_Congress_Flag.svg.png",
    dataYear: 2021,
    dataNote: "State-specific promises drawn from 2021 Tamil Nadu assembly elections and national manifestos adapted for state context.",
  },
};

export const CATEGORIES: Category[] = [
  {
    id: "welfare",
    name: "Welfare & Subsidies",
    icon: "🏠",
    question: "Which welfare approach would most benefit families in Tamil Nadu?",
    questionTa: "எந்த மக்கள் நலத்திட்டம் தமிழ்நாட்டுக் குடும்பங்களுக்கு அதிக பயன் தரும்?",
    parties: ["DMK", "AIADMK", "TVK", "BJP"],
    options: [
      {
        partyId: "DMK",
        text: "₹4,000 cash to every rice card holder from day one. Petrol cut ₹5/litre, diesel ₹4/litre. Aavin milk at ₹3/litre. Free bus travel for women. Night shelters for pavement dwellers. 3 LED bulbs at subsidised price.",
        textTa: "அனைத்து அரிசி அட்டைதாரர்களுக்கும் முதல் நாளே ₹4,000 ரொக்கம். பெட்ரோல் லிட்டருக்கு ₹5, டீசல் ₹4 குறைப்பு. ஆவின் பால் லிட்டருக்கு ₹3 குறைப்பு. மகளிருக்கு இலவச பேருந்து பயணம். வீடற்றவர்களுக்கு இரவு காப்பகங்கள்."
      },
      {
        partyId: "AIADMK",
        text: "Free home for every homeless family under Amma Housing Scheme. ₹1,500/month to the female head of each household ('Kulavilakku Thittam'). 6 free LPG cylinders/year. Free Amma washing machine for rice-card holders.",
        textTa: "அம்மா வீட்டுவசதி திட்டத்தின் கீழ் வீடற்ற அனைத்து குடும்பங்களுக்கும் இலவச வீடு. குடும்பத் தலைவிகளுக்கு மாதம் ₹1,500 ('குலவிளக்கு திட்டம்'). ஆண்டுக்கு 6 இலவச சமையல் எரிவாயு சிலிண்டர்கள். அரிசி அட்டைதாரர்களுக்கு இலவச அம்மா வாஷிங் மெஷின்."
      },
      {
        partyId: "TVK",
        text: "₹2,500/month to women heads of household up to 60 yrs (govt employees excluded). 6 free LPG cylinders/year under 'Annapoorani Super Six'. Gold ring + newborn kit for every girl child born ('Thaai Maaman' scheme).",
        textTa: "60 வயது வரையிலான குடும்பத் தலைவிகளுக்கு மாதம் ₹2,500 (அரசு ஊழியர்கள் தவிர்த்து). 'அன்னபூரணி சூப்பர் சிக்ஸ்' திட்டத்தின் கீழ் ஆண்டுக்கு 6 இலவச சிலிண்டர்கள். பிறக்கும் ஒவ்வொரு பெண் குழந்தைக்கும் தங்க மோதிரம் மற்றும் கிட் ('தாய் மாமன்' திட்டம்).",
        partial: true,
      },
      {
        partyId: "BJP",
        text: "Door delivery of all ration items. Free two-wheeler driving licence for women aged 18–23 (no test fee). ₹3,000/month pension for widows. ₹6,000 annual support for farmers and fishermen.",
        textTa: "அனைத்து ரேஷன் பொருட்களும் வீடு தேடி விநியோகம். 18-23 வயது மகளிருக்கு இலவச இருசக்கர வாகன ஓட்டுநர் உரிமம். விதவைகளுக்கு மாதம் ₹3,000 ஓய்வூதியம். விவசாயிகளுக்கும் மீனவர்களுக்கும் ஆண்டுக்கு ₹6,000 நிதியுதவி."
      },
    ],
  },
  {
    id: "education",
    name: "Education",
    icon: "📚",
    question: "Which education policy would you support for Tamil Nadu?",
    questionTa: "தமிழ்நாட்டிற்கு எந்த கல்விக் கொள்கையை நீங்கள் ஆதரிப்பீர்கள்?",
    parties: ["DMK", "AIADMK", "TVK", "BJP", "NTK", "INC"],
    options: [
      {
        partyId: "INC",
        text: "Abolish NEET completely. Increase reservation for government school students in medical colleges from 7.5% to 10%. Waive education loans borrowed till December 2020.",
        textTa: "நீட் தேர்வை முற்றிலுமாக ரத்து செய்தல். மருத்துவக் கல்லூரிகளில் அரசுப் பள்ளி மாணவர்களுக்கான இடஒதுக்கீட்டை 7.5% லிருந்து 10% ஆக உயர்த்துதல். டிசம்பர் 2020 வரை பெற்ற கல்விக் கடன்களைத் தள்ளுபடி செய்தல்."
      },
      {
        partyId: "DMK",
        text: "Legislate to ban NEET — admissions on Class 12 marks. Free 4G tablet + 10GB data for every college student. Education loans waived for all graduates under 30. 100% literacy target in 3 years.",
        textTa: "நீட் தேர்வை ரத்து செய்ய சட்டம் - 12ஆம் வகுப்பு மதிப்பெண்கள் அடிப்படையில் சேர்க்கை. அனைத்து கல்லூரி மாணவர்களுக்கும் இலவச 4G டேப்லெட் + 10GB டேட்டா. 30 வயதுக்குட்பட்ட பட்டதாரிகளின் கல்விக் கடன்கள் தள்ளுபடி."
      },
      {
        partyId: "AIADMK",
        text: "Education loan waiver. Free 2GB mobile data/year for college students. Extend mid-day meals to Class 9 and above. Coaching institutes for competitive exams. Separate skill development university.",
        textTa: "கல்விக் கடன் தள்ளுபடி. கல்லூரி மாணவர்களுக்கு ஆண்டுக்கு இலவச 2GB மொபைல் டேட்டா. 9ஆம் வகுப்பு மற்றும் அதற்கு மேல் சத்துணவு திட்டம் விரிவுபடுத்தப்படும். தனி திறன் மேம்பாட்டுப் பல்கலைக்கழகம்."
      },
      {
        partyId: "TVK",
        text: "₹15,000/year per student (Class 1–12) to parents/guardians to prevent dropout ('Kamarajar Education Assurance Scheme'). Abolish NEET. Move Education from Concurrent List back to State List.",
        textTa: "பள்ளி இடைநிற்றலைத் தடுக்க மாணவர்களுக்கு (1 முதல் 12 ஆம் வகுப்பு வரை) ஆண்டுக்கு ₹15,000 ('காமராஜர் கல்வி உறுதித் திட்டம்'). நீட் தேர்வு ரத்து. கல்வியை பொதுப் பட்டியலிலிருந்து மாநிலப் பட்டியலுக்கு மாற்றுதல்.",
        partial: true,
      },
      {
        partyId: "BJP",
        text: "NEET, JEE and CLAT coaching centres in every district. Online Skill Development University. Siddha medicine university in Palani. Thirukkural Mamalai Park in Erode.",
        textTa: "ஒவ்வொரு மாவட்டத்திலும் NEET, JEE மற்றும் CLAT பயிற்சி மையங்கள். ஆன்லைன் திறன் மேம்பாட்டுப் பல்கலைக்கழகம். பழனியில் சித்த மருத்துவப் பல்கலைக்கழகம்."
      },
      {
        partyId: "NTK",
        text: "Abolish NEET completely. Tamil as primary medium of instruction from school through higher education. Oppose National Education Policy (NEP). Free higher education as a right, not a commodity.",
        textTa: "நீட் தேர்வை முற்றிலுமாக ரத்து செய்தல். பள்ளி முதல் உயர்கல்வி வரை தமிழே முதன்மை பயிற்று மொழி. தேசிய கல்விக் கொள்கைக்கு (NEP) எதிர்ப்பு. இலவச உயர்கல்வி உரிமை ஆக்கப்படும்.",
        partial: true,
      },
    ],
  },
  {
    id: "women",
    name: "Women's Rights",
    icon: "⚖️",
    question: "Which approach to women's welfare resonates most with you?",
    questionTa: "மகளிருக்கான எந்த செயல் திட்டம் உங்களை அதிகம் கவர்கிறது?",
    parties: ["DMK", "AIADMK", "TVK"],
    options: [
      {
        partyId: "DMK",
        text: "40% reservation in all govt jobs (up from 30%). 12-month maternity leave for state govt employees. ₹24,000 maternity benefit (up from ₹18,000). Cyber police stations in all districts. Jobs for unmarried women above 35.",
        textTa: "அரசுப் பணிகளில் மகளிருக்கு 40% இடஒதுக்கீடு. மாநில அரசு ஊழியர்களுக்கு 12 மாத மகப்பேறு விடுப்பு. பேறுகால உதவித்தொகை ₹24,000 ஆக உயர்வு. அனைத்து மாவட்டங்களிலும் சைபர் காவல் நிலையங்கள்."
      },
      {
        partyId: "AIADMK",
        text: "₹1,500/month to female head of every family. Maternity leave extended to 1 year. 50% bus fare concession in city buses. Free 6 LPG cylinders. 'Amma bank cards' for women.",
        textTa: "குடும்பத் தலைவிகளுக்கு மாதம் ₹1,500. மகப்பேறு விடுப்பு 1 ஆண்டாக நீட்டிப்பு. நகரப் பேருந்துகளில் 50% கட்டணச் சலுகை. 6 இலவச சமையல் எரிவாயு சிலிண்டர்கள். மகளிருக்கு 'அம்மா வங்கி அட்டைகள்'."
      },
      {
        partyId: "TVK",
        text: "12 confirmed promises (Mar 7, 2026): ₹2,500/month to women heads up to 60 yrs, free bus travel, 500 women-led safety teams with body cams ('Rani Velu Nachiyar Padai'), fast-track courts for crimes against women, ₹5 lakh interest-free SHG loans, free sanitary napkins at ration shops.",
        textTa: "குடும்பத் தலைவிகளுக்கு மாதம் ₹2,500, இலவச பேருந்து பயணம், பாடி கேமராக்களுடன் கூடிய 500 மகளிர் பாதுகாப்புப் படைகள் ('ராணி வேலுநாச்சியார் படை'), பெண்களுக்கு எதிரான குற்றங்களை விசாரிக்க விரைவு நீதிமன்றங்கள், ₹5 லட்சம் வட்டியில்லா மகளிர் சுயஉதவிக் குழு கடன்கள்.",
        partial: true,
      },
    ],
  },
  {
    id: "jobs",
    name: "Jobs & Economy",
    icon: "💼",
    question: "Which jobs and economy strategy would you back?",
    questionTa: "வேலைவாய்ப்பு மற்றும் பொருளாதார மேம்பாட்டிற்கான எந்த திட்டத்தை ஆதரிப்பீர்கள்?",
    parties: ["DMK", "AIADMK", "BJP", "INC"],
    options: [
      {
        partyId: "INC",
        text: "Train 500 youths in every district for government jobs. Provide 50% loan payment support for small and medium industries. Offer five-year tax exemption for new startups.",
        textTa: "அரசுப் பணிகளுக்காக ஒவ்வொரு மாவட்டத்திலும் 500 இளைஞர்களுக்கு பயிற்சி. சிறு, குறு தொழில்களுக்கு 50% கடன் செலுத்தும் ஆதரவு. புதிய ஸ்டார்ட்அப்களுக்கு ஐந்து ஆண்டு வரி விலக்கு."
      },
      {
        partyId: "DMK",
        text: "50 lakh jobs in 5 years (10 lakh/year). 75% of private sector jobs reserved for TN locals. Old Pension Scheme restored, replacing NPS. ₹15,000 crore fund to revive COVID-hit industries. Startups get ₹20 lakh low-interest loans via TIIC.",
        textTa: "5 ஆண்டுகளில் 50 லட்சம் வேலைவாய்ப்புகள். தனியார் துறை வேலைகளில் 75% உள்ளூர் மக்களுக்கு ஒதுக்கீடு. பழைய ஓய்வூதியத் திட்டம் (OPS) மீண்டும் அமல்படுத்தப்படும். ஸ்டார்ட்அப்களுக்கு ₹20 லட்சம் குறைந்த வட்டி கடன்."
      },
      {
        partyId: "AIADMK",
        text: "One guaranteed government job per family that currently has no government employee. Continuation of stable employment creation under proven governance track record.",
        textTa: "அரசு ஊழியர்கள் இல்லாத ஒவ்வொரு குடும்பத்திற்கும் ஒரு அரசு வேலை உறுதி. நிரூபிக்கப்பட்ட நல்லாட்சியின் கீழ் நிலையான வேலைவாய்ப்பு உருவாக்கம் தொடரும்."
      },
      {
        partyId: "BJP",
        text: "50 lakh new jobs in 5 years. 12 lakh acres of Panchami land retrieved and distributed to Scheduled Castes. Online Skill Development University to expand employment pathways.",
        textTa: "5 ஆண்டுகளில் 50 லட்சம் புதிய வேலைவாய்ப்புகள். 12 லட்சம் ஏக்கர் பஞ்சமி நிலம் மீட்கப்பட்டு பட்டியல் சமூகத்தினருக்கு வழங்கப்படும். வேலைவாய்ப்புகளை விரிவுபடுத்த ஆன்லைன் திறன் மேம்பாட்டுப் பல்கலைக்கழகம்."
      },
    ],
  },
  {
    id: "health",
    name: "Healthcare",
    icon: "🏥",
    question: "Which healthcare commitment matters most to you?",
    questionTa: "சுகாதாரத் துறையில் எந்த வாக்குறுதி உங்களுக்கு மிகவும் முக்கியமானது?",
    parties: ["DMK", "AIADMK", "BJP"],
    options: [
      {
        partyId: "DMK",
        text: "100% health insurance for heart, cancer and kidney conditions (Kalaignar Kaapeetu Thittam revived). 2,000 ambulances (6 per Panchayat Union). New specialty hospitals in Coimbatore, Tirunelveli, Trichy, Krishnagiri within 3 years. Immunisation coverage increased from 56% to 100%.",
        textTa: "இதயம், புற்றுநோய் மற்றும் சிறுநீரக நோய்களுக்கு 100% மருத்துவ காப்பீடு (கலைஞர் காப்பீட்டு திட்டம்). 2,000 ஆம்புலன்ஸ்கள். கோவை, நெல்லை, திருச்சி, கிருஷ்ணகிரியில் புதிய பல்நோக்கு மருத்துவமனைகள்."
      },
      {
        partyId: "AIADMK",
        text: "Government multispecialty hospital in every single district with free treatment equivalent to private hospitals. Chief Minister's Comprehensive Health Insurance Scheme expanded.",
        textTa: "தனியார் மருத்துவமனைகளுக்கு இணையான இலவச சிகிச்சையுடன் ஒவ்வொரு மாவட்டத்திலும் அரசு பல்நோக்கு மருத்துவமனை. முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம் விரிவுபடுத்தப்படும்."
      },
      {
        partyId: "BJP",
        text: "Government multispecialty hospital in every district with full free treatment. Fisherfolk above 60 receive ₹3,000/month pension. Specialist hospitals accessible to all without cost.",
        textTa: "முழு இலவச சிகிச்சையுடன் ஒவ்வொரு மாவட்டத்திலும் அரசு பல்நோக்கு மருத்துவமனை. 60 வயதுக்கு மேற்பட்ட மீனவர்களுக்கு மாதம் ₹3,000 ஓய்வூதியம்."
      },
    ],
  },
  {
    id: "farmers",
    name: "Farmers & Agriculture",
    icon: "🌾",
    question: "Which farming and agriculture policy would you support?",
    questionTa: "எந்த விவசாயம் மற்றும் உழவர் நலக் கொள்கையை ஆதரிப்பீர்கள்?",
    parties: ["DMK", "BJP", "NTK"],
    options: [
      {
        partyId: "DMK",
        text: "Farm and jewellery loans of small and medium farmers waived. Paddy MSP raised to ₹2,500/quintal. NREGA extended to 150 days at ₹300/day (from 100 days). 90% subsidy for drip irrigation up to 5 acres. Ban on GMO technology in TN.",
        textTa: "சிறு, குறு விவசாயிகளின் விவசாய மற்றும் நகைக்கடன்கள் தள்ளுபடி. நெல்லுக்கான குறைந்தபட்ச ஆதரவு விலை குவிண்டாலுக்கு ₹2,500 ஆக உயர்வு. 100 நாள் வேலைத்திட்டம் 150 நாட்களாக நீட்டிப்பு (நாள் ஒன்றுக்கு ₹300). மரபணு மாற்றப்பட்ட பயிர்களுக்கு தடை."
      },
      {
        partyId: "BJP",
        text: "₹6,000 annual support for farmers and fishermen. Separate agricultural budget. 5-year river sand mining ban to restore groundwater and rivers; imports allowed during ban.",
        textTa: "விவசாயிகள் மற்றும் மீனவர்களுக்கு ஆண்டுக்கு ₹6,000 நிதியுதவி. தனி வேளாண்மை பட்ஜெட். நிலத்தடி நீர் மற்றும் ஆறுகளை மீட்டெடுக்க ஆற்று மணல் அள்ள 5 ஆண்டு தடை; இறக்குமதிக்கு அனுமதி."
      },
      {
        partyId: "NTK",
        text: "Farmers are the backbone of Tamil identity and must be protected at all costs. End exploitation of water resources by corporates. Oppose genetically modified crops. Protect traditional farming and fishing communities from corporate encroachment.",
        textTa: "விவசாயிகளே தமிழினத்தின் முதுகெலும்பு, அவர்கள் பாதுகாக்கப்பட வேண்டும். பெருநிறுவனங்கள் நீர் வளங்களை சுரண்டுவதை தடுத்தல். மரபணு மாற்றப்பட்ட பயிர்களுக்கு எதிர்ப்பு. பாரம்பரிய வேளாண் மற்றும் மீன்பிடி சமூகங்களை பாதுகாத்தல்.",
        partial: true,
      },
    ],
  },
  {
    id: "governance",
    name: "Governance",
    icon: "🏛️",
    question: "Which governance vision do you trust most?",
    questionTa: "எந்த ஆட்சியின் தொலைநோக்கு பார்வையை நீங்கள் அதிகம் நம்புகிறீர்கள்?",
    parties: ["DMK", "AIADMK", "TVK", "BJP", "INC"],
    options: [
      {
        partyId: "INC",
        text: "Phased prohibition with closure of liquor shops and a separate ministry for prohibition. Pass special laws to prevent honour killings and protect intercaste marriages.",
        textTa: "படிப்படியான மதுவிலக்கு மற்றும் அதற்கென தனி அமைச்சகம். ஆணவக் கொலைகளைத் தடுக்கவும், சாதி மறுப்புத் திருமணங்களைப் பாதுகாக்கவும் சிறப்புச் சட்டங்கள்."
      },
      {
        partyId: "DMK",
        text: "Lok Ayukta revived for complaints against MLAs and Ministers. All public complaints resolved within 100 days. Assembly to convene minimum 100 days/year. Live telecast of assembly proceedings. DVAC to function independently.",
        textTa: "எம்.எல்.ஏக்கள் மற்றும் அமைச்சர்கள் மீதான புகார்களை விசாரிக்க லோக் ஆயுக்தா. பொதுமக்களின் அனைத்து புகார்களுக்கும் 100 நாட்களுக்குள் தீர்வு. ஆண்டுக்கு குறைந்தபட்சம் 100 நாட்கள் சட்டப்பேரவை கூடும். பேரவை நிகழ்வுகள் நேரலை."
      },
      {
        partyId: "AIADMK",
        text: "Stable, experienced governance backed by proven track record. Lok Ayukta to be set up after Centre passes Lokpal bill. Continuation of functioning administration.",
        textTa: "நிரூபிக்கப்பட்ட சாதனைகளின் ஆதரவுடன் நிலையான, அனுபவமிக்க ஆட்சி. மத்திய அரசு லோக்பால் மசோதாவை நிறைவேற்றிய பிறகு லோக் ஆயுக்தா அமைக்கப்படும். சிறப்பான நிர்வாகம் தொடரும்."
      },
      {
        partyId: "TVK",
        text: "Corruption-free, transparent, accountable governance as central promise. Anti-dynasty politics. Dedicated department for women, children and elderly under CM's direct supervision. Centre-left ideology aligned with Ambedkar, Periyar and Kamaraj.",
        textTa: "ஊழலற்ற, வெளிப்படையான, பொறுப்பான ஆட்சியே முக்கிய வாக்குறுதி. வாரிசு அரசியலுக்கு எதிர்ப்பு. முதல்வர் நேரடி கண்காணிப்பில் பெண்கள், குழந்தைகள் மற்றும் முதியோர்களுக்கான தனித்துறை.",
        partial: true,
      },
      {
        partyId: "BJP",
        text: "Legislative council for expert-led debates. Greater Chennai Corporation trifurcated. Circuit Bench of Madras HC in Coimbatore. All state highways converted to four-lane roads.",
        textTa: "நிபுணர்கள் பங்கேற்க சட்ட மேலவை. பெருநகர சென்னை மாநகராட்சி மூன்றாக பிரிக்கப்படும். கோவையில் சென்னை உயர் நீதிமன்றத்தின் கிளை. அனைத்து மாநில நெடுஞ்சாலைகளும் நான்கு வழிச் சாலைகளாக தரம் உயர்த்துதல்."
      },
    ],
  },
  {
    id: "identity",
    name: "Tamil Identity",
    icon: "🌐",
    question: "Which position on Tamil identity and federalism resonates with you?",
    questionTa: "தமிழ் அடையாளம் மற்றும் கூட்டாட்சி தொடர்பான எந்த நிலைப்பாடு உங்களுக்கு ஏற்புடையதாக உள்ளது?",
    parties: ["DMK", "AIADMK", "TVK", "NTK"],
    options: [
      {
        partyId: "DMK",
        text: "Oppose Hindi imposition. Move Education from Concurrent List to State List. Tamil as co-official language in all Central offices and banks in TN. Oppose NEP. Complete Sethusamudram Shipping Canal Project. Reclaim Katchatheevu.",
        textTa: "இந்தி திணிப்புக்கு எதிர்ப்பு. கல்வியை மாநிலப் பட்டியலுக்கு மாற்றுதல். தமிழகத்திலுள்ள அனைத்து மத்திய அரசு அலுவலகங்கள் மற்றும் வங்கிகளில் தமிழை இணை அலுவல் மொழியாக்குதல். கச்சத்தீவை மீட்டெடுத்தல்."
      },
      {
        partyId: "AIADMK",
        text: "Two-language policy (Tamil + English). Oppose CAA and NRC. Rename Madras High Court to Tamil Nadu High Court. Dual citizenship for Sri Lankan Tamil refugees. Release 7 Rajiv Gandhi case convicts.",
        textTa: "இருமொழிக் கொள்கை (தமிழ் + ஆங்கிலம்). CAA மற்றும் NRC சட்டங்களுக்கு எதிர்ப்பு. சென்னை உயர் நீதிமன்றத்தின் பெயரை தமிழ்நாடு உயர் நீதிமன்றம் என மாற்றுதல். இலங்கைத் தமிழ் அகதிகளுக்கு இரட்டை குடியுரிமை."
      },
      {
        partyId: "TVK",
        text: "Secular social justice as core ideology. Oppose Hindi push in NEP. Oppose CAA. Anti-centralisation stance. BJP is ideological opponent. Support for Sri Lankan Tamils.",
        textTa: "மதச்சார்பற்ற சமூக நீதியே மையக் கொள்கை. தேசிய கல்விக் கொள்கையில் இந்தி திணிப்புக்கு எதிர்ப்பு. CAA சட்டத்திற்கு எதிர்ப்பு. அதிகாரக்குவிப்புக்கு எதிரான நிலைப்பாடு. ஈழத் தமிழர்களுக்கு ஆதரவு.",
        partial: true,
      },
      {
        partyId: "NTK",
        text: "Tamil nationalism — only Tamils should govern Tamil Nadu. Tamil as sole official language. Strongly support Tamil Eelam. Oppose all Dravidian party governance as a failure of Tamils. Contest all 234 seats independently.",
        textTa: "தமிழ் தேசியம் - தமிழர்கள் மட்டுமே தமிழ்நாட்டை ஆள வேண்டும். தமிழ் மட்டுமே ஒரே ஆட்சி மொழி. தமிழீழத்திற்கு வலுவான ஆதரவு. அனைத்து திராவிடக் கட்சி ஆட்சிகளுக்கும் எதிர்ப்பு. 234 தொகுதிகளிலும் தனித்துப் போட்டி.",
        partial: true,
      },
    ],
  },
];
