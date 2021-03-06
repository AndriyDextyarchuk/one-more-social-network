import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {Button, Label, Icon} from 'semantic-ui-react'

export function LikeButton({post: {id, likeCount, likes}, user}) {
    const [liked, setLiked] = useState(false)
    useEffect(() => {
         if(user && likes.find(like => like.userName === user.userName)) {
            setLiked(true)
        } else setLiked(false)
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postID: id}
    })

    const likeButton = user ? (
        liked ?  (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button as={Link} to='/login' color='teal' basic>
            <Icon name='heart' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postID: ID!){
            likePost(postID: $postID){
                id
                likes{
                    id
                    userName
                }
                likeCount
            }
    }
`