import {useContext} from 'react'
import {Card, Icon, Label, Button, Image} from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import {AuthContext} from '../context/auth'
import {LikeButton} from './LikeButton'
import {DeleteButton} from './DeleteButton'

export function PostCard(props){
    const {post: {body, createdAt, id, userName, likeCount, commentCount, likes}} = props

    const {user} = useContext(AuthContext)  

    return(
        <Card fluid>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{userName}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likes, likeCount}}/>
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.userName === userName && <DeleteButton postID={id} /*callback={deletePostCallback}*//>}
            </Card.Content>
        </Card>
    )
}