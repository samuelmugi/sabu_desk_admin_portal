import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useState from 'react-usestateref';
import {Button, Divider, Dropdown, Form, Icon, Label, List, Popup} from 'semantic-ui-react';
import Aux from '../../hoc/_Aux';
import BackendService from "../../services/BackendService";
import {Col, Row} from "react-bootstrap";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);
const FETCH_LDAP_DETAILS = process.env.REACT_APP_KB_PORTAL_USER_FETCHADDETIALS;
const CREATE_USER = process.env.REACT_APP_KB_PORTAL_USER_CREATE;
const UPDATE_USER = process.env.REACT_APP_KB_PORTAL_USER_UPDATE;


const useStyles = makeStyles((theme) => ({
    fab: {
        margin: theme.spacing(1)
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120
    },
    formControlLabel: {
        marginTop: theme.spacing(1)
    }
}));

const AddVacancy = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mounted, setMount] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [allRoles, setAllRoles, allRolesref] = useState(props?.allRoles);
    const [isSubmitted, setSubmitted, isSubmittedRef] = useState(false);
    const [rolePermissions, setRolePermissions, rolePermissionsRef] = useState([]);
    const [userValuesErrors, setVacancyValuesErrors, userValuesErrorsRef] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        userRole: '',
        userStatus: ''
    });
    const [userValues, setVacancyValues, userValuesRef] = useState(props?.valueIntoModal);
    useEffect(() => {
        (async function () {
            if (props.action === 'edit') {
                setRolePermissions(userValuesRef.current?.userRole.permissions);
            }

        })();
    }, [userValues]);

    const changeHandler = (e) => {
        setVacancyValues((prevValues) => {
            return {...prevValues, [e.target.name]: e.target.value};
        });
    };
    const updateVacancyValues = (name, value) => {
        setVacancyValues((prevValues) => {
            return {...prevValues, [name]: value};
        });
    };
    const validateValues = () => {
        let hasErrors = false;

        const user = userValuesRef.current;
        const userErrors = userValuesErrorsRef.current;
        setVacancyValuesErrors({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            userRole: '',
            userStatus: ''
        });
        Object.keys(userErrors).map((key) => {
            if (user[key] === null || user[key] === '' || user[key] === undefined) {
                console.log(key + ' key and value is ' + user[key]);
                setVacancyValuesErrors((prevValues) => {
                    return {...prevValues, [key]: key + ' is required'};
                });
                hasErrors = true
                ;
            }
        });

        return hasErrors;
    }
    const saveVacancy = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const hasErrors = validateValues();
        if (!hasErrors) {
            delete userValuesRef.current?.authorities;
            const url = props.action === 'add' ? CREATE_USER : UPDATE_USER + '/' + userValuesRef.current?.id;
            await BackendService.postRequest(url, userValuesRef.current)
                .then((response) => {
                    const data = response.data;

                    if (data?.requestStatus) {
                        BackendService.notifySuccess(data.message);

                    } else {
                        BackendService.notifyError(data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    BackendService.notifyError('Oops... Something went wrong!!!');
                });
            resetBtn(e);
        }
    };


    const resetBtn = async () => {
        setSubmitted(false);
        setRolePermissions([]);
        setVacancyValues({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            userRole: '',
            userStatus: ''
        });
        setVacancyValuesErrors({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            userRole: '',
            userStatus: ''
        });
    };

    const fetchADDetails = async () => {
        const userName = userValuesRef.current.username;
        try {
            const response = await BackendService.getRequest(
                FETCH_LDAP_DETAILS + '?username=' + userName
            );
            const data = JSON.parse(response.data?.payload);
            const username = data?.accountname;
            updateVacancyValues('username', username);

            const firstname = data?.firstname;
            updateVacancyValues('firstName', firstname);

            const email = data?.email;
            updateVacancyValues('email', email);

            const lastname = data?.lastname;
            updateVacancyValues('lastName', lastname);

            console.log('userValuesRef==' + JSON.stringify(userValuesRef.current));
        } catch (e) {
            console.error(e);
        }
    };

    const handleRoleChange = async (e, {value}) => {
        setRolePermissions(JSON.parse(value)?.permissions);
        updateVacancyValues('userRole', JSON.parse(value));
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const stringToHash = (string) => {
        var hash = 0;
        if (string.length == 0) return hash;
        for (let i = 0; i < string.length; i++) {
            let char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }


    return (
        <Aux>
            <React.Fragment>
                <Popup
                    content={props?.action === 'add' ? "Add Vacancy" : "Edit Vacancy"}
                    trigger={
                        (props?.action === 'add'
                            ? (<Button positive onClick={handleClickOpen} icon="add"/>)
                            : (<Button onClick={handleClickOpen} icon="edit"/>))

                    }
                />

                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle
                        id="max-width-dialog-title">{props?.action === 'add' ? "Add Vacancy" : "Edit Vacancy"}</DialogTitle>
                    <DialogContent>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group>
                                        <Form.Input
                                            label="Windows Vacancyname"
                                            placeholder="Windows Vacancyname"
                                            name="username"
                                            error={userValuesErrorsRef.current?.username === '' ? false : {
                                                content: userValuesErrorsRef.current?.username,
                                                pointing: 'below'
                                            }}
                                            value={userValuesRef.current?.username}
                                            onChange={changeHandler}
                                        />
                                        <Form.Button
                                            positive
                                            label="Fetch A.D. Vacancy Details..."
                                            content="Fetch..."
                                            onClick={fetchADDetails}
                                        />

                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Divider/>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Input
                                        fluid
                                        label="First name"
                                        placeholder="First name"
                                        name="firstName"
                                        error={userValuesErrorsRef.current?.firstName === '' ? false : {
                                            content: userValuesErrorsRef.current?.firstName,
                                            pointing: 'below'
                                        }} value={userValuesRef.current?.firstName}
                                        onChange={changeHandler}
                                    />
                                </Col>
                                <Col>
                                    <Form.Input
                                        fluid
                                        label="Last name"
                                        placeholder="Last name"
                                        name="lastName"
                                        error={userValuesErrorsRef.current?.lastName === '' ? false : {
                                            content: userValuesErrorsRef.current?.lastName,
                                            pointing: 'below'
                                        }} value={userValuesRef.current?.lastName}
                                        onChange={changeHandler}
                                    />
                                </Col>
                            </Row>

                            <Divider/>
                            <Row>
                                <Col>
                                    <Form.Input
                                        fluid
                                        label="Email"
                                        placeholder="Email"
                                        name="email"
                                        error={userValuesErrorsRef.current?.email === '' ? false : {
                                            content: userValuesErrorsRef.current?.email,
                                            pointing: 'below'
                                        }} value={userValuesRef.current?.email}
                                        onChange={changeHandler}
                                    />
                                </Col>
                                <Col>
                                    <Label>
                                        Vacancy Status
                                    </Label>
                                    <Dropdown
                                        placeholder="Vacancy Status"
                                        name="userStatus"
                                        validators={['required']}
                                        onChange={(e, {value}) => {
                                            setVacancyValues((prevValues) => {
                                                return {...prevValues, userStatus: value};
                                            })
                                        }}
                                        defaultValue={userValuesRef.current?.userStatus}
                                        error={userValuesErrorsRef.current?.userStatus === '' ? false : true}
                                        selection
                                        options={[{key: 'active', value: true, text: 'Active'}, {
                                            key: 'inactive', value: false, text: 'In-Active'
                                        }]}
                                    />
                                </Col>
                            </Row>
                            <Divider/>
                            <Row>
                                <Col>
                                    <Label>
                                        Vacancy Role
                                    </Label>
                                    <Dropdown
                                        placeholder="Vacancy Role"
                                        name="userRole"
                                        search
                                        error={userValuesErrorsRef.current?.userRole === '' ? false : true}
                                        selection
                                        defaultValue={JSON.stringify(userValuesRef.current?.userRole)}

                                        onChange={handleRoleChange}
                                        options={allRolesref.current}
                                    />
                                </Col>
                                <Col>
                                    <List>
                                        {rolePermissionsRef.current && (rolePermissionsRef.current.map((role, index) => {
                                            const key = index + (new Date()).getTime().toString(36) + JSON.parse(role)?.perm;
                                            return (
                                                <>
                                                    <List.Item key={stringToHash(key)} as='a'>
                                                        <Icon name='check circle'/>
                                                        <List.Content key={key}>
                                                            <List.Header>{JSON.parse(role)?.perm}</List.Header>
                                                        </List.Content>
                                                    </List.Item>
                                                </>
                                            )
                                        }))
                                        }

                                    </List>
                                </Col>

                            </Row>
                            <Divider/>

                        </Form>

                    </DialogContent>
                    <DialogActions>
                        <Button.Group>
                            <Button
                                disabled={isSubmittedRef.current}
                                type="submit"
                                onClick={saveVacancy}
                                positive
                            >
                                Save
                            </Button>
                            <Button onClick={resetBtn}>Reset</Button>
                            <Button onClick={handleClose} primary>
                                Close
                            </Button>
                        </Button.Group>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Aux>
    );
};
AddVacancy.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
    valueIntoModal: PropTypes.object.isRequired,
    allRoles: PropTypes.array.isRequired,
};

AddVacancy.defaultProps = {};

export default AddVacancy;
