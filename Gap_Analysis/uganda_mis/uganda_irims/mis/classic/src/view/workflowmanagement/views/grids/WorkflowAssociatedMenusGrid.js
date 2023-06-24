/**
 * Created by Kip on 10/9/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.WorkflowAssociatedMenusGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'workflowassociatedmenusgrid',
    cls: 'dashboard-todo-list',
    header: false,
    frame: true,
    height: 450,
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
    },{
        xtype: 'displayfield',
        name: 'workflow_display',
        fieldStyle: {
            'color':'green'
        }
    },{
        xtype: 'hiddenfield',
        name: 'workflow_id'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Workflow associated menus',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            var store=this.store,
                grid=this.up('grid'),
                workflow_id=grid.down('hiddenfield[name=workflow_id]').getValue();
            store.getProxy().extraParams={
                workflow_id:workflow_id
            };
        }
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
                storeId: 'workflowassociatedmenusstr',
                proxy: {
                    url: 'workflow/getWorkflowAssociatedMenus'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Menu',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'viewType',
        text: 'ViewType',
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
                    text: 'Unlink',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'wf_menu_workflows',
                    storeID: 'workflowassociatedmenusstr',
                    action_url: 'workflow/deleteWorkflowRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteWorkflowWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
