Ext.define('Admin.view.dashboard.SystemProcessDashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'systemprocessdashboard',
    margin: 2,
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    controller: 'dashboardvctr',
    viewModel: {
        type: 'dashboard'
    },
    layout: 'border',
    listeners: {
        hide: 'onHideView',
    }, 
    items: [ {
            xtype: 'tabpanel',
            region: 'center',
            userCls: 'big-100 small-100',
            listeners: {
                beforeRender: 'loadApplicationAssaignmentTab'
            },
            
            items: [
                {
                    title: 'In-Tray',
                    xtype: 'intraypnl',
                    height: Ext.Element.getViewportHeight() - 161
                },
                {
                    title: 'Out-Tray',
                    xtype: 'outtraygrid',
                    height: Ext.Element.getViewportHeight() - 161
                },
                {
                    xtype:'panel',
                    layout:'border',
                    title: 'Online Application Dashboard',
                    height: Ext.Element.getViewportHeight() - 161,
                    items:[{
                        
                        xtype: 'onlineapplicationdashboardgrid',
                        region:'center'
                        
                    },{
                        xtype: 'onlineappssubmissioncountergrid',
                        title:'Online Application Submissions Counter(Summary Data)',
                        region: 'south',
                        collapsible: true,
                        collapsed: true,
                        height: 320,
                        autoScroll: true

                    }]
                },{

                    xtype: 'onlineevaluationqueryresponseappdashboardgrid',
                    title:'Online Application Evaluation/Inspection Query Response)'
                    
                },{
                    title:'Application Enquiries(Tracking Applications Processing)',
                    xtype:'application_enquiriesGrid'
                },{
                    xtype:'controllleddocumentsaccessdashboard',
                    title:'Shared Documents (Controlled Documents Dashboard)',
                    layout:'fit'
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
