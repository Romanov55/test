// Функция для форматирования ввода в формате 890-000-000-00-000
export const handleUnfChange = (value: string) => {
    // Удаляем все символы, кроме цифр
    value = value.replace(/\D/g, '');

    // Форматируем значение
    const match = value.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,3})$/);
    if (match) {
        // Формируем строку с дефисами
        return `${match[1]}${match[2] ? '-' + match[2] : ''}${match[3] ? '-' + match[3] : ''}${match[4] ? '-' + match[4] : ''}${match[5] ? '-' + match[5] : ''}`;
    }

    return value; // Если не совпадает, просто возвращаем значение
};
