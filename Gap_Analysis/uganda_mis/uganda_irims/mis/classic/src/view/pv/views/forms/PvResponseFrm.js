Ext.define('Admin.view.pv.views.forms.PvResponseFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'pvResponseFrm',
    controller: 'pvvctr',
    // height: Ext.Element.getViewportHeight() - 118,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        margin: 5,
        allowBlank: true,
        labelAlign: 'top'
    },
    scrollable: true,
    autoScroll: true,
    items: [{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },{
            xtype: 'textfield',
            name: 'subject',
            fieldLabel: 'Response Subject'
        },{
            xtype: 'htmleditor',
            fieldLabel: 'Response Body',
            columnWidth: 1,
            name: 'response',
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Send Response',
                    iconCls: 'x-fa fa-paper-plane',
                    action: 'send',
                    table_name: 'tra_pv_applications',
                    storeID: 'pvManagerAllocationGridStr',
                    formBind: true,
                    ui: 'soft-blue',
                    action_url: 'pv/sendReporterNotification',
                    handler: 'doCreatePvWin'
                }
            ]
        }
    ]
});