import * as yup from 'yup'

const imageSchema = () => yup.object({
    url: yup.string().url().required(),
    alt: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
    id: yup.string().uuid().required()
})

export const schema = yup.object({
    name: yup.string().required(),
    subtitle: yup.string().required(),
    labels: yup.array().of(yup.object({
        text: yup.string().required(),
        variant: yup.string().matches(/fa[rbsl]/).required(),
        icon: yup.string().required()
    })),
    slug: yup.string().matches(/[a-z0-9\-]+/).required(),
    theme: yup.string().matches(/#[A-Fa-f0-9]{6}/).required(),
    metaDescription: yup.string().required(),
    projectDescription: yup.string().required(),
    homeDescription: yup.string().required(),
    homeVisible: yup.boolean().required(),
    portfolioVisible: yup.boolean().required(),
    homeIndex: yup.number().required(),
    portfolioIndex: yup.number().required(),
    links: yup.array().of(yup.object({
        url: yup.string().url().required(),
        text: yup.string().required(),
        variant: yup.string().matches(/fa[rbsl]/).required(),
        icon: yup.string().required()
    })),
    images: yup.array().of(imageSchema()),
    logo: imageSchema().required(),
    logoDark: imageSchema().default(undefined),
    previewImage: imageSchema(),
    banner: imageSchema().required()
})