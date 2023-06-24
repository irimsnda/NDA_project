/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/17/2018.
 */
Ext.define('Admin.view.controldocument_management.views.panels.ApprovalNewDocControlRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'approvalnewdoccontrolrequestpnl',
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    layout: 'border',
    items: [{
        xtype:'approvaldocumentcontrolrequestfrm',
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
    }
    ],
    bbar:['->',{
        text:'Submit Control Document Application',
        ui: 'soft-purple',
        iconCls: 'fa fa-check',
        name: 'process_submission_btn',
        storeID: 'controldocumentmanagementdashstr',
        table_name: 'tra_doccontrolreview_management',
        winWidth: '50%'
    }]
});