import formatPrice from "../formatPrice"

it("formats price", () => {
  const formatedPrice = formatPrice(2)
  expect(formatedPrice).toEqual("$2.00")
})

it("formats price string", () => {
  const formatedPrice = formatPrice("2")
  expect(formatedPrice).toEqual("$2.00")
})

it("formats price decimal", () => {
  const formatedPrice = formatPrice(2.03)
  expect(formatedPrice).toEqual("$2.03")
})

it("formats price words", () => {
  const formatedPrice = formatPrice("three")
  expect(formatedPrice).toEqual("-")
})
