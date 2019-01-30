// @flow
import React  from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ButtonGroup} from "react-native-elements"

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
|}

export default class GrButton extends React.PureComponent<Props> {

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex = (newSelectedIndex) => {
    this.setState(
      {selectedIndex: newSelectedIndex
      })
  }
  
  
  render() {
    const { selectedIndex } = this.state
    const buttonRadius = ['1 km', '2 km', '3 km', '5km', '10km']
    return (
      <View style={styles.container}>
        <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttonRadius}
        containerStyle={{height: 30}}
        />
      </View>
    )
  }
}
