import mongoose from "mongoose"; 

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isConfirmed: {
        type: Boolean,
        default: false, 
    },
    confirmationCode: {
        type: String, 
    }
})
const Users = mongoose.model('Users', usersSchema);
export default Users;
