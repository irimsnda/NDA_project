/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ManSiteOtherDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'mansiteotherdetailsgrid',
    cls: 'dashboard-todo-list',
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
    }, {
        xtype: 'hiddenfield',
        name: 'is_temporal',
        value: 0
    }, {
        xtype: 'button',
        text: 'Add Detail',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_details',
        action: 'add_details',
        winTitle: 'Manufacturing Site Details',
        childXtype: 'mansiteotherdetailsfrm',
        winWidth: '35%',
        stores: '[]',
        isManufacturer: 1
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Premise Other Details',
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
                storeId: 'mansiteotherdetailsstr',
                proxy: {
                    url: 'gmpapplications/getSiteOtherDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_details]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    stores: '[]',
                    handler: 'showEditSiteOtherDetails',
                    winTitle: 'Manufacturing Site Details',
                    childXtype: 'mansiteotherdetailsfrm',
                    winWidth: '35%'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_mansite_otherdetails',
                    storeID: 'mansiteotherdetailsstr',
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
        dataIndex: 'business_type',
        text: 'Business Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'business_type_detail',
        text: 'Product Type',
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    stores: '[]',
                    handler: 'showEditSiteOtherDetails',
                    winTitle: 'Manufacturing Site Details',
                    childXtype: 'mansiteotherdetailsfrm',
                    winWidth: '35%'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_mansite_otherdetails',
                    storeID: 'mansiteotherdetailsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
