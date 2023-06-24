Ext.define('Admin.view.dashboard.ExternalUsersDashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'externalusersdashboard',
    margin: 2,
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
    items: [ {
            xtype: 'tabpanel',
            region: 'center',
            userCls: 'big-100 small-100',
            items: [
                {
                    title: 'Active Tasks',
                    xtype: 'externaluserintraygrid',
                    height: Ext.Element.getViewportHeight() - 161
                },
                {
                    title: 'Submitted and Completed Tasks',
                    xtype: 'externaluserouttraygrid',
                    height: Ext.Element.getViewportHeight() - 161
                },{
                    title:'Application Enquiries(Tracking Applications Processing)',
                    xtype:'application_enquiriesGrid'
                }
            ]
        }, {
            xtype: 'panel',
            title: 'Notifications & Messages',
            region: 'south',
            height: 250,
            titleCollapse: true,
            collapsed: true,
            collapsible: true
        },
		
    ]
});
