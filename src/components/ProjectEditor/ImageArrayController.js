import { ImageUpload, TextField } from 'components'
import { useFieldArray, useFormContext } from 'react-hook-form'
import cx from 'clsx'
import s from './ImageController.module.scss'
import cs from './common.module.scss'
import { RemoveButton } from './RemoveButton'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const ImageArrayController = ({ name, className, ...rest }) => {
    const { control, register, formState: { errors } } = useFormContext()
    const { fields, append, remove, move } = useFieldArray({
        name,
        control,
        keyName: 'key'
    })

    const handleUploadImage = result => {
        append({
            url: result.url,
            name: result.name,
            id: result.id,
            width: result.width,
            height: result.height,
            alt: result.name,
        })
    }

    const handleReorder = e => {
        const from = e.source?.index
        const to = e.destination?.index

        if (from != null && to != null)
            move(from, to)
    }

    return <div className={cx(s.column, className)}>
        <ImageUpload className={cx(s.upload, className)} onUploadComplete={handleUploadImage} multiple {...rest} />
        <DragDropContext onDragEnd={handleReorder}>
            <Droppable droppableId={'droppable-' + name}>
                {provided => <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}>

                    {fields.map((f, index) => <Draggable key={f.key} draggableId={f.key} index={index}>
                        {provided => <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={cx(cs.fields, cs.noWrap)}>
                            <div className={s.thumbnail}>
                                <a href={f.url} target='_blank'>
                                    <img src={f.url} href={f.url} alt={f.alt} />
                                </a>
                            </div>
                            <TextField className={cs.full} placeholder='Alt text' {...register(`${name}.${index}.alt`)} error={errors[name]?.[index]?.alt} />
                            <RemoveButton onClick={e => remove(index)} />
                        </div>}
                    </Draggable>)}
                    {provided.placeholder}
                </div>}
            </Droppable>
        </DragDropContext>
    </div>
}