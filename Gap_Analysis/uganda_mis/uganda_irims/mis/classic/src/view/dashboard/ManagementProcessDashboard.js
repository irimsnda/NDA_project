Ext.define('Admin.view.dashboard.ManagementProcessDashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'managementprocessdashboard',
    margin: 2,
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],
    controller: 'dashboardvctr',
    viewModel: {
        type: 'dashboard'
    },
    layout: 'fit',
    listeners: {
        hide: 'onHideView'
    }, 
    items: [ {
            xtype: 'tabpanel',
            listeners: {
                beforeRender: 'loadApplicationAssaignmentTab'
            },
            items: [{
                title: 'Application In Process',
                xtype: 'tabpanel',
                layout: 'fit',
                items: [{
                     title: 'In-Tray',
                     xtype: 'intraypnl',
                     height: Ext.Element.getViewportHeight() - 161
                 },
                 {
                     title: 'Out-Tray',
                     xtype: 'outtraygrid',
                     height: Ext.Element.getViewportHeight() - 161
                 }],
            },{
                    xtype:'tabpanel',
                    layout:'border',
                    title: 'Online Application Dashboard',
                    height: Ext.Element.getViewportHeight() - 161,
                    items:[{
                        xtype: 'onlineapplicationdashboardgrid',
                        is_management_dashboard: 1,
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
                    title:'Application Enquiries(Tracking Applications Processing)',
                    xtype:'application_enquiriesGrid'
                },
               {
                    title: 'Application Revenue Reports',
                    xtype:'revenueSummaryReportPnl'
               },{
                        title: 'Application Summary Reports',
                        xtype: 'tabpanel',
                        items:[{
                            title:'Product Summary Reports',
                            xtype:'product_reg_reportPnl'
                        },{
                            title:'Premises Summary Reports',
                            xtype:'premise_reg_reportPnl'
                        },{
                            title:'GMP Summary Reports',
                            xtype:'gmp_reg_reportPnl'
                        },{
                            title:'Clinical Trial Summary Reports',
                            xtype:'clinicaltrial_reg_reportPnl'
                        },{
                            title:'Import & Export Summary',
                            xtype:'importexport_reg_reportPnl'
                        },{
                            title:'Promotional & Advertisements',
                            xtype:'promadvert_reg_reportPnl'
                        },{
                            title:'Disposal Application Summary Report',
                            xtype:'disposal_reg_reportPnl'
                        }]
                },{
                    xtype:'controllleddocumentsaccessdashboard',
                    title:'Shared Documents (Controlled Documents Dashboard)',
                    layout:'fit'
                }
                
            ]
        }
		
    ]
});
