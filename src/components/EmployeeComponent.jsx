import { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const { id } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    const { firstName, lastName, email } = response.data;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setEmail(email);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [id]);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email };

            if (id) {
                updateEmployee(id, employee)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/employees');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {
                createEmployee(employee)
                    .then((response) => {
                        console.log(response.data);
                        navigator('/employees');
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        } else {
            errorsCopy.firstName = '';
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        } else {
            errorsCopy.lastName = '';
        }

        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        } else {
            errorsCopy.email = '';
        }

        setErrors(errorsCopy);
        return valid;
    };

    const pageTitle = () => {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>;
        } else {
            return <h2 className='text-center'>Add Employee</h2>;
        }
    };

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={handleFirstNameChange}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Employee last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleLastNameChange}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input
                                    type='email'
                                    placeholder='Enter Employee email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={handleEmailChange}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
