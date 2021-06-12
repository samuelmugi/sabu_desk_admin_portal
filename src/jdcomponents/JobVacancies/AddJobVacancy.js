import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useState from 'react-usestateref';
import {Button, Form, Popup} from 'semantic-ui-react';
import Aux from '../../hoc/_Aux';
import BackendService from "../../services/BackendService";
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
    const [loading, setLoading, loadingRef] = useState(false);
    const [color, setColor] = useState("#60991f");
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [mounted, setMount] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    const [allRoles, setAllRoles, allRolesref] = useState(props?.allRoles);
    const [isSubmitted, setSubmitted, isSubmittedRef] = useState(false);
    const [rolePermissions, setRolePermissions, rolePermissionsRef] = useState([]);
    const [userValuesErrors, setJobGroupValuesErrors, userValuesErrorsRef] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        userRole: '',
        userStatus: ''
    });
    const [userValues, setJobGroupValues, userValuesRef] = useState(props?.valueIntoModal);
    useEffect(() => {
        (async function () {
            if (props.action === 'edit') {
                setRolePermissions(userValuesRef.current?.userRole.permissions);
            }

        })();
    }, [userValues]);

    const changeHandler = (e) => {
        setJobGroupValues((prevValues) => {
            return {...prevValues, [e.target.name]: e.target.value};
        });
    };
    const updateJobGroupValues = (name, value) => {
        setJobGroupValues((prevValues) => {
            return {...prevValues, [name]: value};
        });
    };
    const validateValues = () => {
        let hasErrors = false;

        const user = userValuesRef.current;
        const userErrors = userValuesErrorsRef.current;
        setJobGroupValuesErrors({
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
                setJobGroupValuesErrors((prevValues) => {
                    return {...prevValues, [key]: key + ' is required'};
                });
                hasErrors = true
                ;
            }
        });

        return hasErrors;
    }
    const saveJobGroup = async (e) => {
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
        setJobGroupValues({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            userRole: '',
            userStatus: ''
        });
        setJobGroupValuesErrors({
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
            updateJobGroupValues('username', username);

            const firstname = data?.firstname;
            updateJobGroupValues('firstName', firstname);

            const email = data?.email;
            updateJobGroupValues('email', email);

            const lastname = data?.lastname;
            updateJobGroupValues('lastName', lastname);

            console.log('userValuesRef==' + JSON.stringify(userValuesRef.current));
        } catch (e) {
            console.error(e);
        }
    };

    const handleRoleChange = async (e, {value}) => {
        setRolePermissions(JSON.parse(value)?.permissions);
        updateJobGroupValues('userRole', JSON.parse(value));
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
                    content={props?.action === 'add' ? "Add Job Vacancy" : "Edit Job Vacancy"}
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
                ><LoadingOverlay
                    active={loadingRef.current}
                    spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
                >
                    <DialogTitle
                        id="max-width-dialog-title">{props?.action === 'add' ? "Add Job Vacancy" : "Edit Job Vacancy"}</DialogTitle>
                    <DialogContent>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label="Job Position"
                                    placeholder="Job Position"
                                    name="groupname"
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label="Openings Available"
                                    placeholder="Openings Available"
                                    name="jobgroupdescription"
                                />
                                <Form.Field>
                                    Deadline <br/>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        showYearDropdown
                                        showMonthYearDropdown
                                        useShortMonthInDropdown
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label="Town"
                                    placeholder="Town"
                                    name="MinSalary"
                                />
                                <Form.Input
                                    label="Status"
                                    placeholder="Status"
                                    name="MaxSalary"
                                />
                            </Form.Group>

                        </Form>

                    </DialogContent>
                    <DialogActions>
                        <Button.Group>
                            <Button
                                disabled={isSubmittedRef.current}
                                type="submit"
                                onClick={saveJobGroup}
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
                </LoadingOverlay>
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
