export const myFoodItems = JSON.parse(localStorage.getItem('list')) || []

export const myFoodItemsCount = myFoodItems.length