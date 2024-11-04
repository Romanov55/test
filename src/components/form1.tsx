import React from 'react';
import { FormData } from './formCont';
import { handleUnfChange } from '@/services/validation';

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


export const Form1 = ({formData, check, setFormData} : {formData: FormData, check: boolean, setFormData: any}) => {
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

    return (
        <form action="" className="main__form">
            <div className="form__container">
                <div className="form__block">
                    <label className="small" htmlFor="name">Название проекта</label>
                    <div className={`input__box ${!formData.name && check ? 'error' : ''}`}>
                        <input id="name" type="text" value={formData.name} onChange={handleChange} placeholder="Название" />
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
                    <div className={`input__box ${!formData.unf && check ? 'error' : ''}`}>
                        <input id="unf" type="text" value={formData.unf} onChange={handleChange} className="letter3" placeholder="890-000-000-00-000" />
                        <p className="error__text">Заполните поле</p>
                    </div>
                </div>
            </div>
            <div className="form__container">
                <div className="form__block">
                    <label htmlFor="country" className="height">Страна-производитель (копродукция)</label>
                    <div className={`input__box ${!formData.country && check ? 'error' : ''}`}>
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
                        <input id="info" type="number" value={formData.info} onChange={handleChange} className="letter3" placeholder="Сметная стоимость" />
                    </div>
                </div>
                <div className="form__block">
                    <label className="small" htmlFor="sin">Синопсис</label>
                    <div className="input__box">
                        <textarea id="sin" value={formData.sin} onChange={handleChange} placeholder="Напишите краткое изложение"></textarea>
                    </div>
                </div>
            </div>
        </form>
    );
};