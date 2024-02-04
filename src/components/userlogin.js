import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function Login({ setIsUserLoggedIn }) {
  var [user, setUser] = useState({ username: "", password: "" });

  var textChanged = function (args) {
    var copyOfUser = { ...user };
    copyOfUser[args.target.name] = args.target.value;
    setUser(copyOfUser);
  };

  var doLogin = function () {
    const url = 'http://localhost:5000/user/login';
    const headers = {
      'Content-Type': 'application/json'
    };

    axios.post(url, user, { headers })
      .then(response => {
        if (response.data.user) {
          sessionStorage.setItem("isUserLoggedIn", "true");
          sessionStorage.setItem("username", response.data.user.username);
          sessionStorage.setItem("userid", response.data.user.user_id);
          window.location.href = '/';
        } else {
          alert("WRONG CREDENTIALS");
        }
      })
      .catch(error => {
        alert("Server error occurred during login");
      });
  };

  return (
    <center>
      <div className="table-responsive mt-5" style={{ width: 400 }}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>User Name</td>
              <td>
                <input
                  type="text"
                  value={user.username}
                  onChange={textChanged}
                  name="username"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  type="password"
                  value={user.password}
                  onChange={textChanged}
                  name="password"
                  className="form-control"
                />
              </td>
            </tr>
            <tr>
              <td colSpan={1}>
                <button
                  className="btn btn-primary"
                  onClick={doLogin}
                >
                  Sign In
                </button>
              </td>
              <td>
                <Link to="/register" className="btn btn-link">Register Here</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </center>
  );
}

export default Login;
