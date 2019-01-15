// @flow
import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

// theme
import { Metrics } from "../themes"

const styles = StyleSheet.create({
  button: {
    padding: Metrics.padding.section,
  },
})

type Props = {|
  +onPress: () => void,
  +children: string,
  +testID: string,
|}

export default class ListItem extends React.PureComponent<Props> {
  render() {
    const { children, onPress, testID } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={styles.button} testID={testID}>
        <Text>{children}</Text>
      </TouchableOpacity>
    )
  }
}
