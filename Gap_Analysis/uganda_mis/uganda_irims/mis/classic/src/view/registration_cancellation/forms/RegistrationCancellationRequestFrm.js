Ext.define('Admin.view.registration_cancellation.forms.RegistrationCancellationRequestFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'registrationcancellationRequestFrm',
    controller: 'registrationcancellationVctr',
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
        xtype: 'textfield',
        name: 'reference_no',
        fieldLabel: 'Reference No',
        margin: '0 20 20 0',
        allowBlank:false
    },{
    
        xtype: 'textfield',
        margin: '0 20 20 0',
        fieldLabel: 'Requested By',
        name: 'requested_by',
      
    },{
        xtype: 'datefield',
        format: 'Y-m-d',
        fieldLabel: 'Requested On',
        margin: '0 20 20 0',
        name: 'requested_on',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Cancellation Reason',
        margin: '0 20 20 0',
        name: 'cancellation_reason_id',
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
                            table_name: 'par_cancellation_reasons'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Cancellation Remarks',
        margin: '0 20 20 0',
        name: 'remarks',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Cancellation',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    formBind: true,
                    storeID: 'registrationcancellationStr',
                    ui: 'soft-purple',
                    handler: 'doSaveCancellationRequest'
                }
            ]
        }
    ]
});