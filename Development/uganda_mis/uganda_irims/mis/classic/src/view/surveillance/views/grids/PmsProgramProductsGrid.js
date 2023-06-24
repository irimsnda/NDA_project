/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PmsProgramProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'pmsprogramproductsgrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
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
        xtype: 'button',
        text: 'Add Product',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        handler: 'showAddPmsProgramProductWinFrm',
        childXtype: 'pmsprogramproductsfrm',
        winTitle: 'Product',
        winWidth: '35%',
        stores: '[]'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'PMS Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
         beforeLoad: function () {
             var store=this.getStore(),
                 grid=this.up('grid'),
                pnl=grid.up('pmsprogramdetailspnl'),
                program_id=pnl.down('form').down('hiddenfield[name=id]').getValue();
            store.getProxy().extraParams={
                program_id:program_id
             }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Section: {[values.rows[0].data.section_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'pmsprogramproductsstr',
                proxy: {
                    url: 'surveillance/getPmsProgramProducts'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'product_name',
        text: 'Product',
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
                items: [{
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'pms_program_products',
                    storeID: 'pmsprogramproductsstr',
                    action_url: 'surveillance/deleteSurveillanceRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteSurveillanceWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
