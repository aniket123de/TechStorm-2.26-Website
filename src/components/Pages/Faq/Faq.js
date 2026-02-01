import React from 'react';
import { Accordion } from 'react-bootstrap';
import Breadcrumb from '../../Utilities/Breadcrumb/Breadcrumb';
import AccordionItem from '../../Utilities/AccordionItem/AccordionItem';

const faqData = [
    {
        title: 'How do I register for TechStorm 2026?',
        bodyText: 'You can register for TechStorm 2026 through our official website. Click on the "Register Now" button, fill in your details, select your events, and complete the payment. Early bird discounts are available for limited time!'
    },
    {
        title: 'Can I participate in multiple events?',
        bodyText: 'Yes! You can participate in multiple events across Coding Arena, Robo League, and Gaming Zone. Just make sure the event timings do not overlap. Check our schedule page for complete event timings.'
    },
    {
        title: 'What are the eligibility criteria for participation?',
        bodyText: 'TechStorm 2026 is open to all college students with a valid college ID. Some events may have specific team size requirements. Inter-college participation is welcome for most events.'
    },
]

const Faqs = () => {
    return (
        <React.Fragment>
            <Breadcrumb pageTitle={'Faq'} currentPage={'Faq'} />

            {/* <Faq/> */}
            <section id="faq" className="faq-area pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="faq-wrap">
                                <h4 className="mb-30">{'General Questions about TechStorm 2026'}</h4>
                                <p>{'Got questions about registration, events, or participation? Find answers to the most frequently asked questions below. Still have doubts? Reach out to us through the Contact page!'}</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="faq-wrap">
                                <Accordion className="accordion" id="accordionExample" defaultActiveKey="0">
                                    {
                                        faqData.map((data, index) => {
                                            const { title, bodyText } = data;
                                            return (
                                                <AccordionItem
                                                    id={index}
                                                    title={title}
                                                    body={bodyText} />
                                            );
                                        })
                                    }
                                </Accordion>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-50">
                        <div className="col-lg-6 col-md-6">
                            <div className="faq-wrap">
                                <h4 className="mb-30">{'Event & Prize Information'}</h4>
                                <p>{'TechStorm 2026 features exciting prizes, certificates, and exclusive merchandise. Winners will be announced on the same day, with prizes distributed at the closing ceremony.'}</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="faq-wrap">
                                <Accordion className="accordion" id="accordionExample2" defaultActiveKey="0">
                                    {
                                        faqData.map((data, index) => {
                                            const { title, bodyText } = data;
                                            return (
                                                <AccordionItem
                                                    id={index}
                                                    title={title}
                                                    body={bodyText} />
                                            );
                                        })
                                    }
                                </Accordion>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </React.Fragment>
    )
}

export default Faqs;
