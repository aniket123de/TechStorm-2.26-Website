import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { cloudinaryImages } from '../../../config/cloudinary';
import SectionTitle from '../../Utilities/SectionTitle/SectionTitle';
import './Schedule.css';
const heroBg = cloudinaryImages.backgrounds.herobg;

const scheduleData = {
    day1: {
        date: '9TH APRIL',
        events: [
            { timing: '9:30 A.M. - 10:30 A.M.', event: 'Inauguration', venue: 'B Block Seminar Hall', round: '-' },
            { timing: '10:00 A.M. - 08:00 P.M.', event: 'Hackstorm 2.26', venue: 'C Block Auditorium, 7th Floor', round: 'Final' },
            { timing: '10:30 A.M. - 01:00 P.M.', event: 'Technomania', venue: 'B Block Lab 602 & 603', round: 'Final' },
            { timing: '10:30 A.M. - 03:00 P.M.', event: 'Forza Horizon', venue: 'C Block 201', round: 'Prelims' },
            { timing: '1:30 P.M. - 2:30 P.M.', event: 'LUNCH BREAK', venue: '-', round: '-' }
        ]
    },
    day2: {
        date: '10TH APRIL',
        events: [
            { timing: '10:30 A.M. - 01:30 P.M.', event: 'Code-Bee', venue: 'C Block Lab 101, 102, 104, 105, 601, 602', round: 'External Prelims & Mains' },
            { timing: '10:30 A.M. - 1:30 P.M.', event: 'FC Mobile', venue: 'C Block Auditorium, 7th Floor', round: 'Prelims' },
            { timing: '10:30 A.M. - 1:30 P.M.', event: 'Passion with Reels', venue: 'B Block Seminar Hall', round: 'Final' },
            { timing: '11:30 A.M. - 05:30 P.M.', event: 'Forza Horizon', venue: 'C Block 201', round: 'Final' },
            { timing: '10:30 A.M. - 1:30 P.M.', event: 'Ro-Terrance / Ro-Navigator / Ro-Soccer / Ro Sumo / Khet', venue: 'B-Block 204 / B Block 304 / B-Block 205 / B-Block 202 / B Block 404', round: 'Qualifier Round' },
            { timing: '10:30 A.M. - 5:30 P.M.', event: 'Ro-Combat', venue: 'C Block', round: 'Bot Testing & Playoff' },
            { timing: '1:30 P.M. - 2:30 P.M.', event: 'LUNCH BREAK', venue: '-', round: '-' },
            { timing: '2:30 P.M. - 5:30 P.M.', event: 'Omegatrix', venue: 'C Block Auditorium, 7th Floor', round: 'Prelims' },
            { timing: '2:30 P.M. - 5:30 P.M.', event: 'Ro-Terrance / Ro-Navigator / Ro-Soccer / Ro Sumo / Khet', venue: 'B-Block 204 / B Block 304 / B-Block 205 / B-Block 202 / B Block 404', round: 'Qualifier Round' }
        ]
    },
    day3: {
        date: '11TH APRIL',
        events: [
            { timing: '10:30 A.M. - 12:00 P.M.', event: 'Code-Bee', venue: 'C Block Lab 101, 102, 104, 105, 601, 602', round: 'Final' },
            { timing: '10:30 A.M. - 01:30 P.M.', event: 'Tech Hunt', venue: 'C Block Auditorium, 7th Floor', round: 'Prelims' },
            { timing: '10:30 A.M. - 1:30 P.M.', event: 'Ro-Terrance / Ro-Navigator / Ro-Soccer / Ro Sumo / Khet', venue: 'B-Block 204 / B Block 304 / B-Block 205 / B-Block 202 / B Block 404', round: 'Final' },
            { timing: '10:30 A.M. - 5:30 P.M.', event: 'Ro-Combat', venue: 'C Block', round: 'Final' },
            { timing: '1:00 P.M. - 02:30 P.M.', event: 'Omegatrix', venue: 'C Block Auditorium, 7th Floor', round: 'Final' },
            { timing: '1:30 P.M. - 2:30 P.M.', event: 'LUNCH BREAK', venue: '-', round: '-' },
            { timing: '02:30 P.M. - 05:00 P.M.', event: 'FC Mobile', venue: 'C Block Auditorium, 7th Floor', round: 'Final' },
            { timing: '01:30 P.M. - 03:30 P.M.', event: 'Creative Canvas', venue: 'C Block, Room No 402', round: 'Final' },
            { timing: '02:30 P.M. - 5:30 P.M.', event: 'Tech Hunt', venue: 'B Block Seminar Hall', round: 'Final' },
            { timing: '2:30 P.M. - 5:30 P.M.', event: 'Ro-Terrance / Ro-Navigator / Ro-Soccer / Ro-Sumo / Khet', venue: 'B-Block 204 / B Block 304 / B-Block 205 / B-Block 202 / B Block 404', round: 'Final' }
        ]
    },
    day4: {
        date: '25TH APRIL',
        events: [
            { timing: '01:00 P.M. - 02:00 P.M.', event: 'Prize Distribution Ceremony', venue: '-', round: '-' },
            { timing: '02:00 P.M. - 02:15 P.M.', event: 'Vote of Thanks', venue: '-', round: '-' },
            { timing: '02:15 P.M. - 03:30 P.M.', event: 'Cultural Programme', venue: '-', round: '-' }
        ]
    }
};

const Schedule = () => {
    return (
        <Fragment>
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
                        paddingTop: '0px',
                        paddingBottom: '80px'
                    }}>
                        <div className="schedule-container">
                    {Object.values(scheduleData).map((day, dayIndex) => (
                        <div className="row mb-5" key={day.date}>
                            <div className="col-12">
                                {(() => {
                                    const hideRoundColumn = day.date === '25TH APRIL';
                                    return (
                                        <>
                                <h3 className="schedule-day-title">
                                    <i className={dayIndex % 3 === 0 ? 'nes-mario' : dayIndex % 3 === 1 ? 'nes-kirby' : 'nes-pokeball'}></i> {day.date}
                                </h3>
                                <div className="nes-table-responsive">
                                    <table className="nes-table is-bordered is-dark">
                                        <thead>
                                            <tr>
                                                <th>Timing</th>
                                                <th>Event</th>
                                                <th>Venue</th>
                                                {!hideRoundColumn && <th>Round</th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {day.events.map((event, index) => (
                                                <tr key={`${day.date}-${index}`} className={event.event.includes('LUNCH') ? 'lunch-break-row' : ''}>
                                                    <td>{event.timing}</td>
                                                    <td className="event-name">{event.event}</td>
                                                    <td>{event.venue}</td>
                                                    {!hideRoundColumn && <td>{event.round}</td>}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    ))}

                    
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
        </Fragment>
    );
}

export default Schedule;
