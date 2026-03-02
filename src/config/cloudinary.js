// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = 'ds3vepmkd';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Optimised CDN base — uses Cloudinary's automatic format + quality selection
const CDN = `${CLOUDINARY_BASE_URL}/f_auto,q_auto/v1/eoorox`;

// Helper function to get Cloudinary URL
export const getCloudinaryUrl = (folder, filename, transformations = '') => {
  // Remove file extension
  const publicId = filename.replace(/\.[^/.]+$/, '');

  // Add transformations if provided (e.g., 'w_500,h_300,c_fill')
  const transform = transformations ? `/${transformations}` : '';

  return `${CLOUDINARY_BASE_URL}${transform}/eoorox/${folder}/${publicId}`;
};

// Image URLs object for easy management
export const cloudinaryImages = {
  // Gallery images
  gallery: {
    c1:  `${CDN}/gallery/c1`,
    c2:  `${CDN}/gallery/c2`,
    c3:  `${CDN}/gallery/c3`,
    c4:  `${CDN}/gallery/c4`,
    c5:  `${CDN}/gallery/c5`,
    c6:  `${CDN}/gallery/c6`,
    c7:  `${CDN}/gallery/c7`,
    c8:  `${CDN}/gallery/c8`,
    c9:  `${CDN}/gallery/c9`,
    c10: `${CDN}/gallery/c10`,
    c11: `${CDN}/gallery/c11`,
    c12: `${CDN}/gallery/c12`,
    c13: `${CDN}/gallery/c13`,
    c14: `${CDN}/gallery/c14`,
    c15: `${CDN}/gallery/c15`,
    c16: `${CDN}/gallery/c16`,
    c17: `${CDN}/gallery/c17`,
    c18: `${CDN}/gallery/c18`,
    c19: `${CDN}/gallery/c19`,
    c20: `${CDN}/gallery/c20`,
    c21: `${CDN}/gallery/c21`,
  },

  // Carousel images
  carousel: {
    c1: `${CDN}/carousel/c1`,
    c2: `${CDN}/carousel/c2`,
    c3: `${CDN}/carousel/c3`,
    c4: `${CDN}/carousel/c4`,
    c5: `${CDN}/carousel/c5`,
    c6: `${CDN}/carousel/c6`,
    c7: `${CDN}/carousel/c7`,
    c8: `${CDN}/carousel/c8`,
  },

  // Event thumbnail images
  events: {
    codebee:         `${CDN}/events/codebee`,
    crreativecanvas: `${CDN}/events/crreativecanvas`,
    creativecanvas:  `${CDN}/events/crreativecanvas`,
    fifamobile:      `${CDN}/events/fifamobile`,
    forzahorizon:    `${CDN}/events/forzahorizon`,
    hackstorm:       `${CDN}/events/hackstorm`,
    khet:            `${CDN}/events/khet`,
    omegatrix:       `${CDN}/events/omegatrix`,
    passionwithreels:`${CDN}/events/passionwithreels`,
    rocombat:        `${CDN}/events/rocombat`,
    ronavigator:     `${CDN}/events/ronavigator`,
    rosoccer:        `${CDN}/events/rosoccer`,
    rosumo:          `${CDN}/events/rosumo`,
    roterrance:      `${CDN}/events/roterrance`,
    techhunt:        `${CDN}/events/techhunt`,
    technomania:     `${CDN}/events/technomania`,
  },

  // Background / full-page images
  backgrounds: {
    eventbg:          `${CDN}/eventbg`,
    herobg:           `${CDN}/herobg`,
    teamsbg:          `${CDN}/teamsbg`,
    eventroute:       `${CDN}/eventroute`,
    retroarcade:      `${CDN}/retroarcade`,
    coordinatorcardbg:`${CDN}/coordinatorcardbg`,
    event1:           `${CDN}/event-1`,
    event2:           `${CDN}/event-2`,
    footerbg:         `${CDN}/footerbg`,
    aboutandform:     `${CDN}/aboutandform`,
    aboutbg:          `${CDN}/aboutbg`,
    mystery:          `${CDN}/mystery`,
  },

  // Mobile-specific numbered backgrounds (1–5)
  mobile: {
    bg1: `${CDN}/1`,
    bg2: `${CDN}/2`,
    bg3: `${CDN}/3`,
    bg4: `${CDN}/4`,
    bg5: `${CDN}/5`,
  },

  // Retro arcade / About section animated illustrations
  arcade: {
    arcade0: `${CDN}/arcade0`,
    arcade1: `${CDN}/arcade1`,
    arcade2: `${CDN}/arcade2`,
    arcade3: `${CDN}/arcade3`,
    arcade4: `${CDN}/arcade4`,
  },

  // Logo images
  logo: {
    iplogo:          `${CLOUDINARY_BASE_URL}/v1772120615/iplogo_j5316p`,
    collegelogo:     `${CLOUDINARY_BASE_URL}/v1772119775/college-logo`,
    IIC_logo:        `${CDN}/logo/IIC_logo`,
    Abhiyantran_logo:`${CDN}/logo/Abhiyantran-logo`,
    count_bg:        `${CDN}/logo/count-bg`,
  },

  // Miscellaneous assets
  misc: {
    heroph:       `${CDN}/heroph`,
    qrCode:       `${CLOUDINARY_BASE_URL}/v1772115057/eoorox/QrCode_For_Payment.jpg.webp`,
    victoryMascot:`${CDN}/victory_mascot`,
  },

  // Team default avatar
  team: {
    defaultAvatar: `${CDN}/team/IMG202602191108292-GouravPaul`,
  },

  // Legacy alias kept for backward-compat (footerbg is now in backgrounds)
  root: {
    herobg:     `${CDN}/herobg`,
    heroph:     `${CDN}/heroph`,
    aboutbg:    `${CDN}/aboutbg`,
    footerbg:   `${CDN}/footerbg`,
  },

  // Event-specific banner images
  banners: {
    creativeCanvas: `${CDN}/event_specific_pictures/creative/creative_canvas`,
  },
};

export default cloudinaryImages;
