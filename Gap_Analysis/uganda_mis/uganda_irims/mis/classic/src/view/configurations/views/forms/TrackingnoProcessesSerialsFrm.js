Ext.define('Admin.view.configurations.views.forms.TrackingnoProcessesSerialsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'trackingnoprocessesserialsFrm',
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
        value: 'trackingnoprocesses_serials',
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
        fieldLabel: 'Year',
        margin: '0 20 20 0',
        name: 'year',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Last Serial',
        margin: '0 20 20 0',
        name: 'last_serial_no',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Process',
        margin: '0 20 20 0',
        name: 'process_id',
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
                        extraParams:{
                            table_name: 'wf_tfdaprocesses'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Zone',
        margin: '0 20 20 0',
        name: 'zone_id',
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
                        extraParams:{
                            table_name: 'par_zones'
                        }
                    }
                },
                isLoad: true
            }
        }
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
                    table_name: 'trackingnoprocesses_serials',
                    storeID: 'trackingnoprocessesserialsGrid',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});