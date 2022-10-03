import { useEffect, useState } from 'react';

import './Input.css';

export default function Input() {
    const [value, setValue] = useState('1000000');

    useEffect(() => {
        const minValue = 1000000;
        const maxValue = 6000000;
        const width = (value - minValue) * 100 / (maxValue - minValue);
        if (width <= 0) {
            document.getElementById('input__range').style.backgroundSize = '0% 100%';
        } else {
            document.getElementById('input__range').style.backgroundSize = width + '% 100%';
        }

        if (value > maxValue) {
            setValue(maxValue);
        }
    }, [value])

    return (
        <>
            <p className="input__title">Стоимость автомобиля</p>
            <div className="input__container">
                <input
                    className="input__number"
                    type="number"
                    min="1000000"
                    max="6000000"
                    step="10000"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <span className="input__span">₽</span>
                <input
                    className="input__range"
                    id="input__range"
                    type="range"
                    min="1000000"
                    max="6000000"
                    step="1000"
                    value={value || 1000000}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </>
    )
}