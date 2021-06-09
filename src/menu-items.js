export default {
    items: [
        {
            id: 'ui-dash',
            title: 'JOB Desk Dashboard',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'ui-dash1',
                    title: 'Dashboard',
                    type: 'collapse',
                    icon: 'feather icon-home',
                    children: [

                        {
                            id: 'ui-dash2',
                            title: 'Home',
                            type: 'item',
                            url: '/dashboard',
                            icon: 'feather icon-briefcase',
                            role: 'dashboard'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ui-jobgroup',
            title: 'JOB Adminstration',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'ui-jobgroup1',
                    title: 'Job Actions',
                    type: 'collapse',
                    icon: 'feather icon-airplay',
                    children: [
                        {
                            id: 'ui-jobgroup2',
                            title: 'Job Groups',
                            type: 'item',
                            url: '/jobgroup',
                            icon: 'feather icon-aperture',
                            role: 'dashboard'
                        },
                        {
                            id: 'ui-jobgroup3',
                            title: 'Job Positions',
                            type: 'item',
                            url: '/jobpositions',
                            icon: 'feather icon-wind',
                            role: 'dashboard'
                        },
                        {
                            id: 'ui-jobgroup4',
                            title: 'Job Vacancies',
                            type: 'item',
                            url: '/jobvacancies',
                            icon: 'feather icon-wind',
                            role: 'dashboard'
                        },
                        {
                            id: 'ui-jobgroup5',
                            title: 'Job Applicants',
                            type: 'item',
                            url: '/jobaplicants',
                            icon: 'feather icon-users',
                            role: 'dashboard'
                        },
                        {
                            id: 'ui-jobgroup6',
                            title: 'Job Shortlist',
                            type: 'item',
                            url: '/jobshortlists',
                            icon: 'feather icon-book',
                            role: 'dashboard'
                        },
                        {
                            id: 'ui-jobgroup7',
                            title: 'Job Interviews',
                            type: 'item',
                            url: '/jobinterviews',
                            icon: 'feather icon-clipboard',
                            role: 'dashboard'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ui-admin',
            title: 'Administration',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'ui-admin1',
                    title: 'UAC',
                    type: 'collapse',
                    icon: 'feather icon-sliders',
                    children: [
                        {
                            id: 'ui-admin2',
                            title: 'Users',
                            type: 'item',
                            url: '/users',
                            icon: 'feather icon-users',
                            role: 'dashboard'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ui-report',
            title: 'Reports',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'ui-report2',
                    title: 'Reports',
                    type: 'collapse',
                    icon: 'feather icon-cloud-snow',
                    children: [
                        {
                            id: 'ui-report3',
                            title: 'Reports',
                            type: 'item',
                            url: '/reports',
                            role: 'dashboard',
                            icon: 'feather icon-cloud',

                        }
                    ]
                }
            ]
        }
    ],
    defaultMenu: [{
        id: 'ui-dash',
        title: 'KB Dashboard',
        type: 'group',
        icon: 'icon-ui',
        children: [
            {
                id: 'ui-dash1',
                title: 'Dashboard',
                type: 'collapse',
                icon: 'feather icon-home',
                children: [

                    {
                        id: 'ui-dash2',
                        title: 'Kb Home',
                        type: 'item',
                        url: '/dashboard/default',
                        role: 'dashboard'
                    }
                ]
            }
        ]
    }
    ]
};
