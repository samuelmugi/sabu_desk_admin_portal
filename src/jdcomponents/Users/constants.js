module.exports = Object.freeze({
    tableColumns: [
        {id: 'username', label: 'username', minWidth: 170},
        {id: 'firstName', label: 'firstName', minWidth: 170},
        {id: 'lastName', label: 'lastName', minWidth: 170},
        {id: 'email', label: 'email', minWidth: 170},
        {id: 'createdOn', label: 'Date Created', minWidth: 170},
        {
            id: 'userStatus',
            label: 'User Status',
            minWidth: 170,
            format: (value) => (value === true ? 'ACTIVE' : 'IN-ACTIVE')
        },
        {
            id: 'userRole',
            label: 'Roles',
            minWidth: 170,
            format: (value) => value?.name
        }
    ]
});
