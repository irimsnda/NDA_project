Ext.define('Admin.view.trader_accounts.views.forms.TraderEmailNotificationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'traderemailnotificationfrm',
    autoScroll: true,
    controller: 'traderaccountsvctr',
    //layout: 'form',
    bodyPadding: 8,
    layout: 'form',
    items: [
     {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    },{
        fieldLabel: 'Email To',
        emptyText: 'Send Email To',
        xtype: 'textfield',
        name: 'email_to',
        allowBlank: false,
        vtype:'email'
    }, {
        fieldLabel: 'CC',
        emptyText: 'Include other receipient emails separated by a comma..',
        name: 'email_cc',
        xtype:'textfield'
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
        maxWidth: 800,
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
        url: 'tradermanagement/SendTraderNotificationEmail',
        formBind: true,
        ui: 'soft-purple',
        store: 'traderemailnotificationStr',
        handler: 'funcSendTraderEmailNotification'
    }]
});