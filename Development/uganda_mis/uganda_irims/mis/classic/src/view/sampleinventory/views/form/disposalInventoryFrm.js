Ext.define('Admin.view.sampleinventory.views.form.disposalInventoryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'disposalinventoryFrm',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    layout: 'column',
    frame: true,
    itemId: 'disposalInventoryForm',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'left',
        allowBlank: false,
        columnWidth: 0.48
    },
    items: [
    {
        xtype: 'datefield',
        fieldLabel: 'Disposal Date',
        name: 'disposal_date',
        margin: '0 20 20 0',
        format: 'Y-m-d'
    },
    {
        xtype: 'combobox',
        queryMode: 'local',
        margin: '0 20 20 0',
        displayField: 'name',
        fieldLabel: 'Requested By',
        valueField: 'id',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        name: 'requested_by',
        listeners:
         {
             beforerender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                       url: 'usermanagement/getUserList'
                    }
                },
                isLoad: true,
            }        
     }
                
    },
    {
        xtype: 'combo',
        fieldLabel: 'Disposal Reason',
        margin: '0 20 20 0',
        name: 'disposal_reason_id',
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
                            table_name: 'par_sampledisposal_reasons'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },
    {
        xtype: 'combobox',
        queryMode: 'local',
        margin: '0 20 20 0',
        displayField: 'name',
        fieldLabel: 'Disposal Method',
        valueField: 'id',
        forceSelection: true,
        allowBlank: true,
        name: 'disposal_method_id',
        listeners:
         {
             beforerender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                       url: 'configurations/getConfigParamFromTable',
                       extraParams: {
                            table_name: 'par_destruction_methods'
                        }  
                    }
                },
                isLoad: true,
            }        
     }
                
    }, {
        xtype: 'textarea',
        fieldLabel: 'Comment',
        name: 'description',
        vtype: 'semiColonList',
        allowBlank: true
        }]
});