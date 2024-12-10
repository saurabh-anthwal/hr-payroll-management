import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/hr_admin_component/navbar/Navbar";
import EmployTemplateRouter from "../../router/EmployTemplateRouter";

const EmployTemplatePage = () => {
  return (<>
    <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <Sidebar/>
        <section className="main-content w-full px-2">
          {/* <Navbar/> */}
          <EmployTemplateRouter />
        </section>
      </div>
    </div>
    </>
  )

}

export default EmployTemplatePage;