/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.PremisesInspectionProcessPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisesinspectionprocesspanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Premises Inspection Schedules',
            region: 'north',
            height: 250,
            autoScroll: true,
            collapsible: true,
            collapsed: true,
            xtype: 'premisesinspectiondetailsfrm'
        },{
            xtype:'tabpanel',
            layout:'fit', region: 'center',
            items:[{
                title: 'Applications',
               
                xtype: 'premisesinspectionprocessgrid'
            },{
                xtype: 'premregappdocuploadsgenericgrid',
                title:'Inspection Documents Upload'
            }]
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