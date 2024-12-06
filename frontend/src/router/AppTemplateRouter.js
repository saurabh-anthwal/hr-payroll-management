import { Switch, Route } from "react-router-dom";
import AdminPanel from "../components/hr_admin_component/adminPanel/AdminPanel";
import ViewEmployees from "../components/hr_admin_component/employees/ViewEmployees";
import Dashboard from "../components/employee_component/dashboard/Dashboard";
import Profile from "../components/employee_component/dashboard/Profile";
import UpcomingHolidays from "../components/employee_component/dashboard/UpcomingHolidays";
import EmployeesSalaryDetails from "../components/hr_admin_component/salary/EmployeesSalaryDetails";
import EmployeeManager from "../components/hr_admin_component/employees/EmployeeManager";

const AppTemplateRouter = () => {
  return (
    <Switch>
      <Route path="/1/admin-panel" component={AdminPanel} />
      <Route path="/1/salary" component={EmployeesSalaryDetails} />
      <Route path="/1/view-employees" component={ViewEmployees} />
      <Route path="/1/add-employee" component={EmployeeManager} />
      <Route path="/1/dashboard" component={Dashboard} />
      <Route path="/1/profile" component={Profile} />
      <Route path="/1/holidays" component={UpcomingHolidays} />
    </Switch>
  );
}

export default AppTemplateRouter;