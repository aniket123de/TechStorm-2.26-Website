/**
 * Team data from TechStorm 2.24 team page template.
 * Core members = Organizing Committee; eventTeams = event-wise coordinators & volunteers.
 */

import team1 from '../../../assets/img/team/team_img02.png';
import team2 from '../../../assets/img/team/team_img03.png';
import team3 from '../../../assets/img/team/team_img04.png';
import team4 from '../../../assets/img/team/team_img05.png';
import team5 from '../../../assets/img/team/team_img06.png';
import team6 from '../../../assets/img/team/team_img07.png';
import team7 from '../../../assets/img/team/team_img01.png';
import team8 from '../../../assets/img/team/team_img08.png';

export const coreMembers = [
    // FINANCE MANAGEMENT TEAM
    { id: '1', avatar: team1, name: 'Aniket De', deg: 'Finance Coordinator' },
    
    // EVENT MANAGEMENT TEAM
    { id: '2', avatar: team2, name: 'Protyoy Bhandary', deg: 'Event Coordinator' },
    { id: '3', avatar: team3, name: 'Bapan Banik', deg: 'Event Joint Coordinator' },
    { id: '4', avatar: team4, name: 'Debadrito Saha', deg: 'Event Joint Coordinator' },
    
    // PUBLIC RELATIONS MANAGEMENT TEAM
    { id: '5', avatar: team5, name: 'Anik Paul', deg: 'PR Lead' },
    { id: '6', avatar: team6, name: 'Pushkar Shaw', deg: 'PR Joint Lead' },
    { id: '7', avatar: team7, name: 'Srijita Dutta', deg: 'PR Joint Lead' },
    { id: '8', avatar: team8, name: 'Soumili Saha', deg: 'PR Team Member' },
    { id: '9', avatar: team1, name: 'Soham Saha', deg: 'PR Team Member' },
    { id: '10', avatar: team2, name: 'Soumadeep Layek', deg: 'PR Team Member' },
    { id: '11', avatar: team3, name: 'Gourav Paul', deg: 'PR Team Member' },
    
    // SPONSORSHIP MANAGEMENT TEAM
    { id: '12', avatar: team4, name: 'Pranay Chatterjee', deg: 'Sponsorship Lead' },
    { id: '13', avatar: team5, name: 'Saptarshi Ghosh', deg: 'Sponsorship Joint Lead' },
    { id: '14', avatar: team6, name: 'Harsh Singh', deg: 'Sponsorship Joint Lead' },
    { id: '15', avatar: team7, name: 'Prantik Ghosh', deg: 'Sponsorship Team Member' },
    { id: '16', avatar: team8, name: 'Krishna Kali Sarkar', deg: 'Sponsorship Team Member' },
    { id: '17', avatar: team1, name: 'Ankita Aman', deg: 'Sponsorship Team Member' },
    
    // CREATIVE & SOCIAL MANAGEMENT TEAM
    { id: '18', avatar: team2, name: 'Gaurav Chaudhary', deg: 'Social Lead' },
    { id: '19', avatar: team3, name: 'Shreya Jha', deg: 'Creative Lead' },
    { id: '20', avatar: team4, name: 'Sania Dhar', deg: 'Creative & Social Member' },
    { id: '21', avatar: team5, name: 'Olivia Sikder', deg: 'Creative & Social Member' },
    { id: '22', avatar: team6, name: 'Gourab Dey', deg: 'Creative & Social Member' },
    
    // DISCIPLINE & HOSPITALITY MANAGEMENT TEAM
    { id: '23', avatar: team7, name: 'Souvik Dey', deg: 'Disc. & Hospitality Lead' },
    { id: '24', avatar: team8, name: 'Shreya Saha', deg: 'Disc. & Hospitality Member'},
    { id: '25', avatar: team1, name: 'Shivam Kumar', deg: 'Disc. & Hospitality Member' },
    { id: '26', avatar: team2, name: 'Indrani Banik', deg: 'Disc. & Hospitality Member' },
    { id: '27', avatar: team3, name: 'Aditya Choubey', deg: 'Disc. & Hospitality Member' },
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
            { name: 'Sagor Paul', dept: 'CSE2' },
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
