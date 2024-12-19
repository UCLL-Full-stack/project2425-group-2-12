import React from "react";

const UserTable: React.FC = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Password</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>admin</td>
          <td>admin123</td>
          <td>Admin</td>
        </tr>
        <tr>
          <td>user</td>
          <td>user123</td>
          <td>Customer</td>
        </tr>
      </tbody>
    </table>
  );
};

export default UserTable;
