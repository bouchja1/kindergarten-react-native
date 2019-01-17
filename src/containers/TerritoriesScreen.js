// @flow
import React from "react"
import { SafeAreaView, StyleSheet, FlatList, View } from "react-native"
import { connect } from "react-redux"

// components
import { ListItem } from "../components"
import { Colors } from "../themes"

// redux
import { onTerritoryLoad } from "../redux/RegionsRedux"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listSeparator: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%",
  },
})

type Props = {
  territory: any,
  onTerritoryLoad: typeof onTerritoryLoad,
  navigation: any,
}

class TerritoriesScreen extends React.PureComponent<Props> {
  static navigationOptions = { title: "Select territory" }

  componentDidMount() {
    const { onTerritoryLoad, navigation } = this.props
    onTerritoryLoad(navigation.state.params.allRegion)
  }

  navigate = (metadata, vusc) => {
    const { navigation } = this.props
    navigation.navigate("Map", { metadata, vusc })
  }

  renderItem = ({item}, metadata) => {
    return <ListItem
      onPress={() => this.navigate(metadata, item.vusc)}
    >
      {item.name}
    </ListItem>
  }

  keyExtractor = item => `item-${item.vusc}`

  renderSeparator = () => <View style={styles.listSeparator} />

  render() {
    const { territory } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          renderItem={(item) => this.renderItem(item, { nvusc: territory.nvusc, regionLatitude: territory.latitude, regionLongitude: territory.longitude } )}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          data={territory.territories}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  territory: state.regions.territory,
})

const mapDispatchToProps = {
  onTerritoryLoad,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TerritoriesScreen)
