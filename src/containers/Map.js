// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { StyleSheet, View, SafeAreaView, Text } from "react-native"
import { Marker, Callout } from "react-native-maps"
import ClusteredMapView from "react-native-maps-super-cluster"

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
    onCoordinatesRequest(navigation.state.params.regionName)
  }

  renderCluster = (cluster, onPress) => {
    const { pointCount, coordinate, clusterId } = cluster
    return (
      <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>
            {pointCount}
          </Text>
        </View>
      </Marker>
    )
  }

  renderMarker = (pin) => (
    <Marker identifier={`pin-${pin.id}`} key={pin.id} coordinate={pin.location}/>
  )

  processCoords = (originalCoords) => {
    const points = []
    for (let i = 0; i < originalCoords.length; i++)
      points.push({
        id: `pin${originalCoords[i].id}`,
        location: { latitude: originalCoords[i].latitude, longitude: originalCoords[i].longitude },
      })
    return points
  }

  render() {
    const { coords, region } = this.props

    const processedCoords = this.processCoords(coords)

    return (
      <SafeAreaView style={styles.container}>
        <ClusteredMapView
          style={{ flex: 1 }}
          data={processedCoords}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          }}>
          {/*
            Markers rendered as children of ClusteredMapView are not taken in account by the clustering feature,
            they will just act as they were rendered within a normal react-native-maps instance
          */}
        </ClusteredMapView>
      </SafeAreaView>
    )

  }
}

const mapStateToProps = (state) => ({
  coords: state.coords.items,
  region: state.coords.region,
})

const mapDispatchToProps = {
  onCoordinatesRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)