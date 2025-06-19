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

export { authData, authFormType, pages, serviceTypes }
