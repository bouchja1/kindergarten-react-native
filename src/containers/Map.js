// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { StyleSheet, View, SafeAreaView, Text } from "react-native"
import MapView, { Marker, Callout} from "react-native-maps"

import { MarkerModal } from "../components"

// redux
import { onCoordinatesRequest } from "../redux/MapRedux"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "center",
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    borderColor: "#65bc46",
    justifyContent: "center",
    backgroundColor: "white",
  },
  clusterText: {
    fontSize: 13,
    color: "#65bc46",
    fontWeight: "500",
    textAlign: "center",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})

type Props = {
  coords: Array<*>,
  onCoordinatesRequest: typeof onCoordinatesRequest,
  region: any,
  navigation: any,
}

class Map extends Component<Props> {
  static navigationOptions = { title: "Mapa" }

  componentDidMount() {
    const {onCoordinatesRequest, navigation} = this.props;
    onCoordinatesRequest(navigation.state.params.metadata, navigation.state.params.vusc)
  }

  showModal = (pin) => {
    console.log("PIN: ", pin)
    return <MarkerModal />
  }

  renderMarker = (pin) => (
    <Marker identifier={`${pin.id}`} key={pin.id} coordinate={pin.location} onPress={() => this.showModal(pin) } />
  )

  processCoords = (originalCoords) => {
    const points = []
    for (let i = 0; i < originalCoords.length; i++)
      points.push({
        id: `${originalCoords[i].id}`,
        location: { latitude: originalCoords[i].latitude, longitude: originalCoords[i].longitude },
      })
    return points
  }

  render() {
    const { coords, region } = this.props

    const processedCoords = this.processCoords(coords)

    return (
      <SafeAreaView style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          loadingIndicatorColor="#ffbbbb"
          loadingBackgroundColor="#ffbbbb"
          region={region}
        >
          {processedCoords.map((pin) => this.renderMarker(pin))}
        </MapView>
      </SafeAreaView>
    )

  }
}

const mapStateToProps = (state) => ({
  coords: state.map.items,
  region: state.map.region,
})

const mapDispatchToProps = {
  onCoordinatesRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)