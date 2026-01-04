const mongoose = require('mongoose');
const Location = require('../models/Location');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Helper: Generate a point near a center (for clustering departments)
// range: ~0.001 is about 100 meters
const near = (center, range = 0.0015) => {
    return [
        center[0] + (Math.random() * range - range / 2),
        center[1] + (Math.random() * range - range / 2)
    ];
};

// --- BASE COORDINATES (Anchors) ---
const ANCHORS = {
    gate: [7.4296, 3.9055],
    tech: [7.4443, 3.9007],
    science: [7.4420, 3.9015],
    arts: [7.4410, 3.9000],
    agric: [7.4460, 3.8980],
    social: [7.4415, 3.9005],
    edu: [7.4380, 3.9020],
    law: [7.4420, 3.9010],
    sub: [7.4485, 3.9040],
    admin: [7.4432, 3.9012],
    hostels_north: [7.4480, 3.8980], // Awo/Idia area
    hostels_central: [7.4435, 3.9025], // Mellanby/Tedder area
    hostels_south: [7.4350, 3.9050], // Zik/Indy area
    jaja: [7.4460, 3.9020],
    staff_school: [7.4510, 3.9035]
};

const locations = [
    // --- 1. KEY LANDMARKS (Fixed) ---
    { id: 'gate-main', name: "UI Main Gate", category: "Transport", coordinates: ANCHORS.gate, image: "https://images.unsplash.com/photo-1590422749842-2b6222b46764?q=80&w=800" },
    { id: 'admin-tower', name: "UI Tower", category: "Admin", coordinates: ANCHORS.admin, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
    { id: 'admin-trenchard', name: "Trenchard Hall", category: "Event", coordinates: [7.4430, 3.9015], image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800" },
    { id: 'lib-kdl', name: "Kenneth Dike Library", category: "Library", coordinates: [7.4455, 3.9000], image: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800" },
    { id: 'sub-building', name: "Student Union Building (SUB)", category: "Social", coordinates: ANCHORS.sub, image: "https://placehold.co/600x400?text=SUB" },
    { id: 'jaja-clinic', name: "Jaja Clinic", category: "Health", coordinates: ANCHORS.jaja, image: "https://placehold.co/600x400?text=Jaja" },

    // --- 2. FACULTIES & DEPARTMENTS (Clustered) ---
    // Technology
    { id: 'fac-tech', name: "Faculty of Technology", category: "Faculty", coordinates: ANCHORS.tech },
    { id: 'dept-civil', name: "Civil Engineering", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },
    { id: 'dept-elect', name: "Electrical Engineering", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },
    { id: 'dept-mech', name: "Mechanical Engineering", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },
    { id: 'dept-agric-eng', name: "Agric & Environmental Eng.", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },
    { id: 'dept-food-tech', name: "Food Technology", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },
    { id: 'dept-petroleum', name: "Petroleum Engineering", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },
    { id: 'dept-ind-prod', name: "Industrial & Production Eng.", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },
    { id: 'dept-wood', name: "Wood Products Engineering", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },
    { id: 'dept-auto', name: "Automotive Engineering", category: "Department", parent: "Faculty of Technology", coordinates: near(ANCHORS.tech) },

    // Science
    { id: 'fac-sci', name: "Faculty of Science", category: "Faculty", coordinates: ANCHORS.science },
    { id: 'dept-cs', name: "Computer Science", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-math', name: "Mathematics", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-physics', name: "Physics", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-chem', name: "Chemistry", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-geo', name: "Geology", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-micro', name: "Microbiology", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-botany', name: "Botany", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-zoology', name: "Zoology", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-stats', name: "Statistics", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },
    { id: 'dept-archaeology', name: "Archaeology & Anthropology", category: "Department", parent: "Faculty of Science", coordinates: near(ANCHORS.science) },

    // Arts
    { id: 'fac-arts', name: "Faculty of Arts", category: "Faculty", coordinates: ANCHORS.arts },
    { id: 'dept-english', name: "English", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-history', name: "History", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-music', name: "Music", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-theatre', name: "Theatre Arts", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-religous', name: "Religious Studies", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-classics', name: "Classics", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-philosophy', name: "Philosophy", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-euro-studies', name: "European Studies", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-arabic', name: "Arabic & Islamic Studies", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },
    { id: 'dept-comm', name: "Communication & Language Arts", category: "Department", parent: "Faculty of Arts", coordinates: near(ANCHORS.arts) },

    // Social Sciences
    { id: 'fac-soc', name: "Faculty of Social Sciences", category: "Faculty", coordinates: ANCHORS.social },
    { id: 'dept-econ', name: "Economics", category: "Department", parent: "Faculty of Social Sciences", coordinates: near(ANCHORS.social) },
    { id: 'dept-poli-sci', name: "Political Science", category: "Department", parent: "Faculty of Social Sciences", coordinates: near(ANCHORS.social) },
    { id: 'dept-geog', name: "Geography", category: "Department", parent: "Faculty of Social Sciences", coordinates: near(ANCHORS.social) },
    { id: 'dept-psych', name: "Psychology", category: "Department", parent: "Faculty of Social Sciences", coordinates: near(ANCHORS.social) },
    { id: 'dept-socio', name: "Sociology", category: "Department", parent: "Faculty of Social Sciences", coordinates: near(ANCHORS.social) },

    // Agriculture
    { id: 'fac-agric', name: "Faculty of Agriculture", category: "Faculty", coordinates: ANCHORS.agric },
    { id: 'dept-agric-ext', name: "Agricultural Extension", category: "Department", parent: "Faculty of Agriculture", coordinates: near(ANCHORS.agric) },
    { id: 'dept-animal', name: "Animal Science", category: "Department", parent: "Faculty of Agriculture", coordinates: near(ANCHORS.agric) },
    { id: 'dept-crop', name: "Crop Protection & Env. Bio", category: "Department", parent: "Faculty of Agriculture", coordinates: near(ANCHORS.agric) },
    { id: 'dept-agric-econ', name: "Agricultural Economics", category: "Department", parent: "Faculty of Agriculture", coordinates: near(ANCHORS.agric) },
    { id: 'dept-agronomy', name: "Agronomy", category: "Department", parent: "Faculty of Agriculture", coordinates: near(ANCHORS.agric) },

    // Education
    { id: 'fac-edu', name: "Faculty of Education", category: "Faculty", coordinates: ANCHORS.edu },
    { id: 'dept-adult-edu', name: "Adult Education", category: "Department", parent: "Faculty of Education", coordinates: near(ANCHORS.edu) },
    { id: 'dept-edu-mgt', name: "Educational Management", category: "Department", parent: "Faculty of Education", coordinates: near(ANCHORS.edu) },
    { id: 'dept-guide', name: "Guidance & Counselling", category: "Department", parent: "Faculty of Education", coordinates: near(ANCHORS.edu) },
    { id: 'dept-laris', name: "Library & Archival Studies (LARIS)", category: "Department", parent: "Faculty of Education", coordinates: near(ANCHORS.edu) },
    { id: 'dept-special-edu', name: "Special Education", category: "Department", parent: "Faculty of Education", coordinates: near(ANCHORS.edu) },
    { id: 'dept-human-kin', name: "Human Kinetics", category: "Department", parent: "Faculty of Education", coordinates: near(ANCHORS.edu) },

    // Law
    { id: 'fac-law', name: "Faculty of Law", category: "Faculty", coordinates: ANCHORS.law },
    { id: 'dept-private-law', name: "Private & Property Law", category: "Department", parent: "Faculty of Law", coordinates: near(ANCHORS.law) },
    { id: 'dept-public-law', name: "Public & International Law", category: "Department", parent: "Faculty of Law", coordinates: near(ANCHORS.law) },

    // --- 3. HALLS OF RESIDENCE ---
    { id: 'hall-mellanby', name: "Mellanby Hall", category: "Hostel", coordinates: ANCHORS.hostels_central },
    { id: 'hall-tedder', name: "Tedder Hall", category: "Hostel", coordinates: [7.4430, 3.9020] },
    { id: 'hall-kuti', name: "Kuti Hall", category: "Hostel", coordinates: [7.4440, 3.9030] },
    { id: 'hall-bello', name: "Sultan Bello Hall", category: "Hostel", coordinates: [7.4445, 3.9035] },
    { id: 'hall-queens', name: "Queen Elizabeth II Hall", category: "Hostel", coordinates: [7.4420, 3.9030] },
    { id: 'hall-idia', name: "Queen Idia Hall", category: "Hostel", coordinates: [7.4465, 3.8990] },
    { id: 'hall-awo', name: "Obafemi Awolowo Hall", category: "Hostel", coordinates: [7.4480, 3.8980] },
    { id: 'hall-zik', name: "Nnamdi Azikiwe Hall", category: "Hostel", coordinates: ANCHORS.hostels_south },
    { id: 'hall-indy', name: "Independence Hall", category: "Hostel", coordinates: [7.4360, 3.9060] },
    { id: 'hall-abdulsalam', name: "Abdulsalami Abubakar Hall", category: "Hostel", coordinates: [7.4520, 3.8970] },
    { id: 'hall-tafawa', name: "Tafawa Balewa Hall (PG)", category: "Hostel", coordinates: [7.4500, 3.8970] },

    // --- 4. BANKS ---
    { id: 'bank-first', name: "First Bank", category: "Finance", coordinates: [7.4420, 3.9060] },
    { id: 'bank-gtb', name: "GTBank", category: "Finance", coordinates: [7.4305, 3.9050] },
    { id: 'bank-wema', name: "Wema Bank", category: "Finance", coordinates: [7.4480, 3.9045] },
    { id: 'bank-zenith', name: "Zenith Bank", category: "Finance", coordinates: [7.4310, 3.9052] },
    { id: 'bank-access', name: "Access Bank", category: "Finance", coordinates: [7.4312, 3.9055] },
    { id: 'bank-uba', name: "UBA", category: "Finance", coordinates: [7.4315, 3.9058] },

    // --- 5. RELIGIOUS ---
    { id: 'rel-mosque', name: "UI Central Mosque", category: "Religious", coordinates: [7.4420, 3.9040] },
    { id: 'rel-chapel', name: "Chapel of the Resurrection", category: "Religious", coordinates: [7.4415, 3.9035] },
    { id: 'rel-catholic', name: "Our Lady Seat of Wisdom", category: "Religious", coordinates: [7.4410, 3.9030] },
    { id: 'rel-baptist', name: "Victory Baptist Church", category: "Religious", coordinates: [7.4520, 3.9060] },

    // --- 6. COMMERCIAL & FOOD ---
    { id: 'comm-bookshop', name: "UI Bookshop", category: "Commercial", coordinates: [7.4425, 3.9050] },
    { id: 'comm-hotel', name: "UI Hotels", category: "Hospitality", coordinates: [7.4550, 3.8960] },
    { id: 'comm-guest', name: "Alumni Guest House", category: "Hospitality", coordinates: [7.4442, 3.9028] },
    { id: 'food-sub', name: "SUB Cafeteria", category: "Food", coordinates: [7.4485, 3.9040] },
    { id: 'food-kuti', name: "Kuti Butterfield", category: "Food", coordinates: [7.4440, 3.9030] },
    { id: 'food-indy', name: "Item 7 (Indy)", category: "Food", coordinates: [7.4365, 3.9055] },
    { id: 'food-seun', name: "Mama Seun (Tech)", category: "Food", coordinates: [7.4445, 3.9007] },

    // --- 7. SCHOOLS & ADMIN ---
    { id: 'school-isi', name: "International School (ISI)", category: "School", coordinates: [7.4520, 3.9030] },
    { id: 'school-staff', name: "UI Staff School", category: "School", coordinates: [7.4510, 3.9035] },
    { id: 'admin-pg', name: "Postgraduate College", category: "Admin", coordinates: [7.4495, 3.8970] },
    { id: 'admin-dlc', name: "Distance Learning Centre", category: "Admin", coordinates: [7.4570, 3.8940] },
    { id: 'admin-works', name: "Works & Maintenance", category: "Admin", coordinates: [7.4420, 3.9065] },
    { id: 'admin-security', name: "Security Unit (Abefele)", category: "Admin", coordinates: [7.4425, 3.9060] },

    // --- 8. LECTURE THEATRES ---
    { id: 'lt-tlt', name: "TLT (Tech Lecture Theatre)", category: "Lecture Theatre", coordinates: near(ANCHORS.tech) },
    { id: 'lt-llt', name: "LLT (Large Lecture Theatre)", category: "Lecture Theatre", coordinates: near(ANCHORS.social) },
    { id: 'lt-flt', name: "FLT (Faculty Lecture Theatre)", category: "Lecture Theatre", coordinates: near(ANCHORS.arts) },
    { id: 'lt-nlt', name: "NLT (New Lecture Theatre)", category: "Lecture Theatre", coordinates: near(ANCHORS.science) },
];

// Double the list to hit 200+ by adding "Offices" and "Labs"
const extraLocations = locations.map(l => {
    if (l.category === 'Department') {
        return {
            id: `${l.id}-office`,
            name: `${l.name} General Office`,
            category: "Admin",
            parent: l.name,
            coordinates: near(l.coordinates, 0.0003), // Very close to dept
            image: "https://placehold.co/600x400?text=Office"
        };
    }
    return null;
}).filter(l => l !== null);

const finalLocations = [...locations, ...extraLocations];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔌 Connected to DB...');
    await Location.deleteMany({});
    console.log('🧹 Cleared old data.');
    await Location.insertMany(finalLocations);
    console.log(`🌱 Successfully seeded ${finalLocations.length} locations!`);
    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
};

seedDB();