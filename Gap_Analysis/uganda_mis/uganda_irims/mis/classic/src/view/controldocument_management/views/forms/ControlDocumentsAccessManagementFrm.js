Ext.define('Admin.view.configurations.views.forms.ControlDocumentsAccessManagementFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'controldocumentsaccessmanagementfrm',
    controller: 'controldocumentmanagementvctr',
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
        value: 'par_controldocument_types',
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
        fieldLabel: 'Directorate',
        margin: '0 20 20 0',
        name: 'directorate_id',
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
                            table_name: 'par_document_directorate'
                        }
                    }
                },
                isLoad: true
            },change:'funcChangeDirectorates'
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Directorate Units',
        margin: '0 20 20 0',
        name: 'directorate_unit_id',
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
                            table_name: 'par_directorate_units'
                        }
                    }
                },
                isLoad: false
            }
        }
    },{
        xtype: 'textarea',
        columnWidth: 1,
        fieldLabel: 'Remarks',  
        allowBlank: false,
        name: 'remarks'
    },{
            xtype:'hiddenfield',
            name:'application_id'
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Document Access Management',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    storeID: 'controldocumentsaccessmanagementstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'controldocumentsmng/saveControlDocumentsAccessDetails',
                    handler: 'saveControlDocumentsAccessDetails'
                }
            ]
        }
    ]
});