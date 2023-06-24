/**
 * Created by Kip on 2/7/2019.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.ProcessWorkflowStageDocumentsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'processworkflowstagedocumentsgrid',
    cls: 'dashboard-todo-list',
    title: 'Applicable Document Types',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 196,
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
    requires: [
        'Ext.grid.*'
    ],
    tbar: [{
        xtype: 'exportbtn'
    }],
    export_title: 'Process applicable document types',
    selModel: {
        selType: 'checkboxmodel'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        doRefresh: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                panel = grid.up('processdocumentsconfigpnl'),
                stage_id = panel.down('hiddenfield[name=stage_id]').getValue();
            if (!stage_id) {
                toastr.warning('No stage selected!!', 'Warning Response');
                return false;
            } else {
                store.removeAll();
                store.load();
            }
        },
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                panel = grid.up('processdocumentsconfigpnl'),
                process_id = panel.down('hiddenfield[name=process_id]').getValue(),
                stage_id = panel.down('hiddenfield[name=stage_id]').getValue();
            store.getProxy().extraParams = {
                process_id: process_id,
                workflow_stage: stage_id
            };
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'processworkflowstagechecklistsstr',
                proxy: {
                    url: 'workflow/getProcessApplicableDocumentTypes'
                }
            },
            isLoad: false
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.applicable_doctype) {
                        sm.select(rowIndex, true);
                    }
                });
            });
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }]
});
