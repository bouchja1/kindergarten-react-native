// @flow
import React from "react"
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native"
import Modal from "react-native-modal"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  innerContainer: {
    alignItems: "center",
  },
})

export default class MarkerModal extends React.PureComponent<Props> {

  // Render function is called when props has changed
  render() {
    const { isVisible, closeModal } = this.props
    console.log("isVisible:", isVisible)
    return (
      <View style={styles.container}>
        <Modal
          isVisible={isVisible}
          backdropOpacity={0.1}
          swipeDirection="left"
          onSwipe={closeModal}
          onBackdropPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>I am the modal content!</Text>
              <Button
                onPress={closeModal}
                title="Close modal" />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
