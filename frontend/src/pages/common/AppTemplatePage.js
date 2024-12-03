import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/hr_admin_component/navbar/Navbar";
import AppTemplateRouter from "../../router/AppTemplateRouter";

const AppTemplatePage = () => {
  return (<>
    <div class="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div class="flex items-start">
        <Sidebar/>
        <section class="main-content w-full px-2">
          <Navbar/>
          <AppTemplateRouter/>
        </section>
      </div>
    </div>
    </>
  )

}

export default AppTemplatePage;