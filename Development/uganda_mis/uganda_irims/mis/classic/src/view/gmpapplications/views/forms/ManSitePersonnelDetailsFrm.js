/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ManSitePersonnelDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'mansitepersonneldetailsfrm',
    controller: 'gmpapplicationsvctr',
    frame: true,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_manufacturing_sites_personnel'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Name',
            name: 'name'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Position',
            name: 'position_id',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            store: 'personnelpositionsstr'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Telephone',
            name: 'telephone',
            valueField: 'id',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'email_address',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Postal Address',
            name: 'postal_address',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax',
            name: 'fax',
            allowBlank: true
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_manufacturing_sites_personnel',
            storeID: 'mansitepersonneldetailsstr',
            action_url: 'gmpapplications/saveGmpApplicationCommonData',
            handler: 'doCreateGmpApplicationParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});