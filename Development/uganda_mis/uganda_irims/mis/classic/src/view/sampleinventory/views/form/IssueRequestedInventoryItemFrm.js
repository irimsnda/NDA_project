Ext.define('Admin.view.sampleinventory.views.form.IssueRequestedInventoryItemFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'issuerequestedinventoryitemFrm',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    itemId: 'issuerequestedinventoryitemForm',
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
    },{
        xtype: 'hiddenfield',
        fieldLabel: 'issue_reason_id',
        margin: '0 20 20 0',
        name: 'issue_reason_id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        fieldLabel: 'quantity_issued',
        margin: '0 20 20 0',
        name: 'quantity',
        allowBlank: true
    },
    {
        xtype: 'combobox',
        queryMode: 'local',
        displayField: 'name',
        fieldLabel: 'Issue To',
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
                    storeID: 'requestedinventoryItemStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url:'sampleinventory/doSubmitRequestedInventoryIssueFormDetails',
                    handler: 'doSaveInventory'
                }
            ]
        }
    ]
});