/**
 * Created by Kip on 11/2/2018. 
 */
Ext.define('Admin.view.premiseregistration.views.grids.new.ChecklistResponsesGenericGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'checklistresponsesgenericgrid',
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
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 100,
                storeId: 'foodpremscreeningstr',
                proxy: {
                    url: 'workflow/getProcessApplicableChecklistItems'
                }
            },
            isLoad: false
        }
    },
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'comment',
        text: 'Comment',
        flex: 1,
        editor: {
            xtype: 'textfield'
        }
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
            isAuditor: 2,
            listeners: {
                beforerender: function (widgetColumn) {
                    widgetColumn.setText(widgetColumn.text);
                    /* var record=widgetColumn.getWidgetRecord(),
                         item_resp_id=record.get('item_resp_id');
                      if(item_resp_id){
                          widgetColumn.setDisabled(false);
                      }*/
                }
            }
        }
    }]
});
