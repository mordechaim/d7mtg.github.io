import { initializeApp } from 'firebase/app'
import { initializeAuth, browserLocalPersistence } from 'firebase/auth'

const config = {
    databaseURL: 'https://d7mtg-bc78c-default-rtdb.firebaseio.com/',
    authDomain: 'd7mtg-bc78c.firebaseapp.com',
    apiKey: 'AIzaSyDBbX2Z63lRetpizJTsyqdFiJXH_Q4NX20',
    storageBucket: 'gs://d7mtg-bc78c.appspot.com'
}

const app = initializeApp(config)
const auth = initializeAuth(app, {
    persistence: browserLocalPersistence
})
