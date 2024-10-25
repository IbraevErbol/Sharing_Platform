import Posts from '../Models/postModel.js'

// Создание нового поста
export const newPost = async(req,res) => {
    try {
        // console.log(req.body); // Проверяем данные
        // console.log(req.file); // Проверяем файл

        const { title, content, authorId } = req.body;
        const image = req.file ? req.file.path : null;

        const newPost = new Posts({ title, content, image, authorId});
        await newPost.save();
        
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Ошибка при создании поста:', error);
        res.status(500).json({message: 'Ошибка при создании поста', error})
    }
}

// Получение всех постов
export const getPosts = async(req,res) => {
    try {
        const posts = await Posts.find().populate('authorId', 'username email')
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении постов', error })
    }
}

// Получение поста по идентификатору
export const getPostId = async(req,res) => {
    try {
        const post = await Posts.findById(req.params.id).populate('authorId',  'username email');
        if(!post){
            return res.status(404).json({ message: 'Пост не найден' })
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при получении поста', error });
    }
}

// Получения постов конкретного пользователя
export const getPostsByUserId = async(req,res) => {
    try {
        const { id } = req.params;
        const posts = await Posts.find({authorId: id})
        res.status(200).json(posts)
    } catch (error) {
        console.error('Ошибка при получении постов:', error);
        res.status(500).json({ message: 'Ошибка получения постов.'})
    }
}

// Обнавление поста
export const updatePost = async(req,res) => {
    const {title, content} = req.body;
    let image;

    // console.log('Body:', req.body); // Отладка: проверка тела запроса
    // console.log('File:', req.file);

    if(req.file){
        image = req.file.path;
    }
    try {
        const updatedFields = {
            title,
            content,
            ...(image && { image }), // Обновляем изображение только если оно есть
        };


        const updatedPost = await Posts.findByIdAndUpdate(req.params.id, updatedFields, {new: true});
        if(!updatedPost){
            return res.status(404).json({ message: 'Пост не найден' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при обновлении поста', error });
    }
}

// Удаление поста
export const deletePost = async(req,res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);
        if(!deletedPost){
            return res.status(404).json({ message: 'Пост не найден' });
        }
        res.status(200).json({ message: 'Пост удален' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при удалении поста', error });
    }
}