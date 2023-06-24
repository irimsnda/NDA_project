Ext.define('Admin.view.trader_accounts.views.forms.ContactApplicantForSyncRequestForm', {
    extend: 'Ext.form.Panel',
    xtype: 'contactApplicantforSyncRequestForm',
    controller: 'traderaccountsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'status_id',
        margin: '0 20 20 0',
        name: 'status_id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'reference_no',
        margin: '0 20 20 0',
        name: 'reference_no',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'registration_no',
        margin: '0 20 20 0',
        name: 'registration_no',
        allowBlank: true
    },{
        fieldLabel: 'Email To',
        emptyText: 'Send Email To',
        xtype: 'textfield',
        name: 'email_to',
        allowBlank: false,
        vtype:'email'
    },{
        xtype: 'textfield',
        emptyText: 'Subject..',
        allowBlank: false,
        name: 'email_subject',
        fieldLabel: 'Subject'
    },{
        xtype: 'htmleditor',
        allowBlank: false,
        fieldLabel: 'Message',
        height: 200,
        maxWidth: 400,
        name: 'email_body',
        placeHolder: 'Write...'
    }],
    buttons: [{
        text: 'Cancel',
        iconCls: 'x-fa fa-times',
        ui: 'soft-purple',
        handler: 'func_closeFormWin'
    },'->',{
        text: 'Send Email',
        iconCls: 'x-fa fa-send',
        formBind: true,
        ui: 'soft-purple',
        url: 'tradermanagement/SendTraderNotificationEmail',
        store: [],
        handler: 'funcSendTraderEmailNotification'
    }]
});