import { Switch, Route } from "react-router-dom";
import AdminPanel from "../components/hr_admin_component/adminPanel/AdminPanel";
import Salary from "../components/hr_admin_component/salary/Salary";
import UpdateEmployee from "../components/hr_admin_component/employees/UpdateEmployee";
import ViewEmployees from "../components/hr_admin_component/employees/ViewEmployees";
import AddEmployee from "../components/hr_admin_component/employees/AddEmployee";
import Home from "../components/hr_admin_component/home/Home";
import Dashboard from "../components/employee_component/dashboard/Dashboard";
import Profile from "../components/employee_component/dashboard/Profile";
import UpcomingHolidays from "../components/employee_component/dashboard/UpcomingHolidays";
import EmployeesSalaryDetails from "../components/hr_admin_component/salary/EmployeesSalaryDetails";

const AppTemplateRouter = () => {
  return (
    <Switch>
      <Route path="/1/admin-panel" component={AdminPanel} />
      <Route path="/1/monthly-salary" component={Salary} />
      <Route path="/1/salary" component={EmployeesSalaryDetails} />
      <Route path="/1/update-employee" component={UpdateEmployee} />
      <Route path="/1/view-employees" component={ViewEmployees} />
      <Route path="/1/add-employee" component={AddEmployee} />
      <Route path="/1/home" component={Home} />
      <Route path="/1/dashboard" component={Dashboard} />
      <Route path="/1/profile" component={Profile} />
      <Route path="/1/holidays" component={UpcomingHolidays} />
    </Switch>
  );
}

export default AppTemplateRouter;