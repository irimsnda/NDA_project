/**
 * Created by Kip on 11/24/2018.
 */
Ext.define('Admin.view.administration.views.forms.FormFieldsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'formfieldsfrm',
    autoScroll: true,
    frame: true,
    controller: 'administrationvctr',
    layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_key_form_fields',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'form_id'
    },{
        xtype: 'textfield',
        fieldLabel: 'Field Name',
        margin: '0 20 20 0',
        allowBlank: false,
        name: 'field_name'
    },{
        xtype: 'combo',
        fieldLabel: 'Field Type',
        margin: '0 20 20 0',
        name: 'field_type_id',
        forceSelection: true,
        queryMode: 'local',
        allowBlank: false,
        displayField: 'name',
        valueField: 'id',
        listeners:{
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'FormFieldType'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                '->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'par_key_form_fields',
                    storeID: 'formfieldsstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'administration/saveAdminCommonData',
                    handler: 'doCreateAdminParamWin'
                }, {
                    text: 'Reset',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});