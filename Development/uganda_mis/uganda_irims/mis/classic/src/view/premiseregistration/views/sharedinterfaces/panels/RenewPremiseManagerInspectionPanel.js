/**
 * Created by Kip on 11/26/2018.
 */
/*Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseManagerInspectionPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'renewpremisemanagerinspectionpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'managerinspectiongrid'//managerinspectionrenewalgrid'
        }
    ]
});*/

Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseManagerInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'renewpremisemanagerinspectionpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Inspection Details',
            region: 'north',
            height: 100,
            xtype: 'inspectionbasicdetailsfrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'managerinspectiongrid'
        },
        {
            title: 'Inspectors',
            xtype: 'inspectioninspectorsgrid',
            region: 'west',
            width: 400,
            collapsible: true,
            titleCollapse: true
        }
    ]
});