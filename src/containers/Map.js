// @flow
import React from "react"
import { connect } from "react-redux"
import { StyleSheet, View } from "react-native"
import MapView from 'react-native-maps'
import ClusterMarker from "../components/ClusterMarker";
import { getCluster } from "../utils/MapUtils";

// data
import coordsData from "../../mock/coords"

// redux
import { onGetCoordinates } from "../redux/MapRedux"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
})

type Props = {
  coords: Array<*>,
  onGetCoordinates: typeof onGetCoordinates,
  region: any,
}

class Map extends React.PureComponent<Props> {
  static navigationOptions = { title: "Mapa" }

  componentDidMount() {
    const {onGetCoordinates} = this.props
    onGetCoordinates(coordsData)
  }

  renderMarker = (marker, index) => {
    const key = index + marker.geometry.coordinates[0];

    // If a cluster
    if (marker.properties) {
      return (
        <MapView.Marker
          key={key}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0]
          }}
        >
          <ClusterMarker count={marker.properties.point_count} />
        </MapView.Marker>
      );
    }
    // If a single marker
    return (
      <MapView.Marker
        key={key}
        coordinate={{
          latitude: marker.geometry.coordinates[1],
          longitude: marker.geometry.coordinates[0]
        }}
      />
    );
  };

  render() {
    const { coords, region } = this.props

    const allCoords = coords.map(c => ({
      geometry: {
        type: "Point",
        coordinates: [c.longitude, c.latitude],
      }
    }));

    const cluster = getCluster(allCoords, region);

    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          loadingIndicatorColor="#ffbbbb"
          loadingBackgroundColor="#ffbbbb"
          region={region}
        >
          {cluster.markers.map((marker, index) => this.renderMarker(marker, index))}
        </MapView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  coords: state.coords.items,
  region: state.coords.region,
})

const mapDispatchToProps = {
  onGetCoordinates,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map)