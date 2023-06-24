/**
 * Created by Kip on 10/9/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.WorkflowStageResponsibleGroupsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'workflowstageresponsiblegroupsgrid',
    cls: 'dashboard-todo-list',
    header: false,
    frame: true,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    height: Ext.Element.getViewportHeight() - 280,
    tbar: [{
        xtype: 'combo',
        emptyText: 'Directorate',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        name: 'directorate_id',
        width: 200,
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'Directorate'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmb, newVal) {
                var grid = cmb.up('grid'),
                    store = grid.getStore(),
                    departmentsStore = grid.down('combo[name=department_id]').getStore();
                departmentsStore.removeAll();
                departmentsStore.load({params: {directorate_id: newVal}});
                store.load();
            }
        }
    }, {
        xtype: 'combo',
        emptyText: 'Department',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        width: 200,
        name: 'department_id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        url: 'organisationconfig/getDepartments',
                        extraParams: {
                            model_name: 'Department'
                        }
                    }
                },
                isLoad: false
            },
            change: function (cmb) {
                var grid = cmb.up('grid'),
                    store = grid.getStore();
                store.load();
            }
        }
    }, {
        xtype: 'combo',
        emptyText: 'Zone',
        forceSelection: true,
        width: 180,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        name: 'zone_id',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                        extraParams: {
                            model_name: 'Zone'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmb) {
                var grid = cmb.up('grid'),
                    store = grid.getStore();
                store.load();
            }
        }
    }],
    selModel: {
        selType: 'checkboxmodel'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        doRefresh: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
        },
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                tabPnl = grid.up('tabpanel'),
                form = tabPnl.down('workflowstagesfrm'),
                workflow_id=form.down('hiddenfield[name=workflow_id]').getValue(),
                stage_id = form.down('hiddenfield[name=id]').getValue(),
                directorate_id = grid.down('combo[name=directorate_id]').getValue(),
                department_id = grid.down('combo[name=department_id]').getValue(),
                zone_id = grid.down('combo[name=zone_id]').getValue();
            store.getProxy().extraParams = {
                workflow_id:workflow_id,
                stage_id: stage_id,
                directorate_id: directorate_id,
                department_id: department_id,
                zone_id: zone_id
            };
        }
    }, '->', {
        xtype: 'button',
        text: 'Sync Changes',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-save',
        handler: 'syncWorkflowStageResponsibleGroups'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 100,
                storeId: 'workflowstageresponsiblegroupsstr',
                proxy: {
                    url: 'workflow/getWorkflowStagePossibleResponsibleGroups',
                    extraParams: {
                        model_name: 'WorkflowAction'
                    }
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.stage_group_id) {
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
