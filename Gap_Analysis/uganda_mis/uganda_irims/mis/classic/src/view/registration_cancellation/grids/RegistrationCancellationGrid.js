Ext.define('Admin.view.registration_cancellation.grids.RegistrationCancellationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registrationcancellationVctr',
    xtype: 'registrationcancellationGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var cancellation_status_id = record.get('cancellation_status_id');
            if (cancellation_status_id > 1 ) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'New Request',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'registrationcancellationRequestFrm',
        winTitle: 'Cancellation Request Form',
        winWidth: '70%',
        handler: 'showAddRequestWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        },
        {
            ptype: 'filterfield'
        }
    ],
    export_title: 'registrationcancellation',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(me) {
            var grid = this.up('grid'),
                module_id = grid.down('combo[name=module_id]').getValue(),
                requested_by = grid.down('combo[name=requested_by]').getValue(),
                approved_by_id = grid.down('combo[name=approved_by_id]').getValue(),
                status_id = grid.down('combo[name=status_id]').getValue(),
                store = grid.getStore();

                store.getProxy().extraParams = {
                    'module_id':module_id,
                    'requested_by_id':requested_by_id,
                    'approved_by_id':approved_by_id,
                    'status_id':status_id
                }
        },  
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'registrationcancellationStr',
                proxy: {
                    url: 'workflow/getCancelledRegistrationApplications',
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 100
    },{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module',
        width: 150,
        tblCls: 'wrap',
        filter: {
            xtype: 'combo',
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
                },
                change: function(combo,newval,old, eopts){
                    var store = combo.up('grid').getStore();
                    store.removeAll();
                    store.load();
                }
               
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        width: 150,
        tblCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        width: 150,
        tblCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'Requested By',
        width: 150,
        tblCls: 'wrap',
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'datecolumn',
        format: 'Y-m-d',
        dataIndex: 'requested_on',
        text: 'Requested On',
        width: 150,
        tblCls: 'wrap',
        filter: {
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approved_by',
        text: 'Approved By',
        width: 150,
        tblCls: 'wrap',
        filter: {
            xtype: 'combo',
            margin: '0 20 20 0',
            name: 'approved_by_id',
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
                            url: 'usermanagement/getUserList'
                        }
                    },
                    isLoad: true
                },
                change: function(combo,newval,old, eopts){
                    var store = combo.up('grid').getStore();
                    store.removeAll();
                    store.load();
                }
               
            }
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cancellation_reason',
        text: 'Cancellation Reason',
        width: 150,
        tblCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Cancellation Remark',
        width: 150,
        tblCls: 'wrap',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cancellation_status',
        text: 'Cancellation status',
        width: 150,
        tblCls: 'wrap',
        filter: {
            xtype: 'combo',
            margin: '0 20 20 0',
            name: 'status_id',
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
                                table_name: 'par_cancellation_statuses'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo,newval,old, eopts){
                    var store = combo.up('grid').getStore();
                    store.removeAll();
                    store.load();
                }
               
            }
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
                    text: 'View Application',
                    iconCls: 'x-fa fa-eye',
                    tooltip: 'view Record',
                    action: 'view',
                    childXtype: 'cancelledapplicationdetailsGrid',
                    winTitle: 'Application Details',
                    winWidth: '70%',
                    handler: 'showCancelledApplicationDetails',
                    stores: '[]'
                },{
                    text: 'Revert Cancellation',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'revert',
                    action: 'revert',
                    handler: 'doRevertCancellation',
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var cancellation_status_id = rec.get('cancellation_status_id');
            if (cancellation_status_id > 1 ) {
                widget.down('menu menuitem[action=view]').setDisabled(true);
                widget.down('menu menuitem[action=revert]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=view]').setDisabled(false);
                widget.down('menu menuitem[action=revert]').setDisabled(false);
            }
        }
    }]
});
