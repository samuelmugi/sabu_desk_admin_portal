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
        name: 'Resolutions',
        component: JobGroups
    },
    {
        path: '/jobpositions',
        exact: true,
        name: 'Resolutions',
        component: JobPositions
    },
    {
        path: '/jobvacancies',
        exact: true,
        name: 'Resolutions',
        component: JobVacancies
    },
    {
        path: '/jobaplicants',
        exact: true,
        name: 'Resolutions',
        component: JobApplications
    },
    {
        path: '/jobshortlists',
        exact: true,
        name: 'Resolutions',
        component: JobShortlist
    },
    {
        path: '/jobinterviews',
        exact: true,
        name: 'Resolutions',
        component: JobInterviews
    },
    {
        path: '/users',
        exact: true,
        name: 'Resolutions',
        component: Users
    },
    {
        path: '/reports',
        exact: true,
        name: 'Resolutions',
        component: Reports
    }
];

export default routes;
