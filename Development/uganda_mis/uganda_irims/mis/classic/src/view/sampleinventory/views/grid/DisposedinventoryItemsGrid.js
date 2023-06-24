
Ext.define('Admin.view.sampleinventory.views.grid.DisposedinventoryItemsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'disposedinventoryItemsGrid',
    cls: 'dashboard-todo-list',
    controller: 'sampleinventoryvctr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
         getRowClass: function (record, rowIndex, rowParams, store) {
            var remaining_quantity = record.get('remaining_quantity');
            if (remaining_quantity == 0 || remaining_quantity === 0) {
                return 'invalid-row';
            }
        }
    },
    export_title: 'DisposedinventoryItemsGrid',



    plugins: [
        {
            ptype: 'gridexporter'
        },
        {
            ptype: 'filterfield'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            hidden: true,
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                },{
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },  {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'process_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'workflow_stage_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'status_type_id'
                }
            ]
        }
    ],

    listeners: {
        beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 25,
                    storeId: 'disposeInventoryStr',
                    enablePaging: true,
                    remoteFilter: true,
                    proxy: {
                        url: 'sampleinventory/getDisposalApprovedRequests',
                    }
                },
                isLoad: true
            },

        //itemdblclick: 'archivedisposalInventoryDBClick'
    },

    columns: [
    // {
    //     xtype: 'gridcolumn',
    //     dataIndex: 'tracking_no',
    //     text: 'Tracking Number',
    //     flex: 1
    // }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'process_id',
        text: 'process_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage_id',
        text: 'workflow_stage_id',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        text: 'Process',
        flex: 1,
    }, 
    {
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'Requested By',
        flex: 1,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            forceSelection: true,
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
                },
                change: function() {
                    var store = this.up('grid').getStore();
                     store.load();
             },        
             }
             
         }
    },{
        xtype: 'gridcolumn',
        text: 'Approved By',
        dataIndex: 'approved_by',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage',
        text: 'Workflow Stage',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Date Approved',
        dataIndex: 'approval_date',
        flex: 1,
        tdCls: 'wrap-text',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s'),
        filter: {
            xtype: 'datefield'
        }
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Print Issuance Document',
                    iconCls: 'x-fa fa-chevron-circle-up',
                    approval_frm: 'disposalapprovalrecommfrm',
                    handler: 'print_issuance',
                    stores: '[]',
                    table_name: 'tra_inventory_applications'
                }, {
                    text: 'Preview Disposal Request',
                    iconCls: 'x-fa fa-repeat',
                    handler: 'viewDisposalRequestDetails'
                }
                ]
            }
        }
    }],
     bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                requested_by = grid.down('combo[name = requested_by]').getValue(),
                store = grid.getStore();

            store.getProxy().extraParams = {
                        requested_by:requested_by
                }

        }
    }]
});
