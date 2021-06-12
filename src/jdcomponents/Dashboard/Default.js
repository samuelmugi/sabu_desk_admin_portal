import React, {useEffect} from 'react';
import {Card, Col, Row, Tab, Table, Tabs} from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import avatar1 from '../../assets/images/user/avatar-1.jpg';
import {useTheme} from '@material-ui/core/styles';
import BackendService from '../../services/BackendService';
import useState from 'react-usestateref';
import moment from 'moment';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts';



function createData(time, amount) {
    return {time, amount};
}

const LATEST_ISSUES_URL = process.env.REACT_APP_KB_PORTAL_DASHBOARD_LIST_LATEST_ISSUES;
const SYSTEM_COUNT_URL = process.env.REACT_APP_KB_PORTAL_DASHBOARD_LIST_ALL_SYSTEM_COUNT_ISSUES;
const TOP_RESOLTUION_URL = process.env.REACT_APP_KB_PORTAL_DASHBOARD_TOP_RESOLTUIONS_PER_USER;


const Dashboard = () => {
    const theme = useTheme();
    const [modalOpen, setModalOpen, modalOpenref] = useState(false);
    const [modalOpenView, setModalOpenView, modalOpenViewref] = useState(false);


    const [dashboardValues, setDashboardValues, dashboardValuesRef] = useState({
        LatestIssues: [],
        systemCountIssues: [],
        topResolutionsPerUser: []
    });

    useEffect(() => {
        (async function () {
            await fetchData();
        })();
    }, []);
    const fetchData = async () => {
        try {
            const response = await BackendService.getRequest(LATEST_ISSUES_URL);
            const data = response.data?.payload;
            setDashboardValues((prevValues) => {
                return {...prevValues, LatestIssues: data};
            });
        } catch (e) {
            console.error(e);
        }

        try {
            const response = await BackendService.getRequest(SYSTEM_COUNT_URL);
            const data = response.data?.payload;
            let sysIssues = [];
            data.map(iss => {
                sysIssues.push({system: iss._id.SYSTEM, noOfIssues: iss.count})
            });
            setDashboardValues((prevValues) => {
                return {...prevValues, systemCountIssues: sysIssues};
            });
        } catch (e) {
            console.error(e);
        }

        try {
            const response = await BackendService.getRequest(TOP_RESOLTUION_URL);
            const data = response.data?.payload;
            setDashboardValues((prevValues) => {
                return {...prevValues, topResolutionsPerUser: data};
            });
        } catch (e) {
            console.error(e);
        }
    };


    const tabContent = (
        <Aux>
            {dashboardValuesRef.current.topResolutionsPerUser.map(person => {
                return (
                    <>
                        <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                            <div className="m-r-10 photo-table">
                                <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{width: '40px'}}
                                                               src={avatar1}
                                                               alt="activity-user"/></a>
                            </div>
                            <div className="media-body">
                                <h6 className="m-0 d-inline">{person?._id.resolutionBy}</h6>
                                <span className="float-right d-flex  align-items-center">{person?.countResols} &nbsp;
                                    <i className="fa fa-smile-o f-22 m-r-10 text-c-yellow"/></span>
                            </div>
                        </div>
                    </>
                );

            })}

        </Aux>
    );


    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>No Of Cases Raised to date.</h6>

                            <BarChart
                                width={400}
                                height={300}
                                data={dashboardValuesRef.current.systemCountIssues}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barSize={20}
                            >
                                <XAxis dataKey="system" scale="point" padding={{left: 10, right: 10}}/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Bar dataKey="noOfIssues" fill="#8884d8" background={{fill: '#eee'}}/>
                            </BarChart>
                            <h6 className='mb-4'>ENZI HUB Systems</h6>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className='Recent-Users'>
                        <Card.Header>
                            <Card.Title as='h5'>Recent Issues</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                                <tbody>
                                {dashboardValuesRef.current.LatestIssues.map((issue, index) => {
                                    return (<>
                                        <tr className="unread">
                                            <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1}
                                                     alt="activity-user"/></td>
                                            <td>
                                                <h6 className="mb-1">{issue?.title}</h6>
                                                <p className="m-0">
                                                    {'SYSTEM:-' + issue?.bankSystem.systemName + ' raised by '
                                                    + issue?.createdBy
                                                    }
                                                </p>
                                            </td>


                                            <td>
                                                <h6 className="text-muted"><i
                                                    className="fa fa-circle text-c-green f-10 m-r-15"/>{moment(issue?.createdOn).format("dddd, MMM Do YYYY")}
                                                </h6>
                                            </td>

                                        </tr>
                                    </>);

                                })
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>


                <Col className='m-b-30'>
                    <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
                        <Tab eventKey="today" title="Top Issue Resolvers..">
                            {tabContent}
                        </Tab>

                    </Tabs>
                </Col>
            </Row>
        </Aux>
    );

}

export default Dashboard;