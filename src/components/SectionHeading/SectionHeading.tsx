import styles from './SectionHeading.module.css'

export default function SectionHeading({ title }: { title: string }) {
    return (
        <h2 className={styles.heading}>{title}</h2>
    )
}
