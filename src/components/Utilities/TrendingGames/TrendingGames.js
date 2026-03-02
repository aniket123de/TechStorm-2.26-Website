import { cloudinaryImages } from '../../../config/cloudinary';
import SectionTitle from "../SectionTitle/SectionTitle";
import GameCard from "./GameCard";

const img1 = cloudinaryImages.gallery.c1;
const img2 = cloudinaryImages.gallery.c2;
const img3 = cloudinaryImages.gallery.c3;

const TrendingData = [
    {
        id: '1',
        thumb: img1,
        tag: 'Coding',
        label: 'Hack Storm',
        description: '10-hr Hackathon'
    },
    {
        id: '2',
        thumb: img2,
        tag: 'Robotics',
        label: 'Ro-Combat',
        description: 'Robot Battle Arena'
    },
    {
        id: '3',
        thumb: img3,
        tag: 'Gaming',
        label: 'Forza Horizon',
        description: 'Racing Championship'
    },
]

const TrendingGames = () => {
    return (
        <section id="work" className="pt-120 pb-65" style={{ background: '#1a0e22' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* Section title */}
                        <SectionTitle
                            titlefirst={'Popular'}
                            titleSec={'Events'}
                            className={'gallery-heading-title text-center'} />
                    </div>

                    <GameCard TrendingData={TrendingData} />

                </div>
            </div>
        </section>
    );
}
export default TrendingGames;