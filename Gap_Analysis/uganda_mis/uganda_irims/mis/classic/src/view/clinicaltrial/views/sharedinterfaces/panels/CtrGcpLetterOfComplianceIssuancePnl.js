
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.CtrGcpLetterOfComplianceIssuancePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'ctrgcpletterofcomplianceissuancepnl',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'GCP Inspection Schedules',
            region: 'north',
            height: 250,
            autoScroll: true,
            collapsible: true,
            collapsed: true,
            xtype: 'ctrgcpinspectionscheduledetailsfrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'ctrgcpletterofcomplianceissuancegrid'//ctrgcpapprovalinspectionsapplicationsgrid
        },
        {
            title: 'Inspectors',
            xtype: 'inspectioninspectorsgrid',
            region: 'west',
            width: 400,collapsed: true,
            collapsible: true,
            titleCollapse: true
        }
    ]
});