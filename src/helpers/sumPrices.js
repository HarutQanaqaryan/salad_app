export const sumPrices = (ingredients) => {
   return ingredients
      .map((el) => el.discount_price)
      .reduce((acc, el) => acc + el, 0)
}