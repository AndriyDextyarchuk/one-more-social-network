import { useState, useContext } from 'react'
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {AuthContext} from '../context/auth.js'
import {useForm} from '../utils/hooks.js'

export function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const {onChange, onSubmit, values} = useForm(registerUser, {
        userName: '',
        password: '',
        email: '',
        confirmPassword: '',
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, result){
            context.login(result.data.register)
            props.history.push('/')
        },
        onError(err){   
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function registerUser(){
        addUser()
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={ loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input
                    label='UserName'
                    placeholder='User name'
                    type='text'
                    name='userName'
                    value={values.userName}
                    error={errors.userName ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Email'
                    placeholder='Email'
                    type='email'
                    name='email'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='Password'
                    placeholder='Pasword'
                    name='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label='ConfirmPassword'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPasword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className='list'>
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
        mutation register(
            $userName: String!
            $email: String!
            $password: String!
            $confirmPassword: String!
        ) {
            register(
                registerInput: {
                    userName: $userName
                    email: $email
                    password: $password
                    confirmPassword: $confirmPassword
                }
            ) {
                id userName email createdAt token
            }
        }
`