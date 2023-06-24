Ext.define('Admin.view.sampleinventory.views.form.ReceiveInventoryFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'receiveinventoryFrm',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    layout: 'column',
    frame: true,
    maxHeight: 400,
    height: 400,
    itemId: 'SampleInventoryForm',
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
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'inventory_id',
        margin: '0 20 20 0',
        name: 'inventory_id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        fieldLabel: 'Sample_id',
        margin: '0 20 20 0',
        name: 'sample_id',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        fieldLabel: 'application_code',
        margin: '0 20 20 0',
        name: 'application_code',
        allowBlank: true
    },
    {
        xtype: 'combo',
        fieldLabel: 'Sample Item Type',
        margin: '0 20 20 0',
        name: 'item_type_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        columnWidth: 0.5,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sampleitem_types'
                        }
                    }
                },
                isLoad: true
            },
            change: 'loadNewSampleForm'
           
        }
    },
    {
        xtype: 'combobox',
        queryMode: 'local',
        displayField: 'name',
        fieldLabel: 'Submitted By',
        margin: '0 20 20 0',
        valueField: 'id',
        forceSelection: true,
        allowBlank: false,
        columnWidth: 0.5,
        name: 'submitted_by',
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
                
    }
    ,{
        xtype: 'combo',
        fieldLabel: 'Store',
        margin: '0 20 20 0',
        name: 'store_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        columnWidth: 0.5,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_inventory_stores'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldVal, eopt) {
                var frm = combo.up('form'),
                    sectionStore = frm.down('combo[name = store_section_id]').getStore(),
                    filters = JSON.stringify({'store_id':newVal}); 
                    sectionStore.removeAll();
                    sectionStore.load({params:{filters:filters}});
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Store Section',
        margin: '0 20 20 0',
        name: 'store_section_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        columnWidth: 0.5,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_inventorystore_sections'
                        }
                    }
                },
                isLoad: false
            },
            change: function(combo, newVal, oldVal, eopt) {
                var frm = combo.up('form'),
                    sectionStore = frm.down('combo[name = section_level_id]').getStore(),
                    filters = JSON.stringify({'store_section_id':newVal}); 
                    sectionStore.removeAll();
                    sectionStore.load({params:{filters:filters}});
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Store Section Level',
        margin: '0 20 20 0',
        name: 'section_level_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        columnWidth: 0.5,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_inventorysection_levels'
                        }
                    }
                },
                isLoad: false
            }
           
        }
    },{
        xtype: 'textfield',
        name: 'reference_no',
        labelAlign: 'left',
        value: '',
        fieldLabel: 'Application Reference',
        readOnly: true,
        columnWidth: 0.9,
        allowBlank: true,
        hidden: false
    },
    {
        xtype: 'button',
        iconCls: 'x-fa fa-search',
        columnWidth: 0.1,
        name: 'search_btn',
        tooltip: 'Search Applicant',
        disabled: true,
        action: 'link_applicant',
        childXtype: 'inventorysampleproductselectioncmngrid',
        winTitle: 'Application Selection List',
        winWidth: '90%',
        stores:[],
        handler: 'showAddConfigParamWinFrm',
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Add Item',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_sample_inventory',
                    storeID: 'receiveInventoryStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'sampleinventory/saveInventoryItemData',
                    handler: 'doSaveInventory'
                }
            ]
        }
    ]
});