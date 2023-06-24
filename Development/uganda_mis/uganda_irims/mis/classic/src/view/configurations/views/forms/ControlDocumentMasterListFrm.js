Ext.define('Admin.view.configurations.views.forms.ControlDocumentMasterListFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'controldocumentmasterlistFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'left',
        allowBlank: false,
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_controldocument_masterlist',
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
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Control Document Type',
        margin: '0 20 20 0',
        name: 'controldocument_type_id',
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
                            table_name: 'par_controldocument_types'
                        }
                    }
                },
                isLoad: true
            }
           
        }
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
                            table_name: 'par_directorates'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo,newValue, oldValue, eopts) {
                var form = combo.up('form'),
                    dir_unit = form.down('combo[name=directorate_unit_id]').getStore()
                    filters = JSON.stringify({'directorate_id':newValue});
                dir_unit.load({params:{filters:filters}});  
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Directorate Unit',
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
        xtype: 'combo',
        fieldLabel: 'Reference Format',
        margin: '0 20 20 0',
        name: 'ref_format_id',
        valueField: 'id',
        displayField: 'name',
        listConfig : {
            getInnerTpl: function(){
                 return '{name} - {ref_format}'; 
                }
           },
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
                            table_name: 'refnumbers_formats',
                            filters: JSON.stringify({'refnumbers_type_id':4})
                        }
                    }
                },
                isLoad: true
            },
           
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Doc Serial Number',
        margin: '0 20 20 0',
        name: 'doc_serial_number',
        allowBlank: false
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
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
                    table_name: 'par_controldocument_masterlist',
                    storeID: 'controldocumentmasterlistStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveDocumentMasterListConfig',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});