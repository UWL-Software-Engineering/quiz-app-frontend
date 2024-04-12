import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';

const fields = signupFields;
let fieldsState = {};
const api = process.env.REACT_APP_API_BASE_URL + '/signup';
fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const navigate = useNavigate();
    const [signupState, setSignupState] = useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState('')
    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState)
        createAccount()
    }

    //handle Signup API Integration here
    const createAccount = () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin', 'http://localhost:3000');
        if (signupState['password'] === signupState['confirm-password']) {
            const formData = {
                password: signupState['password'],
                username: signupState['email-address'],
            };
            fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    navigate("/login");
                    localStorage.setItem("stringify", JSON.stringify(response));
                    localStorage.setItem("Mytoken", response.data.token);
                    return response.json();
                })
                .then(data => {
                    console.log('Authentication successful:', data);
                })
                .catch(error => {
                    console.error('Error during authentication:', error);
                });
        } else {
            setErrorMessage("Passwords do not match");
        }

    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
                <FormAction handleSubmit={handleSubmit} text="Signup" />
            </div>
            <div className='text-red-500 text-lg font-bold text-center'>{errorMessage}</div>
        </form>
    )
}