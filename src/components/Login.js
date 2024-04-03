import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { Route } from "react-router-dom";
const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [errors, setErrors] = useState({});
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
    //Handle Login API Integration here
    const authenticateUser = () => {
        // API endpoint where you want to send the form data
        const apiUrl = 'https://example.com/login';

        // Serialize the form data
        const formData = {
            email: loginState['email-address'],
            password: loginState['password']
            // Add other fields as needed
        };
        // Make a POST request to the API endpoint
        fetch(apiUrl, {
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
    }
    const barearToken = localStorage.getItem("Mytoken");
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
                        </div>
                    )
                }
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
            {/* <Route
                render={() => {
                    return barearToken ? (
                        <Redirect to="/dashboard" />
                    ) : (
                        <Redirect to="/login" />
                    );
                }}
            /> */}
        </form>
    )
}