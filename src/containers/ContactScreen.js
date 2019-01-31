// @flow
import React from "react"
import { Text, View } from "react-native"

// components

export default class ContactContainer extends React.PureComponent<null> {
  static navigationOptions = {
    title: "Contact",
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Semka hodím kontakt a je to</Text>
      </View>
    )
  }
}
