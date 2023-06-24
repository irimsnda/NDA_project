/**
 * Created by softclans
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremiseProprietorsDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premiseproprietorsdetailsgrid',
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
        name: 'is_temporal'
    },{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'button',
        text: 'Add Proprietor/Director',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_proprietor',
        winTitle: 'Premise Proprietor/Director Details',
        childXtype: 'premiseproprietorsfrm',
        winWidth: '65%',
        storeID: 'premiseproprietorsdetailsstr',
        action_url: 'configurations/saveConfigCommonData',//'premiseregistration/savePremiseProprietorLinkageDetails',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Premise Proprietor(s)/Director(S)',
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
                storeId: 'premiseproprietorsdetailsstr',
                proxy: {
                    url: 'premiseregistration/getPremiseProprietorsDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=add_proprietor]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.widget.menu.items = [{
                    text: 'View/Edit Details',
                    iconCls: 'x-fa fa-edit',
                    winTitle: 'Premise Proprietor/Director Details',
                    childXtype: 'premiseproprietorsfrm',
                    winWidth: '65%',
                    handler: 'showEditProprietorDetails',
                    storeID: 'premiseproprietorsdetailsstr',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    action_url: 'configurations/saveConfigCommonData',
                    stores: '[]'
                }, {
                    text: 'Remove',
                    iconCls: 'x-fa fa-remove',
                    table_name: 'tra_premises_proprietors',
                    storeID: 'premiseproprietorsdetailsstr',
                    bind: {
                        disabled: '{hideDeleteButton}'
                    },
                    action_url: 'premiseregistration/deletePremiseRegRecord',
                    action: 'actual_delete',
                    handler: 'doDeletePremiseOtherDetails'
                }
                ];
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Full Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        text: 'Telephone No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Residential Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'occupation',
        text: 'Occupation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'nationality',
        text: 'Nationality',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'identification_type',
        text: 'Identification Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'identification_no',
        text: 'Identification Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gender',
        text: 'Sex',
        flex: 1
    }, {
        xtype: 'datecolumn',
        dataIndex: 'dob',
        text: 'Date of Birth',
        format: 'Y-m-d',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'had_offence',
        text: 'Had Offence',
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:gray';
                return "Yes";
            }

            metaData.tdStyle = 'color:white;background-color:green';
            return "No";
        },
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'had_license_revoke_denied',
        text: 'Had Revoke/Denied License',
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:gray';
                return "Yes";
            }

            metaData.tdStyle = 'color:white;background-color:green';
            return "No";
        },
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
