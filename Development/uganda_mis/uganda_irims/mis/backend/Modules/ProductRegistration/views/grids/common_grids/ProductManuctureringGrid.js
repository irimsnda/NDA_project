
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductManuctureringGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'productManuctureringGrid',
    itemId: 'productManuctureringGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 550,
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
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productManuctureringStr',
                proxy: {
                    url: 'productregistration/onLoadproductManufacturer',
                }
            },
            isLoad: true
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'productManuctureringFrm',
        winTitle: 'Product Manufacturer',
        winWidth: '40%',
        handler: 'showAddProductOtherdetailsWinFrm',
        stores: '[]',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Product Manufacturer',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('productManuctureringGrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturing_role',
        text: 'Manufacturering Roles',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer Name',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturing_site',
        text: 'Manufacturing Site',
        flex: 1,
    }, {
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_role',
        text: 'Manufacturing Role',
        flex: 1,
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturing_activities',
        text: 'Manufacturing Activities',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'has_beeninspected',
        text: 'Has Been Inspected',
        flex: 1,
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                        var textVal = 'Inspection';
                        if (val == 1) {
                            meta.tdStyle = 'color:white;background-color:green';
                            textVal = 'Inspected';
                            
                        }else if(val == 2){
                            meta.tdStyle = 'color:white;background-color:red';
                            textVal = 'Not Inspected';
                           
                        }


        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'has_beeninspected',
        text: 'Inspected Statuses',
        flex: 1,
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                        var textVal = 'Inspection Status';
                        if (val == 2) {
                            meta.tdStyle = 'color:white;background-color:green';
                            textVal = 'Compliant';
                            
                        }else if(val == 2){
                            meta.tdStyle = 'color:white;background-color:red';
                            textVal = 'Non-Compliant';
                           
                        }else if(val == 3){
                            meta.tdStyle = 'color:white;background-color:yellow';
                            textVal = 'CAPA Request';
                           
                        }



        }
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
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'productManuctureringFrm',
                    winTitle: 'Product Manufacturer',
                    winWidth: '40%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_product_manufacturers',
                    storeID: 'productManuctureringStr',
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
