/**
 * Created by Kip on 7/29/2017.
 */
Ext.define('Admin.view.authentication.PasswordChangeWin', {
    extend: 'Ext.window.Window',
    xtype: 'passwordchangewin',
    modal: true,
    title: 'Password Change',
    padding: 3,
    requires: [
        'Ext.form.*',
        'Ext.layout.container.Form',
        'Ext.button.*'
    ],

    items: [
        {
            xtype: 'form',
            frame: true,
            layout: {
                type: 'form'
            },
            defaults:{
                allowBlank: false,
                msgTarget: 'under'
            },
            items:[
                {
                    xtype: 'textfield',
                    hidden: true,
                    fieldLabel: 'Token',
                    name: '_token',
                    value: token
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Old Password',
                    inputType: 'password',
                    name: 'old_password'
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
            buttons:[
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    formBind: true,
                    handler: 'updatePassword'
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
        }
    ]
});