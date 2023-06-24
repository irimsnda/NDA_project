/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.drugs.DrugsMaximumResidueLimitsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productregistrationvctr',
    xtype: 'drugsMaximumResidueLimitsGrid',
    itemId: 'drugsMaximumResidueLimitsGrid',
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
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'drugsMaximumResidueLimitsFrm',
        winTitle: 'Maximum Residue Limits (MRLs)',
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
    export_title: 'Maximum Residue Limits (MRLs)',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            
            this.up('drugsMaximumResidueLimitsGrid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'target_species',
        text: 'Target Species',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tissue',
        text: 'Tissue',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'maximum_residue_limits',
        text: 'MRLs',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference',
        text: 'Reference (Codex, EU,…) ',
        flex: 1,
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
                    tooltip: 'Edit Record',
                    action: 'edit',
                    childXtype: 'drugsMaximumResidueLimitsFrm',
        winTitle: 'Maximum Residue Limits (MRLs)',
                    winWidth: '40%',
                    /*  bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    */
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                   
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_product_packaging',
                    storeID: 'drugproductPackagingdetailsstr',
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    /*  bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    */
                    handler: 'doDeleteProductOtherdetails',
                   
                }]
            }
        }
    }]
});
