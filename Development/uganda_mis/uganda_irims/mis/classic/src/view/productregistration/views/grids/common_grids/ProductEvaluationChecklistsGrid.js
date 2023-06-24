/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductEvaluationChecklistsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.ChecklistResponsesCmnGrid',
    xtype: 'productevaluationchecklistsGrid',
    upload_tab: 'productevaluationchecklistsGrid',
    document_type_id: 8,
    table_name: 'tra_product_applications',
    viewModel: {
        type: 'productregistrationvm'
    },
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
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Detail',
        tdCls: 'wrap-text', cellWrap: true,
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'order_no',
        hidden:true,cellWrap: true,
        text: 'Order No',
        flex: 1
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'pass_status',
        text: 'Pass Status',cellWrap: true,
        align: 'center',     tdCls: 'wrap-text',   
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
        flex: 1, tdCls: 'wrap-text',   
        tdcls: 'wrap-text',cellWrap: true,
        editor: {
            xtype: 'textarea'
        }
    }, {
        xtype: 'gridcolumn', tdCls: 'wrap-text',   
        dataIndex: 'comment',
        text: 'Comment', tdcls: 'editor-text',
        flex: 1,cellWrap: true,
		hidden: true,
        editor: {
            xtype: 'textarea'
        }
    }, {
        text: 'Raise Queries/Responses',
        align: 'center',
        flex:0.5,cellWrap: true,
        stopSelection: true,
        xtype: 'widgetcolumn',
        widget: {
            xtype: 'button',
            ui: 'gray',
            text: "Raise Query/View Query Response",
            tooltip: 'Raise Query/View Query Response',
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
    }]
});
