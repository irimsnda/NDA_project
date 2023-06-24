/**
 * Created by softclans.
 */
Ext.define('Admin.view.commoninterfaces.grids.ChecklistRevisionsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'checklistRevisionsGrid',
    controller: 'commoninterfacesVctr',
    autoScroll: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
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
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }],
    plugins: [{
        ptype: 'gridexporter'
    }],
    features: [{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: '=> {[values.rows[0].data.captured_by]} ({[values.rows[0].data.submission_date]})',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'checklistRevisionsGridStr',
                groupField: 'submission_id',
                proxy: {
                    url: 'workflow/getChecklistRevisionLogs'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
        text: 'S/N'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Detail',
        width: 200,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pass_status',
        text: 'Pass Status',
        align: 'center',
        flex: 1,
        renderer: function (value, metaData) {
            if (value == 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Yes";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'observation',
        text: 'Observations',
        tdCls: 'wrap',
        width: 200,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Comment',
        tdCls: 'wrap',
        width: 200,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'created_on',
        text: 'Captured On',
        format: 'Y-m-d',
        tdCls: 'wrap',
        width: 150,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'captured_by',
        text: 'Captured By',
        tdCls: 'wrap',
        width: 150,
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                workflow_stage_id = grid.down('hiddenfield[name=workflow_stage_id]').getValue(),
                is_auditor_checklist = grid.is_auditor_checklist,
                application_code = grid.down('hiddenfield[name=application_code]').getValue();

            store.getProxy().extraParams = {
                workflow_stage_id: workflow_stage_id,
                application_code: application_code,
                is_auditor: is_auditor_checklist
            };
        }
    }]
});
