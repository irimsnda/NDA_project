/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.configurations.views.forms.ChecklistItemsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'checklistitemsfrm',
    autoScroll: true,
    controller: 'configurationsvctr',
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
        name: 'table_name',
        value: 'par_checklist_items',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'unset_data',
        value: 'checklist_category_id',
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
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Order No',
        margin: '0 20 20 0',
        name: 'order_no',
        allowBlank: false
    }, {
        xtype: 'combo',
        fieldLabel: 'Checklist Category',
        margin: '0 20 20 0',
        name: 'checklist_category_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'ChecklistCategory'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var form = cmbo.up('form'),
                    type_field = form.down('combo[name=checklist_type_id]'),
                    type_store = type_field.store;
                type_store.removeAll();
                type_store.load({params: {checklist_category: newVal}});
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Checklist Type',
        margin: '0 20 20 0',
        name: 'checklist_type_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getChecklistTypes',
                        extraParams: {
                            model_name: 'ChecklistType'
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
                    table_name: 'par_checklist_items',
                    storeID: 'checklistitemsstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
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