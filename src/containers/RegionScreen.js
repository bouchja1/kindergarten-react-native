// @flow
import React from "react"
import { SafeAreaView, StyleSheet, FlatList, View } from "react-native"
import { connect } from "react-redux"
import i18n from "i18n-js"
import cs from "../i18n/cs"

// components
import { ListItem } from "../components"
import { Colors } from "../themes"

// redux
import { onRegionsRequest } from "../redux/RegionsRedux"

i18n.translations = { cs }

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
  regions: Array<*>,
  onRegionsRequest: typeof onRegionsRequest,
  navigation: any,
}

class RegionScreen extends React.PureComponent<Props> {
  static navigationOptions = { title: 'Zvolte kraj' }

  componentDidMount() {
    const { onRegionsRequest } = this.props
    onRegionsRequest()
  }

  navigate = item => {
    const { navigation } = this.props
    navigation.navigate("TerritoriesScreen", {
      allRegion: item,
    })
  }

  renderItem = ({ item }) => (
    <ListItem
      onPress={() => this.navigate(item)}
    >
      {item.nvusc}
    </ListItem>
  )

  keyExtractor = item => `item-${item.nvusc}`

  renderSeparator = () => <View style={styles.listSeparator} />

  render() {
    const { regions } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          data={regions}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  regions: state.regions.items,
})

const mapDispatchToProps = {
  onRegionsRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegionScreen)
