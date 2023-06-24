/**
 * Created by Kip on 10/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.OnlineAppRejectionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineapprejectionfrm',
    layout: 'column',
    defaults: {
        columnWidth: 1,
        allowBlank: false
    },
    items: [
        {
            xtype: 'textarea',
            name: 'rejection_reason',
            fieldLabel: 'Rejection Reason'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            formBind: true,
            text: 'Submit Details',
            iconCls: 'x-fa fa-check'
        }
    ]
});