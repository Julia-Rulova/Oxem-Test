import './TotalSum.css';

export default function TotalSum({ title, sum }) {
    return (
        <article className="sum__container">
            <h3 className="sum__title">{title}</h3>
            <p className="sum__total">{sum} ₽</p>
        </article>
    )
}