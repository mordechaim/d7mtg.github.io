import { get, getDatabase, ref } from "firebase/database";
import Image from 'next/image';
import Link from 'next/link';



export default function Home({ projects }) {
    return <ul>
        {projects.map(p => <li key={p}>
            {p.name}
            <br />
            <code>{p.slug}</code>
            <Image className='rounded-full' src={p.logo} width={500} height={500} alt={p.name + ' logo'} draggable={false} />
        </li>)}

    </ul>
}

export const getStaticProps = async () => {
    const db = getDatabase()
    const key = ref(db, 'projects')
    const projects = await get(key)

    return {
        props: {
            projects: Object.values(projects.toJSON())
        }
    }
}