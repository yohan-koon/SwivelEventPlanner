import { SectionList, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Comment, Post, Screen } from '../components'
import { posts } from '../seeds/posts'
import { comments } from '../seeds/comments'
import { spacing } from '../theme'


export const PostsScreen = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const sectionData = posts.map(post => {
            const postComments = comments.filter(comment => comment.postId === post.id)
            return { id: post.id, title: post.title, subTitle: post.body,  data: postComments }
        })
        setSections(sectionData)
    }, [])

    console.log({sections})
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

