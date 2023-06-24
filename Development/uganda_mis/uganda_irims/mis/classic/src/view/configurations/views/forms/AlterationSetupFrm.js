/**
 * Created by Kip on 12/7/2018.
 */
Ext.define('Admin.view.configurations.views.forms.AlterationSetupFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'alterationsetupfrm',
    controller: 'configurationsvctr',
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
        name: 'table_name',
        value: 'par_alteration_setup',
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
        name: 'name'
    }, {
        xtype: 'combo',
        fieldLabel: 'Form Specific?',
        margin: '0 20 20 0',
        name: 'is_form_tied',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        store: 'confirmationstr',
        value: 2,
        listeners: {
            change: function (cmbo, newVal) {
                var form = cmbo.up('form'),
                    form_fld = form.down('combo[name=form_id]');
                if (newVal == 1 || newVal === 1) {
                    form_fld.allowBlank = false;
                    form_fld.setVisible(true);
                } else {
                    form_fld.allowBlank = true;
                    form_fld.reset();
                    form_fld.setVisible(false);
                }
                form_fld.validate();
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Form',
        margin: '0 20 20 0',
        name: 'form_id',
        valueField: 'id',
        displayField: 'name',
        //forceSelection: true,
        allowBlank: true,
        hidden: true,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'KeyForm'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Module',
        margin: '0 20 20 0',
        name: 'module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        extraParams: {
                            model_name: 'Module'
                        }
                    }
                },
                isLoad: true
            }
            /* change: function (cmbo, newVal) {
                 var form = cmbo.up('form'),
                     subModuleStore = form.down('combo[name=sub_module_id]').getStore();
                 subModuleStore.removeAll();
                 subModuleStore.load({params: {module_id: newVal}});
             }*/
        }
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Panel Item ID',
        margin: '0 20 20 0',
        name: 'panel_item_id',
        allowBlank: false
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
                    table_name: 'par_alteration_setup',
                    storeID: 'alterationsetupstr',
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