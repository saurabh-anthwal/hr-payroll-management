import React from "react";

const EmployLoginForm = ({ email, password, setEmail, setPassword, error, onLogin, onForgotPassword }) => {
  return (
    <form onSubmit={onLogin} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Login
      </button>
      <button
        type="button"
        onClick={onForgotPassword}
        className="w-full px-4 py-2 mt-2 text-sm font-medium text-blue-500 bg-gray-100 rounded-lg hover:text-blue-600 focus:outline-none"
      >
        Forgot Password?
      </button>
    </form>
  );
};

export default EmployLoginForm;
