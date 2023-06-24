/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/17/2018.
 */
Ext.define('Admin.view.controldocument_management.views.panels.ReviewDocumentControlRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'reviewdocumentcontrolrequestpnl',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    layout: 'border',
    items: [{
        xtype:'reviewdocumentcontrolrequestfrm',
        title:'Document Control Information',
        height: 395,
        collapsible: true,
        region:'north'
    },{
        xtype:'tabpanel',region:'center',
        title:'Control Document & Document Access Management',
        layout:'fit',
        items:[{
            title: 'Control Document Upload Option',
            layout:'fit',
            margin:5,
            region:'center',
            xtype: 'productDocUploadsGrid',
            viewConfig:{
                emptyText:'No document defination done, contact the system Admin for defination'
            }
            
        },{
           xtype:'controldocumentsaccessmanagementgrid',
           title:'Control Management Access'
        }]
    }]
});