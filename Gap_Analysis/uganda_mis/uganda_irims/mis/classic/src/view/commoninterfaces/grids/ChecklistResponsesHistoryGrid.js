/**
 * Created by Softclans on 7/14/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.ChecklistResponsesHistoryGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'checklistresponseshistorygrid',
    controller: 'commoninterfacesVctr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    frame: true,
    height: 550,
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
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly',
            value: 1
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                application_code = grid.down('hiddenfield[name=application_code]').getValue(),
                workflow_stage_id = grid.down('hiddenfield[name=workflow_stage_id]').getValue();
            store.getProxy().extraParams = {
                application_code: application_code,
                workflow_stage_id: workflow_stage_id
            };
        }
    }],
    selType: 'cellmodel',
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'cellediting',
        clicksToEdit: 1
    }, {
        ptype: 'filterfield'
    }],
    export_title: 'Checklist',
    features: [/*{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, */{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: '=> {[values.rows[0].data.checklist_ref]} ({[values.rows[0].data.submitted_by]},{[values.rows[0].data.submission_date]})',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'checklist_ref_id',
                storeId: 'checklistresponseshistorystr',
                proxy: {
                    url: 'workflow/getApplicableChecklistItemsHistory'
                }
            },
            isLoad: true
        },
    },

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Detail',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'order_no',
        text: 'Order No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pass_status',
        text: 'Pass Status',
        align: 'center',
        width: 120,
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            if (val == 1 || val === 1) {
                return 'YES';
            } else {
                return 'NO';
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'observation',
        text: 'Observations',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Comment',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'created_on',
        text: 'Captured On',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'captured_by',
        text: 'Captured By',
        flex: 1
    }, {
        text: 'Queries',
        align: 'center',
        width: 120,
        stopSelection: true,
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'button',
            ui: 'gray',
            text: "Queries",
            tooltip: 'Raise Query',
            defaultBindProperty: null,
            isAuditor: 2,
            listeners: {
                beforerender: function (widgetColumn) {
                    widgetColumn.setText(widgetColumn.text);
                },
                click: function (widgetColumn) {
                    var grid = widgetColumn.up('grid');
                    grid.fireEvent('showAppQueries', grid, widgetColumn);
                }
            }
        }
    }
    ]
});
