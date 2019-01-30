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
  showDifferentRadius: any,
|}

export default class GrButton extends React.PureComponent<Props> {

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 2
    }
    this.buttonRadius = ['1 km', '2 km', '3 km', '5 km', '10 km']
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex = (newSelectedIndex, showDifferentRadius) => {
    console.log("HOVNO: ", newSelectedIndex)
    console.log("KM: ", this.buttonRadius[newSelectedIndex])
    console.log("showDifferentRadius: ", showDifferentRadius)
    showDifferentRadius(this.buttonRadius[newSelectedIndex])
    this.setState(
      {selectedIndex: newSelectedIndex
      })
  }
  
  
  render() {
    const { selectedIndex } = this.state
    const { showDifferentRadius } = this.props;
    return (
      <View style={styles.container}>
        <ButtonGroup
        onPress={(event) => this.updateIndex(event, showDifferentRadius)}
        selectedIndex={selectedIndex}
        buttons={this.buttonRadius}
        containerStyle={{height: 30}}
        />
      </View>
    )
  }
}
