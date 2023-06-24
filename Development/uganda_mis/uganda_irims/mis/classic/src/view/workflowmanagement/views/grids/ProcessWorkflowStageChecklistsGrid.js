/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.ProcessWorkflowStageChecklistsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'processworkflowstagechecklistsgrid',
    cls: 'dashboard-todo-list',
    title: 'Applicable Checklist Categories',
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
    export_title: 'Process applicable checklists',
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
                panel = grid.up('processchecklistconfigpnl'),
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
                panel = grid.up('processchecklistconfigpnl'),
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
                    url: 'workflow/getProcessApplicableChecklistCategories'
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
                    if (record.data.applicable_checklist) {
                        sm.select(rowIndex, true);
                    }
                });
            });

            /*
                        grid.getStore().load({
                                scope: this,
                                callback: function (records, operation, success) {

                                    /!*var store = grid.getStore();
                                    var records = [];
                                    store.queryBy(function(record,id){

                                        if(record.data.chkd){
                                                records.push(record);
                                            }

                                        console.log(id);

                                    },this);

                                    grid.getSelectionModel().select(records,false,false);
                                    *!/
                                    var rowIndex = this.find('id', records.getId());
                                    alert(rowIndex);
                                    Ext.each(records, function (record) {
                                        if (record.data.id) {
                                            var row = record.index;
                                            sm.select(record, true);
                                        }
                                    });
                                }
                            }
                        );
            */

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
