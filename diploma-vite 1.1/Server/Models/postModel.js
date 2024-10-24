import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title: {
        type: String,
        required: true, // Обязательно для заполнения
    },
    content: {
        type: String,
        required: true, // Обязательно для заполнения
    },
    image: {
        type: String, // Ссылка на загруженное изображение
        default: null, // Значение по умолчанию
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId, // Ссылка на пользователя
        ref: 'Users', // Связь с моделью Users
        required: true, // Обязательно для заполнения
    },
    createdAt: {
        type: Date,
        default: Date.now, // Дата создания по умолчанию
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Дата обновления по умолчанию
    },
});

// Обновление поля updatedAt перед сохранением
postsSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Posts = mongoose.model('Posts', postsSchema);
export default Posts;
