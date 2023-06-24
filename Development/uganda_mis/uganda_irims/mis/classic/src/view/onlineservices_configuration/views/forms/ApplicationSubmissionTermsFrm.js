/**
 * Created by Softclans on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.forms.ApplicationSubmissionTermsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationsubmissiontermsfrm',
    controller: 'onlineservicesconfVctr',
    autoScroll: true,
    
    frame: true,
    bodyPadding: 8,
    
	layout: {
        type: 'column'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false,
        columnWidth: 1,
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wb_appsubmission_termscondition',
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
        xtype: 'combo',
        fieldLabel: 'Modules',
        margin: '0 20 20 0',
        name: 'module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,storeId: 'modulesstr',
                        proxy: {
                            extraParams: {
                                model_name: 'Modules'
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
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        margin: '0 20 20 0',
        name: 'sub_module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
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
        xtype: 'htmleditor',
        fieldLabel: 'Submission Terms Conditions ',
        margin: '0 20 20 0',
        name: 'term_conditiondetails',
        allowBlank: true
    },{
                                            xtype: 'checkbox',
                                            inputValue: 1,
                                            uncheckedValue: 0,
                                            fieldLabel: 'Is Enabled',
                                            margin: '0 20 20 0',
                                            name: 'is_enabled',
                                            allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'wb_appsubmission_termscondition',
                    storeID: 'applicationsubmissiontermsstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'funcSaveformData'
                },{
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