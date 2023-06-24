Ext.define('Admin.view.managementdashboard.views.forms.ServiceCharterConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'servicecharterconfigFrm',
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
        value: 'par_servicecharter_configurations',
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
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Service Type',
        margin: '0 20 20 0',
        name: 'service_type_id',
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
                            table_name: 'par_service_types'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'numberfield',
        name: 'standard_of_delivery',
        fieldLabel: 'Standard of Service Delivery(Days)'
    },{
        xtype: 'tagfield',
        name: 'service_sections',
        fieldLabel: 'Service Sections',
        columnWidth: 0.99,
        allowBlank: false,
        forceSelection: true,
        filterPickList: true,
        encodeSubmitValue: true,//0741712051
        growMax: 100,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
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
        xtype: 'checkbox',
        inputValue: 1,
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
                    table_name: 'par_servicecharter_configurations',
                    storeID: 'servicecharterconfigStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});