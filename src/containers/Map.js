// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { StyleSheet, SafeAreaView } from "react-native"
import MapView, { Callout } from "react-native-maps"

import { MarkerModal } from "../components"

// redux
import { onCoordinatesRequest, onKindergartenDetailRequest } from "../redux/MapRedux"

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
  searchBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  onKindergartenDetailRequest: typeof onKindergartenDetailRequest,
  region: any,
  navigation: any,
  kindergarten: any,
}

class Map extends Component<Props> {
  static navigationOptions = { title: "Mapa" }

  state = {
    markerModalVisible: false,
  }

  componentDidMount() {
    const { onCoordinatesRequest, navigation } = this.props
    onCoordinatesRequest(navigation.state.params.metadata, navigation.state.params.vusc)
  }

  navigate = () => {
    const { navigation, kindergarten } = this.props
    console.log("NAVIGATING")
    navigation.navigate("KindergartenDetail", {
      kindergarten,
    })
  }

  navigateGraph = () => {
    const { navigation, kindergarten} = this.props
    console.log("NAVIGATING")
    navigation.navigate("KindergartenDetailGraph", {
      kindergarten,
    })
  }

  showModal = (pin) => {
    const { onKindergartenDetailRequest } = this.props
    onKindergartenDetailRequest(pin.id)
    this.setState(() => ({
      markerModalVisible: true,
    }))
  }

  closeModal = () => {
    this.setState(() => ({
      markerModalVisible: false,
    }))
  }


  showMore = () => {
    this.closeModal()
    this.navigate()
  }

  showGraph = () => {
    this.closeModal()
    this.navigateGraph()
  }

  renderMarker = (pin) => (
    <MapView.Marker identifier={`${pin.id}`} key={pin.id} coordinate={pin.location}
                    onPress={() => this.showModal(pin)}/>
  )

  processCoords = (originalCoords) => {
    const points = []
    for (let i = 0; i < originalCoords.length; i++) {
      points.push({
        id: `${originalCoords[i].id}`,
        location: { latitude: originalCoords[i].latitude, longitude: originalCoords[i].longitude },
      })
    }
    return points
  }

  render() {
    const { coords, region, kindergarten } = this.props
    const { markerModalVisible } = this.state

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
        <MarkerModal
          isVisible={markerModalVisible}
          data={kindergarten}
          showMore={() => this.showMore()}
          showGraph={() => this.showGraph()}
          closeModal={() => this.closeModal()}/>
      </SafeAreaView>
    )

  }
}

const mapStateToProps = (state) => ({
  coords: state.map.items,
  region: state.map.region,
  kindergarten: state.map.kindergarten,
})

const mapDispatchToProps = {
  onCoordinatesRequest,
  onKindergartenDetailRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)