import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import {setContext} from 'apollo-link-context'

import App from './App.js'

const httpLlink = createHttpLink({
    uri: 'http://localhost:5000'
})

const AuthLink = setContext(() => {
    const token = localStorage.getItem('jwtToken')
    return{
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    link: AuthLink.concat(httpLlink),
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)