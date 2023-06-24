/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/17/2018.
 */
Ext.define('Admin.view.controldocument_management.views.panels.NewDocumentControlRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'newdocumentcontrolrequestpnl',
    // layout: {
    //     type: 'card'
    // },
    // defaults: {
    //     split: true
    // },
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',
    requires: [
        'Ext.layout.container.*'
    ],
    layout: 'card',
    items: [{
        xtype:'newdocumentcontrolrequestfrm',
        title:'Document Control Information'
    },{
        xtype:'tabpanel', 
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
            },
            listeners:{
              afterRender: 'modifyUploadGridForDocumentsControl'
             },
        },{
            xtype:'controldocumentsaccessmanagementpnl',
            title:'Control Management Access'
         }]
    }
    ],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-file',
                    enableToggle: true,
                    pressed: true,
                    text: 'Document Control DETAILS',
                    action: 'quickNav',
                    name: 'prev_btn',
                    handler: 'navigate'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Documents',
                    action: 'quickNav',
                    name: 'next_btn',
                    handler: 'navigate'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    name: 'prev_btn',
                    handler: 'navigate'
                },'->',{
                    text:'Submit Control Document Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'controldocumentmanagementdashstr',
                    table_name: 'tra_doccontrolreview_management',
                    winWidth: '50%'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    name: 'next_btn',
                    handler: 'navigate'
                }
            ]
        };
        me.callParent(arguments);
    }
});