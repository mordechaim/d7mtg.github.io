import Link from 'next/link';
import s from './HomeProject.module.scss'

export const HomeProject = props => {
    const {
        theme,
        gradient,
        logo,
        background,
        name,
        shortDescription,
        metaDescription,
        labels,
        link
    } = props

    return <div className={s.project} style={{
        backgroundImage: `linear-gradient(161deg, ${theme}, ${gradient}), url(${background})`,
        backgroundColor: theme
    }}>

        <div className={s.innerContainer}>
            <img className={s.logo} src={logo} alt={name + ' logo'} />
            <h3>{name}</h3>
            <h4>{shortDescription}</h4>
            <div className={s.labelContainer}>
                {labels.map(({ text, icon }) => <label><i className={`fa-light fa-${icon}`} />{text}</label>)}
            </div>
            <p className={s.description}>{metaDescription}</p>
            <Link className={s.link} href={link}>
                View project <i className="fa-light fa-arrow-right" />
            </Link>
        </div>
    </div>


}