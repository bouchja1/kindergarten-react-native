const getTwoDecimalRoundedFloat = (price) => Number(Math.round(price + 'e2') + 'e-2').toFixed(2)

export default getTwoDecimalRoundedFloat
