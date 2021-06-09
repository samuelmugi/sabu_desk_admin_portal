import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Reports.scss';
import useState from "react-usestateref";
import BackendService from "../../services/BackendService";
import Aux from "../../hoc/_Aux";
import {Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import {Button, Dimmer, Loader, Segment} from "semantic-ui-react";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";
import constants from './constants'

const columns = constants.tableColumns;


const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        maxHeight: 440
    }
});

const USER_LIST_URL = process.env.REACT_APP_KB_PORTAL_USER_LIST;
const USER_SEARCH_URL = process.env.REACT_APP_KB_PORTAL_USER_SEARCH;
const LIST_ALL_ROLES = process.env.REACT_APP_KB_PORTAL_USER_LIST_ALL_ROLES;

const Reports = () => {
    const classes = useStyles();
    const [page, setPage, pageRef] = useState(0);
    const [rowsPerPage, setRowsPerPage, rowsPerPageRef] = useState(10);
    const [totalElements, setTotalElements, totalElementsref] = useState(0);
    const [rowData, setRowData, rowDataref] = useState([]);
    const [searchNotFound, setSearchNotFound, searchNotFoundref] = useState(false);
    const [searchValue, setSearchValue, searchValueref] = useState('');
    const [isLoading, setIsLoading, isLoadingref] = useState(false);
    const [modalOpen, setModalOpen, modalOpenref] = useState(false);
    const [allRoles, setAllRoles, allRolesref] = useState([{key: 0, text: '', value: '0'}]);
    const [mounted, setMount, mountedRef] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const fetchData = async () => {
        try {
            const currentPage = pageRef.current < 0 ? 0 : pageRef.current;
            const response = await BackendService.getPaginatedRequest(
                searchNotFoundref.current ? USER_SEARCH_URL : USER_LIST_URL,
                currentPage,
                rowsPerPageRef.current,
                searchValueref.current
            );
            const data = response.data;
            setRowData(data.payload.content);
            setTotalElements(data.payload.totalElements);
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }

        await fetchRoles();
    };

    const fetchRoles = async () => {
        // BackendService.validateMenu( );
        if(!mountedRef.current){
            try {
                const response = await BackendService.getRequest(LIST_ALL_ROLES);
                const data = response.data?.payload;
                let roles = [];
                data.map((role) => {
                    roles.push({
                        key: role.id,
                        text: role.name,
                        value: JSON.stringify(role)
                    });
                });
                setAllRoles(roles);
                setMount(true);
            } catch (e) {
                console.error(e);
            }}
    };
    const filterData = (value) => {
        let toFilter = rowDataref.current;
        toFilter = toFilter.filter(function (item) {
            return item.username.toUpperCase().includes(value.toUpperCase());
        }).map(function (item) {
            return item;
        });
        setRowData(toFilter);
        return toFilter.length > 0;
    };
    const handleSearchChange = (value) => {
        setSearchValue(value);
        setIsLoading(true);
        if (filterData(value)) {
            setIsLoading(false);
        } else {
            setSearchNotFound(true);
        }
    };

    useEffect(() => {
        (async function () {
            fetchData();
        })();
    }, [page, rowsPerPage, setSearchNotFound]);

    const resetData = () => {
        setSearchNotFound(false);
        setIsLoading(false);
        setSearchValue('');
        fetchData();
    };

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">User(s) List</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Paper className={classes.root}>
                                        <Segment>
                                            <Dimmer active={isLoadingref.current}>
                                                <Loader indeterminate>Searching payment ...</Loader>
                                            </Dimmer>
                                            <InputGroup className="mb-3">
                                                <Button
                                                    onClick={resetData}
                                                    primary
                                                    icon="refresh"
                                                ></Button>
                                                <InputGroup.Append>
                                                    <FormControl
                                                        placeholder="search..."
                                                        aria-label="search..."
                                                        value={searchValueref.current}
                                                        aria-describedby="basic-addon2"
                                                        onChange={(e) => handleSearchChange(e.target.value)}
                                                    />
                                                </InputGroup.Append>
                                             </InputGroup>
                                        </Segment>

                                        <TablePagination
                                            rowsPerPageOptions={[10, 25, 100]}
                                            component="div"
                                            count={totalElementsref.current}
                                            rowsPerPage={rowsPerPageRef.current}
                                            page={pageRef.current}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                        />
                                        <TableContainer className={classes.container}>
                                            <Table
                                                size="small"
                                                stickyHeader
                                                aria-label=" sticky table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            key="0"
                                                            style={({minWidth: 10})}
                                                        >
                                                            No
                                                        </TableCell>
                                                        {columns.map((column) => (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                style={{minWidth: column.minWidth}}
                                                            >
                                                                {column.label}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rowDataref.current.map((row, index) => {
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                tabIndex={-1}
                                                                key={row.id}
                                                            >
                                                                <TableCell
                                                                    key={index + 1}
                                                                    style={({minWidth: 10})}
                                                                >
                                                                    {index + 1}
                                                                </TableCell>
                                                                {columns.map((column) => {
                                                                    const value = row[column.id];
                                                                    return (
                                                                        <TableCell
                                                                            key={column.id}
                                                                            align={column.align}
                                                                            style={{minWidth: column.minWidth}}
                                                                        >
                                                                            {column.format
                                                                                ? column.format(value)
                                                                                : value}
                                                                        </TableCell>
                                                                    );
                                                                })}

                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
};

Reports.propTypes = {};

Reports.defaultProps = {};

export default Reports;
