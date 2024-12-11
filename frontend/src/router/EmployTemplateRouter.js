import { Switch, Route } from "react-router-dom";
import AdminPanel from "../components/hr_admin_component/adminPanel/AdminPanel";
import ViewEmployees from "../components/hr_admin_component/employees/ViewEmployees";
import Dashboard from "../components/employee_component/dashboard/Dashboard";
import Profile from "../components/employee_component/dashboard/Profile";
import UpcomingHolidays from "../components/employee_component/dashboard/UpcomingHolidays";
import EmployeesSalaryDetails from "../components/hr_admin_component/salary/EmployeesSalaryDetails";
import EmployeeManager from "../components/hr_admin_component/employees/EmployeeManager";
import EmploySalaryPage from "../pages/salary/EmploySalaryPage";
import EmployLeavePage from "../pages/leave/EmployLeavePage";

const EmployTemplateRouter = () => {
  return (
    <Switch>
      <Route path="/employ/admin-panel" component={AdminPanel} />
      <Route path="/employ/salary" component={EmploySalaryPage} />
      <Route path="/employ/view-employees" component={ViewEmployees} />
      <Route path="/employ/add-employee" component={EmployeeManager} />
      <Route path="/employ/dashboard" component={Dashboard} />
      <Route path="/employ/profile" component={Profile} />
      <Route path="/employ/holidays" component={UpcomingHolidays} />
      <Route path="/employ/leave" component={EmployLeavePage} />
    </Switch>
  );
}

export default EmployTemplateRouter;