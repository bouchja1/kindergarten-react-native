// @flow
import React from "react"
import { StyleSheet, View } from "react-native"
import { ButtonGroup } from "react-native-elements"

// theme
import { Metrics } from "../themes"

const styles = StyleSheet.create({
  button: {
    padding: Metrics.padding.section,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },
})

type Props = {|
  +onPress: () => void,
  showDifferentRadius: any,
  selectedIndex: number,
|}

const buttonRadius = ["1 km", "2 km", "3 km", "5 km", "10 km"]

export default class GrButton extends React.PureComponent<Props> {

  updateIndex = (newSelectedIndex, showDifferentRadius) => {
    showDifferentRadius(buttonRadius[newSelectedIndex], newSelectedIndex)
  }

  render() {
    const { showDifferentRadius, selectedIndex } = this.props
    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={(index) => this.updateIndex(index, showDifferentRadius)}
          selectedIndex={selectedIndex}
          buttons={buttonRadius}
          containerStyle={{ height: 30 }}
        />
      </View>
    )
  }
}
