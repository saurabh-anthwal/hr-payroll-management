import React from "react";

const OtpForm = ({ otp, newPassword, setOtp, setNewPassword, error, onResetPassword }) => {
  return (
    <form onSubmit={onResetPassword} className="space-y-6">
    {/* OTP Input */}
    <div>
      <label htmlFor="otp" className="text-gray-800 text-sm mb-2 block">
        OTP
      </label>
      <input
        id="otp"
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter the OTP sent to your email"
        className="w-full px-4 py-3 mt-1 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600"
        required
      />
    </div>
  
    {/* New Password Input */}
    <div>
      <label htmlFor="newPassword" className="text-gray-800 text-sm mb-2 block">
        New Password
      </label>
      <input
        id="newPassword"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter your new password"
        className="w-full px-4 py-3 mt-1 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-600 focus:border-blue-600"
        required
      />
    </div>
  
    {/* Error Message */}
    {error && <p className="text-sm text-red-500">{error}</p>}
  
    {/* Reset Password Button */}
    <button
      type="submit"
      className="w-full py-3 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none shadow-md"
    >
      Reset Password
    </button>
  </form>
  
  );
};

export default OtpForm;
