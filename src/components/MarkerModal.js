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
    const { isVisible, closeModal, showMore, showGraph, data } = this.props
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
              <Button
                onPress={showMore}
                title="Show more" />
              <Text>{JSON.stringify(data, null, 2)}</Text>
              <Button
                onPress={showGraph}
                title="Show graph" />
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
