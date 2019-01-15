const formatPrice = (value: number | string) => {
  const numericValue = typeof value === "string" ? parseInt(value, 10) : value
  return isNaN(numericValue) ? "-" : `$${numericValue.toFixed(2)}`
}

export default formatPrice
