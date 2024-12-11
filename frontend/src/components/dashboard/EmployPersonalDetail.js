const EmployPersonalDetail = () => {
  return (
    <div className="w-full bg-white col-span-2 rounded-lg shadow mb-8">
      <div className="flex justify-between rounded-t-lg bg-blue-400 items-center mb-2 pt-3 border-b pl-8 pr-8 ">
        <h2 className="text-lg font-semibold text-white mb-3">Personal Details</h2>
      </div>
      <div className="pb-8">
        <div className="grid grid-cols-6  border-b px-5 py-[12px]">
          <div className="col-span-2  text-gray-600 ">Name </div>
          <div className="col-span-4 text-gray-500">Vijay Bhatia</div>
        </div>
        <div className="grid grid-cols-6  border-b px-5 py-[12px]">
          <div className="col-span-2 font-bold text-gray-600 ">Email </div>
          <div className="col-span-4 text-gray-500">vijaydataclaps@gmail.com</div>
        </div>
        <div className="grid grid-cols-6  border-b px-5 py-[12px]">
          <div className="col-span-2 font-bold text-gray-600 ">Phone Number </div>
          <div className="col-span-4 text-gray-500">+91 8219167668</div>
        </div>
        <div className="grid grid-cols-6  border-b px-5 py-[12px]">
          <div className="col-span-2 font-bold text-gray-600 ">Gender </div>
          <div className="col-span-4 text-gray-500">Male</div>
        </div>
        <div className="grid grid-cols-6  border-b px-5 py-[12px]">
          <div className="col-span-2 font-bold text-gray-600 ">Department </div>
          <div className="col-span-4 text-gray-500">IT</div>
        </div>
        <div className="grid grid-cols-6  border-b px-5 py-[12px]">
          <div className="col-span-2 font-bold text-gray-600 ">Date of Birth </div>
          <div className="col-span-4 text-gray-500">22/08/2003</div>
        </div><div className="grid grid-cols-6  px-5 py-[12px]">
          <div className="col-span-2 font-bold text-gray-600 ">Address </div>
          <div className="col-span-4 text-gray-500">Nahan, Himachal Pradesh</div>
        </div>
      </div>
    </div>
  )
}

export default EmployPersonalDetail;