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
|}

const buttonRadius = ["1 km", "2 km", "3 km", "5 km", "10 km"]

export default class GrButton extends React.PureComponent<Props> {

  state = {
    selectedIndex: 2,
  }

  updateIndex = (newSelectedIndex, showDifferentRadius) => {
    console.log("AAA: ", newSelectedIndex)
    this.setState(() => ({
      selectedIndex: newSelectedIndex,
    }))
    showDifferentRadius(buttonRadius[newSelectedIndex])
    console.log("KJKKJKJKJKJKJ")
  }

  render() {
    const { selectedIndex } = this.state
    console.log("rendering new selected index: ", selectedIndex)
    const { showDifferentRadius } = this.props
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
