import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
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
    await setDoc(project, {
        ...data,
        updated: new Date().toISOString()
    })
}

export const deleteProject = async slug => {
    const db = getFirestore()
    const project = doc(db, 'projects', slug)
    await deleteDoc(project)
}

export const uploadImage = async (file, progress = () => { }) => {
    const { promise: sha, resolve: resolveSha } = createDeferredPromise()
    const reader = new FileReader()
    reader.onload = async e => {
        const digest = await crypto.subtle.digest('SHA-256', e.target.result)

        const hashArray = Array.from(new Uint8Array(digest));
        resolveSha(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''))
    }
    reader.readAsArrayBuffer(file)
    const id = await sha

    const storage = getStorage()
    const path = 'images/' + id
    const reference = ref(storage, path)
    const task = uploadBytesResumable(reference, file, {
        cacheControl: 'public,max-age=31536000'
    })

    task.on('state_changed', snapshot => {
        const percent = snapshot.bytesTransferred / snapshot.totalBytes
        progress(percent)
    })

    // get image metadata while the file uploads
    const { promise: dimensions, resolve: resolveDimensions } = createDeferredPromise()
    const img = new Image()
    const fileURL = URL.createObjectURL(file)
    img.onload = () => {
        resolveDimensions({
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

export const url = image => {
    return `https://firebasestorage.googleapis.com/v0/b/d7mtg-bc78c.appspot.com/o/images%2F${image.id}?alt=media`
}