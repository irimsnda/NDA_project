/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.InspectionInspectorsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'inspectioninspectorsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    height: Ext.Element.getViewportHeight() - 350,
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
        xtype: 'button',
        text: 'Add Inspector',
        ui: 'soft-green',
        action: 'add_btn',
        iconCls: 'x-fa fa-plus',
        handler: 'showInspectorsList',
        childXtype: 'premiseinspectorsfrm',
        winTitle: 'Select Inspector',
        winWidth: '30%'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'tbspacer',
        width: 50
    }],
    /*selModel: {
        selType: 'checkboxmodel',
        mode: 'multi'
    },*/
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Inspectors',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                isWin = grid.getIsWin(),
                mainTabPnl = grid.up('#contentPanel'),
                pnl;
            if (isWin == 1) {
                pnl = grid.up('window');
            } else {
                pnl = mainTabPnl.getActiveTab();
                //pnl = grid.up('newpremisemanagerinspectionpanel');
            }
            var inspection_id = pnl.down('form').down('hiddenfield[name=id]').getValue(),
                store = this.getStore();
            store.getProxy().extraParams = {
                inspection_id: inspection_id
            };
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
                pageSize: 10000,
                storeId: 'inspectioninspectorsstr',
                proxy: {
                    url: 'premiseregistration/getInspectionInspectors'
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[action=add_btn]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    handler: 'showEditPremiseRegParamWinFrm',
                    stores: '[]',
                    childXtype: 'premiseinspectorsfrm',
                    winTitle: 'Update Inspector',
                    winWidth: '30%'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    handler: 'doDeletePremiseRegWidgetParam',
                    stores: '[]',
                    storeID: 'inspectioninspectorsstr',
                    table_name: 'tra_premiseinspection_inspectors',
                    action_url: 'premiseregistration/deletePremiseRegRecord'
                }
                ];
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inspector_name',
        text: 'Name',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspector_role',
        text: 'Role',
        flex: 1,
        tdCls: 'wrap'
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
        }
    }]
});
