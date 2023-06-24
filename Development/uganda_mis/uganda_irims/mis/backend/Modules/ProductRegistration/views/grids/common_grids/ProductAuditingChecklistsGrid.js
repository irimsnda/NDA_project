/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductAuditingChecklistsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ChecklistResponsesCmnGrid',
    xtype: 'productauditingchecklistsGrid',
    upload_tab: 'productauditingchecklistsGrid',
    document_type_id: 8,
    table_name: 'tra_product_applications',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid');
            grid.fireEvent('refresh', grid);
        }
    }],

    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }],
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
    selType: 'cellmodel',
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'cellediting',
        clicksToEdit: 1
    }],
    export_title: 'Checklist',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: '=> {[values.rows[0].data.checklist_type]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    storeConfig: {
        config: {
            pageSize: 100,
            storeId: 'checklistresponsescmnstr',
            groupField: 'checklist_type_id',
            proxy: {
                url: 'workflow/getProcessApplicableChecklistItems'
            }
        },
        isLoad: true
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Detail',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        tdCls:'wrap-text',
        text: 'Evaluator Comments',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'observation',tdCls:'wrap-text',
        text: 'Evaluator Observation',
        flex: 1
    },{
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
            listeners: {
                //change: 'saveApplicationScreeningDetails'
            }
        },
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = '';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            }
            return textVal;
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'auditor_comment',
        text: 'Auditors Comment',
        flex: 1,tdCls:'wrap-text',
        editor: {
            xtype: 'textfield'
        }
    },  {
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
    }] , tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly'
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
        bind: {
            hidden: '{isReadOnly}'  // negated
        },
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
});
