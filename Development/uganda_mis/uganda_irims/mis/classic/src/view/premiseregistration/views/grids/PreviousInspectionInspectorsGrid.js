/**
 * Created by softclans
 */
Ext.define('Admin.view.premiseregistration.views.grids.PreviousInspectionInspectorsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'previousinspectioninspectorsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 150,
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
        xtype: 'hiddenfield',
        name: 'inspection_id'
    }],
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
                storeId: 'previousinspectioninspectorsgridstr',
                proxy: {
                    url: 'premiseregistration/getInspectionInspectors'
                }
            },
            isLoad: true
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
    }]
});
