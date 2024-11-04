'use client'

import { useEffect, useState } from "react";
import { Form1 } from "./form1";
import { Form2 } from "./form2";

export interface FormData {
    name: string;
    genre: string;
    format: string;
    unf: string;
    country: string;
    info: string;
    sin: string;
}

export const FormCont = () => {
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

            {page === 1 && <Form1 formData={formData} check={check} setFormData={setFormData}/>}
            {page === 2 && <Form2 />}
            {page === 3 && <div className="text">третья страница формы</div>}
            {page === 4 && <div className="text">четвертая страница формы</div>}
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