
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductGmpInspectionDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'productGmpInspectionDetailsGrid',
    itemId: 'productGmpInspectionDetailsGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'productgmpinspectiondetailsFrm',
        winTitle: 'GMP Manufacturing Site Details',
        winWidth: '70%',
        handler: 'showAddProductOtherdetailsWinFrm',
        stores: '["gmpInspectionApplicationsDetailsStr"]',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productGmpInspectionDetailsStr',
                proxy: {
                    url: 'productregistration/onLoadproductGmpInspectionDetailsStr',
                }
            },
            isLoad: true
        }
    },
    export_title: 'GMP Manufacturing Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('productGmpInspectionDetailsGrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'gmp_certificate_no',
        text: 'GMP Certificate No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gmp_application_reference',
        text: 'GMP Application Reference No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer Site Name',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'gmp_product_line',
        text: 'GMP product Line',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'gmp_product_category',
        text: 'GMP Product Category',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country_name',
        text: 'Country',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email Address',
        flex: 1,
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'registration_status',
        text: 'Registration Status',
        flex: 1,
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
                    table_name: 'tra_product_gmpinspectiondetails',
                    storeID: 'productGmpInspectionDetailsStr',
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeleteProductOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete'),
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }
                }]
            }
        }
    }]
});

