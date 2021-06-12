import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useState from 'react-usestateref';
import {Button, Form, Popup, Select} from 'semantic-ui-react';
import Aux from '../../hoc/_Aux';
import BackendService from "../../services/BackendService";
import LoadingOverlay from 'react-loading-overlay'
import ClipLoader from "react-spinners/PropagateLoader";
import Typography from '@material-ui/core/Typography';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slide from '@material-ui/core/Slide';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

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
    },appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
const optionsGrades = [
    {key: 'A', text: 'A', value: 'A'},
    {key: 'A-', text: 'A-', value: 'A-'},
    {key: 'B+', text: 'B+', value: 'B+'},
    {key: 'B', text: 'B', value: 'B'},
    {key: 'B-', text: 'B-', value: 'B-'},
    {key: 'C+', text: 'C+', value: 'C+'},
    {key: 'C', text: 'C', value: 'C'},
    {key: 'C-', text: 'C-', value: 'C-'},
    {key: 'D+', text: 'D+', value: 'D+'},
    {key: 'D', text: 'D', value: 'D'},
    {key: 'D-', text: 'D-', value: 'D-'},
    {key: 'E', text: 'E', value: 'E'},
];
const optionsGender = [
    {key: 'm', text: 'Male', value: 'male'},
    {key: 'f', text: 'Female', value: 'female'},
    {key: 'o', text: 'Other', value: 'other'},
];
const optionsMarital = [
    {key: 'mar1', text: 'Single', value: 'Single'},
    {key: 'mar2', text: 'Married', value: 'Married'},
    {key: 'mar3', text: 'Divorced', value: 'Divorced'},
    {key: 'mar4', text: 'Widowed', value: 'Widowed'},
];
const optionsReligion = [
    {key: 'rel1', text: 'Christian', value: 'Single'},
    {key: 'rel2', text: 'Islam', value: 'Married'},
    {key: 'rel3', text: 'Hinduism', value: 'Hinduism'},
    {key: 'rel4', text: 'Other', value: 'Other'},
];
const optionsEthnicity = [
    {key: 'ethn1', text: 'Christian', value: 'Single'},
    {key: 'ethn2', text: 'Islam', value: 'Married'},
    {key: 'ethn3', text: 'Hinduism', value: 'Hinduism'},
    {key: 'ethn4', text: 'Other', value: 'Other'},
];
const optionsDisability = [
    {key: 'dis1', text: 'No', value: 'No'},
    {key: 'dis2', text: 'Yes', value: 'Yes'},
];
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Filterapplicant = (props) => {
    const classes = useStyles();
    const [loading, setLoading, loadingRef] = useState(false);
    const [color, setColor] = useState("#60991f");
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [mounted, setMount] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('xl');
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
                    content={"Search Job Applicants"}
                    trigger={
                        (props?.action === 'add'
                            ? (<Button positive onClick={handleClickOpen} icon="add"/>)
                            : (<Button onClick={handleClickOpen} icon="edit"/>))
                    }
                />

                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    fullScreen
                    TransitionComponent={Transition}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <LoadingOverlay
                        active={loadingRef.current}
                        spinner={<ClipLoader color={color} loading={loadingRef.current}/>}
                    >
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon/>
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                    Search Job Applicants
                                </Typography>
                                <Typography>{"Please select a filter criteria for job applicants"}</Typography>

                                <Button autoFocus color="inherit" onClick={handleClose}>
                                    Close
                                </Button>
                            </Toolbar>
                        </AppBar>
                        <DialogContent>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label="Title"
                                        placeholder="Mr/s."
                                        name="title"
                                    />

                                    <Form.Input
                                        label="First Name"
                                        placeholder="First Name"
                                        name="firstname"
                                    />

                                    <Form.Input
                                        label="Middle Name"
                                        placeholder="Middle Name"
                                        name="middlename"
                                    />

                                    <Form.Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        name="lastname"
                                    />

                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label="National ID"
                                        placeholder="National ID"
                                        name="nationalid"
                                    />

                                    <Form.Field
                                        control={Select}
                                        label='Gender'
                                        options={optionsGender}
                                        placeholder='Gender'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Marital Status'
                                        options={optionsMarital}
                                        placeholder='Marital Status'
                                    /> <Form.Field
                                    control={Select}
                                    label='Religion'
                                    options={optionsReligion}
                                    placeholder='Religion'
                                /> <Form.Field
                                    control={Select}
                                    label='Ethnicity'
                                    options={optionsEthnicity}
                                    placeholder='Ethnicity'
                                /> <Form.Field
                                    control={Select}
                                    label='Any Disability?'
                                    options={optionsDisability}
                                    placeholder='Any Disability?'
                                />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Home County'
                                        options={optionsMarital}
                                        placeholder='Home County'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Home Sub County'
                                        options={optionsReligion}
                                        placeholder='Home Sub County'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Home Ward'
                                        options={optionsEthnicity}
                                        placeholder='Home Ward'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Residence County'
                                        options={optionsMarital}
                                        placeholder='Residence County'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Residence Sub County'
                                        options={optionsReligion}
                                        placeholder='Residence Sub County'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Residence Ward'
                                        options={optionsEthnicity}
                                        placeholder='Residence Ward'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label="Secondary School"
                                        placeholder="Secondary School"
                                        name="secondaryschool"
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Grade'
                                        options={optionsGrades}
                                        placeholder='Grade'
                                    />
                                    <Form.Field>
                                        Year Of Completion<br/>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showYearPicker
                                            dateFormat="yyyy"
                                        />
                                    </Form.Field>


                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='Mathematics'
                                        options={optionsGrades}
                                        placeholder='Mathematics'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='English'
                                        options={optionsGrades}
                                        placeholder='English'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Kiswahili'
                                        options={optionsGrades}
                                        placeholder='Kiswahili'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Biology'
                                        options={optionsGrades}
                                        placeholder='Biology'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Physics'
                                        options={optionsGrades}
                                        placeholder='Physics'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='Chemistry'
                                        options={optionsGrades}
                                        placeholder='Chemistry'
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        label="Qualification"
                                        placeholder="Qualification"
                                        name="qualification"
                                    />
                                    <Form.Input
                                        label="Institution"
                                        placeholder="Institution"
                                        name="institution"
                                    />

                                    <Form.Input
                                        label="Course Name"
                                        placeholder="Course Name"
                                        name="courseName"
                                    />
                                    <Form.Field>
                                        Year Of Completion<br/>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            showYearPicker
                                            dateFormat="yyyy"
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Field
                                        control={Select}
                                        label='KRA Clearance'
                                        options={[{key: 'KRAyes', value: 'Yes', text: 'Yes'}, {
                                            key: 'KRANo', value: 'No', text: 'No'
                                        }]}
                                        placeholder='Mathematics'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='CID Clearance'
                                        options={[{key: 'CIDyes', value: 'Yes', text: 'Yes'}, {
                                            key: 'CIDNo', value: 'No', text: 'No'
                                        }]}
                                        placeholder='English'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='EACC Clearance'
                                        options={[{key: 'EACCyes', value: 'Yes', text: 'Yes'}, {
                                            key: 'EACCNo', value: 'No', text: 'No'
                                        }]}
                                        placeholder='EACC'
                                    />
                                    <Form.Field
                                        control={Select}
                                        label='CRB Clearance'
                                        options={[{key: 'CRByes', value: 'Yes', text: 'Yes'}, {
                                            key: 'CRBNo', value: 'No', text: 'No'
                                        }]}
                                        placeholder='CRB'
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
Filterapplicant.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
    valueIntoModal: PropTypes.object.isRequired,
    allRoles: PropTypes.array.isRequired,
};

Filterapplicant.defaultProps = {};

export default Filterapplicant;
