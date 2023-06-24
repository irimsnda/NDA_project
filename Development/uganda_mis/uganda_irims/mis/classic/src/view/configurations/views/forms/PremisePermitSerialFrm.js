Ext.define('Admin.view.configurations.views.forms.PremisePermitSerialFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisepermitserialFrm',
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
        value: 'premise_permit_serials',
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
        fieldLabel: 'Registration Year',
        margin: '0 20 20 0',
        name: 'registration_year',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Last Serial',
        margin: '0 20 20 0',
        name: 'last_serial',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Section Name',
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
                        extraParams: {
                            model_name: 'Sections'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combobox',
        queryMode: 'local',
        fieldLabel: 'Table Name',
        displayField: 'table_name',
        valueField: 'table_name',
        name: 'table_name',
        listeners:
         {
             beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'audittrail/getTableslist',
                        extraParams:{
                            in_db:'mis'
                        }
                    }
                },
                isLoad: true
            },
             
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
                    table_name: 'premise_permit_serials',
                    storeID: 'premisepermitserialStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});