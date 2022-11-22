import 'styles/globals.css'
import { initialize } from 'config/firebase.config';

initialize()

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp
