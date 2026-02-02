import React from "react";
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const Member = ({ teamData }) => {
    return (
        <React.Fragment>
            {
                teamData?.map((data, index) => {
                    const { id, avatar, name, deg } = data;
                    const delay = (index % 6) * 100;
                    return (
                        <div className="col-lg-4 col-md-6" key={id}>
                            <AnimateOnScroll animation="fade-scale" delay={delay}>
                                <div className="single-team text-center mb-30">
                                    <div className="team-thumb">
                                        <div className="brd">
                                            <img src={avatar} alt={'Avatar'} />
                                        </div>
                                        <div className="team-info">
                                            <h4>{name}</h4>
                                            <span>{deg}</span>
                                        </div>
                                    </div>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    )
                })
            }
        </React.Fragment>
    );
}
export default Member;