import React from "react";
import Breadcrumb from "../../Utilities/Breadcrumb/Breadcrumb";
import Button8bit from "../../Utilities/Button/Button8bit";

import mathchImg from '../../../assets/img/bg/macthes-image.png';
import thumb1 from '../../../assets/img/matches/m-11.png';
import thumb2 from '../../../assets/img/matches/m-12.png';
const liveTeam = {
    thumb1: thumb1,
    thumb2: thumb2,
    team1: 'Samurai',
    team2: 'Assasin',
}

const detailInfo = {
    tournamentNumber: '4',
    date: '1st  October 2021',
    players: '24',
    groups: '2',
    priceMoney: '5000',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
}
const MatcheseDetails = () => {
    const { thumb1, thumb2, team1, team2 } = liveTeam;
    const { tournamentNumber, date, players, groups, priceMoney, text } = detailInfo;
    return (
        <React.Fragment>
            <Breadcrumb pageTitle={'Match Details'} currentPage={'Match details'} />
            {/* Match details section */}
            <section id="match" className="match-area pb-120">
                <div className="container">
                    <div className="row mb-30">
                        <div className="col-lg-12">
                            <div className="live-team">
                                <img src={mathchImg} alt="left" />
                                <div className="live-team-box">
                                    <div className="row align-items-center text-center">
                                        <div className="col-lg-5">
                                            <div className="live-teams">
                                                <img src={thumb1} alt="left" />
                                                <div className="text">
                                                    <h4>{team1}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-2">
                                            <div className="match-time text-center">
                                                <h3>{'VS'}</h3>
                                            </div>
                                        </div>
                                        <div className="col-lg-5">
                                            <div className="live-teams">
                                                <img src={thumb2} alt="left" />
                                                <div className="text">
                                                    <h4>{team2}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center text-center">
                        <div className="col-8">
                            <div className="match-time text-center mt-50 mb-50">
                                <h3>
                                    {'Battlefield'} - <span>{tournamentNumber} {'Tournament'}
                                    </span>
                                </h3>
                                <span>{date}</span>
                            </div>
                            <div className="row mb-30">
                                <div className="col-lg-6">
                                    <h5>{players} Players</h5>
                                    {groups} Groups
                                </div>
                                <div className="col-lg-6">
                                    <h5>${priceMoney} </h5> Prize Pool
                                </div>
                            </div>
                            <p>{text}</p>
                            <div className="slider-btn2 mt-50">
                                <Button8bit to='/about' variant="primary" size="large">{'Join Now'}</Button8bit>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default MatcheseDetails;