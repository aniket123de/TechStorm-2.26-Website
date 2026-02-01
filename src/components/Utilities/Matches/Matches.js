import React from 'react';
import matchBgImg from '../../../assets/img/bg/match-bg.png';
import team1 from '../../../assets/img/matches/team1.png';
import team2 from '../../../assets/img/matches/team2.png';
import team3 from '../../../assets/img/matches/team3.png';
import team4 from '../../../assets/img/matches/team4.png';
import team5 from '../../../assets/img/matches/team5.png';
import team6 from '../../../assets/img/matches/team6.png';

import SectionTitle from '../SectionTitle/SectionTitle';

const Matches = () => {
    
    const matches = [
        {
            logoTeamOne: team1,
            teamTag1: 'Coding',
            teamName1: 'Code-Bee',
            time: '[TIME]',
            date: '[DATE] 2026',
            logoTeamTwo: team2,
            teamTag2: 'Hackathon',
            teamName2: 'Hack Storm',
        },
        {
            logoTeamOne: team3,
            teamTag1: 'Robotics',
            teamName1: 'Ro-Combat',
            time: '[TIME]',
            date: '[DATE] 2026',
            logoTeamTwo: team4,
            teamTag2: 'Robotics',
            teamName2: 'Ro-Soccer',
        },
        {
            logoTeamOne: team5,
            teamTag1: 'Gaming',
            teamName1: 'Forza Horizon',
            time: '[TIME]',
            date: '[DATE] 2026',
            logoTeamTwo: team6,
            teamTag2: 'Gaming',
            teamName2: 'FIFA Mobile',
        },
    ]

    return (
        <section id="match" className="match-area pt-120 pb-90" style={{ background: `url(${matchBgImg})` }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <SectionTitle titlefirst='Featured' titleSec='Events' />
                    </div>
                </div>
                {
                    matches.map(match => {
                        const {
                            logoTeamOne,
                            teamTag1,
                            teamName1,
                            logoTeamTwo,
                            time,
                            date,
                            teamTag2,
                            teamName2,
                        } = match;
                        return (
                            <div className="row align-items-center mb-30 wow fadeInDown animated" data-animation="fadeInRight" data-delay=".4s">
                                <div className="col-lg-5">
                                    <div className="team">
                                        <img src={logoTeamOne} alt="left" />
                                        <div className="text">
                                            <h3>{teamName1}</h3>
                                            <span>{teamTag1}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="match-time text-center">
                                        <h4>{time}</h4>
                                        <span>{date}</span>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="team2">
                                        <img src={logoTeamTwo} alt="left" />
                                        <div className="text">
                                            <h3>{teamName2}</h3>
                                            <span>{teamTag2}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}

export default Matches;