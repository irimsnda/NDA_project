Ext.define('Admin.view.configurations.views.forms.AuditedTableFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'auditedTableFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    width: '100%',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_audited_tables',
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
        fieldLabel: 'Table Type',
        margin: '0 20 20 0',
        name: 'table_type_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_audit_table_types'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldVal, eopts){
                var form = combo.up('form'),
                    tblStr = form.down('combo[name=audited_table_name]').getStore();
                tblStr.removeAll();
                tblStr.load({params:{prefix: newVal}});
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Table Name',
        margin: '0 20 20 0',
        name: 'audited_table_name',
        valueField: 'table_name',
        displayField: 'table_name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'audittrail/getTableslist'
                    }
                },
                isLoad: false
            }
           
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'logging Query',
        margin: '0 20 20 0',
        name: 'logging_query',
        allowBlank: false
    },{
        xtype: 'checkbox',
        inputValue: 1,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
        allowBlank: true
    }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            layout: 'vbox',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'par_audited_tables',
                    storeID: 'auditedTablesStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveAuditedTableLogger',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});