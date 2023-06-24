Ext.define('Admin.view.administration.views.grids.ApplicationAssignmentGroupListGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationassignmentgrouplistgrid',
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
    
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
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
                storeId: 'applicationassignmentgrouplistStr',
                proxy: {
                    url: 'administration/getSystemUserGroups',
                    
                }
            },
            isLoad: true
        },
        select: function(sel, record, index, eOpts) {
            var grid = this,
                panel = grid.up('panel'),
                tabPnl = panel.up('tabpanel'),
                group_id = record.get('id'),
                process_grid = Ext.ComponentQuery.query("#applicationassignmentprocesslistid")[0],
                store = process_grid.getStore();

                process_grid.down('hiddenfield[name=group_id]').setValue(group_id);

            store.load({params:{'group_id':group_id}});
    
         }
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'id',
        hidden: true,
        text: 'group_id',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Group',
        flex: 1,
    }]
});
