/**
 * Created by Softclans on 1/24/2019.
 */
 Ext.define('Admin.view.productregistration.views.grids.common_grids.RegisteredProductsDetailsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'registeredproductsgrid',
    controller: 'productregistrationvctr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'registeredproductsstr',
                pageSize: 100,
                remoteFilter: true,
                enablePaging: true,
                proxy: {
                    url: 'productregistration/getRegisteredProductsAppsDetails'//getProductApprovalApplications
                }
            },
            isLoad: true
        }
    },
    plugins: [{
        ptype: 'filterfield'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('registeredproductsgrid'),
                store = grid.store;
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
                status_id = grid.down('hiddenfield[name=status_id]').getValue();

                    store.getProxy().extraParams = {
                        section_id: section_id,
                        status_id: status_id
                    };
        }
    }],
    tbar: [{
      xtype:'hiddenfield',
      name:'section_id'  
    },{
        xtype:'hiddenfield',
        name:'status_id'  
      },{
        text: 'Double Click to select application'
    }, '->', {
        xtype: 'combo',
        emptyText: 'Select Search Field',
        name: 'search_field',
        hidden: true,
        valueField: 'description',
        displayField: 'name',
        queryMode: true,
        listeners: {
            afterrender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_productapp_searchfilters'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'textfield',
        name: 'search_value',
        allowBlank: false,hidden: true,
        emptyText: 'Enter Search Value'
    }, {
        text: 'Search',hidden: true,
        iconCls: 'fa fa-search', allowBlank: false,
        ui: 'soft-purple',
        handler: 'funcSearchProductApplications'
    }, {
        text: 'Clear',
        iconCls: 'fa fa-cancel',
        ui: 'soft-red',hidden: true,
        handler: 'funcClearSearchApplications'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'MA Number',
        width: 150,
        filter: {
            xtype: 'textfield',
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: ' Reference No',
        width: 150,
        filter: {
            xtype: 'textfield',
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand_Name',
        width: 150,
        filter: {
            xtype: 'textfield',
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        width: 150,
        filter: {
            xtype: 'textfield',
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Classification Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'local_agent',
        text: 'Local Agent',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
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
                    text: 'Preview Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Information',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'editpreviewProductInformation'
                }, {
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Application Documents',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'funcPrevGridApplicationDocuments'
                }, {
                    text: 'Print Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Print Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Information',
                    winWidth: '40%',
                    handler: 'printpreviewProductInformation'
                }
                ]
            }
        }
    }]
});