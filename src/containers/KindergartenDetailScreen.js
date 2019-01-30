// @flow
import React from "react"
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, FlatList } from "react-native"
import { ErrorMessage, Formik } from "formik"
import connect from "react-redux/es/connect/connect"

import { Colors } from "../themes"
import { onKindergartenRadiusRequest } from "../redux/KindergartenRedux"
import { ListItem } from "../components"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
})

type Props = {
  onKindergartenRadiusRequest: typeof onKindergartenRadiusRequest,
  navigation: any,
  kindergartensInRadius: Array<*>,
}

class KindergartenDetailScreen extends React.PureComponent<Props> {
  static navigationOptions = { title: "Kindergarten detail" }

  handleSubmitForm = (values, actions) => {
    const { onKindergartenRadiusRequest, navigation } = this.props
    // actions.setSubmitting(false);
    let kindergartenReqObj = navigation.state.params.kindergarten
    kindergartenReqObj = {
      ...kindergartenReqObj,
      radius: Number(values.radius),
    }
    onKindergartenRadiusRequest(kindergartenReqObj)
  }

  validate = (values) => {
    const errors = {}
    try {
      Number(values.radius)
    } catch (e) {
      errors.radius = "Radius should be a number!"
    }
  }


  render() {
    const { kindergartensInRadius } = this.props
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          onSubmit={this.handleSubmitForm} // accepts argument object with values
          validate={this.validate}
        >
          {props => (
            <View>
              <TextInput
                onChangeText={props.handleChange("radius")}
                value={props.values.radius}
              />
              <ErrorMessage name="radius" component={Text}/>
              <Button title='Send' onPress={props.handleSubmit}/>
            </View>
          )}
        </Formik>
        <FlatList
          renderItem={({ item }) => {
            return <ListItem>{item.red_nazev}, {item.red_misto}</ListItem>
          }}
          data={kindergartensInRadius}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({
  kindergartensInRadius: state.kindergarten.schools,
})

const mapDispatchToProps = {
  onKindergartenRadiusRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KindergartenDetailScreen)
