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
            <div className={s.labelContainer} >
                <a className={s.label} href="/"><i className="fa-light fa-hand-wave"></i>&nbsp;Home</a>
                <a className={s.label} href="/portfolio/"><i className="fa-light fa-folder-open"></i>&nbsp;Portfolio</a>
                <a className={s.label} href="/contact/"><i className="fa-light fa-envelope"></i>&nbsp;Contact us</a>
                <a className={s.label} href="https://instagram.com/d7mtg"><i
                    className="fab fa-instagram"></i>&nbsp;Instagram</a>
                <a className={s.label} href="/aleph/V2/"><i className="fa-light fa-paragraph-rtl"></i>&nbsp;Aleph Project</a>
                <a className={s.label} href="/kosher/"><i className="fa-light fa-file-certificate"></i>&nbsp;Kosher Project</a>
            </div>
        </footer>

}