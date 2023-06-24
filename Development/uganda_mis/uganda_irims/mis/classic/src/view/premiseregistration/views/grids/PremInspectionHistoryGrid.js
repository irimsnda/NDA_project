/**
 * Created by softclans.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremInspectionHistoryGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'preminspectionhistorygrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 118,
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
        name: 'application_code'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        // hidden: true,
        beforeLoad: function () {
            var grid = this.up('grid'),
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                store = this.getStore();
            store.getProxy().extraParams = {
                application_code: application_code
            }
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'preminspectionhistorygridstr',
                proxy: {
                    url: 'premiseregistration/getPremiseAppInspectionHistory'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        flex: 1,
    }, {
        xtype: 'datecolumn',
        dataIndex: 'expected_start_date',
        format: 'Y-m-d',
        text: 'Expected Start Date',
        flex: 1
    }, {
        xtype: 'datecolumn',
        dataIndex: 'expected_end_date',
        format: 'Y-m-d',
        text: 'Expected End Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'assaigned_by',
        text: 'Assaigned By',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'lead_inspector',
        text: 'Assaigned Lead Inspector',
        flex: 1
    }, {
        xtype: 'datecolumn',
        dataIndex: 'actual_start_date',
        format: 'Y-m-d',
        text: 'Actual Start Date',
        flex: 1
    }, {
        xtype: 'datecolumn',
        dataIndex: 'actual_end_date',
        format: 'Y-m-d',
        text: 'Actual End Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'recommendation',
        text: 'Inspector Recommendation',
        flex: 1
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'button',
            iconCls: 'x-fa fa-eye',
            ui: 'soft-green',
            winWidth: '40%',
            text: 'View other inspectors',
            handler: 'viewInspectors'
        }
    }]
});
