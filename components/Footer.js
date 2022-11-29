import Link from 'next/link';
import s from './Footer.module.scss'

export const Footer = () => {
    return <footer className={s.links} itemScope itemType="http://schema.org/LocalBusiness">
        <span itemProp="name">D7mtg</span> is a branding agency based in Brooklyn, N.Y.
        <br /><br />
        Reach us at <a href='mailto:hello@d7mtg.com'>hello@d7mtg.com</a> or by phone at <a itemProp="telephone"
            href='tel:+18456712116'>845-671-2116</a>. We're located at <a itemProp="address"
                href="https://maps.apple.com/?q=d7mtg">63
            Flushing Avenue</a> Building 27 in the Brooklyn Navy Yard.
        <div className={s.labelContainer}>
            <Link href="/"><i className="fa-light fa-hand-wave" />&nbsp;Home</Link>
            <Link  href="/portfolio/"><i className="fa-light fa-folder-open" />&nbsp;Portfolio</Link>
            <a href="/contact/"><i className="fa-light fa-envelope" />&nbsp;Contact us</a>
            <a href="https://instagram.com/d7mtg"><i className="fab fa-instagram"/>&nbsp;Instagram</a>
            <a href="/aleph/V2/"><i className="fa-light fa-paragraph-rtl"/>&nbsp;Aleph Project</a>
            <a href="/kosher/"><i className="fa-light fa-file-certificate"/>&nbsp;Kosher Project</a>
        </div>
    </footer>

}