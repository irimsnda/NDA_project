/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.new.FoodPremAuditingCheckGrid', {
    extend: 'Admin.view.premiseregistration.views.grids.new.FoodPremScreeningGrid',
    xtype: 'foodpremauditingcheckgrid',
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'combo',
        fieldLabel: 'Applicable Checklist',
        labelWidth: 150,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'applicable_checklist',
        queryMode: 'local',
        width: 500,
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
        labelStyle: "font-weight:bold"
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Detail',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pass_status',
        text: 'Pass Status',
        align: 'center',
        width: 120,
        editor: {
            xtype: 'combo',
            store: 'confirmationstr',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            readOnly: true
        },
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = '';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            }
            return textVal;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Evaluator\'s Comment',
        flex: 1
    }, {
        text: 'Queries',
        align: 'center',
        width: 120,
        stopSelection: true,
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'button',
            //iconCls: 'x-fa fa-arrows-alt',
            ui: 'gray',
            text: "Queries",
            tooltip: 'Raise Query',
            defaultBindProperty: null,
            handler: 'showApplicationQueriesWin',
            isAuditor: 1,
            listeners: {
                beforerender: function (widgetColumn) {
                    widgetColumn.setText(widgetColumn.text);
                    var record = widgetColumn.getWidgetRecord(),
                        item_resp_id = record.get('item_resp_id');
                   /* if (item_resp_id) {
                        widgetColumn.setDisabled(false);
                    }*/
                }
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'auditor_comment',
        text: 'Auditor\'s Comment',
        flex: 1,
        hidden: true,
        editor: {
            xtype: 'textfield'
        }
    }]

});