/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.TfdaProcessesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'tfdaprocessesfrm',
    autoScroll: true,
    controller: 'workflowmanagementvctr',
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
        value: 'wf_tfdaprocesses',
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
        name: 'name'
    },{
        xtype: 'combo',
        name: 'is_dataammendment_request',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: true,
        anyMatch: true,
        fieldLabel: 'Is Data Ammendment Request',
        value: 2,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                     proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_confirmations'
                        }
                    }
                },
                isLoad: true
            },
            change:function(cbo,value){
                    var form = cbo.up('form'),
                        sub_module_id = form.down('combo[name=sub_module_id]');
                    
                    if(value == 1){
                        sub_module_id.allowBlank = true;

                    }
                    else{
                        sub_module_id.allowBlank = false;
                    }
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
        anyMatch: true,
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
            },
            change: function (cmbo, newVal) {
                var form = cmbo.up('form'),
                    subModuleStore = form.down('combo[name=sub_module_id]').getStore();
                subModuleStore.removeAll();
                subModuleStore.load({params: {module_id: newVal}});
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        margin: '0 20 20 0',
        name: 'sub_module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule'
                        }
                    }
                },
                isLoad: false
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Section',
        margin: '0 20 20 0',
        name: 'section_id',
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        anyMatch: true,
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        extraParams: {
                            model_name: 'Section'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Workflow',
        margin: '0 20 20 0',
        name: 'workflow_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        anyMatch: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        extraParams: {
                            model_name: 'Workflow'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        name: 'check_if_exists',
        fieldLabel: 'Exists for Existence Validation'
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                {
                    text: 'Back',
                    iconCls: 'x-fa fa-backward',
                    action: 'back',
                    containerType: 'form',
                    containerPnlXtype: 'tfdaprocessespnl',
                    hiddenCompXtype: 'tfdaprocessesgrid',
                    ui: 'soft-purple',
                    handler: 'workflowBackToDashboard'
                },'->', {
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'wf_tfdaprocesses',
                    storeID: 'tfdaprocessesstr',
                    containerPnlXtype: 'tfdaprocessespnl',
                    hiddenCompXtype: 'tfdaprocessesgrid',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'workflow/saveWorkflowCommonData',
                    handler: 'doCreateWorkflowParam'
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