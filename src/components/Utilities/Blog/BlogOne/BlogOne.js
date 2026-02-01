import React from 'react';
import bgImg from '../../../../assets/img/bg/blog-bg.png';
import blogImg1 from '../../../../assets/img/blog/inner_b1.jpg';
import blogImg2 from '../../../../assets/img/blog/inner_b2.jpg';
import blogImg3 from '../../../../assets/img/blog/inner_b3.jpg';
import BlogCard from "../BlogCard";

const blogData = [
    {
        id: '1',
        thumb: blogImg1,
        title: 'Registrations Now Open!',
        admin: 'TechStorm Team',
        date: '[Date] 2026',
        excerpt: 'Early bird registrations for TechStorm 2026 are now live! Grab your spot in the most exciting technical fest of the year. Limited seats for all events - register now!'
    },
    {
        id: '2',
        thumb: blogImg2,
        title: 'Meet Our Sponsors',
        admin: 'TechStorm Team',
        date: '[Date] 2026',
        excerpt: 'We are thrilled to announce our amazing sponsors for TechStorm 2026! Stay tuned for exclusive prizes, workshops, and goodies from our partners.'
    },
    {
        id: '3',
        thumb: blogImg3,
        title: 'Event Schedule Released',
        admin: 'TechStorm Team',
        date: '[Date] 2026',
        excerpt: 'The complete event schedule for TechStorm 2026 is here! Plan your day across Coding Arena, Robo League, and Gaming Zone. Download the schedule now.'
    },
];
const BlogOne = () => {
    return (
        <section id="blog" className="blog-area  p-relative pt-120 pb-120 fix" style={{ background: `url(${bgImg}) no-repeat right bottom` }}>
            <div className="container">
                <div className="row">
                    <BlogCard blogData={blogData} />
                </div>
            </div>
        </section>
    )
}
export default BlogOne;