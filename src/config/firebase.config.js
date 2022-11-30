import { initializeApp } from 'firebase/app'
import { initializeAuth, browserLocalPersistence } from 'firebase/auth'

const config = {
    databaseURL: 'https://d7mtg-bc78c.firebaseio.com/',
    authDomain: 'd7mtg-bc78c.firebaseapp.com',
    projectId: 'd7mtg-bc78c',
    apiKey: 'AIzaSyDBbX2Z63lRetpizJTsyqdFiJXH_Q4NX20',
    storageBucket: 'gs://d7mtg-bc78c.appspot.com'
}


export const initialize = () => {
    const app = initializeApp(config)
    initializeAuth(app, {
        persistence: browserLocalPersistence
    })
}
