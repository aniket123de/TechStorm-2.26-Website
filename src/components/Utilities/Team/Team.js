import SectionTitle from "../SectionTitle/SectionTitle";
import { cloudinaryImages } from '../../../config/cloudinary';
import Member from "./Member";
import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';
const defaultAvatar = cloudinaryImages.team.defaultAvatar;

const teamData = [
    {
        id: '1',
        avatar: defaultAvatar,
        name: '[Name]',
        deg: 'Convenor'
    },
    {
        id: '2',
        avatar: defaultAvatar,
        name: '[Name]',
        deg: 'Co-Convenor'
    },
    {
        id: '3',
        avatar: defaultAvatar,
        name: '[Name]',
        deg: 'Technical Head'
    },
    {
        id: '4',
        avatar: defaultAvatar,
        name: '[Name]',
        deg: 'Creative Head'
    },
    {
        id: '5',
        avatar: defaultAvatar,
        name: '[Name]',
        deg: 'Sponsorship Head'
    },
    {
        id: '6',
        avatar: defaultAvatar,
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