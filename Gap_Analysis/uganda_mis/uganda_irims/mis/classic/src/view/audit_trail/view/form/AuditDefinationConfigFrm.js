Ext.define('Admin.view.audit_trail.views.forms.AuditDefinationConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'auditdefinationconfigFrm',
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
        value: 'par_audit_definations',
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
        fieldLabel: 'Table Name',
        margin: '0 20 20 0',
        name: 'primary_table',
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
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Event Time',
        margin: '0 20 20 0',
        name: 'event_time',
        valueField: 'name',
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
                            table_name: 'par_auditevent_time'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Table Event',
        margin: '0 20 20 0',
        name: 'table_event',
        valueField: 'name',
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
                            table_name: 'par_audit_events'
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
                    table_name: 'par_audit_definations',
                    storeID: 'auditdefinationconfigStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'auditreport/saveAuditDefinationConfigParam',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});