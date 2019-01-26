// @flow
import React  from "react"
import { StyleSheet, Text, TouchableOpacity, ButtonGroup, View } from "react-native"

// theme
import { Metrics } from "../themes"

const styles = StyleSheet.create({
  button: {
    padding: Metrics.padding.section,
  },
      container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 15,
      backgroundColor: '#ecf0f1',
    },
})

type Props = {|
  +onPress: () => void,
  +buttons: string,
|}

export default class GrButton extends React.PureComponent<Props> {

  constructor () {
    super()
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  
  
  render() {
    const { selectedIndex } = this.state
    const { buttons } = this.props

    return (
      <View style={styles.container}>
        <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 100}}
        />
      </View>
    )
  }
}
