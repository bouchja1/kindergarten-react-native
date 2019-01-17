// @flow
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Modal } from "react-native-modal"

export default class MarkerModal extends React.PureComponent<Props> {
  render() {
    console.log("NOOOO:")
    return (
      <Modal
        visible>
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    )
  }
}
