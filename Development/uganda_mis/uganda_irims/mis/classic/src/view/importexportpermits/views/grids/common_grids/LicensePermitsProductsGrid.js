/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.LicensePermitsProductsGrid', {
    extend: 'Admin.view.importexportpermits.views.grids.common_grids.abstract.PermitsProductsAbstractGrid',
    controller: 'importexportpermitsvctr',
    xtype: 'licensepermitsproductsgrid',
    itemId: 'importexportpermitsproductsgrid',
    
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
               // return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Permit Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'importexportpermitsproductspnl',
        winTitle: 'Add Permit Products Details',
        winWidth: '40%',
        hidden: true,
        handler: 'showAddImpPermitProductsWinFrm',
        stores: '[]',
        bind: {
         //   hidden: '{isReadOnly}'  // negated
        }
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly',
        bind: {
            value: '{isReadOnly}'  // negated
        }
    }],

    export_title: 'Impor/Export Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('licensepermitsproductsgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    selType: 'cellmodel',
                plugins: [{
                    ptype: 'gridexporter'
                }, {
                    ptype: 'cellediting',
                    clicksToEdit: 3,
                    editing: false
                },{
                    ptype: 'filterfield'
                }],
    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'importexportpermitsproductsstr',
                    proxy: {
                        url: 'importexportpermits/getImportexportpermitsproductsDetails',
                        
                    }
            },
            isLoad: true
        }
    },
    columns: [{
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
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    childXtype: 'licensepermitsproductsfrm',
                    winTitle: 'Import/Export Permit Products details',
                    winWidth: '80%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_permits_products',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    storeID: 'importexportpermitsproductsstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
