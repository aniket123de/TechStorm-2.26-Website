import React, { Fragment } from 'react';
import { cloudinaryImages } from '../../../config/cloudinary';
import './Schedule.css';
const heroBg = cloudinaryImages.backgrounds.herobg;

// const scheduleData = {
//     day1: {
//         date: '9TH APRIL',
//         events: [
//             { timing: '9:30 A.M. - 10:30 A.M.', event: 'Inauguration', venue: 'B Block Seminar Hall', round: '-' },
//             { timing: '10:30 A.M. – 12:00 P.M.', event: 'Omegatrix', venue: 'C Block Auditorium 7th Floor', round: 'Prelims' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'FIFA Mobile', venue: 'C Block Lab 8', round: 'Prelims' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Passion with Reels', venue: 'B Block Seminar Hall', round: 'Final' },
//             { timing: '12:15 P.M. – 1:30 P.M.', event: 'PES', venue: 'C Block Auditorium 7th Floor', round: 'Prelims' },
//             { timing: '12:00 P.M. – 1:30 P.M.', event: 'Code-Bee', venue: 'C Block Labs', round: 'Qualifier Round 1' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Ro-Terrance', venue: 'B-Block 204', round: 'Qualifier Round' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Ro-Navigator', venue: 'B Block 205', round: 'Qualifier Round' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Ro-Soccer', venue: 'B-Block 202', round: 'Qualifier Round' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Aqua Race', venue: "C Block Boy's Common Room", round: 'Qualifier Round' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Khet', venue: 'B Block 404', round: 'Qualifier Round' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Ro-Combat', venue: 'A Block', round: 'Bot Testing' },
//             { timing: '1:30 P.M. – 2:30 P.M.', event: 'LUNCH BREAK', venue: '-', round: '-' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'PES', venue: 'C Block Auditorium 7th Floor', round: 'Prelims' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Code-Bee', venue: 'C Block Labs', round: 'Qualifier Round 2' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Ro-Terrance', venue: 'B-Block 204', round: 'Qualifier Round' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Ro-Navigator', venue: 'B Block 205', round: 'Qualifier Round' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Ro-Soccer', venue: 'B-Block 202', round: 'Qualifier Round' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Aqua Race', venue: "C Block Boy's Common Room", round: 'Qualifier Round' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Khet', venue: 'B Block 404', round: 'Qualifier Round' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'FIFA Mobile', venue: 'C Block Lab 8', round: 'Prelims' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Appmania', venue: 'B Block Seminar Hall', round: 'Final' }
//         ]
//     },
//     day2: {
//         date: '10TH APRIL',
//         events: [
//             { timing: '10:00 A.M. - 11:30 A.M.', event: 'Omegatrix', venue: 'C Block Auditorium 7th Floor', round: 'Final' },
//             { timing: '10:00 A.M. - 1:00 P.M.', event: 'Creative Canvas', venue: 'C Block Lab 403', round: 'Final' },
//             { timing: '11:00 A.M. – 12:30 P.M.', event: 'Code-Bee', venue: 'C Block Labs', round: 'Final' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Ro-Terrance', venue: 'B-Block 204', round: 'Final' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Ro-Navigator', venue: 'B Block 205', round: 'Final' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Ro-Soccer', venue: 'B-Block 202', round: 'Final' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Aqua Race', venue: "C Block Boy's Common Room", round: 'Final' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Khet', venue: 'B Block 404', round: 'Final' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'FIFA Mobile', venue: 'C Block Lab 8', round: 'Final' },
//             { timing: '12:00 P.M. – 1:30 P.M.', event: 'PES', venue: 'C Block Auditorium 7th Floor', round: 'Final' },
//             { timing: '10:30 A.M. – 1:30 P.M.', event: 'Tech Hunt', venue: 'C Block Student Activity Room', round: 'Prelims' },
//             { timing: '1:30 P.M. – 2:30 P.M.', event: 'LUNCH BREAK', venue: '-', round: '-' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Tech Hunt', venue: 'C Block Student Activity Room', round: 'Final' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Tech Writing', venue: 'C Block Student Activity Room', round: 'Final' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Ro-Terrance', venue: 'B-Block 204', round: 'Final' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Ro-Navigator', venue: 'B Block 205', round: 'Final' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Ro-Soccer', venue: 'B-Block 202', round: 'Final' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Aqua Race', venue: "C Block Boy's Common Room", round: 'Final' },
//             { timing: '2:30 P.M. – 5:30 P.M.', event: 'Khet', venue: 'B Block 404', round: 'Final' }
//         ]
//     }
// };

const Schedule = () => {
    return (
        <Fragment>
            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `url(${heroBg}) center center / cover no-repeat fixed`,
                    backgroundColor: '#0a0a0a',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    }}
                />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '20px' }}>
                    <h1
                        style={{
                            fontFamily: "'Press Start 2P', 'Silkscreen', monospace",
                            color: '#ffc010',
                            fontSize: 'clamp(2rem, 6vw, 5rem)',
                            lineHeight: '1.3',
                            margin: 0,
                            textTransform: 'uppercase'
                        }}
                    >
                        Coming Soon
                    </h1>
                    <p
                        style={{
                            color: '#fffacd',
                            fontSize: 'clamp(14px, 2vw, 22px)',
                            marginTop: '20px',
                            marginBottom: 0
                        }}
                    >
                        Schedule will be updated shortly.
                    </p>
                </div>
            </div>

            {/* Existing Schedule UI (temporarily hidden for later restore)
            <div style={{ 
                position: 'relative', 
                minHeight: '100vh', 
                overflow: 'hidden',
                background: `url(${heroBg}) center center / cover no-repeat fixed`,
                backgroundColor: '#0a0a0a'
            }}>
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    minHeight: '100vh'
                }}>
                    <section className="breadcrumb-area d-flex align-items-center schedule-breadcrumb" style={{background: 'transparent', padding: '0', minHeight: 'auto', margin: '0'}}>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="breadcrumb-wrap text-left">
                                        <div className="breadcrumb-title">
                                            <h2 style={{marginBottom: '5px', marginTop: '0'}}>Event Schedule</h2>
                                            <div className="breadcrumb-wrap">
                                                <nav aria-label="breadcrumb">
                                                    <ol className="breadcrumb">
                                                        <li className="breadcrumb-item">
                                                            <Link to={'/'}>{'Home'}</Link>
                                                        </li>
                                                        <li className="breadcrumb-item active" aria-current="page">Schedule</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="schedule-title-section">
                        <div className="container">
                            <div className="row align-items-center mb-30">
                                <div className="col-lg-12">
                                    <SectionTitle titlefirst="What's on" titleSec="this year" className="schedule-heading-title" />
                                </div>
                            </div>
                        </div>
                    </section>
            
                    <div style={{ 
                        paddingTop: '20px',
                        paddingBottom: '80px'
                    }}>
                        <div className="schedule-container">
                    <div className="row mb-5">
                        <div className="col-12">
                            <h3 className="schedule-day-title">
                                <i className="nes-mario"></i> {scheduleData.day1.date}
                            </h3>
                            <div className="nes-table-responsive">
                                <table className="nes-table is-bordered is-dark">
                                    <thead>
                                        <tr>
                                            <th>Timing</th>
                                            <th>Event</th>
                                            <th>Venue</th>
                                            <th>Round</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scheduleData.day1.events.map((event, index) => (
                                            <tr key={index} className={event.event.includes('LUNCH') ? 'lunch-break-row' : ''}>
                                                <td>{event.timing}</td>
                                                <td className="event-name">{event.event}</td>
                                                <td>{event.venue}</td>
                                                <td>{event.round}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    
                    <div className="row mb-5">
                        <div className="col-12">
                            <h3 className="schedule-day-title">
                                <i className="nes-kirby"></i> {scheduleData.day2.date}
                            </h3>
                            <div className="nes-table-responsive">
                                <table className="nes-table is-bordered is-dark">
                                    <thead>
                                        <tr>
                                            <th>Timing</th>
                                            <th>Event</th>
                                            <th>Venue</th>
                                            <th>Round</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scheduleData.day2.events.map((event, index) => (
                                            <tr key={index} className={event.event.includes('LUNCH') ? 'lunch-break-row' : ''}>
                                                <td>{event.timing}</td>
                                                <td className="event-name">{event.event}</td>
                                                <td>{event.venue}</td>
                                                <td>{event.round}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    
                    <div className="row">
                        <div className="col-12">
                            <h3 className="schedule-day-title" style={{ marginBottom: '30px' }}>
                                <i className="nes-pokeball"></i> IMPORTANT NOTES
                            </h3>
                            <div className="schedule-notes nes-container is-dark">
                                <ul style={{ 
                                    color: '#ffd966', 
                                    fontSize: '15px',
                                    lineHeight: '2',
                                    paddingLeft: '20px'
                                }}>
                                    <li>Please report to your respective venues 15 minutes before the scheduled time.</li>
                                    <li>Participants must carry their college IDs and registration confirmations.</li>
                                    <li>Schedule timings are subject to change. Check our social media for real-time updates.</li>
                                    <li>Food and refreshments will be available during lunch breaks.</li>
                                    <li>Participants can participate in multiple events if timings don't clash.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            </div>
            */}
        </Fragment>
    );
}

export default Schedule;
