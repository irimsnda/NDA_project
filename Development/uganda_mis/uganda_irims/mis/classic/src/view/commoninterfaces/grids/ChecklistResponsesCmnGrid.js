/**
 * Created by sotclans.
 */
Ext.define('Admin.view.commoninterfaces.grids.ChecklistResponsesCmnGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'checklistresponsescmngrid',
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
        clicksToEdit: 1,
        editing: true
    },{
        ptype: 'filterfield'
    }],
    export_title: 'Checklist',
    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '=> {[values.rows[0].data.checklist_type]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    storeConfig: {
        config: {
            pageSize: 100,
            storeId: 'checklistresponsescmnstr',
            remoteFilter: true,
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
        tdCls: 'wrap-text', 
        flex: 1,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'order_no',
        hidden:true,
        text: 'Order No',
        flex: 1
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'pass_status',
        text: 'Pass Status',
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
               
            }
        },
        
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = 'Select Status';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            }
            return textVal;
        }
    }, {
        xtype: 'gridcolumn', tdCls: 'wrap-text',   
        dataIndex: 'comment',
        text: 'Comment', tdcls: 'editor-text',
        flex: 1,
        editor: {
            xtype: 'textarea'
        }
    }, {
        xtype: 'gridcolumn', tdCls: 'wrap-text',   
        dataIndex: 'screened_by',
        text: 'Screened By', tdcls: 'editor-text',
        flex: 0.3
        
    }],
    
});
