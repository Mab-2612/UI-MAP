// src/data/campusData.js

export const locations = [
  // ==========================================
  // FACULTY OF ENVIRONMENTAL DESIGN & MGT
  // ==========================================
  {
    id: 'edm-1',
    name: "Faculty of Environmental Design & Mgt",
    category: "Faculty",
    description: "Dean's Office and Administrative Block.",
    coordinates: [7.4450, 3.9015],
    image: "https://placehold.co/600x400?text=EDM+Faculty"
  },
  {
    id: 'edm-arch',
    name: "Department of Architecture",
    parent: "Faculty of Env. Design & Mgt",
    category: "Department",
    description: "Architectural design and studio workshops.",
    coordinates: [7.4450, 3.9015],
    image: "https://placehold.co/600x400?text=Architecture"
  },
  {
    id: 'edm-est',
    name: "Department of Estate Management",
    parent: "Faculty of Env. Design & Mgt",
    category: "Department",
    description: "Property valuation and management.",
    coordinates: [7.4450, 3.9015],
    image: "https://placehold.co/600x400?text=Estate+Mgt"
  },
  {
    id: 'edm-urp',
    name: "Urban and Regional Planning",
    parent: "Faculty of Env. Design & Mgt",
    category: "Department",
    description: "Town planning and regional development.",
    coordinates: [7.4450, 3.9015],
    image: "https://placehold.co/600x400?text=Urban+Planning"
  },
  {
    id: 'edm-qs',
    name: "Quantity Surveying",
    parent: "Faculty of Env. Design & Mgt",
    category: "Department",
    description: "Cost management and construction economics.",
    coordinates: [7.4450, 3.9015],
    image: "https://placehold.co/600x400?text=Quantity+Surveying"
  },

  // ==========================================
  // FACULTY OF AGRICULTURE
  // ==========================================
  {
    id: 'agric-1',
    name: "Faculty of Agriculture",
    category: "Faculty",
    description: "Research in food production and sustainability.",
    coordinates: [7.4460, 3.8980],
    image: "https://placehold.co/600x400?text=Agriculture"
  },
  { id: 'agric-agro', name: "Department of Agronomy", parent: "Faculty of Agriculture", category: "Department", coordinates: [7.4460, 3.8980], image: "https://placehold.co/600x400?text=Agronomy" },
  { id: 'agric-econ', name: "Agricultural Economics", parent: "Faculty of Agriculture", category: "Department", coordinates: [7.4460, 3.8980], image: "https://placehold.co/600x400?text=Agric+Econ" },
  { id: 'agric-animal', name: "Animal Science", parent: "Faculty of Agriculture", category: "Department", coordinates: [7.4460, 3.8980], image: "https://placehold.co/600x400?text=Animal+Science" },
  { id: 'agric-fish', name: "Fisheries & Wildlife Mgt", parent: "Faculty of Agriculture", category: "Department", coordinates: [7.4460, 3.8980], image: "https://placehold.co/600x400?text=Fisheries" },
  { id: 'agric-ext', name: "Agric Extension & Rural Dev", parent: "Faculty of Agriculture", category: "Department", coordinates: [7.4460, 3.8980], image: "https://placehold.co/600x400?text=Extension" },
  { id: 'agric-crop', name: "Crop Protection & Env Bio", parent: "Faculty of Agriculture", category: "Department", coordinates: [7.4460, 3.8980], image: "https://placehold.co/600x400?text=Crop+Protection" },

  // ==========================================
  // FACULTY OF ARTS
  // ==========================================
  {
    id: 'arts-1',
    name: "Faculty of Arts",
    category: "Faculty",
    description: "Humanities, culture, and history.",
    coordinates: [7.4410, 3.9000],
    image: "https://placehold.co/600x400?text=Faculty+of+Arts"
  },
  { id: 'arts-eng', name: "Department of English", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=English" },
  { id: 'arts-cla', name: "Communication & Language Arts", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=CLA" },
  { id: 'arts-his', name: "Department of History", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=History" },
  { id: 'arts-phil', name: "Department of Philosophy", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=Philosophy" },
  { id: 'arts-rel', name: "Religious Studies", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=Religious+Studies" },
  { id: 'arts-the', name: "Theatre Arts", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=Theatre+Arts" },
  { id: 'arts-arab', name: "Arabic and Islamic Studies", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=Arabic+Studies" },
  { id: 'arts-class', name: "Classics", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=Classics" },
  { id: 'arts-eur', name: "European Studies", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=European+Studies" },
  { id: 'arts-ling', name: "Linguistics & African Languages", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=Linguistics" },
  { id: 'arts-music', name: "Department of Music", parent: "Faculty of Arts", category: "Department", coordinates: [7.4410, 3.9000], image: "https://placehold.co/600x400?text=Music" },

  // ==========================================
  // FACULTY OF EDUCATION
  // ==========================================
  {
    id: 'edu-1',
    name: "Faculty of Education",
    category: "Faculty",
    description: "Training the teachers of tomorrow.",
    coordinates: [7.4380, 3.9020],
    image: "https://placehold.co/600x400?text=Faculty+of+Education"
  },
  { id: 'edu-gc', name: "Guidance and Counselling", parent: "Faculty of Education", category: "Department", coordinates: [7.4380, 3.9020], image: "https://placehold.co/600x400?text=Guidance" },
  { id: 'edu-laris', name: "Library Archival & Info Studies", parent: "Faculty of Education", category: "Department", coordinates: [7.4380, 3.9020], image: "https://placehold.co/600x400?text=LARIS" },
  { id: 'edu-early', name: "Early Childhood Education", parent: "Faculty of Education", category: "Department", coordinates: [7.4380, 3.9020], image: "https://placehold.co/600x400?text=Early+Childhood" },
  { id: 'edu-adult', name: "Adult Education", parent: "Faculty of Education", category: "Department", coordinates: [7.4380, 3.9020], image: "https://placehold.co/600x400?text=Adult+Education" },
  { id: 'edu-mgt', name: "Educational Management", parent: "Faculty of Education", category: "Department", coordinates: [7.4380, 3.9020], image: "https://placehold.co/600x400?text=Edu+Management" },
  { id: 'edu-spec', name: "Special Education", parent: "Faculty of Education", category: "Department", coordinates: [7.4380, 3.9020], image: "https://placehold.co/600x400?text=Special+Education" },
  { id: 'edu-khe', name: "Human Kinetics & Health Edu", parent: "Faculty of Education", category: "Department", coordinates: [7.4380, 3.9020], image: "https://placehold.co/600x400?text=KHE" },
  
  // ==========================================
  // FACULTY OF LAW
  // ==========================================
  {
    id: 'law-1',
    name: "Faculty of Law",
    category: "Faculty",
    description: "Legal studies and jurisprudence.",
    coordinates: [7.4420, 3.9010],
    image: "https://placehold.co/600x400?text=Faculty+of+Law"
  },
  { id: 'law-juris', name: "Jurisprudence", parent: "Faculty of Law", category: "Department", coordinates: [7.4420, 3.9010], image: "https://placehold.co/600x400?text=Jurisprudence" },
  { id: 'law-cil', name: "Commercial and Industrial Law", parent: "Faculty of Law", category: "Department", coordinates: [7.4420, 3.9010], image: "https://placehold.co/600x400?text=Commercial+Law" },
  { id: 'law-pub', name: "Public & International Law", parent: "Faculty of Law", category: "Department", coordinates: [7.4420, 3.9010], image: "https://placehold.co/600x400?text=Public+Law" },
  { id: 'law-priv', name: "Private and Property Law", parent: "Faculty of Law", category: "Department", coordinates: [7.4420, 3.9010], image: "https://placehold.co/600x400?text=Private+Law" },

  // ==========================================
  // FACULTY OF PHARMACY
  // ==========================================
  {
    id: 'pharm-1',
    name: "Faculty of Pharmacy",
    category: "Faculty",
    description: "Pharmaceutical sciences.",
    coordinates: [7.4390, 3.9010],
    image: "https://placehold.co/600x400?text=Pharmacy"
  },
  { id: 'pharm-clin', name: "Clinical Pharmacy", parent: "Faculty of Pharmacy", category: "Department", coordinates: [7.4390, 3.9010], image: "https://placehold.co/600x400?text=Clinical+Pharm" },
  { id: 'pharm-chem', name: "Pharmaceutical Chemistry", parent: "Faculty of Pharmacy", category: "Department", coordinates: [7.4390, 3.9010], image: "https://placehold.co/600x400?text=Pharm+Chem" },
  { id: 'pharm-micro', name: "Pharmaceutical Microbiology", parent: "Faculty of Pharmacy", category: "Department", coordinates: [7.4390, 3.9010], image: "https://placehold.co/600x400?text=Pharm+Micro" },
  { id: 'pharm-ind', name: "Pharmaceutics & Industrial Pharmacy", parent: "Faculty of Pharmacy", category: "Department", coordinates: [7.4390, 3.9010], image: "https://placehold.co/600x400?text=Pharmaceutics" },

  // ==========================================
  // FACULTY OF SCIENCE
  // ==========================================
  {
    id: 'sci-1',
    name: "Faculty of Science",
    category: "Faculty",
    description: "Pure and applied sciences.",
    coordinates: [7.4425, 3.9015],
    image: "https://placehold.co/600x400?text=Faculty+of+Science"
  },
  { id: 'sci-arch', name: "Archaeology & Anthropology", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Archaeology" },
  { id: 'sci-bot', name: "Botany", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Botany" },
  { id: 'sci-chem', name: "Chemistry", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Chemistry" },
  { id: 'sci-geo', name: "Geography (Science)", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Geography" },
  { id: 'sci-geol', name: "Geology", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Geology" },
  { id: 'sci-math', name: "Mathematics", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Mathematics" },
  { id: 'sci-micro', name: "Microbiology", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Microbiology" },
  { id: 'sci-phy', name: "Physics", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Physics" },
  { id: 'sci-stat', name: "Statistics", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Statistics" },
  { id: 'sci-zoo', name: "Zoology", parent: "Faculty of Science", category: "Department", coordinates: [7.4425, 3.9015], image: "https://placehold.co/600x400?text=Zoology" },

  // ==========================================
  // FACULTY OF TECHNOLOGY
  // ==========================================
  {
    id: 'tech-1',
    name: "Faculty of Technology",
    category: "Faculty",
    description: "Engineering and Technology.",
    coordinates: [7.4443, 3.9007],
    image: "https://placehold.co/600x400?text=Tech+Faculty"
  },
  { id: 'tech-agric', name: "Agric & Environmental Eng.", parent: "Faculty of Technology", category: "Department", coordinates: [7.4443, 3.9007], image: "https://placehold.co/600x400?text=Agric+Eng" },
  { id: 'tech-civil', name: "Civil Engineering", parent: "Faculty of Technology", category: "Department", coordinates: [7.4443, 3.9007], image: "https://placehold.co/600x400?text=Civil+Eng" },
  { id: 'tech-elect', name: "Electrical & Electronics Eng.", parent: "Faculty of Technology", category: "Department", coordinates: [7.4443, 3.9007], image: "https://placehold.co/600x400?text=Elect+Eng" },
  { id: 'tech-food', name: "Food Technology", parent: "Faculty of Technology", category: "Department", coordinates: [7.4443, 3.9007], image: "https://placehold.co/600x400?text=Food+Tech" },
  { id: 'tech-ipe', name: "Industrial & Production Eng.", parent: "Faculty of Technology", category: "Department", coordinates: [7.4443, 3.9007], image: "https://placehold.co/600x400?text=IPE" },
  { id: 'tech-mech', name: "Mechanical Engineering", parent: "Faculty of Technology", category: "Department", coordinates: [7.4443, 3.9007], image: "https://placehold.co/600x400?text=Mechanical+Eng" },
  { id: 'tech-pet', name: "Petroleum Engineering", parent: "Faculty of Technology", category: "Department", coordinates: [7.4443, 3.9007], image: "https://placehold.co/600x400?text=Petroleum+Eng" },
  { id: 'tech-wood', name: "Wood Products Engineering", parent: "Faculty of Technology", category: "Department", coordinates: [7.4443, 3.9007], image: "https://placehold.co/600x400?text=Wood+Eng" },

  // ==========================================
  // FACULTY OF COMPUTING
  // ==========================================
  {
    id: 'comp-1',
    name: "Faculty of Computing",
    category: "Faculty",
    description: "Computer Science & AI.",
    coordinates: [7.4430, 3.9005],
    image: "https://placehold.co/600x400?text=Faculty+of+Computing"
  },
  { id: 'comp-se', name: "Software Engineering", parent: "Faculty of Computing", category: "Department", coordinates: [7.4430, 3.9005], image: "https://placehold.co/600x400?text=Software+Eng" },
  { id: 'comp-cs', name: "Computer Science & AI", parent: "Faculty of Computing", category: "Department", coordinates: [7.4430, 3.9005], image: "https://placehold.co/600x400?text=CS+and+AI" },
  { id: 'comp-ds', name: "Data Science", parent: "Faculty of Computing", category: "Department", coordinates: [7.4430, 3.9005], image: "https://placehold.co/600x400?text=Data+Science" },

  // ==========================================
  // FACULTY OF SOCIAL SCIENCES
  // ==========================================
  {
    id: 'soc-1',
    name: "Faculty of Social Science",
    category: "Faculty",
    description: "Social studies and economics.",
    coordinates: [7.4415, 3.9005],
    image: "https://placehold.co/600x400?text=Social+Science"
  },
  { id: 'soc-geo', name: "Geography", parent: "Faculty of Social Science", category: "Department", coordinates: [7.4415, 3.9005], image: "https://placehold.co/600x400?text=Geography" },
  { id: 'soc-pol', name: "Political Science", parent: "Faculty of Social Science", category: "Department", coordinates: [7.4415, 3.9005], image: "https://placehold.co/600x400?text=Political+Science" },
  { id: 'soc-psych', name: "Psychology", parent: "Faculty of Social Science", category: "Department", coordinates: [7.4415, 3.9005], image: "https://placehold.co/600x400?text=Psychology" },
  { id: 'soc-econ', name: "Economics", parent: "Faculty of Social Science", category: "Department", coordinates: [7.4415, 3.9005], image: "https://placehold.co/600x400?text=Economics" },

  // ==========================================
  // FACULTY OF VET MEDICINE
  // ==========================================
  {
    id: 'vet-1',
    name: "Faculty of Veterinary Medicine",
    category: "Faculty",
    description: "Animal care and medicine.",
    coordinates: [7.4470, 3.8990],
    image: "https://placehold.co/600x400?text=Vet+Medicine"
  },
  { id: 'vet-med', name: "Veterinary Medicine", parent: "Faculty of Vet Medicine", category: "Department", coordinates: [7.4470, 3.8990], image: "https://placehold.co/600x400?text=Vet+Medicine" },
  { id: 'vet-surg', name: "Veterinary Surgery", parent: "Faculty of Vet Medicine", category: "Department", coordinates: [7.4470, 3.8990], image: "https://placehold.co/600x400?text=Vet+Surgery" },
  
  // ==========================================
  // FACULTY OF CLINICAL SCIENCES
  // ==========================================
  {
    id: 'clin-1',
    name: "Faculty of Clinical Science",
    category: "Faculty",
    description: "Medical training and surgery.",
    coordinates: [7.4395, 3.9040],
    image: "https://placehold.co/600x400?text=Clinical+Science"
  },
  { id: 'clin-nurs', name: "Nursing", parent: "Faculty of Clinical Science", category: "Department", coordinates: [7.4395, 3.9040], image: "https://placehold.co/600x400?text=Nursing" },
  { id: 'clin-med', name: "Medicine and Surgery", parent: "Faculty of Clinical Science", category: "Department", coordinates: [7.4395, 3.9040], image: "https://placehold.co/600x400?text=Medicine" },
  { id: 'clin-physio', name: "Physiotherapy", parent: "Faculty of Clinical Science", category: "Department", coordinates: [7.4395, 3.9040], image: "https://placehold.co/600x400?text=Physiotherapy" },

  // ==========================================
  // FACULTY OF BASIC MEDICAL SCIENCES
  // ==========================================
  {
    id: 'bms-1',
    name: "Faculty of Basic Medical Sci",
    category: "Faculty",
    description: "Pre-clinical studies.",
    coordinates: [7.4385, 3.9030],
    image: "https://placehold.co/600x400?text=BMS"
  },
  { id: 'bms-anat', name: "Anatomy", parent: "Faculty of Basic Medical Sci", category: "Department", coordinates: [7.4385, 3.9030], image: "https://placehold.co/600x400?text=Anatomy" },
  { id: 'bms-phys', name: "Physiology", parent: "Faculty of Basic Medical Sci", category: "Department", coordinates: [7.4385, 3.9030], image: "https://placehold.co/600x400?text=Physiology" },
  { id: 'bms-biochem', name: "Biochemistry", parent: "Faculty of Basic Medical Sci", category: "Department", coordinates: [7.4385, 3.9030], image: "https://placehold.co/600x400?text=Biochemistry" },

  // ==========================================
  // UNDERGRADUATE HOSTELS (MALE)
  // ==========================================
  {
    id: 'hostel-mellanby',
    name: "Mellanby Hall",
    category: "Hostel",
    description: "The Premier Hall. Male undergraduate residence.",
    coordinates: [7.4435, 3.9025], // Near Admin
    image: "https://placehold.co/600x400?text=Mellanby+Hall"
  },
  {
    id: 'hostel-tedder',
    name: "Tedder Hall",
    category: "Hostel",
    description: "Male undergraduate residence. Known for excellence.",
    coordinates: [7.4430, 3.9020], // Next to Mellanby
    image: "https://placehold.co/600x400?text=Tedder+Hall"
  },
  {
    id: 'hostel-kuti',
    name: "Kuti Hall",
    category: "Hostel",
    description: "Male undergraduate residence.",
    coordinates: [7.4440, 3.9030],
    image: "https://placehold.co/600x400?text=Kuti+Hall"
  },
  {
    id: 'hostel-bello',
    name: "Sultan Bello Hall",
    category: "Hostel",
    description: "Male undergraduate residence. The dome of power.",
    coordinates: [7.4445, 3.9035],
    image: "https://placehold.co/600x400?text=Sultan+Bello"
  },
  {
    id: 'hostel-zik',
    name: "Nnamdi Azikiwe Hall (ZIK)",
    category: "Hostel",
    description: "Male undergraduate residence. Home of Zikites.",
    coordinates: [7.4350, 3.9050], // Deep South
    image: "https://placehold.co/600x400?text=Zik+Hall"
  },
  {
    id: 'hostel-indy',
    name: "Independence Hall (Indy)",
    category: "Hostel",
    description: "Male undergraduate residence. The Republic of Katanga.",
    coordinates: [7.4360, 3.9060], // Deep South
    image: "https://placehold.co/600x400?text=Indy+Hall"
  },

  // ==========================================
  // UNDERGRADUATE HOSTELS (FEMALE)
  // ==========================================
  {
    id: 'hostel-queens',
    name: "Queen Elizabeth II Hall",
    category: "Hostel",
    description: "Female undergraduate residence.",
    coordinates: [7.4420, 3.9030], // Near SUB
    image: "https://placehold.co/600x400?text=Queens+Hall"
  },
  {
    id: 'hostel-idia',
    name: "Queen Idia Hall",
    category: "Hostel",
    description: "Female undergraduate residence.",
    coordinates: [7.4465, 3.8990], // Near Tech
    image: "https://placehold.co/600x400?text=Idia+Hall"
  },
  {
    id: 'hostel-awo',
    name: "Obafemi Awolowo Hall",
    category: "Hostel",
    description: "Female undergraduate residence. Largest hall.",
    coordinates: [7.4480, 3.8980], // Far North
    image: "https://placehold.co/600x400?text=Awo+Hall"
  },

  // ==========================================
  // MIXED / CLINICAL HOSTELS
  // ==========================================
  {
    id: 'hostel-abh',
    name: "Alexander Brown Hall (ABH)",
    category: "Hostel",
    description: "Mixed gender. Exclusive for Clinical Medical students (UCH).",
    coordinates: [7.4040, 3.9000], // Located at UCH (Off main campus map technically)
    image: "https://placehold.co/600x400?text=ABH+Hall"
  },

  // ==========================================
  // POSTGRADUATE HOSTELS
  // ==========================================
  {
    id: 'hostel-tafawa',
    name: "Tafawa Balewa Hall",
    category: "Hostel",
    description: "Postgraduate. Mixed (Male & Female PhD candidates).",
    coordinates: [7.4500, 3.8970],
    image: "https://placehold.co/600x400?text=Tafawa+Balewa"
  },
  {
    id: 'hostel-ogunsheye',
    name: "Adetowun Ogunsheye Hall",
    category: "Hostel",
    description: "Postgraduate. Female only.",
    coordinates: [7.4510, 3.8975],
    image: "https://placehold.co/600x400?text=Ogunsheye+Hall"
  },
  {
    id: 'hostel-alumni',
    name: "Alumni Postgraduate Hall",
    category: "Hostel",
    description: "Postgraduate. Male only.",
    coordinates: [7.4495, 3.8965],
    image: "https://placehold.co/600x400?text=Alumni+Hall"
  },
  {
    id: 'hostel-international',
    name: "International Hostel (I-House)",
    category: "Hostel",
    description: "Postgraduate. Mixed (Male & Female).",
    coordinates: [7.4405, 3.9020], // Near Chapel
    image: "https://placehold.co/600x400?text=International+House"
  },
  {
    id: 'hostel-abh-pg',
    name: "ABH Postgraduate Hall",
    category: "Hostel",
    description: "Postgraduate. Mixed (Medical students).",
    coordinates: [7.4045, 3.9005], // UCH area
    image: "https://placehold.co/600x400?text=ABH+PG"
  },

  // ==========================================
  // PRIVATE HOSTELS
  // ==========================================
  {
    id: 'hostel-iyalode',
    name: "Iyalode Taofeekat Hub",
    category: "Private Hostel",
    description: "Modern private student accommodation.",
    coordinates: [7.4520, 3.8950],
    image: "https://placehold.co/600x400?text=Taofeekat+Hub"
  },
  {
    id: 'hostel-cmf',
    name: "CMF Hostel",
    category: "Private Hostel",
    description: "Christian Mission Foundation hostel.",
    coordinates: [7.4510, 3.8970],
    image: "https://placehold.co/600x400?text=CMF"
  },
  {
    id: 'hostel-talents',
    name: "Talents Hostel",
    category: "Private Hostel",
    description: "Private residence for students.",
    coordinates: [7.4530, 3.8960],
    image: "https://placehold.co/600x400?text=Talents"
  },
  {
    id: 'hostel-cbn',
    name: "CBN Hall",
    category: "Private Hostel",
    description: "Donated by Central Bank of Nigeria.",
    coordinates: [7.4450, 3.9080],
    image: "https://placehold.co/600x400?text=CBN+Hall"
  },
  {
    id: 'hostel-st-annes',
    name: "St. Anne's Hostel",
    category: "Private Hostel",
    description: "Private female accommodation.",
    coordinates: [7.4400, 3.9050], // Estimate
    image: "https://placehold.co/600x400?text=St+Annes"
  },
  {
    id: 'hostel-aoo',
    name: "AOO Hostel",
    category: "Private Hostel",
    description: "Private student accommodation.",
    coordinates: [7.4540, 3.8940], // Estimate
    image: "https://placehold.co/600x400?text=AOO+Hostel"
  }
];