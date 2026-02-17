import React from 'react';
import EventDetail from '../EventDetail';
import creativeCanvas from '../../../../assets/img/PIXELATED EVENT MASCOTS/CREATIVE CANVAS.png';
import creativeCanvasBanner from '../../../../assets/img/event_specific_pictures/creative/creative_canvas.png';
import { getCloudinaryUrl } from '../../../../config/cloudinary';

const CreativeCanvasEvent = () => {
    const eventData = {
        previousYearImages: [
            getCloudinaryUrl('pictures_of_gallery/Creative Canva_', 'DSC_0095 (1).JPG', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Creative Canva_', 'DSC_0097.JPG', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Creative Canva_', 'DSC_0098.JPG', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Creative Canva_', 'DSC_0099.JPG', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Creative Canva_', 'DSC_0103.JPG', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Creative Canva_', 'DSC_0105.JPG', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
            getCloudinaryUrl('pictures_of_gallery/Creative Canva_', 'IMG_8186.JPG', 'w_800,h_600,c_fill,q_auto:good,f_auto'),
        ],
        name: 'Creative Canvas',
        logo: creativeCanvas,
        category: 'Creative',
        breadcrumbBg: creativeCanvasBanner,
        description: 'Creative Canvas is a digital art and design competition where imagination knows no bounds. Create stunning visual content using graphic design tools, photo manipulation, or digital illustration. From poster design to logo creation, UI/UX mockups to digital art, showcase your creative genius and design thinking. Theme will be revealed on the event day!',
        teamSize: '1-2 Members',
        duration: '3 Hours',
        venue: 'Design Studio',
        registerButton: {
            text: 'Register Now',
            link: 'https://forms.gle/your-registration-form-link'
        },
        rules: [
            'Creative Canvas is a dynamic poster-making competition for students to showcase their artistic talent, visual storytelling, and innovative thinking. Step forward, create fearlessly, and elevate your design journey!',
            '',
            '',
            '👥 Team Size: 1 or 2 members (Solo or Duo)',
            'Registration fees- 80/-',
            'Eligibility- Open to all students from all Years',
            'Rounds- 2 rounds – Prelims & Final Round.',
            'The registration fee is non-refundable under any circumstances.',
            '',
            '🎬 PRELIMS',
            'Prelims will be held before ..............',
            '',
            '📝 SUBMISSION (PRELIMS)',
            '1. A 15-minute screen-recorded video (without any cuts) showcasing your complete designing process and skills on the given topic.',
            '2. Your design as .jpeg/.jpg/.png.',
            '3. The above media should be uploaded to your google drive in a folder and its link should be submitted through the google form provided.',
            '4. Upload the raw photoshop file (.psd file) / In case of Canva or Figma users they have to share the editable link with Coordinators.',
            '',
            '🚫 ELIMINATION CRITERIA (PRELIMS)',
            '1. Usage of any pre-made template of photoshop file is strictly forbidden.',
            '2. If the access of the link is not available to us the participant/group will be eliminated',
            '3. Show your working skills in the video. If you have used any unfair means/the video isn’t convincing enough, then the participant/group will be eliminated.',
            '4. If Plagiarism is found, then the participant/group will be eliminated.',
            '',
            '🎯 FINAL ROUND',
            'Duration: 2 hrs',
            'Venue- BPPIMT Campus.',
            'Photoshop/Online Designing Platforms will be provided by the Campus Computers (Participants can bring their own computer peripherals in case of any difficulty faced on our systems).',
            'For any Other Software/Designing Platforms participants should bring their own device (Participants CANNOT use their own device for using Photoshop/Online Designing Platforms).',
            'In Finals, Opening of youtube or seeing any tutorial is strictly forbidden.',
            'Teams are responsible for their own data backup/data loss.',
            '',
            '📝 SUBMISSION (FINALS)',
            '1. Make a folder with your group name at your allotted computer. There upload and save the following: -',
            '2. The design .jpeg/.jpg/.png.',
            '3. Screen Recording of your screen.',
            '',
            '# Bring your own Data Transfer Cable',
            '',
            '🚫 ELIMINATION CRITERIA (FINALS)',
            '1. If folder name is anything except Group/team name, then the participant/group will be eliminated.',
            '2. If Plagiarism is found, then the participant/group will be eliminated.',
            '3. If anyone uses their Personal Device for Photoshop/Online Designing Platforms, then the participant/group will be eliminated.'
        ],
        prizes: [
            { position: '1st Prize', amount: '₹12,000' },
            { position: '2nd Prize', amount: '₹8,000' },
            { position: '3rd Prize', amount: '₹5,000' }
        ],
        contact: [
            {
                name: 'Design Head',
                phone: '+91 98765 43228',
                email: 'creative@techstorm.com'
            },
            {
                name: 'Art Director',
                phone: '+91 98765 43229',
                email: 'canvas@techstorm.com'
            }
        ]
    };

    return <EventDetail eventData={eventData} />;
};

export default CreativeCanvasEvent;
