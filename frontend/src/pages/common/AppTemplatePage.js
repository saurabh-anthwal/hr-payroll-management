import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/hr_admin_component/navbar/Navbar";
import AppTemplateRouter from "../../router/AppTemplateRouter";

const AppTemplatePage = () => {
  return (<>
    <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div className="flex items-start">
        <Sidebar/>
        <section className="main-content w-full px-2">
          <Navbar/>
          <AppTemplateRouter/>
        </section>
      </div>
    </div>
    </>
  )

}

export default AppTemplatePage;