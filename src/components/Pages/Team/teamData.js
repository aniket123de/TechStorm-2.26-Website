/**
 * Team data from TechStorm 2.24 team page template.
 * Core members = Organizing Committee; eventTeams = event-wise coordinators & volunteers.
 * Images hosted on Cloudinary - using direct URLs for reliability.
 */

// Cloudinary base URL - using f_auto,q_auto for optimal format/quality via CDN
const cloudinaryBase = 'https://res.cloudinary.com/ds3vepmkd/image/upload/f_auto,q_auto/v1/eoorox';

// Core Team Member Images from Cloudinary (matched to all-cloudinary-links.json)
const aniketDeImg        = `${cloudinaryBase}/team/1000507264~2%20-%20Aniket%20De`;
const bapanBanikImg      = `${cloudinaryBase}/team/IMG_20260216_202234%20-%20Bapan%20Banik`;
const anikPaulImg        = `${cloudinaryBase}/team/file_00000000fb6471faad0fa22d7155287b%20-%20Anik%20Paul`;
const pushkarShawImg     = `${cloudinaryBase}/team/photo__%20-%20PUSHKAR%20IT3065`;
const srijitaDuttaImg    = `${cloudinaryBase}/team/IMG-20260218-WA0018(2)%20-%20SRIJITA%20ECE3086`;
const soumiliSahaImg     = `${cloudinaryBase}/team/IMG_20260218_203358%20-%20Soumili%20Saha`;
const sohamSahaImg       = `${cloudinaryBase}/team/IMG-20251221-WA0027%20-%20SohamSaha`;
const soumadeepLayekImg  = `${cloudinaryBase}/team/WhatsApp%20Image%202026-02-18%20at%209.24.42%20PM%20-%20Soumadeep%20Layek`;
const gouravPaulImg      = `${cloudinaryBase}/team/IMG202602191108292-GouravPaul`;
const saptarshiGhoshImg  = `${cloudinaryBase}/team/file_00000000d1fc71faa8882c412c66c7bd%20-%20Saptarshi%20Ghosh`;
const harshSinghImg      = `${cloudinaryBase}/team/IMG_7070%20-%20Harsh%20Singh`;
const prantikGhoshImg    = `${cloudinaryBase}/team/WhatsApp%20Image%202026-02-19%20at%2010.17.06%20AM%20-%20Prantik%20Ghosh`;
const gauravChaudharyImg = `${cloudinaryBase}/team/IMG_20260218_204930%20-%20Gaurav%20Kumar`;
const shreyaSahaImg      = `${cloudinaryBase}/team/IMG_20250702_221316%20-%20SHREYA%20ECE3066`;
const saniaDharImg       = `${cloudinaryBase}/team/WhatsApp%20Image%202026-02-19%20at%2010.02.29%20AM%20copy%20-%20Sania%20Dhar`;
const oliviaSikderImg    = `${cloudinaryBase}/team/IMG_20251221_232659%20-%20OLIVIA%20CSE3084`;
const gourabDeyImg       = `${cloudinaryBase}/team/Goyurab%20Dey%20-%20MCA%20-%20GOURAB%20DEY%20MCA4039`;
const adityaChoubeyImg   = `${cloudinaryBase}/team/IMG_20260218_201846%20-%20ADITYA%20CHOUBEY`;
const krishnaKaliImg     = `${cloudinaryBase}/team/IMG-20260219-WA0005-Krishnakali`;
const debaditoImg        = `${cloudinaryBase}/team/Debadrito`;
const shreyaJhaImg       = `https://res.cloudinary.com/ds3vepmkd/image/upload/v1772115072/eoorox/team/IMG_20251214_033807.jpg%20-%20Shreya%20Jha.webp`;
const ankitaAmanImg      = `${cloudinaryBase}/team/IMG_20260219_151927%20-%20Ankita%20Aman`;
const abhishekKumarImg   = `${cloudinaryBase}/team/ABHISHEK%20PHOTO%20-%20Abhishek%20Kumar`;
const protyoyBhandaryImg = `${cloudinaryBase}/team/Protyoy`;
const pranayChatterjeeImg= `${cloudinaryBase}/team/Pranay`;
const souvikDeyImg       = `${cloudinaryBase}/team/IMG_20260219_130801%20-%20Souvik%20Dey`;
const shivamKumarImg     = `${cloudinaryBase}/team/1771488293669%20-%20Shivam%20Kumar`;
const adrishBasakImg     = `${cloudinaryBase}/team/IMG_20251226_234300%20-%20Adrish%20Basak`;
const indraniBanikImg    = `https://res.cloudinary.com/ds3vepmkd/image/upload/v1772122548/indranibanik_urdv5c.webp`;

export const coreMembers = [
    // FINANCE MANAGEMENT TEAM
    { id: '1', avatar: aniketDeImg, name: 'Aniket De', deg: 'Finance Coordinator' },
    
    // EVENT MANAGEMENT TEAM
    { id: '2', avatar: protyoyBhandaryImg, name: 'Protyoy Bhandary', deg: 'Event Coordinator' },
    { id: '3', avatar: bapanBanikImg, name: 'Bapan Banik', deg: 'Event Joint Coordinator' },
    { id: '4', avatar: debaditoImg, name: 'Debadrito Saha', deg: 'Event Joint Coordinator' },
    
    // ALL LEADS
    { id: '5', avatar: anikPaulImg, name: 'Anik Paul', deg: 'PR Lead' },
    { id: '12', avatar: pranayChatterjeeImg, name: 'Pranay Chatterjee', deg: 'Sponsorship Lead' },
    { id: '19', avatar: gauravChaudharyImg, name: 'Gaurav Chaudhary', deg: 'Social Lead' },
    { id: '20', avatar: shreyaJhaImg, name: 'Shreya Jha', deg: 'Creative Lead' },
    { id: '24', avatar: souvikDeyImg, name: 'Souvik Dey', deg: 'Disc. & Hospitality Lead' },
    
    // ALL JOINT LEADS
    { id: '6', avatar: pushkarShawImg, name: 'Pushkar Shaw', deg: 'PR Joint Lead' },
    { id: '7', avatar: srijitaDuttaImg, name: 'Srijita Dutta', deg: 'PR Joint Lead' },
    { id: '13', avatar: saptarshiGhoshImg, name: 'Saptarshi Ghosh', deg: 'Sponsorship Joint Lead' },
    { id: '14', avatar: harshSinghImg, name: 'Harsh Singh', deg: 'Sponsorship Joint Lead' },
    
    // ALL TEAM MEMBERS
    { id: '8', avatar: soumiliSahaImg, name: 'Soumili Saha', deg: 'PR Team Member' },
    { id: '9', avatar: sohamSahaImg, name: 'Soham Saha', deg: 'PR Team Member' },
    { id: '10', avatar: soumadeepLayekImg, name: 'Soumadeep Layek', deg: 'PR Team Member' },
    { id: '11', avatar: gouravPaulImg, name: 'Gourav Paul', deg: 'PR Team Member' },
    { id: '15', avatar: prantikGhoshImg, name: 'Prantik Ghosh', deg: 'Sponsorship Team Member' },
    { id: '16', avatar: krishnaKaliImg, name: 'Krishna Kali Sarkar', deg: 'Sponsorship Team Member' },
    { id: '17', avatar: ankitaAmanImg, name: 'Ankita Aman', deg: 'Sponsorship Team Member' },
    { id: '18', avatar: abhishekKumarImg, name: 'Abhishek Kumar', deg: 'Sponsorship Team Member' },
    { id: '21', avatar: saniaDharImg, name: 'Sania Dhar', deg: 'Creative & Social Member' },
    { id: '22', avatar: oliviaSikderImg, name: 'Olivia Sikder', deg: 'Creative & Social Member' },
    { id: '23', avatar: gourabDeyImg, name: 'Gourab Dey', deg: 'Creative & Social Member' },
    { id: '25', avatar: shreyaSahaImg, name: 'Shreya Saha', deg: 'Disc. & Hospitality Member'},
    { id: '26', avatar: shivamKumarImg, name: 'Shivam Kumar', deg: 'Disc. & Hospitality Member' },
    { id: '27', avatar: indraniBanikImg, name: 'Indrani Banik', deg: 'Disc. & Hospitality Member' },
    { id: '28', avatar: adityaChoubeyImg, name: 'Aditya Choubey', deg: 'Disc. & Hospitality Member' },
    
    // WEB DEVELOPMENT TEAM
    { id: '29', avatar: adrishBasakImg, name: 'Adrish Basak', deg: 'Web Developer' },
];

export const eventTeams = [
    // TECHNICAL EVENTS
    {
        id: 'code-bee',
        eventName: 'Code-Bee',
        category: 'TECHNICAL',
        coordinators: [
            { name: 'Saikat Mondal', dept: 'CSE3' },
            { name: 'Adarsh Kumar', dept: 'IT3' },
            { name: 'Medhansh Arora', dept: 'CSE3' },
        ],
        volunteers: [
            { name: 'Sneha Patra', dept: 'CSE2' },
            { name: 'Sagnik Maitra', dept: 'CSE2' },
            { name: 'Ayush Misra', dept: 'IT2' },
            { name: 'Narayan Kumar Jha', dept: 'CSE1' },
            { name: 'Sayan Karmakar', dept: 'CSE1' },
        ],
        facultyCoordinators: [
            'Mr. Sibasish Senapati',
            'Ms. Arpita Sen',
            'Ms. Protyasha Mukherjee',
            'Mr. Nabin Pal',
        ],
    },
    {
        id: 'hack-storm',
        eventName: 'Hack Storm',
        category: 'TECHNICAL',
        coordinators: [
            { name: 'Ootso Dhar Chowdhury', dept: 'CSE3' },
            { name: 'Sambit Das', dept: 'CSE3' },
            { name: 'Priyam Kumar', dept: 'IT3' },
        ],
        volunteers: [
            { name: 'Pallavi Kumari', dept: 'IT3' },
            { name: 'Shilpa Banerjee', dept: 'MCA' },
            { name: 'Sneha Roy', dept: 'CSE2' },
            { name: 'Dibyojyoti Biswas', dept: 'CSE1' },
            { name: 'Shaezah Iqbal', dept: 'IT1' },
        ],
        facultyCoordinators: [
            'Mr. Subhasish Mallick',
            'Ms. Swagata (Gayen) Kundu',
            'Md. Atif Khan',
            'Mr. Arghadeep Chatterjee',
        ],
    },
    {
        id: 'technomania',
        eventName: 'TechnoMania',
        category: 'TECHNICAL',
        coordinators: [
            { name: 'Disha Saha', dept: 'ECE3' },
            { name: 'Arpita Gupta', dept: 'ECE3' },
        ],
        volunteers: [
            { name: 'Sagar Paul', dept: 'CSE2' },
            { name: 'Ayush Saha', dept: 'ECE2' },
            { name: 'Anjali Kumari Mahato', dept: 'ECE1' },
            { name: 'Jishanuddin Mondal', dept: 'EE1' },
        ],
        facultyCoordinators: [
            'Dr. Susmita Dey',
            'Ms. Ankita Indu',
        ],
    },

    // ROVER EVENTS
    {
        id: 'ro-navigator',
        eventName: 'Ro-Navigator',
        category: 'ROVER',
        coordinators: [
            { name: 'Arushmita Sikder', dept: 'CSE3' },
            { name: 'Amrita Ghosh', dept: 'CSE3' },
        ],
        volunteers: [
            { name: 'Archita Hazra', dept: 'ECE2' },
            { name: 'Rankan Das', dept: 'EE2' },
            { name: 'Debjit Dhar', dept: 'ECE1' },
        ],
        facultyCoordinators: [
            'Mr. Ramesh Kumar',
            'Mr. Debasis Sharma',
        ],
    },
    {
        id: 'ro-combat',
        eventName: 'Ro-Combat (Light)',
        category: 'ROVER',
        coordinators: [
            { name: 'Soumyadeep Ghosh', dept: 'ECE3' },
            { name: 'Sumit Ghosh', dept: 'ECE3' },
        ],
        volunteers: [
            { name: 'Urba Das', dept: 'ECE2' },
            { name: 'Sampurna Biswas', dept: 'CSE3' },
        ],
        facultyCoordinators: [
            'Mr. Subhasish Das',
            'Mr. Ranjit Kr. Pal',
        ],
    },
    {
        id: 'ro-soccer',
        eventName: 'Ro-Soccer',
        category: 'ROVER',
        coordinators: [
            { name: 'Soumadeep Layek', dept: 'Core' },
            { name: 'Samima Nasrin', dept: 'CSE3' },
        ],
        volunteers: [
            { name: 'Sakchham Kapoor', dept: 'ECE2' },
            { name: 'Aadipto Ghosh', dept: 'ECE2' },
            { name: 'Yash Ghosh', dept: 'EE1' },
        ],
        facultyCoordinators: [
            'Dr. Arghya Kamal Pal',
            'Mr. Ranjit Kr. Pal',
        ],
    },
    {
        id: 'ro-terrance',
        eventName: 'Ro-Terrance',
        category: 'ROVER',
        coordinators: [
            { name: 'Abhijit Mahato', dept: 'ECE3' },
            { name: 'Aditya Saha', dept: 'ECE3' },
        ],
        volunteers: [
            { name: 'Insha Hossain', dept: 'ECE2' },
            { name: 'Indranil Maji', dept: 'EE2' },
        ],
        facultyCoordinators: [
            'Mr. Arindrajit Chaudhury',
            'Mr. Aritra Ghosh',
        ],
    },
    {
        id: 'ro-sumo',
        eventName: 'Ro-Sumo',
        category: 'ROVER',
        coordinators: [
            { name: 'D Samir Dora', dept: 'ECE3' },
            { name: 'Sagnek Chowdhury', dept: 'ECE3' },
        ],
        volunteers: [
            { name: 'Abdul Razzak', dept: 'ECE2' },
            { name: 'Sumit Ghara', dept: 'EE2' },
        ],
        facultyCoordinators: [
            'Dr. Binoy Krishna Biswas',
            'Mr. Subhasish Das',
        ],
    },

    // BRAIN TEASER EVENTS
    {
        id: 'tech-hunt',
        eventName: 'Tech Hunt',
        category: 'BRAIN TEASER',
        coordinators: [
            { name: 'Soumi Maji', dept: 'CSE3' },
            { name: 'Chitradeep Das', dept: 'MCA' },
            { name: 'Prerit Mishra', dept: 'IT3' },
        ],
        volunteers: [
            { name: 'Satarupa Sarkar', dept: 'CSE2' },
            { name: 'Anuradha Kumari', dept: 'IT3' },
            { name: 'Soudeep Shaw', dept: 'BBA2' },
            { name: 'Shrishti Banerjee', dept: 'IT1' },
        ],
        facultyCoordinators: [
            'Ms. Sudipta Roy',
            'Ms. Piu Upadhyay',
        ],
    },
    {
        id: 'omegatrix',
        eventName: 'Omegatrix',
        category: 'BRAIN TEASER',
        coordinators: [
            { name: 'Nandini Saboo', dept: 'CSE3' },
            { name: 'Aditya Jaiswal', dept: 'ECE3' },
            { name: 'Ayushi', dept: 'IT3' },
        ],
        volunteers: [
            { name: 'Saikat Maity', dept: 'BBA3' },
            { name: 'Biswajit Biswas', dept: 'IT2' },
            { name: 'Kingshuk Adhikari', dept: 'CSE2' },
            { name: 'Shreyan Dutta', dept: 'IT1' },
            { name: 'Sania Parvin', dept: 'CSE1' },
        ],
        facultyCoordinators: [
            'Dr. Kakali Karmakar Sur',
            'Ms. Anushree Dutta',
            'Ms. Pampa Ghosh (Saha)',
            'Mr. Arup Ratan Bera',
        ],
    },

    // CREATIVITY EVENTS
    {
        id: 'creative-canvas',
        eventName: 'Creative Canvas',
        category: 'CREATIVITY',
        coordinators: [
            { name: 'Rashmi Kumari', dept: 'IT3' },
            { name: 'Madhurima Roy', dept: 'BCA3' },
        ],
        volunteers: [
            { name: 'Riya Pathak', dept: 'CSE2' },
            { name: 'Sucheta Maity', dept: 'IT2' },
            { name: 'Larenza Roy', dept: 'CSE1' },
        ],
        facultyCoordinators: [
            'Mr. Suvadeep Bhattacharjee',
            'Ms. Debasmita Sengupta',
        ],
    },
    {
        id: 'passion-with-reels',
        eventName: 'Passion with Reels',
        category: 'CREATIVITY',
        coordinators: [
            { name: 'Soumili Mahindar', dept: 'CSE3' },
            { name: 'Rishav Kumar', dept: 'IT3' },
        ],
        volunteers: [
            { name: 'Shreyanka Satpathy', dept: 'CSE2' },
            { name: 'Srijita Roy', dept: 'MCA' },
            { name: 'Sristi Bandyopadhyay', dept: 'CSE1' },
            { name: 'Parna Majhi', dept: 'IT1' },
        ],
        facultyCoordinators: [
            'Dr. Susmita Biswas',
            'Dr. Rikhiya Dhar',
        ],
    },

    // GAMES EVENTS
    {
        id: 'khet',
        eventName: 'KHET',
        category: 'GAMES',
        coordinators: [
            { name: 'Himobanta Dutta', dept: '' },
        ],
        volunteers: [
            { name: 'Susnata Sarkar', dept: 'ECE2' },
            { name: 'Prantik Ghosh', dept: 'Core' },
        ],
        facultyCoordinators: [
            'Dr. Debarati Dey (Roy)',
        ],
    },
    {
        id: 'forza-horizon',
        eventName: 'Forza Horizon',
        category: 'GAMES',
        coordinators: [
            { name: 'Snehasish Banerjee', dept: 'CSE3' },
            { name: 'Sayan Das', dept: 'IT3' },
        ],
        volunteers: [
            { name: 'Krittish Barman', dept: 'MCA' },
            { name: 'Krish Agarwalla', dept: 'BCA2' },
            { name: 'Banibrata Das', dept: 'CSE1' },
        ],
        facultyCoordinators: [
            'Mr. Amartya Dutta',
            'Mr. Joy Roy',
        ],
    },
    {
        id: 'fifa-mobile',
        eventName: 'FIFA Mobile',
        category: 'GAMES',
        coordinators: [
            { name: 'Adrish Basak', dept: 'CSE3' },
            { name: 'Shubham Mallik', dept: 'CSE3' },
        ],
        volunteers: [
            { name: 'Upashak Ghosal', dept: 'CSE3' },
            { name: 'Souvik Kumar Mallik', dept: 'CSE1' },
        ],
        facultyCoordinators: [
            'Mr. Proshanta Sarkar',
            'Mr. Udayan Mishra',
        ],
    },
];
