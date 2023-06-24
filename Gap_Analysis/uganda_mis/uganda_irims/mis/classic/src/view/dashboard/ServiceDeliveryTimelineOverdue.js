Ext.define('Admin.view.dashboard.ServiceDeliveryTimelineOverdue', {
    extend: 'Ext.panel.Panel',
    xtype: 'servicedeliverytimelineoverdue',
    margin: 2,
    itemId:'servicedeliverytimelineoverdue',
    reference:'servicedeliverytimelineoverdue',
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
        xtype: 'summaryapplicationserviceoverduegrid',
        title: 'Summary of Application Due, Overdue ',
        region: 'west',
        width: 500,
        titleCollapse: true,
        collapsed: false,
        collapsible: true
    }, {
            xtype: 'servicedeliverytimelineoverduegrid',
            region: 'center',
            title: 'Application Due, Overdue Based on the Service Delivery Timeline',
            userCls: 'big-100 small-100'
        }
    ]
});
