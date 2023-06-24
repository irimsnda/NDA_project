
Ext.define('Admin.view.drugshopregistration.views.grids.DrugShopOtherLicensesDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'drugshopotherlicensesdetailsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    config: {
        isWin: 0,
        isOnline: 0,
        isCompare: 0
    },
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
        text: 'Add Other  Premises',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        childXtype: 'drugshopotherlicensesdetailsfrm',
        winWidth: '65%',
        handler:'funcOtherLicenses',
        storeID: 'otherpremisesdetailsstr',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Other Premises Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
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
                storeId: 'otherpremisesdetailsstr',
                proxy: {
                    url: 'premiseregistration/getPremisePersonnelDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                //add_btn = grid.down('button[name=add_personnel]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                //add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                //add_btn.setVisible(true);
                widgetCol.widget.menu.items = [{
                    text: 'Other License(s)',
                    iconCls: 'x-fa fa-user',
                    winTitle: 'Other License(s)',
                    childXtype: 'premisesuperintendentfrm',
                    winWidth: '65%',
                    handler: 'showEditPremisePersonnelDetails',
                    storeID: 'otherpremisesdetailsstr',
                    action_url: 'premiseregistration/savePremisePersonnelLinkageDetails',
                    stores: '[]'
                }, {
                    text: 'Remove',
                    iconCls: 'x-fa fa-remove',
                    table_name: 'tra_premises_personnel',
                    storeID: 'otherpremisesdetailsstr',
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseOtherDetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ];
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Premise Name',
        width:150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        width:150
    },{ xtype: 'gridcolumn',
        dataIndex: 'approval_date',
        text: 'Approval Date',
        width:150
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry Date',
        width:150
        
    },
    {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        hidden:true,
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
        }, onWidgetAttach: function (col, widget, rec) {
            var temporal = rec.get('is_temporal'),
                grid = widget.up('grid'),
                is_temporal = grid.down('hiddenfield[name=is_temporal]').getValue();
            if ((temporal === 0 || temporal == 0) && (is_temporal == 1 || is_temporal === 1)) {
                if (widget.down('menu menuitem[action=actual_delete]')) {
                    widget.down('menu menuitem[action=actual_delete]').setDisabled(true);
                }
            } else {
                if (widget.down('menu menuitem[action=actual_delete]')) {
                    widget.down('menu menuitem[action=actual_delete]').setDisabled(false);
                }
            }
        }
    }]
});
