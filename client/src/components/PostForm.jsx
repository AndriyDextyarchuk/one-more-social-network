import {Button, Form} from 'semantic-ui-react'
import {useMutation} from '@apollo/react-hooks'
import gql  from 'graphql-tag'

import {useForm} from '../utils/hooks'
import {FETCH_POSTS_QUERY} from '../utils/graphql'

export function PostForm() {
    const {values, onChange, onSubmit} = useForm(createPostCallback, {
        body: '',
    })

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost, ...data.getPosts]
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
            values.body = ''
        }
    })

    function createPostCallback(){
        createPost()
    }
    return (<>
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Input
                placeholder='Social Media'
                name='body'
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
            />
            <Button type='submit' color='teal'>
                Submit
            </Button>
        </Form>
        {error && (
            <div className="ui error message" style={{magrinBottom: 20}}>
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
    </>)
}


const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            userName
            likes{
                id
                userName
                createdAt
            }
            likeCount
            comments{
                id
                body
                userName
                createdAt
            }
            commentCount    
        }

    }
`
