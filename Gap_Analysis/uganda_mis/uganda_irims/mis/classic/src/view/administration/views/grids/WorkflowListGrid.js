Ext.define('Admin.view.administration.views.grids.WorkflowListGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'workflowlistgrid',
    cls: 'dashboard-todo-list',
    header: false,
    controller: 'administrationvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    autoHeight: true,
    width: '50%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'group_id'
    },{
        xtype: 'combo',
        fieldLabel: 'Module',
        margin: '0 20 20 0',
        name: 'module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setAdminCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'modules'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                this.up('grid').getStore().reload();
            },
           
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var store = this.getStore(),
                grid = this.up('grid'),
                module_id = grid.down('combo[name=module_id]').getValue(),
                tabPnl = grid.up('tabpanel'),
                group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue();
           
            store.getProxy().extraParams = {
                    module_id:module_id,
                    group_id:group_id,
                    caller: 1
                }      
        },
    }],

    selModel:{
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype:'grouping',
        startCollapsed: true
    }],
    listeners: {
        beforerender: {
            fn: 'setAdminGridsStore',
            config: {
                pageSize: 100,
                storeId: 'workflowliststr',
                proxy: {
                    url: 'workflow/getGroupMappedWorkflowStages'
                    
                }
            },
            isLoad: true
        },
        select: function(sel, record, index, eOpts) {
            var grid = this,
                panel = grid.up('panel'),
                tabPnl = panel.up('tabpanel'),
                workflow_id = record.get('workflow_id'),
                group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue(),
                stage_grid = Ext.ComponentQuery.query("#syncworkflowstagesgridRef")[0],
                store = stage_grid.getStore();

                stage_grid.down('hiddenfield[name=workflow_id]').setValue(workflow_id);
                stage_grid.down('hiddenfield[name=group_id]').setValue(group_id);

            store.load({params:{'workflow_id':workflow_id,'group_id':group_id}});
    
         }
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'workflow_id',
        hidden: true,
        text: 'workflow_id',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'workflow_name',
        text: 'Workflow',
        flex: 1,
    }]
});
