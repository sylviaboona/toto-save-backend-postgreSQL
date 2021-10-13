const successMessage = { status: 'success' };
const errorMessage = { status: 'error' };
const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
};

const login_statuses = {
  active: 1.00,
  loggedOut: 2.00,
}

module.exports = {
  successMessage,
  errorMessage,
  status,
  login_statuses,
};