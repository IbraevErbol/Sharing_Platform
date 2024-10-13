import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            // Проверяем токен на валидность
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Добавляем ID пользователя в запрос (для дальнейшего использования в других обработчиках)
            req.userId = decoded.id;
            
            // Передаём управление дальше, если проверка успешна
            next();
        } catch (error) {
            // Возвращаем сообщение об ошибке, если токен недействителен
            return res.status(401).json({ message: 'Нет доступа.' });
        }
    }
    else {
        // Возвращаем сообщение, если токен отсутствует
        return res.status(401).json({ message: 'Нет доступа.' });
    }
}
