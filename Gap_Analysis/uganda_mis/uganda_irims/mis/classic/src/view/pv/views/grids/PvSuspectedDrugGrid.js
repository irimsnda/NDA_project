Ext.define('Admin.view.pv.views.grids.PvSuspectedDrugGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pvvctr',
    xtype: 'pvSuspectedDrugGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-blue',
        childXtype: 'pvSuspectedDrugFrm',
        winTitle: 'Suspected Medicine/Vaccine/Device',
        winWidth: '80%',
        bind: {
            hidden: '{isReadOnly}'
        },
        handler: 'showAddPvWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'pvSuspectedDrugList',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            this.up('grid').fireEvent('refresh', this, 'tra_pv_suspected_drugs');
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setGridStore',
            config: {
                pageSize: 1000,
                // storeId: 'pvSuspectedDrugStr',
                proxy: {
                    url: 'pv/onLoadSuspectedDrugs',
                    extraParams:{
                        is_config: 1,
                        table_name: 'tra_pv_suspected_drugs'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name',
        tdCls: 'wrap',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'datecolumn',
        dataIndex: 'start_date',
        format: 'Y-m-d',
        text: 'Start Date',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'datecolumn',
        dataIndex: 'end_date',
        text: 'End Date',
        format: 'Y-m-d',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer',
        tdCls: 'wrap',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'datecolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry date',
        format: 'Y-m-d',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        text: 'Comments',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'use_reasons',
        text: 'Use Reasons',
        flex: 1,
        tdCls: 'wrap'
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit',
                    action: 'edit',
                    childXtype: 'pvSuspectedDrugFrm',
                    winTitle: 'Suspected Medicine/Vaccine/Device',
                    winWidth: '80%',
                    handler: 'showEditPvWinFrm',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_pv_suspected_drugs',
                    storeID: 'pvSuspectedDrugStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    bind: {
                        disabled: '{hideDeleteButton}'
                    },
                    handler: 'doDeleteConfigWidgetParam'
                }
                ]
            }
        }
    }]
});
