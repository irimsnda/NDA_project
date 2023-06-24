Ext.define('Admin.view.sampleinventory.views.form.IssueInventoryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'issueinventoryFrm',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    itemId: 'issueInventoryForm',
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
        xtype: 'hiddenfield',
        fieldLabel: 'inventory_id',
        margin: '0 20 20 0',
        name: 'inventory_id',
        allowBlank: true
    },
    {
        xtype: 'combo',
        fieldLabel: 'Issue Reason',
        margin: '0 20 20 0',
        name: 'issue_reason_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        readOnly: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sampleissue_reasons'
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
        displayField: 'name',
        fieldLabel: 'Issued To',
        valueField: 'id',
        forceSelection: true,
        allowBlank: false,
        name: 'issued_to',
        listeners:
         {
             beforerender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'usermanagement/getUserList', 
                    }
                },
                isLoad: true,
            }        
     }
                
    },
    {
        xtype: 'numberfield',
        name: 'quantity_issued',
        fieldLabel: 'Quantity Issued',
        allowBlank: false
    },{
        xtype: 'combobox',
        queryMode: 'local',
        displayField: 'name',
        fieldLabel: 'Item Status',
        valueField: 'id',
        name: 'item_status_id',
        listeners:
         {
             beforerender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                         extraParams: {
                            table_name: 'par_sample_statuses'
                        }   
                    }
                },
                isLoad: true,
            }        
            }
                
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
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
                    text: 'Issue Item',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_inventory_outflows',
                    storeID: 'issuedInventoryStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});