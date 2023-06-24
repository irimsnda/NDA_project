/**
 * Created by Kip on 8/31/2018.
 */
Ext.define('Admin.view.usermanagement.views.forms.PassResetOptionsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'passresetoptionsfrm',
    layout: 'form',
    frame: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'user_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'combo',
            fieldLabel: 'Select Option',
            allowBlank: false,
            forceSelection: true,
            displayField: 'name',
            emptyText: 'Select Option',
            valueField: 'id',
            queryMode: 'local',
            store: 'passresetoptionsstr',
            name: 'reset_option'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Proceed',
            iconCls: 'x-fa fa-check',
            iconAlign: 'right',
            formBind: true,
            action: 'reset_pwd_proceed'
            //handler: 'onPwdResetOptionProceed'
        }
    ]
});