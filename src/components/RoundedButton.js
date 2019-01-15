// @flow
import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

// theme
import { Colors, Metrics } from "../themes"

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: Colors.background,
    borderColor: Colors.primary,
    borderWidth: 3,
    width: Metrics.buttons.height,
    height: Metrics.buttons.height,
    borderRadius: Metrics.buttons.height / 2,
    justifyContent: "center",
  },
})

type Props = {|
  +onPress: () => void,
  +children: string,
  +testID: string,
|}

export default class RoundedButton extends React.PureComponent<Props> {
  render() {
    const { children, onPress, testID } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={styles.button} testID={testID}>
        <Text>{children}</Text>
      </TouchableOpacity>
    )
  }
}
