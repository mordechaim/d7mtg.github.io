export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).send()

    const { project } = req.body

    if (!project)
        return res.status(400).json({ error: "Missing 'project' parameter" })

    try {
        await res.revalidate('/')
        await res.revalidate('/portfolio')
        await res.revalidate(process.env.NEXT_PUBLIC_PROJECT_URL_PREFIX + project)
        await res.revalidate('/admin')
        await res.revalidate('/admin/edit/' + project)
        await res.revalidate('/404')

        res.status(200).json({ value: 'Revalidation success' })
    } catch {
        res.status(500).json({ error: 'An error was thrown while revalidating' })
    }
}
