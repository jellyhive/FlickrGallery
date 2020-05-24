import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type ErrorBarProps = {
    visible: boolean
    text?: string
}

const ErrorBar: React.FC<ErrorBarProps> = ({visible, text}) => {

    return (
        <>
        { visible && <View style={style.container}>
                        <Text style={style.text}>{text}</Text>
                    </View> }
        </>
    )
}
export default ErrorBar

const style = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: '#ff0000'
    },
    text: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        paddingBottom: 10,
        color: '#ffffff'
      }
  })