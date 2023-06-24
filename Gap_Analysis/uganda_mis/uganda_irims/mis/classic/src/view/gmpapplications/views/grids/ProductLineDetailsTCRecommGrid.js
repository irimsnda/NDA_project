/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ProductLineDetailsTCRecommGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid',
    xtype: 'productlinedetailstcrecommgrid',

    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'button',
        text: 'Add Product Line',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_line',
        winTitle: 'GMP Product Line Details',
        childXtype: 'productlinedetailsfrm',
        winWidth: '35%',
        stores: '[]',
        hidden: true
    },{
        xtype: 'button',
        text: 'Previous Recommendation',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'prev_productline_details',
        winTitle: 'Previous GMP Product Line Details',
        childXtype: 'prevproductlinedetailsgrid',
        winWidth: '80%',
        stores: '[]',
        hidden: true
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store=this.getStore(),
                grid=this.up('grid'),
                mainTabPanel = grid.up('#contentPanel'),
                activeTab = mainTabPanel.getActiveTab(),
                site_id=activeTab.down('hiddenfield[name=manufacturing_site_id]').getValue();
            store.getProxy().extraParams={
                site_id: site_id
            };
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productlinedetailsstr',
                proxy: {
                    url: 'gmpapplications/getGmpInspectionLineDetails'
                }
            },
            isLoad: false
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tc_recommendation',
        text: 'TC Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_line_status',
        text: 'Status',
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
                    text: 'Recommendation',
                    iconCls: 'x-fa fa-arrows',
                    stores: '[]',
                    handler: 'showEditGmpInspectionLineDetails',
                    winTitle: 'GMP Product Line Details',
                    childXtype: 'productlinerecommendationfrm',
                    winWidth: '35%',
                    is_recommendation:1,
                    recommendation_type:2
                },{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    stores: '[]',
                    handler: 'showEditGmpInspectionLineDetails',
                    winTitle: 'GMP Product Line Details',
                    childXtype: 'productlinedetailsfrm',
                    winWidth: '35%',
                    hidden: true
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'gmp_product_details',
                    storeID: 'productlinedetailsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }
    ]
});