// @flow
import React from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"

import getTwoDecimalRoundedFloat from '../util/format'
// https://snack.expo.io/@spencercarli/react-native-flatlist-grid

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'tomato',
    paddingTop: 20,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    marginLeft: 50,
    height: 40, // approximate a square

  },
  itemInvisible: {
    backgroundColor: "transparent",
  },

})

const numColumns = 2

export default class DescTable extends React.PureComponent<Props> {

  tableData = (count, min, max) => (
    [
      { key: "Počet školek \nv okolí" }, { key: count },
      { key: "Nejméně naplněná \nškolka (2017)" }, { key: getTwoDecimalRoundedFloat(min) },
      { key: "Nejvíce naplněná \nškolka (2017)" }, { key: getTwoDecimalRoundedFloat(max) },
      // { key: 'L' },
    ])

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={styles.item}/>
    }
    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    )
  }

  render() {
    const { radiusCount, radiusMax, radiusMin } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={this.tableData(radiusCount, radiusMin, radiusMax)}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
        />
      </View>

    )
  }

}

