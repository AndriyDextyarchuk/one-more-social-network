const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')

const {SECRET_KEY} = require('../../config.js')
const User = require('../../models/User')
const {validateRegisterInput, validateLoginIntup} = require('../../utils/validators.js')

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        userName: user.userName,
    }, SECRET_KEY, {expiresIn: '1h'})
}

module.exports = {
    Mutation: {
        async login(_, {userName, password}){
            const {errors, valid} = validateLoginIntup(userName, password)

            if(!valid){
                throw new UserInputError('Validation errors', {errors})
            }

            const user = await User.findOne({userName})
            if(!user){
                errors.general = 'User not found'
                throw new UserInputError('User not found', {errors})
            }

            const match = await bcrypt.compare(password, user.password)
            if(!match){
                errors.general = 'Wrong credentials'
                throw new UserInputError('Wrong credentials', {errors})
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token,
            }
        },
        async register(
            _, 
            {registerInput: {userName, email, password, confirmPassword}}, 
        ){
            // TODO: VAlidate user data
            const {valid, errors} = validateRegisterInput(userName, email, password, confirmPassword)
            if (!valid){
                throw new UserInputError('Errors', {errors})
            }
            // TODO: Make sure user doesnt alredy exist
            const user = await User.findOne({userName})
            if (user) {
                throw new UserInputError('User name is taken', {
                    errors: {
                        userName: 'This user name is taken'
                    }
                })
            }
            //  hash password and create an auth token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                email,
                userName,
                password,
                createdAt: new Date().toISOString()
            })

            const res = await newUser.save()

            const token = generateToken(res)
            
            return {
                ...res._doc,
                id: res._id,
                token,
            }
        }
    }
}