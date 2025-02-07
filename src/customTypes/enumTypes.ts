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

export { authData, authFormType, pages }
