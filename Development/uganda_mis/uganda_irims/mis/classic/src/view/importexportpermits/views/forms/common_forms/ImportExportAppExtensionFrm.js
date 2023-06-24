Ext.define('Admin.view.importexportpermits.views.forms.common_forms.ImportExportAppExtensionFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'importexportappextensionFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'column',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        columnWidth: 0.3
    },
    items: [{
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
        fieldLabel: 'Reference_No',
        margin: '0 20 20 0',
        name: 'reference_no',
        readOnly: true,
        tooltip: 'Selected Application has not been approved',
        allowBlank: false
    },{
        xtype: 'datefield',
        fieldLabel: 'Previous Expiry Date',
        tooltip: 'Selected Application has not been approved',
        margin: '0 20 20 0',
        name: 'prev_expiry_date',
        readOnly: true,
        allowBlank: false
    },{
        xtype: 'numberfield',
        name: 'extension_period',
        margin: '0 20 20 0',
        fieldLabel: 'Extended By'
    },{
        xtype: 'combo',
        name: 'timeline_duration_id',
        fieldLabel: 'Duration',
        forceSelection: true,
        margin: '0 20 20 0',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_timespan_defination'
                            }
                        }
                    },
                    isLoad: true
                },
            },
    
    },{

        xtype: 'datefield',
        name: 'requested_on',
        margin: '0 20 20 0',
        fieldLabel: 'Requested On',
        allowBlank: true
    },{

        xtype: 'textfield',
        name: 'requested_by',
        fieldLabel: 'Requested By',
        allowBlank: true
    },{
        xtype: 'textarea',
        fieldLabel: 'Extension Reason',
        margin: '0 20 20 0',
        name: 'extention_reason',
        columnWidth: 1,
        allowBlank: true
    },{
        xtype: 'textarea',
        fieldLabel: 'Remarks',
        columnWidth: 1,
        margin: '0 20 20 0',
        name: 'remarks',
        allowBlank: true
    }]
    
});