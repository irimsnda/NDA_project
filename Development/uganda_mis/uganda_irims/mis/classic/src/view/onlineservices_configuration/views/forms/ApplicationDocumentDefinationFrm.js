/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.forms.ApplicationDocumentDefinationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationdocumentdefinationfrm',
    controller: 'onlineservicesconfVctr',
    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 118,
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
        value: 'wb_applicable_appdocuments',
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
    },{
        fieldLabel: 'Module',
        xtype:'combo',
        margin: '0 0 20 0',
        valueField:'id',
        displayField:'name',
        name: 'def_module_id',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: false,
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'modules'
                    }
                   }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldVal, eopts) {
                var form = combo.up('form'),
                    sub_moduleStr = form.down('combo[name=def_sub_module_id]').getStore(),
                    filter = JSON.stringify({'module_id': newVal});
                sub_moduleStr.removeAll();
                sub_moduleStr.load({params:{filters: filter}});
            },

        }
    },{
        fieldLabel: 'Sub Module',
        xtype:'combo',
        valueField:'id',
        margin: '0 0 20 0',
        displayField:'name',
        name: 'def_sub_module_id',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: false,
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'sub_modules'
                    }
                   }
                },
                isLoad: false
            },
            change: 'reloadProcessStore',

        }
    },{
        fieldLabel: 'Section',
        xtype:'combo',
        valueField:'id',
        displayField:'name',
        name: 'def_section_id',
        margin: '0 0 20 0',
        queryMode: 'local',
        forceSelection: true,
        allowBlank: false,
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_sections'
                    }
                   }
                },
                isLoad: true
            },
            change: 'reloadProcessStore',

        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Process',
        margin: '0 0 20 0',
        name: 'process_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
                    storeId: 'systemprocessesstr',
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'wf_tfdaprocesses'
                        }
                    }
                },
                isLoad: false
            },
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Application Status',
        margin: '0 0 20 0',
        name: 'status_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    storeId: 'onlineappStatusesStr',
                    proxy: {
                        extraParams: {
                            model_name: 'OnlineappStatuses'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Document Type',
        margin: '0 0 20 0',
        name: 'document_type_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'DocumentType'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 0 20 0',
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
                    table_name: 'wb_applicable_appdocuments',
                    storeID: 'applicationdocumentdefinationstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'onlineservices/saveUniformOnlinePortalData',
                    handler: 'funcSaveformData'
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