import { useEffect, useState } from 'react';

import * as api from '../../utils/api';
import Preloader from '../Preloader/Preloader';
import './Input.css';
import './Form.css';
import './TotalSum.css';


export default function Form() {
    const [priceValue, setPriceValue] = useState(1000000);
    const [percentValue, setPercentValue] = useState(10);
    const [contributionValue, setContributionValue] = useState(100000);
    const [termValue, setTermValue] = useState(1);
    const [sum, setSum] = useState(0);
    const [monthPayment, setMonthPayment] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const minValue = 1000000;
        const maxValue = 6000000;
        const width = (priceValue - minValue) * 100 / (maxValue - minValue);

        if (width <= 0) {
            document.getElementById('input-price').style.backgroundSize = '0% 100%';
        } else {
            document.getElementById('input-price').style.backgroundSize = width + '% 100%';
        }

        if (priceValue > maxValue) {
            setPriceValue(maxValue);
        }
    }, [priceValue]);

    useEffect(() => {
        const minValue = 10;
        const maxValue = 60;
        const width = (percentValue - minValue) * 100 / (maxValue - minValue);

        if (width <= 0) {
            document.getElementById('input-percent').style.backgroundSize = '0% 100%';
        } else {
            document.getElementById('input-percent').style.backgroundSize = width + '% 100%';
        }

        if (percentValue > maxValue) {
            setPercentValue(maxValue);
        }

        setContributionValue(priceValue * percentValue / 100);
    }, [percentValue, priceValue]);

    useEffect(() => {
        const minValue = 1;
        const maxValue = 60;
        const width = (termValue - minValue) * 100 / (maxValue - minValue);

        if (width <= 0) {
            document.getElementById('input-term').style.backgroundSize = '0% 100%';
        } else {
            document.getElementById('input-term').style.backgroundSize = width + '% 100%';
        }

        if (termValue > maxValue) {
            setTermValue(maxValue);
        }
    }, [termValue]);

    useEffect(() => {
        setMonthPayment(Math.round(
            (priceValue - contributionValue) * ((0.035 * Math.pow((1 + 0.035), termValue)) / (Math.pow((1 + 0.035), termValue) - 1))
        ));
        setSum(contributionValue + termValue * monthPayment);
    }, [contributionValue, termValue, monthPayment, priceValue, percentValue]);

    function handleSubmit(e) {
        e.preventDefault();

        setDisabled(true);
        setIsLoading(true);

        api.submitForm({
            priceValue,
            contributionValue,
            percentValue,
            termValue,
            monthPayment,
            sum
        })
            .then((res) => {
                setDisabled(false);
                setIsLoading(false);
                console.log(res);
            })
            .catch((err) => {
                setDisabled(false);
                setIsLoading(false);
                console.log(err);
            });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__inputs">
                <div className={`form__item ${disabled ? 'form__item_disabled' : ''}`}>
                    <p className="input__title">Стоимость автомобиля</p>
                    <div className="input__container">
                        <input
                            className="input__number"
                            disabled={disabled}
                            min="1000000"
                            max="6000000"
                            step="10000"
                            value={String(priceValue).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}
                            onChange={e => setPriceValue(Number(e.target.value.replace(/[^0-9]/g, '')))}
                        />
                        <span className="input__span">₽</span>
                        <input
                            className="input__range"
                            id="input-price"
                            disabled={disabled}
                            type="range"
                            min="1000000"
                            max="6000000"
                            step="1000"
                            value={priceValue || 1000000}
                            onChange={e => setPriceValue(e.target.value)}
                        />
                    </div>
                </div>

                <div className={`form__item ${disabled ? 'form__item_disabled' : ''}`}>
                    <p className="input__title">Первоначальный взнос</p>
                    <div className="input__container">
                        <input
                            className="input__number"
                            type="text"
                            value={`${String(contributionValue).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ') || 100000} ₽`}
                            disabled
                        />
                        <input
                            className="input__perncent"
                            disabled={disabled}
                            type="number"
                            value={Number(percentValue)}
                            min="10"
                            max="60"
                            onChange={e => setPercentValue(e.target.value)}
                        />
                        <span className="input__span-percent">%</span>
                        <input
                            className="input__range"
                            disabled={disabled}
                            id="input-percent"
                            type="range"
                            value={percentValue || 10}
                            min="10"
                            max="60"
                            onChange={e => setPercentValue(e.target.value)}
                        />
                    </div>
                </div>

                <div className={`form__item ${disabled ? 'form__item_disabled' : ''}`}>
                    <p className="input__title">Срок лизинга</p>
                    <div className="input__container">
                        <input
                            className="input__number"
                            disabled={disabled}
                            type="number"
                            min="1"
                            max="60"
                            value={termValue}
                            onChange={e => setTermValue(e.target.value)}
                        />
                        <span className="input__span">мес.</span>
                        <input
                            className="input__range"
                            disabled={disabled}
                            id="input-term"
                            type="range"
                            min="1"
                            max="60"
                            value={Number(termValue) || 1}
                            onChange={e => setTermValue(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="form__results">
                <div className="sum__results">
                    <article className="sum__container">
                        <h3 className="sum__title">Сумма договора лизинга</h3>
                        <p className="sum__total">{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</p>
                    </article>

                    <article className="sum__container">
                        <h3 className="sum__title">Ежемесячный платеж от</h3>
                        <p className="sum__total">{monthPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽</p>
                    </article>
                </div>
                <button className={`form__submit-btn ${isLoading ? 'form__submit-btn_disabled' : ''}`} disabled={disabled}>
                    {
                        isLoading ?
                            <Preloader />
                            :
                            <>Оставить заявку</>
                    }
                </button>
            </div>
        </form>
    )
}