/**
 * Created by Kip on 5/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ManSiteBlockDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'mansiteblockdetailsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'button',
        text: 'Add Block',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_block',
        handler: 'showAddGmpBlockWinFrm',
        winTitle: 'Manufacturing Site Block Details',
        childXtype: 'mansiteblockdetailsfrm',
        winWidth: '50%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Site Personnel Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store=this.getStore(),
                grid=this.up('grid'),
                site_id=grid.up('mansitedetailstabpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
            store.getProxy().extraParams={
                manufacturing_site_id: site_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'mansiteblockdetailsstr',
                proxy: {
                    url: 'gmpapplications/getSiteBlockDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_block]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    winTitle: 'Manufacturing Site Block Details',
                    childXtype: 'mansiteblockdetailsfrm',
                    winWidth: '50%',
                    stores: '[]',
                    handler: 'showEditGmpApplicationWinFrm'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_manufacturing_sites_blocks',
                    storeID: 'mansiteblockdetailsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Block Name/Identity',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'activities',
        text: 'Description of Activities Undertaken',
        flex: 1
    }, {
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
                items: []
            }
        }
    }]
});
