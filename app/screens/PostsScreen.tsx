import { SectionList, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Comment, Post, Screen } from '../components'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { Post as PostType, getPostsAction } from '../redux/posts'
import { displayMessage } from '../utils'


export const PostsScreen = () => {
    const dispatch = useReduxDispatch();
    const { posts, getPosts: { loading, error } } = useReduxSelector(state => state.posts);
    const [sections, setSections] = useState([]);

    /**
     * Dispatch to get posts from API
     */
    useEffect(() => {
        dispatch(getPostsAction())
    }, []);

    /**
     * useEffect hook to handle loading, error and data for posts
     */
    useEffect(() => {
        if (loading === 'loading') return;
        if (error) return displayMessage(error);
        if (loading === 'succeeded') {
            const sectionData = posts.map(post => {
                //const postComments = comments.filter(comment => comment.postId === post.id)
                return { id: post.id, title: post.title, subTitle: post.body, data: post.comments }
            })
            setSections(sectionData)
        }
    }, [loading, error, posts]);

    console.log({ sections })
    return (
        <Screen preset='fixed' style={$root}>
            <SectionList
                sections={sections}
                renderItem={({ item }) => <Comment data={item} />}
                renderSectionHeader={({ section }) => <Post data={section} style={$postContainer} />}
                keyExtractor={(item, index) => index.toString()}
                stickySectionHeadersEnabled={false}
            />
        </Screen>
    )
}

const $root: ViewStyle = {

}

const $postContainer: ViewStyle = {

}

