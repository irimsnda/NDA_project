Ext.define('Admin.view.parameters.views.grids.costs.CostCentersGrid', {
    extend: 'Admin.view.parameters.views.grids.costs.CostsGrid',
    alias: 'widget.costcentersgrid',

    title: 'Cost Centers',
    itemId: 'costcentersgrid',
    store: 'costcenterstr',
    tbar: [{
        xtype: "button",
        text: "Add Cost Center",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'costcenterfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm',
    },{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge Cost Centers",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        mergeGrid: 'costcentersmergegrid',
        ui: 'soft-green',
        disabled: true,
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'costcenterstr',
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
                form: 'costcenterfrm',
                action: 'edit',
                action_url: 'parameters/costcenter',
                entity: 'costcenter',
                store: 'costcenterstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                form: 'costcenterfrm',
                action: 'enable',
                action_url: 'parameters/costcenter',
                action_type: 'enable',
                store: 'costcenterstr',
                entity: 'costcenter',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'costcenterfrm',
                action: 'delete',
                action_url: 'parameters/costcenter',
                action_type: 'soft',
                store: 'costcenterstr',
                entity: 'costcenter',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete (actual)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'costcenterfrm',
                action: 'delete',
                action_url: 'parameters/costcenter',
                action_type: 'actual',
                store: 'costcenterstr',
                entity: 'costcenter',
                handler: 'doDeleteParameter'
            }]
        }

    },
});