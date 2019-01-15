import React from "react"
import renderer from "react-test-renderer"
import RoundedButton from "../RoundedButton"

test("renders RoundedButton correctly", () => {
  const tree = renderer
    .create(<RoundedButton onPress={() => null}>Button</RoundedButton>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
