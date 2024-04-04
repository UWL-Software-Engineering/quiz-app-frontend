import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
    const [signupState,setSignupState]=useState(fieldsState);

    const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(signupState)
        createAccount()
    }

  //handle Signup API Integration here
  const createAccount=()=>{
    // API endpoint where you want to send the form data
    const apiUrl = 'https://example.com/login';

    // Serialize the form data
    const formData = {
        email: signupState['email-address'],
        password: signupState['password'],
        username: signupState['username'],
        confirmPassword: signupState['confirm-password'],
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

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field=>
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



        </form>
    )
}