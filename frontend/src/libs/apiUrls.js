const SERVER_URL = process.env.REACT_APP_API_URL;

module.exports = {
  HR_REGISTER_OTP: `${SERVER_URL}api/accounts/users/send-otp/`,
  HR_REGISTER_OTP_VERIFY: `${SERVER_URL}api/accounts/users/verify-otp/`,
  HR_LOGIN: `${SERVER_URL}api/accounts/login/`,
  HR_FORGET_PASS: `${SERVER_URL}api/accounts/forgot-password/`,
  HR_RESET_PASS: `${SERVER_URL}api/accounts/reset-password/`,
  HR_DETAILS: `${SERVER_URL}api/home/hr/details/`,
  HR_DETAILS_ADD: `${SERVER_URL}api/accounts/hr/hrs/`,
  ALL_EMPLOYEE_DETAILS: `${SERVER_URL}api/accounts/employee/`,
  EMPLOYEE_DELETE: `${SERVER_URL}api/accounts/employee/{id}/`,
  EMPLOYEE_DETAILS_ADD: `${SERVER_URL}api/accounts/employee/`,
  EMPLOYEE_COUNT: `${SERVER_URL}api/accounts/employee-count/`,
  MONTHLY_SALARY_STATUS: `${SERVER_URL}api/salary/monthly-salary/`,
  ALL_EMPLOYEE_SALARY_DETAILS: `${SERVER_URL}api/salary/salary/`,
  HOLIDAY_LIST: `${SERVER_URL}api/home/holidays/`,

}