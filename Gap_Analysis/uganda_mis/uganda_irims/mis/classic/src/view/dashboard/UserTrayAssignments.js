Ext.define('Admin.view.dashboard.UserTrayAssignments', {
    extend: 'Ext.panel.Panel',
    xtype: 'usertrayassignments',
    margin: 2,
    itemId:'usertrayassignments',
    reference:'usertrayassignments',
    //id:'dashboard',
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },
    layout: 'border',
    listeners: {
        hide: 'onHideView'
    }, 
    items: [{
            xtype: 'usertrayassignmentsgrid',
            region: 'center',
            title: 'My Current Assignment',
            userCls: 'big-100 small-100'
        }
    ]
});
