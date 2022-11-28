import { Banner } from 'components/home/Banner';
import Footer from '../components/home/Footer';
import { HomeProject } from '../components/home/HomeProject';
import s from './Home.module.scss'

export default function Home({ projects }) {
    return <>
        <Banner />
        <div className={s.projectsContainer}>
            {projects.map(p => <HomeProject key={p.slug} {...p} />)}
        </div>
        <Footer />
    </>
}

export const getStaticProps = async () => {
    return {
        props: {
            projects: [
                {
                    theme: '#7a3a0d',
                    gradient: '#26252500',
                    logo: '/photos/client-logos/hamaspik_the_one.png',
                    background: '/photos/project-covers/hamaspik.jpg',
                    name: 'The One by Hamaspik',
                    subtitle: 'Appreciation Event',
                    slug: 'hamaspik',
                    labels: [
                        {
                            text: 'Branding',
                            icon: 'icons'
                        },
                        {
                            text: 'Event design',
                            icon: 'party-bell'
                        },
                        {
                            text: 'Web development',
                            icon: 'code'
                        },
                        {
                            text: 'Print media',
                            icon: 'file'
                        }
                    ],
                    metaDescription: `Hamaspik employees are devoted to their mission above all else, and Hamaspik wanted this
                    Appreciation Event to reflect that unwavering\u00a0dedication.
    
                    D7mtg worked with Hamaspik, creating deliverables that ensured the event was a visually stunning,
                    memorable, and rich experience for their\u00a0employees.`,

                    link: '/portfolio/projects/hamaspik/index.html',
                    description: `When Hamaspik asked us to create and design the essentials for their upcoming staff appreciation event, we knew this had to be special.

                    Hamaspik employees are dedicated to helping those in need, and their employers wanted to go above and beyond to express how valuable each employee is to the organization.
                    
                    The theme of the event was "The One," speaking to the fact that every individual, every single member of the organization, is vital to their mission as a whole.
                    
                    We created a logo that worked in tandem with the luxurious decor, and then we designed all deliverables for the event, from the emails sent to the employees weeks in advance all the way to the gifts given to each participant as they left the event.`,

                },

            ]
        }
    }
}