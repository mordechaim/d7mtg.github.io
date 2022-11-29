import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore'

export const getProjects = async () => {
    const db = getFirestore()
    const projects = collection(db, 'projects')

    const docs = await getDocs(projects)
    const array = []
    docs.forEach(d => array.push(d.data()))

    return array
}

export const getProject = async slug => {
    const db = getFirestore()
    const project = doc(db, 'projects', slug)
    return (await getDoc(project)).data()
}