import AnimateOnScroll from '../ScrollAnimation/AnimateOnScroll';

const ServiceItem = ({ icon, title, description, delay = 0 }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <AnimateOnScroll animation="fade-slide-up" delay={delay}>
                <div className="services-box mb-30">
                    <div className="services-content2">
                        <div className="services-icon">
                            <i className={icon}></i>
                            <h5>{title}</h5>
                        </div>
                        <p>{description}</p>
                    </div>
                </div>
            </AnimateOnScroll>
        </div>
    );
}
export default ServiceItem;