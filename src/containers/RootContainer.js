// @flow
import React from "react"
import { SafeAreaView, StyleSheet, FlatList } from "react-native"
import { connect } from "react-redux"

// data
import moviesData from "../../mock/movies"

// components
import { RoundedButton, ListItem } from "../components"
import { Colors } from "../themes"

// redux
import { onGetMovies } from "../redux/MoviesRedux"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})

type Props = {
  movies: Array<*>,
  onGetMovies: typeof onGetMovies,
  navigation: any,
}

class RootContainer extends React.PureComponent<Props> {
  static navigationOptions = { title: "Home" }

  navigate = movieId => {
    const { navigation } = this.props
    navigation.navigate("Detail", { movieId })
  }

  render() {
    const { movies, onGetMovies } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          renderItem={({ item, index }) => (
            <ListItem
              onPress={() => this.navigate(item.id)}
              testID={`movieLink${index}`}
            >
              {item.title}
            </ListItem>
          )}
          data={movies}
          keyExtractor={item => item.id.toString()}
        />

        <RoundedButton
          onPress={() => onGetMovies(moviesData)}
          testID="downloadMoviesButton"
        >
          Download movies
        </RoundedButton>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  movies: state.movies.items,
})

const mapDispatchToProps = {
  onGetMovies,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer)
