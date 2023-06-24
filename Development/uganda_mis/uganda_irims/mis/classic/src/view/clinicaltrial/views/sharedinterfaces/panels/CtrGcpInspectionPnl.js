
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.CtrGcpInspectionPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'ctrgcpinspectionpnl',
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
            xtype: 'ctrgcpinspectionsapplicationsgrid'
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