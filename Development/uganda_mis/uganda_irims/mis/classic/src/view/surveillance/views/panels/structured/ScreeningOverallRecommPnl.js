/**
 * Created by Kip on 3/20/2019.
 */
/*Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsTMeetingPnl', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.panels.PmsTechnicalMeetingPanel',
    xtype: 'structuredpmstmeetingpnl'
});*/

Ext.define('Admin.view.surveillance.views.panels.structured.ScreeningOverallRecommPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'screeningoverallrecommpnl',
    layout: 'fit',  viewModel: 'surveillancevm',
     controller: 'surveillancevctr',
    defaults: {
        split: true,
    },
    tbar:[{xtype:'tbfill'},{
                    xtype: 'button',
                    ui: 'soft-purple',
                    text: 'Generate PIR Report',
                    iconCls: 'x-fa fa-file-pdf-o',
                    handler: 'printPIRReport',
                }],
    items: [ {
           title: 'Report on Minilab testing',
            xtype: 'sampleanalysistestresultsgrid',//pmspirevaluationgrid
        },{

            xtype:'screeningoverallrecommfrm',
            title:'Screenining Overrall Recommendation'
        },{
                    name:'application_id',
                    xtype:'hiddenfield'
                },{
                    name:'application_code',
                    xtype:'hiddenfield'
                },{
                    name:'sample_appcode',
                    xtype:'hiddenfield'
                },{
                    name:'sample_id',
                    xtype:'hiddenfield'
                },{
                    name:'limssample_id',
                    xtype:'hiddenfield'
                }
    ]
});