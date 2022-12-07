import cx from 'clsx'
import s from './ProgressBar.module.scss'

export const ProgressBar = ({ className, progress }) => {
    return <div className={cx(s.progress, progress <= 0 && s.empty, className)}>
        {progress > 0 && <div className={s.bar} style={{
            width: progress * 100 + '%'
        }} />}
    </div>
}