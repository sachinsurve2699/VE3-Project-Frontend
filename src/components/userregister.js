import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function Register() {
    const [user, setUser] = useState({ username: '', password: '' });
    const history = useHistory();

    const TextChanged = function (args) {
        const copyOfUser = { ...user };
        copyOfUser[args.target.name] = args.target.value;
        setUser(copyOfUser);
    };

    // validation checks

    const validateInputs = () => {

        if (!user.username.trim() || !user.password.trim())
        {
            return false;
        }

        return true;
    };

    const DoRegister = function () {
        if (!validateInputs()) {            
            alert('please enter both username and password');
            return;
        }

        const url = 'http://localhost:5000/user/register';
        const headers = {
            'Content-Type': 'application/json',
        };

        axios
            .post(url, user, { headers })
            .then(response => {
                // console.log('Response:', response.data.message);
                alert('Registration successful!');
                history.replace('/login');                
            })
            .catch(error => {
                // console.error('Error:', error.response.data.message);
                alert('Registration failed. Please try again.'); 
            });
    };

    return (
        <center>
            <div className="table-responsive mt-5" style={{ width: 400 }}>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>
                                <input
                                    type="text"
                                    value={user.username}
                                    onChange={TextChanged}
                                    name="username"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Password</td>
                            <td>
                                <input
                                    type="password"
                                    value={user.password}
                                    onChange={TextChanged}
                                    name="password"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <button
                                    className="btn btn-primary"
                                    onClick={DoRegister}
                                >
                                    Register
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </center>
    );
}

export default Register;
