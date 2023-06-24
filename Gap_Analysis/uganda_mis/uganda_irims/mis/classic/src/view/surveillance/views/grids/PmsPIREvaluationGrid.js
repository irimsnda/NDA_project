/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PmsPIREvaluationGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ChecklistResponsesCmnGrid',
    xtype: 'pmspirevaluationgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
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
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 5
    },{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'combo',
        fieldLabel: 'Applicable Checklist',
        labelWidth: 145,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'applicable_checklist',
        queryMode: 'local',
        width: 450,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getProcessApplicableChecklistTypes'
                    }
                },
                isLoad: false
            },
            change: function () {
                var grid = this.up('grid'),
                    store = grid.getStore();
                store.load();
            }
        },
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        },
        labelStyle: "font-weight:bold"
    }], columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Detail',
        tdcls: 'wrap-text',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pass_status',
        text: 'Pass Status',
        align: 'center',        
        tdcls: 'editor-text',
        width: 120,
        editor: {
            xtype: 'combo',
            store: 'confirmationstr',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                //change: 'saveApplicationScreeningDetails'
            }
        },
        filter: {
            xtype: 'combo',
            store: 'confirmationstr',
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name'
        },
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = 'Select Status';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            }
            return textVal;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'observation',
        text: 'Observations',
        hidden:true,
        flex: 1,
        tdcls: 'wrap-text',
        editor: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Comment', tdcls: 'editor-text',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid=this.up('grid');
            grid.fireEvent('refresh', grid);
        }
    },'->',{
        xtype: 'button',
        text: 'Save/Update Checklist Details',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-save',
        name: 'save_btn'
    }]
});

