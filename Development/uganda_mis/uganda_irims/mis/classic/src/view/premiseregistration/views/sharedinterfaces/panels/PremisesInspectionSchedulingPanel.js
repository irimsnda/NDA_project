/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.PremisesInspectionSchedulingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisesinspectionschedulingpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [{
        xtype:'panel',
        region:'north',
        height:315,
        layout:'column',
        collapsible: true,
        items:[
            {
                title: 'Premises Inspection Schedules',
                height: 280,
                autoScroll: true,
                columnWidth: 0.69,
                margin:5,
                xtype: 'premisesinspectiondetailsfrm',
                buttons:[{
                    xtype: 'button',
                    text: 'Save Details',
                    ui: 'soft-purple',
                    toaster: 1,
                    iconCls: 'x-fa fa-save',
                    name: 'save_btn'
                }]
            },,
            {
                title: 'Inspectors',
                xtype: 'inspectioninspectorsgrid',
                region: 'west',
                width: 400, columnWidth: 0.31,
                margin:5,
                titleCollapse: true
            }
        ]

    },
        
        {
            xtype:'tabpanel',
            layout:'fit',
            region: 'center',
            items:[{
                title: 'Applications',
               
                xtype: 'premisesinspectionschedulinggrid'
            },{
                xtype: 'unstructureddocumentuploadsgrid',
                title:'Inspection Documents Upload'
            }]
        }
    ]
});