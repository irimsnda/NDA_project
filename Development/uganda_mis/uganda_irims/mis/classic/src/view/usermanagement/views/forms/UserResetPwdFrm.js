/**
 * Created by Kip on 8/31/2018.
 */
Ext.define('Admin.view.usermanagement.views.forms.UserResetPwdFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'userresetpwdfrm',
    frame: true,
    layout: {
        type: 'form'
    },
    defaults: {
        allowBlank: false,
        msgTarget: 'under'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'user_id'
        },
        {
            xtype: 'textfield',
            hidden: true,
            fieldLabel: 'Token',
            name: '_token',
            value: token
        },
        {
            xtype: 'textfield',
            fieldLabel: 'New Password',
            inputType: 'password',
            id: 'new_password',
            name: 'new_password'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Confirm New Password',
            inputType: 'password',
            id: 'confirm_new_password',
            initialPassField: 'new_password',
            vtype: 'password',
            name: 'confirm_new_password'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save',
            iconCls: 'x-fa fa-save',
            action: 'update_password',
            formBind: true
        },
        {
            xtype: 'button',
            text: 'Close',
            iconCls: 'x-fa fa-close',
            action: 'close',
            handler: function (btn) {
                btn.up('form').up('window').close();
            }
        }
    ]
});