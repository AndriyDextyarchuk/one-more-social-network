
import { useState, useContext } from 'react'
import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {AuthContext} from '../context/auth.js'
import {useForm} from '../utils/hooks.js'

export function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const {onChange, onSubmit, values} = useForm(loginUserCallback, {
        userName: '',
        password: '',
    })

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, result){
            context.login(result.data.login)
            props.history.push('/')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function loginUserCallback(){
        loginUser()
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={ loading ? 'loading' : ''}>
                <h1>Login</h1>
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
                    label='Password'
                    placeholder='Pasword'
                    name='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
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

const LOGIN_USER = gql`
        mutation login(
            $userName: String!
            $password: String!
        ) {
            login(
                userName: $userName
                password: $password
            ) {
                id userName email createdAt token
            }
        }
`