/**
 * Created by Kip on 6/6/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialComparePanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialcomparepanel',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    height: 600,
    layout: {
        type: 'border'
    },
    defaults:{
        collapsible: true,
        split: true,
        titleCollapse: true
    },
    dockedItems:{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        items:[
            '->',
            {
                text: 'Accept Changes Made(If Any)',
                iconCls: 'x-fa fa-check-square-o',
                ui: 'soft-purple',
                handler: 'acceptPortalAmendedDetails'
            }
        ]
    },
    items:[
        {
            xtype: 'clinicaltrialmiscomparepreviewpnl',
            flex: 0.5,
            title: 'Initial/MIS Details',
            region: 'center'
        },
        {
            xtype: 'clinicaltrialportalcomparepreviewpnl',
            flex: 0.5,
            title: 'Amended/PORTAL Details',
            region: 'east'
        }
    ]
});