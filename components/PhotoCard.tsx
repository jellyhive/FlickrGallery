import React from 'react'
import { StyleSheet, Text, Image, Dimensions } from 'react-native'

type PhotoCardProps = {
    url: string
    title: string
}

export class PhotoCard extends React.PureComponent<PhotoCardProps> {
    render() {
        return (
            <>
                <Image style={style.image} source={{uri: this.props.url}}/>
                <Text style={style.text}>{this.props.title}</Text>
            </>
        )
    }
}

const style = StyleSheet.create({
    image: {
      height: Dimensions.get("screen").width,
      width: Dimensions.get("screen").width,
      resizeMode: 'cover'
    },
    text: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 40
    }
})