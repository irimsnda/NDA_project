/**
 * Created by sotclans.
 */
Ext.define('Admin.view.commoninterfaces.grids.ReInspectionsRequestsItemsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'reinspectionsrequestsitemsgrid',
    itemId:'checklistItemsQueriesGrid',
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
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 100,
                storeId: 'reinspectionsrequestsitemsgridstr',
               
                proxy: {
                    url: 'api/getreinspectionsrequestsitems'
                }
            },
            isLoad: true
        }
    },
    
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        hidden: true,
        text: 'Checklist Item/Category',
        tdCls: 'wrap-text', 
        flex: 1
    }, {
        xtype: 'gridcolumn', 
        tdCls: 'wrap-text',   
        dataIndex: 'query',
        text: 'Query/Observations', 
        tdcls: 'editor-text',
        flex: 1
    }, {
        xtype: 'gridcolumn', 
        tdCls: 'wrap-text',   
        dataIndex: 'query_response',
        text: 'Query/CAPA Response', 
        tdcls: 'editor-text',
        flex: 1
        
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    handler: 'onEditREinspectionQuery',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                      table_name: 'reinspectiontitems_queries',
                    handler: 'onDeleteApplicationQueries',
                    stores: '[]'
                }
                ]
            }
        }
    }],
    tbar:[{
           text:'Add (Finding)Item',
            ui: 'soft-green',
            iconCls: 'x-fa fa-plus',
            margin:5,
            storeID: 'reinspectionsrequestsitemsgridstr',
            handler: 'showAddReInspectionchecklistitemsfrm',
    }],
    bbar: [{
        xtype: 'button',
        text: 'Back',
        ui: 'soft-green',
        iconCls: 'x-fa fa-backward',
        nextStep: 0,
        handler: 'navigateQueryWizard'
    },{
        xtype: 'pagingtoolbar',
        width: '60%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                store= grid.getStore(),
                // pnl = grid.up('panel'),
                panel = grid.up('panel'),
                query_id = panel.down('hiddenfield[name=query_id]').getValue();
                store.removeAll();
                store.getProxy().extraParams = {
                        query_id: query_id,
                        pass_status: 2
                };
        }
    },'->',
    {
        xtype: 'button',
        text: 'Next',
        ui: 'soft-green',
        iconCls: 'x-fa fa-forward',
        nextStep: 2,
        handler: 'navigateQueryWizard'
    }]
});
