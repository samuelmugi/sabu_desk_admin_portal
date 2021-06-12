import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./jdcomponents/Dashboard/Default'));
//job actions
const JobGroups = React.lazy(() => import('./jdcomponents/JobGroups/JobGroups'));
const JobPositions = React.lazy(() => import('./jdcomponents/JobPositions/JobPositions'));
const JobVacancies = React.lazy(() => import('./jdcomponents/JobVacancies/JobVacancies'));
const JobApplications = React.lazy(() => import('./jdcomponents/JobApplicants/JobApplicants'));
const JobShortlist = React.lazy(() => import('./jdcomponents/JobShortlists/JobShortlists'));
const JobInterviews = React.lazy(() => import('./jdcomponents/JobInterviews/JobInterviews'));
//ADMINISTRATION
const Users = React.lazy(() => import('./jdcomponents/Users/Users'));
const UsersGroups = React.lazy(() => import('./jdcomponents/Users/UsersGroups'));
const Ministry = React.lazy(() => import('./jdcomponents/ministries/ministry'));
//
//REPORTS
const Reports = React.lazy(() => import('./jdcomponents/Reports/Reports'));


const routes = [
    {
        path: '/dashboard',
        exact: true,
        name: 'Default',
        component: DashboardDefault
    },
    {
        path: '/jobgroup',
        exact: true,
        name: 'Job Group',
        component: JobGroups
    },
    {
        path: '/jobpositions',
        exact: true,
        name: 'Job Position',
        component: JobPositions
    },
    {
        path: '/jobvacancies',
        exact: true,
        name: 'Vacancies',
        component: JobVacancies
    },
    {
        path: '/jobaplicants',
        exact: true,
        name: 'Job Applicants',
        component: JobApplications
    },
    {
        path: '/jobshortlists',
        exact: true,
        name: 'Shortlists',
        component: JobShortlist
    },
    {
        path: '/jobinterviews',
        exact: true,
        name: 'INterviews',
        component: JobInterviews
    },
    {
        path: '/ministry',
        exact: true,
        name: 'Ministry',
        component: Ministry
    },
    {
        path: '/users',
        exact: true,
        name: 'Users',
        component: Users
    },
    {
        path: '/usergroups',
        exact: true,
        name: 'User Groups',
        component: UsersGroups
    },
    {
        path: '/reports',
        exact: true,
        name: 'Resolutions',
        component: Reports
    }
];

export default routes;
