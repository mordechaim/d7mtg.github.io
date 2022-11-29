import { collection, getDoc, getDocs, getFirestore } from 'firebase/firestore'

export const getProjects = async () => {
    const db = getFirestore()
    const projects = collection(db, 'projects')
    
    const docs = await getDocs(projects)
    const array = []
    docs.forEach(doc => array.push(doc.data()))

    return array
}