import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateAccessToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15m'});
}
const generateRefreshToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

// Получение всех пользователей
export const getUsers = async(req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка получения пользователей'});
    }
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

        // const token = jwt.sign(
        //     {userId: newUser._id},
        //     process.env.JWT_SECRET,
        //     {expiresIn: '1h'}
        // );

        const accesToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        })

        return res.status(201).json({ accesToken, user: newUser });
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
        // const token = jwt.sign(
        //     {userId: user._id},
        //     process.env.JWT_SECRET,
        //     {expiresIn: '1h'}
        // );

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        })
        console.log('Куки после установки:', req.cookies);
        // console.log('Токен доступа:', accessToken);
        // console.log('Токен обновления:', refreshToken);

        res.status(200).json({ accessToken, user });
    }catch (error) {
        console.error('Ошибка входа: ' + error);
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

export const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Токен отсутствует' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const newAccessToken = generateAccessToken(decoded.userId);
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(401).json({ message: 'Токен недействителен' });
    }
};