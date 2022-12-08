import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { createDeferredPromise } from './promises'


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

export const setProject = async (slug, data) => {
    const db = getFirestore()
    const project = doc(db, 'projects', slug)
    await setDoc(project, data)
}

export const deleteProject = async slug => {
    const db = getFirestore()
    const project = doc(db, 'projects', slug)
    await deleteDoc(project)
}

export const uploadImage = async (file, progress = () => { }) => {
    const storage = getStorage()
    const id = uuidv4()
    const path = 'images/' + id
    const reference = ref(storage, path)
    const task = uploadBytesResumable(reference, file)

    task.on('state_changed', snapshot => {
        const percent = snapshot.bytesTransferred / snapshot.totalBytes
        progress(percent)
    })

    // get image metadata while the file uploads
    const { promise: dimensions, resolve } = createDeferredPromise()
    const img = new Image()
    const fileURL = URL.createObjectURL(file)
    img.onload = () => {
        resolve({
            width: img.width,
            height: img.height
        })

        URL.revokeObjectURL(fileURL)
    }
    img.src = fileURL

    // do both jobs simultaneously
    const [result] = await Promise.all([dimensions, task])
    const url = await getDownloadURL(reference)

    return {
        url,
        id,
        path,
        file,
        name: file.name,
        size: file.size,
        width: result.width,
        height: result.height
    }
}

export const revalidate = async data => {
    const result = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return await result.json()
}