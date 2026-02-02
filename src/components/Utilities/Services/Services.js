import ServiceItem from './service';

const services = [
    {
        icon: 'flaticon-degrees',
        title: 'Coding Arena',
        description: 'Battle it out in Code-Bee, Hack Storm & TechnoMania. Debug, develop, dominate!'
    },
    {
        icon: 'flaticon-archery',
        title: 'Robo League',
        description: 'Ro-Navigator, Ro-Combat, Ro-Soccer, Ro-Terrance & Aqua-Race await your machines.'
    },
    {
        icon: 'flaticon-competition',
        title: 'Gaming Zone',
        description: 'Forza Horizon racing wheels, FIFA Mobile tournaments & classic arcade showdowns.'
    },
]

const Services = () => {
    return (
        <section id="services" className="services-area what-story pb-90 fix">
            <div className="container">
                <div className="row">
                    {
                        services.map((service, index) => {
                            const delay = index * 100;
                            return (
                                <ServiceItem
                                    key={index}
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    delay={delay} />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default Services;