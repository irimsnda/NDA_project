/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.forms.OnlineProcessTransitionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineprocesstransitionfrm',
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
        value: 'wb_processstatus_transitions',
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
                }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Current Status',
        margin: '0 20 20 0',
        name: 'current_status_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,storeId: 'onlineappStatusesStr',
                        proxy: {
                            extraParams: {
                                model_name: 'OnlineappStatuses'
                            }
                        }
                    },
                    isLoad: true
                },
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Next Process',
        margin: '0 20 20 0',
        name: 'next_status_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,storeId: 'onlineappStatusesStr',
                        proxy: {
                            extraParams: {
                                model_name: 'OnlineappStatuses'
                            }
                        }
                    },
                    isLoad: true
                },
        }
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
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
                    table_name: 'wb_processstatus_transitions',
                    storeID: 'onlineprocesstransitionstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'onlineservices/saveOnlinePortalData',
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