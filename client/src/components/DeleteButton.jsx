import {useState} from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {Button, Confirm, Icon} from 'semantic-ui-react'

import {FETCH_POSTS_QUERY} from '../utils/graphql'

export function DeleteButton({postID, callback}){
    const [confirmOpen, setConfirmOpen] = useState(false)

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            setConfirmOpen(false)
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            data.getPosts = data.getPosts.filter(p => p.id !== postID)
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
            if(callback) callback()
        },
        variables: {postID}
    })

    return (<>
        <Button as='div' color='red' floated='right' onClick={() => setConfirmOpen(true)}>
            <Icon name='trash' style={{margin: 0}}/>
        </Button>
        <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost}/>
    </>)
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postID: ID!){
        deletePost(postID: $postID)
    }
`