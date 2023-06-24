
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.disposalpermits.views.grids.common_grids.SearchProductsInformationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'disposalpermitsvctr',
    xtype: 'searchproductsinformationgrid',
    itemId: 'searchproductsinformationgrid',
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
        text:'Add New Product',
        iconCls:'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'searchproductsinformationgrid',
        winTitle: 'Search Disposal Products Details',
        winWidth: '75%',
        handler: 'showAddPermitsOtherdetailsWinFrm',
        stores: '[]',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }

    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    },'->',{
        xtype: 'combo',
        fieldLabel: 'Search Field',
        name: 'search_field',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'description',
        displayField: 'name',
        allowBlank: true,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_productapp_searchfilters'
                        }
                    }
                },
                isLoad: true
            }
        }
    },,{
        xtype: 'textfield',
        name: 'search_value',
        emptyText: 'Enter Search Value'

    },{
        text: 'Search Products',
        iconCls:'fa fa-search',ui: 'soft-green',
        handler: 'funcSearchregisterednonregisteredProd'

    },{
        text: 'Reset Products',
        iconCls:'fa fa-cancel',ui: 'soft-red',
        handler: 'funcResetregisterednonregisteredProd'

    }],
    plugins: [{
            ptype: 'gridexporter'
    }],
    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100,
                storeId: 'searchproductsinformationgridstr',
                proxy: {
                    url: 'importexportpermits/searchProductsInformation',
                    reader: {
                        type: 'json',
                        totalProperty: 'totalCount',
                        root: 'results'
                    }
                }
            },
            isLoad: true
        },
        itemdblclick: 'onDblClicksearchproductsinformationgrid'
    },
    export_title: 'Permits applications',

    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
       
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name/Device Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Classification Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        text: 'Common Name/INN Name/API',
        dataIndex: 'common_name',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Retention Status',
        dataIndex: 'retention_status',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Validity status',
        dataIndex: 'validity_status',
        flex: 1,
        tdCls: 'wrap'
    }]
});
