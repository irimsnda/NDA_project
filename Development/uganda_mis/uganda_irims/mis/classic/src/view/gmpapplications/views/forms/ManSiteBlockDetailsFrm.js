/**
 * Created by Kip on 5/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ManSiteBlockDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'mansiteblockdetailsfrm',
    controller: 'gmpapplicationsvctr',
    layout: {
        type: 'column'
    },
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
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
            name: 'table_name',
            value: 'tra_manufacturing_sites_blocks'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Block Name/Identity',
            name: 'name'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Description of Activities Undertaken',
            name: 'activities'
        }
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            formBind: true,
            action_url: 'gmpapplications/saveGmpApplicationCommonData',
            table_name: 'tra_manufacturing_sites_blocks',
            storeID: 'mansiteblockdetailsstr',
            handler: 'doCreateGmpApplicationParamWin'
        }
    ]
});