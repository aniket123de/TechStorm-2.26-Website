import SectionTitle from "../SectionTitle/SectionTitle";
import team1 from '../../../assets/img/team/team_img02.png';
import team2 from '../../../assets/img/team/team_img03.png';
import team3 from '../../../assets/img/team/team_img04.png';
import team4 from '../../../assets/img/team/team_img05.png';
import team5 from '../../../assets/img/team/team_img06.png';
import team6 from '../../../assets/img/team/team_img07.png';
import Member from "./Member";
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const teamData = [
    {
        id: '1',
        avatar: team1,
        name: '[Name]',
        deg: 'Convenor'
    },
    {
        id: '2',
        avatar: team2,
        name: '[Name]',
        deg: 'Co-Convenor'
    },
    {
        id: '3',
        avatar: team3,
        name: '[Name]',
        deg: 'Technical Head'
    },
    {
        id: '4',
        avatar: team4,
        name: '[Name]',
        deg: 'Creative Head'
    },
    {
        id: '5',
        avatar: team5,
        name: '[Name]',
        deg: 'Sponsorship Head'
    },
    {
        id: '6',
        avatar: team6,
        name: '[Name]',
        deg: 'PR Head'
    },
]

const Team = () => {
    return (
        <section id="team" className="team-area2 pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 p-relative">
                        <AnimateOnScroll animation="section-title-wrapper">
                            <SectionTitle titlefirst='Organizing' titleSec='Committee' />
                        </AnimateOnScroll>
                    </div>
                </div>
                <div className="row ">
                    <Member teamData={teamData} />
                </div>
            </div>
        </section>
    );
}
export default Team;