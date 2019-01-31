// @flow
import React from "react"
import { Text, StyleSheet, View } from "react-native"
import Modal from "react-native-modal"
import { Button } from "react-native-elements"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: 'stretch',
    padding: 15,
  },
  textHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  textName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: 'tomato',
  }
})

export default class MarkerModal extends React.PureComponent<Props> {

  // Render function is called when props has changed
  render() {
    const { isVisible, closeModal, showGraph, data } = this.props
    return (
      <View style={styles.container}>
        <Modal
          isVisible={isVisible}
          backdropOpacity={0.2}
          swipeDirection="left"
          onSwipe={closeModal}
          onBackdropPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.text}>
                <Text style={styles.textName}>{data.red_pln}</Text>
                <Text style={styles.textHeading}>Naplněnost v r. 2017:</Text>
                <Text style={{color: "tomato"}}>{data.children_total_attendance}/{data.children_total_capacity} ({data.children_total_attendance/data.children_total_capacity * 100} %)</Text>
                <Text style={styles.textHeading}>Adresa:</Text>
                <Text>{data.red_nazev}</Text>
                <Text>{data.red_ulice}</Text>
                <Text>{data.red_misto}</Text>
                <Text>{data.red_psc}</Text>
                <Text style={styles.textHeading}>Kontakt:</Text>
                { (data.www) ? <Text>{data.www}</Text> : null }
                { (data.email) ? <Text>{data.email}</Text> : null }
                { (data.phone) ? <Text>{data.phone}</Text> : null }
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  onPress={showGraph}
                  buttonStyle={styles.button}
                  title='Porovnat s okolím'
                />
                <Button
                  onPress={closeModal}
                  buttonStyle={styles.button}
                  title='Zavřít dialog'
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
