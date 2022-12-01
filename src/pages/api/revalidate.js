export default function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).send()

    const { project } = req.body

    if (!project)
        return res.status(400).json({ error: "Missing 'project' parameter" })

    try {
        res.revalidate('/')
        res.revalidate('/portfolio')
        res.revalidate(process.env.NEXT_PUBLIC_PROJECT_URL_PREFIX + project)
        res.revalidate('/admin/edit/' + project)

        res.status(200).json({ value: 'Revalidation success' })
    } catch {
        res.status(500).json({ error: 'An error was thrown while revalidating' })
    }
}