import Users from '../Models/userModel.js';
import bcrypt from 'bcrypt';

// Обработчик ошибок
const handleError = (res, error) => {
    res.status(500).json({ error });
};

// Получение всех пользователей
export const getUsers = (req, res) => {
    Users
        .find()
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => handleError(res, err));
}

// Регистрация пользователя
export const registerUser = async(req, res) => {
    const {username, email, password } = req.body;

    try{
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res
                .status(400)
                .json({error: 'Email is already registered'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new Users({
            username, 
            email,
            password: hashedPassword,
            isConfirmed: false,
        })
        await newUser.save()
            .then((user) => res.status(201).json(user))
            .catch((err) => res.status(201).json({ error: err.message }));

        
    }catch(error){
        console.log('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
}

// Профиль пользователя
export const profileUser = async(req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user data'  });
    }
}