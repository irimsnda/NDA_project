Ext.define('Admin.view.audit_trail.views.forms.AuditReportConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'auditreportconfigFrm',
    controller: 'audit_trialViewCtr',
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
        value: 'par_auditreport_config',
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
        xtype: 'textfield',
        name: 'report_title',
        fieldLabel: 'Report Title',
        allowBlank: false,
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
        fieldLabel: 'Table Name',
        margin: '0 20 20 0',
        name: 'audit_table_name',
        valueField: 'audit_table',
        displayField: 'audit_table',
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
                            table_name: 'par_audit_definations'
                        }
                    }
                },
                
                isLoad: true
            }
           
        }
    },{
        xtype: 'checkbox',
        fieldLabel: 'Is Supporting table',
        margin: '0 20 20 0',
        inputValue: 1,
        uncheckedValue: 0,
        name: 'is_support_table',
        allowBlank: true,
        listeners:{
            change: function(chk, newValue, oldValue, eopts) {
                var form = chk.up('form'),
                    code = form.down('textarea[name=data_query]');
                if(newValue){
                    code.setReadOnly(false);
                    code.allowBlank = false;
                }else{
                    code.setReadOnly(true);
                    code.allowBlank = true;

                }
            },
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Data Query',
        readOnly: true,
        margin: '0 20 20 0',
        name: 'data_query',
        vtype: 'validateQuery',
        grow: true,
        allowBlank: true,
        anchor: '100%'
    },{
        xtype: 'checkbox',
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        inputValue: 1,
        uncheckedValue: 0,
        name: 'is_enabled',
        allowBlank: true,
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
                    table_name: 'par_auditreport_config',
                    storeID: 'internalauditreportconfigStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});