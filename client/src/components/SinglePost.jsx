import {useContext} from 'react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import { Card, Grid, Image, Button, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'

import {AuthContext} from '../context/auth'
import { LikeButton } from './LikeButton'
import { DeleteButton } from './DeleteButton'

export function SinglePost(props) {
    const {user} = useContext(AuthContext)
    const postID = props.match.params.postID
    console.log(postID)

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {postID} 
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    console.log(data)
    let postMarkup
    if(!data.getPost){
        postMarkup = <p>Loading post...</p>
    } else {
        const {id, body, createdAt, userName, comments, likes, likeCount, commentsCount} = data.getPost

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image 
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                            size='small'
                            float='right'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{userName}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr/>
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likeCount, likes}}/>
                                <Button as='div' labelPosition='right' onClick={() => console.log('COmment on post')}>
                                    <Button basic color='blue'>
                                        <Icon name='comments'/>
                                        <Label basic color='blue' pointing='left'>
                                            {commentsCount}
                                        </Label>
                                    </Button>
                                </Button>
                                {user && user.userName === userName && (
                                    <DeleteButton postID={id} callback={deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup
}

const FETCH_POST_QUERY = gql`
    query($postID: ID!){
        getPost(postID: $postID){
            id
            body
            createdAt
            userName
            likeCount
            likes{
                userName
            }
            commentCount
            comments{
                id
                userName
                createdAt
                body
            }
        }
    }
`
