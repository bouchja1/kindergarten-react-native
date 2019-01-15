import React from "react"
import { SafeAreaView, Text, StyleSheet } from "react-native"
import { connect } from "react-redux"

const styles = StyleSheet.create({
  container: { flex: 1 }
})

// For illustration purposes only
const getMovieById = (state, movieId) =>
  state.movies.items.filter(movie => movie.id === movieId)[0]

class Detail extends React.PureComponent<null> {
  static navigationOptions = { title: "Movie detail" }

  render() {
    const { movie } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Text>{movie.title}</Text>
      </SafeAreaView>
    )
  }
}
const mapStateToProps = (state, props) => ({
  movie: getMovieById(state, props.navigation.state.params.movieId)
})

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
