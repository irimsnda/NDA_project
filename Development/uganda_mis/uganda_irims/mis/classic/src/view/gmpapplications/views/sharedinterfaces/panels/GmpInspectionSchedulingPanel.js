/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpInspectionSchedulingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpinspectionschedulingpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'All Applications',
            region: 'north',
            height: 350,
            xtype: 'gmpinspectionschedulinggrid',
            collapsible: true,
            titleCollapse: true
        },
        {
            title: 'Physical Inspections',
            xtype: 'gmpinspectionschedulingphysicalgrid',
            region: 'center'
        },
        {
            title: 'Desk Review & Virtual Inspections',
            xtype: 'gmpinspectionschedulingdeskreviewgrid',
            region: 'east',
            width: '50%',
            collapsible: true,
            titleCollapse: true
        }
    ]
});