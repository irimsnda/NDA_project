/**
 * Created by Softclans on 5/21/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.ApplicationWithdrawalReasonsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationwithdrawalreasonsgrid',
    controller: 'commoninterfacesVctr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    config: {
        isWin: 0
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
    },{
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'button',
        text: 'Add Reason',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_reason',
        winTitle: 'Withdrawal Reason',
        childXtype: 'applicationwithdrawalreasonsfrm',
        winWidth: '35%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Withdrawal Reasons',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'applicationwithdrawalreasonsstr',
                proxy: {
                    url: 'api/getApplicationWithdrawalReasons'
                }
            },
            isLoad: true
        }
    },
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'reason',
                text: 'Reason',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'reason_for_withdrawal',
                text: 'Remark',
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
                            text: 'Edit Reason',
                            iconCls: 'x-fa fa-edit',
                            tooltip: 'Edit Record',
                            action: 'edit',
                            winTitle: 'Withdrawal Reason',
                            childXtype: 'applicationwithdrawalreasonsfrm',
                            winTitle: 'Query',
                            winWidth: '35%',
                            handler: 'showEditCommonParamParamWinFrm',
                            stores: '[]'
                          }, {
                            text: 'Delete ',
                            iconCls: 'x-fa fa-trash',
                            tooltip: 'Delete Record',
                            table_name: 'tra_application_withdrawaldetails',
                            storeID: 'applicationwithdrawalreasonsstr',
                            action_url: 'api/deleteCommonRecord',
                            action: 'actual_delete',
                            handler: 'doDeleteCommonParamWidgetParam',
                           
                          } ]
                    }
                }
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
