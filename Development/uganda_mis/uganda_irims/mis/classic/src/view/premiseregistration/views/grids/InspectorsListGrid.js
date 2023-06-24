/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.InspectorsListGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'inspectorslistgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    frame: true,
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
    tbar: [
        {
            xtype: 'button',
            text: 'Add Selected',
            iconCls: 'x-fa fa-check',
            ui: 'soft-green',
            name: 'add_selected',
            disabled: true,
            handler: 'addInspectionInspectors'
        },
        {
            xtype: 'hiddenfield',
            name: 'inspection_id'
        }
    ],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'multi'
    },
    export_title: 'Inspectors',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                inspection_id = grid.down('hiddenfield[name=inspection_id]').getValue(),
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
                proxy: {
                    url: 'premiseregistration/getInspectorsList'
                }
            },
            isLoad: true
        },
        select: function (sel) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=add_selected]').setDisabled(false);
            }
        },
        deselect: function (sel) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=add_selected]').setDisabled(true);
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
        dataIndex: 'email_address',
        text: 'Email Address',
        flex: 1,
        tdCls: 'wrap'
    }]
});
