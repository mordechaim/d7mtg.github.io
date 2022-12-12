export default async function handler(req, res) {
    if (req.method !== 'POST')
        return res.status(405).send()

    const {
        home,
        portfolio,
        projects,
        notFound
    } = req.body

    try {
        if (home)
            await res.revalidate('/')
        if (portfolio)
            await res.revalidate('/portfolio')
        if (projects) {
            for (const project of projects)
                await res.revalidate('/portfolio/projects/' + project)
        }
        if (notFound)
            await res.revalidate('/404')

        res.status(200).json({ value: 'Revalidation success' })
    } catch {
        res.status(500).json({ error: 'An error was thrown while revalidating' })
    }
}
