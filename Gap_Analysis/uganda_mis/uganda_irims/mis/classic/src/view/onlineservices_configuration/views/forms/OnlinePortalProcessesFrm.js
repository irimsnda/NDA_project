
Ext.define('Admin.view.administration.views.forms.OnlinePortalProcessesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineportalprocessesFrm',
    autoScroll: true,
    requires:[
        'Ext.layout.container.Table'
    ],
    controller: 'onlineservicesconfVctr',
    bodyPadding: 3,
    layout:{
        type: 'column'
    },
    defaults: {
        //layout: '',
        labelAlign: 'top',
        allowBlank: false,
        columnWidth:0.5,
        margin: 8
    },
    items: [{
        xtype: 'hiddenfield',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'wb_tfdaprocesses',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        columnWidth: 0.25,
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
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
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'modules'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo,newValue,oldValue,eopts) {
                var form = combo.up('form'),
                    sub_modules = form.down('combo[name=sub_module_id]').getStore()
                    filters = JSON.stringify({'module_id':newValue});

                    sub_modules.removeAll();
                    sub_modules.load({params:{filters:filters}});
                
            },         
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
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'sub_modules'
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
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sections'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Status',
        margin: '0 20 20 0',
        name: 'status_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'openoffice/getOnlineSubmissionStatuses'
                    }
                },
                isLoad: true
            }
           
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        name: 'name'
    }, {
        xtype: 'textfield',
        name: 'router_link',
        fieldLabel: 'Router Link',
        allowBlank: true
        //margin: '0 0 0 20'
    }, {
        xtype: 'checkbox',
        fieldLabel: 'Is Enabled?',
        inputValue: 1,
        uncheckedValue: 0,
        name: 'is_enabled'
    }],
	dockedItems:[{
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'wb_tfdaprocesses',
                    storeID: 'onlineportalprocessesStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'onlineservices/saveOnlinePortalData',
                    handler: 'funcSaveformData',
					
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