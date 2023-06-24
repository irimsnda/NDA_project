Ext.define('Admin.view.parameters.views.grids.ElementsCostGrid', {
    extend: 'Admin.view.parameters.views.grids.CostElementGrid',
    alias: 'widget.elementscostgrid',
    title: 'ElementCost',
    itemId: 'elementscost',
    store: 'elementscoststr',
    tbar: [{
        xtype: "button",
        text: "Add ElementCost",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'elementscostfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    },  {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'elementscoststr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    listeners:{
        beforerender:function(me){
            me.store.removeAll();
            me.store.clearFilter();
            me.store.proxy.extraParams = {all: 1};
            me.store.load();
            me.columns[me.columns.length - 1].widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                form: 'elementscostfrm',
                action: 'edit',
                action_url: 'parameters/elementscost',
                entity: 'elementscost',
                store: 'elementscoststr',
                handler: 'doCostElementEdit'
            },
            {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                table_name: 'element_costs',
                storeID: 'elementscoststr',
                action: 'actual_delete',
                action_url: 'configurations/deleteConfigRecord',
                handler: 'doDeleteConfigWidgetParam',
                hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                
            }];
        }

    }
});