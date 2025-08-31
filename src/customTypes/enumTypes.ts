enum authData {
  email = 'emailAddress',
  username = 'userName',
  password = 'password',
  confirmPassword = 'confirmPassword'
}

enum authFormType {
  login = 'login',
  register = 'register'
}

enum pages {
  groupPage,
  addRecipe
}

enum serviceTypes {
  recipe = 'recipe',
  group = 'group'
}

enum ingredientFieldNames {
  ingredientName = 'ingredientName',
  quantityNumber = 'quantityNumber',
  measurementUnitId = 'measurementUnitId',
  sortOrder = 'sortOrder'
}

export { authData, authFormType, pages, serviceTypes, ingredientFieldNames }
