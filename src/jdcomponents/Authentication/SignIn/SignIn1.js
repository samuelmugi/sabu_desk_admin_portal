import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Alert, Button, Form} from 'react-bootstrap';
import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import Breadcrumb from '../../../App/layout/AdminLayout/Breadcrumb';
import AuthenticationService from '../../../services/AuthenticationService';
import {Zoom,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


const SignUp1 = () => {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const {push} = useHistory();

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
        // Check and see if errors exist, and remove them from the error object:
        if (!!errors[field])
            setErrors({
                ...errors,
                [field]: null
            });
    };
    const doLogin = async (event) => {
        event.preventDefault();
        // get our new errors
        const newErrors = findFormErrors();
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors);
        } else {
            toast.success('Logged in Successfully.', {
                position: "top-right",
                autoClose: 2500,
                transition:Zoom,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            push('/dashboard');
            // No errors! Put any logic here for the form submission!
            // AuthenticationService.signin(form.username, form.password).then(() => {
            //
            //         toast.success('Logged in Successfully.', {
            //             position: "top-right",
            //             autoClose: 2500,
            //             transition:Zoom,
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //         });
            //         push('/dashboard');
            //     },
            //     (error) => {
            //     console.log(error);
            //         console.log('Login fail: error = { ' + error.toString() + ' }');
            //         if(error.toString().includes('401')){
            //         toast.error('oops! Please confirm your username and password', {
            //             position: "top-right",
            //             autoClose: 5000,
            //             transition:Zoom,
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //         });
            //         setErrors({
            //             logError:
            //                 'oops! Please confirm your username and password'
            //         });
            //         }
            //         else{
            //             toast.error('Login fail: error = { ' + error.toString() + ' }', {
            //                 position: "top-right",
            //                 autoClose: 5000,
            //                 transition:Zoom,
            //                 hideProgressBar: false,
            //                 closeOnClick: true,
            //                 pauseOnHover: true,
            //                 draggable: true,
            //                 progress: undefined,
            //             });
            //             setErrors({
            //                 logError:
            //                     'Login fail: error = { ' + error.toString() + ' }'
            //             });
            //         }
            //     }
            // )            ;
        }
    };

    const findFormErrors = () => {
        const {username, password} = form;
        const newErrors = {};
        // username errors
        if (!username || username === '')
            newErrors.username = 'username cannot be blank!';
        // food errors
        if (!password || password === '')
            newErrors.password = 'password cannot be blank!';

        return newErrors;
    };
    return (
        <Aux>
            <Breadcrumb/>
            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r"/>
                        <span className="r s"/>
                        <span className="r s"/>
                        <span className="r"/>
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon"/>
                            </div>
                            <h3 className="mb-4"> ENZI HUB JOB DESK.</h3>
                            <Form>
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="username"
                                        onChange={(e) => setField('username', e.target.value)}
                                        isInvalid={!!errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="password"
                                        onChange={(e) => setField('password', e.target.value)}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button onClick={doLogin} type="submit" variant="primary">
                                    Login..
                                </Button>
                                {Object.prototype.hasOwnProperty.call(errors, 'logError') && (
                                    <Alert variant="danger">{errors.logError}</Alert>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
};

export default SignUp1;
