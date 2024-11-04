'use client'

import { handleUnfChange } from "@/services/validation";
import { useEffect, useState } from "react";

interface FormData {
    name: string;
    genre: string;
    format: string;
    unf: string;
    country: string;
    info: string;
    sin: string;
}

const genres = [
    'Драма',
    'Комедия',
    'Экшен',
    'Приключения',
    'Ужасы',
    'Фантастика',
    'Мелодрама',
    'Документальный',
    'Анимация'
];
const formats = [
    'Онлайн-платформа',
    'Большой экран',
    'Интернет',
];

const countries = [
    'Россия',
    'Казахстан',
    'Белоруссия',
    'Китай',
];

export const Form = () => {
    const [check, setCheck] = useState(false)
    const [page, setPage] = useState(1)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        genre: '',
        format: '',
        unf: '',
        country: '',
        info: '',
        sin: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('formData');
            if (savedData) {
                try {
                    setFormData(JSON.parse(savedData));
                } catch (error) {
                    return
                }
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
    
        if (id === 'unf' && value.length > 18) {
            return
        }
        const formattedValue = id === 'unf' ? handleUnfChange(value) : value;
    
        setFormData((prevData: FormData) => {
            const newData = {
                ...prevData,
                [id]: formattedValue
            };
    
            localStorage.setItem('formData', JSON.stringify(newData));
            return newData;
        });
    };
    
    const activeButton = 
    Boolean(
        formData.name && 
        formData.unf && formData.unf.length === 18 && 
        formData.genre && 
        formData.country && 
        formData.format
    );

    return (
        <>
            <div className="form__top">
                <h1 className="title">Производственные параметры фильма</h1>
                <button className="button__cancel" 
                    onClick={() => {
                        localStorage.removeItem('formData'), 
                        setPage(1),
                        setFormData({name: '',
                            genre: '',
                            format: '',
                            unf: '',
                            country: '',
                            info: '',
                            sin: ''
                        })}
                    }>
                    Отменить заполнение
                </button>
            </div>
            {page === 1 && <form action="" className="main__form">
                <div className="form__container">
                    <div className="form__block">
                        <label className="small" htmlFor="name">Название проекта</label>
                        <div className={`input__box ${!formData.name && check ? 'error' : ''}`}>
                            <input id="name" type="text" value={formData.name} onChange={handleChange} placeholder="Название"/>
                            <p className="error__text">Заполните поле</p>
                        </div>
                    </div>
                    <div className="form__block">
                        <label className="small" htmlFor="genre">Жанр</label>
                        <div className={`input__box ${!formData.genre && check ? 'error' : ''}`}>
                            <select id="genre" value={formData.genre} className={!formData.genre || formData.genre === "" ? 'old' : ''} onChange={handleChange} >
                                <option value="" disabled>Жанр</option>
                                {genres.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <p className="error__text">Заполните поле</p>
                        </div>
                    </div>
                    <div className="form__block">
                        <label className="letter3 height" htmlFor="format">Формат (для онлайн-платформ, большого экрана, интернета, другое)</label>
                        <div className={`input__box ${!formData.format && check ? 'error' : ''}`}>
                            <select id="format" value={formData.format} className={!formData.format || formData.format === "" ? 'old' : ''} onChange={handleChange} >
                                <option value="" disabled>Формат</option>
                                {formats.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <p className="error__text">Заполните поле</p>
                        </div>
                    </div>
                    <div className="form__block">
                        <label className="small letter3" htmlFor="unf">№ УНФ или отсутствует</label>
                        <div  className={`input__box ${!formData.unf && check ? 'error' : ''}`}>
                            <input id="unf" type="text" value={formData.unf} onChange={handleChange} className="letter3" placeholder="890-000-000-00-000"/>
                            <p className="error__text">Заполните поле</p>
                        </div>
                    </div>
                </div>
                <div className="form__container">
                    <div className="form__block">
                        <label htmlFor="country" className="height">Страна-производитель (копродукция)</label>
                        <div  className={`input__box ${!formData.country && check ? 'error' : ''}`}>
                            <select id="country" value={formData.country} className={!formData.country || formData.country === "" ? 'old' : ''} onChange={handleChange} >
                                <option value="" disabled>Страна</option>
                                {countries.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <p className="error__text">Заполните поле</p>
                        </div>
                    </div>
                    <div className="form__block">
                        <label className="transfer height" htmlFor="info">Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть</label>
                        <div className="input__box">
                            <input id="info" type="number" value={formData.info} onChange={handleChange} className="letter3" placeholder="Сметная стоимость"/>
                        </div>
                    </div>
                    <div className="form__block">
                        <label className="small" htmlFor="sin">Синопсис</label>
                        <div className="input__box">
                            <textarea id="sin" value={formData.sin} onChange={handleChange} placeholder="Напишите краткое изложение"></textarea>
                        </div>
                    </div>
                </div>
            </form>}
            {page === 2 &&
                <div className="text">Вторая страница формы</div>
            }
            <div className="bottom__block">
                <div className="pages">
                <span onClick={() => setPage(1)} className={page === 1 ? "active" : ''}>1</span>
                <span onClick={() => activeButton ? setPage(2) : ''} className={page === 2 ? "active" : ''}>2</span>
                <span>...</span>
                <span className={page === 4 ? "active" : ''}>4</span>
                <span>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21C16.4477 21 16 20.5523 16 20C16 19.4477 16.4477 19 17 19L17 21ZM30.7071 19.2929C31.0976 19.6834 31.0976 20.3166 30.7071 20.7071L24.3431 27.0711C23.9526 27.4616 23.3195 27.4616 22.9289 27.0711C22.5384 26.6805 22.5384 26.0474 22.9289 25.6569L28.5858 20L22.9289 14.3431C22.5384 13.9526 22.5384 13.3195 22.9289 12.9289C23.3195 12.5384 23.9526 12.5384 24.3431 12.9289L30.7071 19.2929ZM17 19L30 19L30 21L17 21L17 19Z" fill="#121212"/>
                    </svg>
                </span>
                </div>
                <div className="button__box" onMouseEnter={() => setCheck(true)}>
                    <button  disabled={!activeButton || page !== 1} onClick={() => setPage(2)}>
                        Следующий шаг
                        <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.13385 7.99999L17.2294 7.99999M17.2294 7.99999L10.3313 1.11252M17.2294 7.99999L10.3313 14.8875" stroke="#ACACAC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};