import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');
const api = process.env.REACT_APP_API_BASE_URL + '/login';
export default function Login() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(fieldsState);
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState('')
    const [authError, setAuthError] = useState('')
    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
        setErrors({ ...errors, [e.target.id]: '' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            authenticateUser();
        } else {
            setErrors(validationErrors);
        }
    }
    const validateForm = () => {
        let validationErrors = {};
        fields.forEach(field => {
            if (field.isRequired && !loginState[field.id]) {
                validationErrors[field.id] = `${field.labelText} is required`;
            }
        });
        return validationErrors;
    }
    const authenticateUser = () => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Origin','http://localhost:3000');
        const formData = {
            username: loginState['email-address'],
            password: loginState['password']
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
                return response.json().then(data => {
                    throw new Error(data.error);
                });
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("Mytoken", data.token);
            navigate("/home");
            console.log('Authentication successful:', data);
        })
        .catch(error => {
            console.error('Error during authentication:', error);
            setErrorMessage(error.message);
        });
    }
    return (
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <div key={field.id}>
                            <Input
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                            />
                            {errors[field.id] && <p className="text-red-500">{errors[field.id]}</p>}
                            <p className="text-red-500">{authError}</p>
                        </div>
                    )
                }
            </div>
            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
            <div className='text-red-500 text-lg font-bold text-center'>{errorMessage}</div>
        </form>
    )
}