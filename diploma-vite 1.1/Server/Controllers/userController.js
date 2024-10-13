import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
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

        const token = jwt.sign(
            {userId: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        return res.status(201).json({ token, user: newUser });
    }catch(error){
        console.log('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
}

// Вход пользователя
export const loginUser = async (req, res) => {
    const {email, password } = req.body;
    try{
        const user = await Users.findOne({email})
        if(!user){
            return res
                .status(404)
                .json({error: 'Invalid email or password'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.status(200).json({ token, user });
    }catch (error) {
        res.status(500).json({ error: 'Error logging in' });
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