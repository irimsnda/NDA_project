/**
 * Created by Kip on 10/19/2018.
 */
Ext.define('Admin.view.disposalpermits.views.grids.DisposalDestSupervisorsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'disposalpermitsvctr',
    xtype: 'disposaldestsupervisorsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    listeners: {
        beforerender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'disposaldestsupervisorsstr',
               groupField:'sub_module',
                proxy: {
                    url: 'importexportpermits/getDisposalInspectors'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                isReadOnly = grid.down('hiddenfield[name=isReadOnly]').getValue(),
                add_btn = grid.down('button[name=addsupervisor]'),
                widgetCol = grid.columns[grid.columns.length - 1];
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                add_btn.setVisible(false);
                widgetCol.setHidden(true);
                widgetCol.widget.menu.items = [];
            } else {
                add_btn.setVisible(true);
                widgetCol.setHidden(false);
                widgetCol.widget.menu.items = [
                    {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_disposal_inspectors',
                        storeID: 'disposaldestsupervisorsstr',
                        action_url: 'importexportpermits/deleteDisposalInspectors',
                        action: 'actual_delete',
                        handler: 'doDeletePermitOtherdetails',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }
                ];
            }
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [{
                        xtype: 'pagingtoolbar',
                        width: '100%',
                        displayInfo: true,
                        displayMsg: 'Showing {0} - {1} of {2} total records',
                        emptyMsg: 'No Records',
                        beforeLoad: function () {
                            this.up('disposaldestsupervisorsgrid').fireEvent('refresh', this);
                        }
                    }
            ]
        }
    ],

    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inspector_name',
        text: 'Inspector Name',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'title',
        text: 'Inspector Title',
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
                items: [{
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_disposal_inspectors',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    storeID: 'disposaldestsupervisorsstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
