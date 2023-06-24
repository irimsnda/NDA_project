Ext.define('Admin.view.sampleinventory.views.form.IssueInventoryRequestFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'issueinventoryRequestFrm',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    layout: 'column',
    frame: true,
    itemId: 'issueInventoryRequestForm',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        columnWidth: 1
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
        fieldLabel: 'remaining_quantity',
        margin: '0 20 20 0',
        name: 'remaining_quantity',
        allowBlank: true
    },
    {
        xtype: 'textfield',
        name: 'item_reference_no',
        labelAlign: 'left',
        value: '',
        fieldLabel: 'Store Item',
        readOnly: true,
        columnWidth: 0.9,
        allowBlank: false,
        hidden: true
    },{
        xtype: 'combo',
        fieldLabel: 'Issue To',
        margin: '0 20 20 0',
        name: 'issued_to',
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
                         url: 'usermanagement/getUserList', 
                    }
                },
                isLoad: true
            }
           
        }
    }
    ,{
        xtype: 'combo',
        fieldLabel: 'Issue Reason',
        margin: '0 20 20 0',
        name: 'issue_reason_id',
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
                            table_name: 'par_sampleissue_reasons'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },
    {
        xtype: 'numberfield',
        name: 'quantity_issued',
        fieldLabel: 'Requested Quantity',
        allowBlank: false
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
                    text: 'Submit',
                    iconCls: 'x-fa fa-save',
                    action_url:'sampleinventory/doSubmitInventoryIssueFormDetails',
                    storeID:'issuedInventoryStr',
                    table_name: 'tra_inventory_outflows',
                    handler: 'doSaveIssueInventory'
                }
            ]
        }
    ]
});