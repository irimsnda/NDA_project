Ext.define('Admin.view.parameters.views.grids.locations.RegionsGrid', {
    extend: 'Admin.view.parameters.views.grids.locations.LocationsGrid',
    alias: 'widget.regionsgrid',

    title: 'Regions',
    itemId: 'regionsgrid',
    store: 'regionsstr',
    tbar: [{
        xtype: "button",
        text: "Add Region",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'regionfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm',
    },{
        xtype: "button",
        text: "Merge Regions",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        form: 'regionmergefrm',
        mergeGrid: 'regionsmergegrid',
        ui: 'soft-green',
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'regionsstr',
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
            me.columns[5].hidden = false;
            me.columns[me.columns.length - 1].widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                form: 'regionfrm',
                action: 'edit',
                action_url: 'parameters/region',
                entity: 'regions',
                store: 'regionsstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_url: 'parameters/region',
                action_type: 'enable',
                entity: 'regions',
                store: 'regionsstr',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_url: 'parameters/region',
                action_type: 'soft',
                store: 'regionsstr',
                entity: 'regions',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete (actual)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'regionfrm',
                action: 'delete',
                action_url: 'parameters/region',
                action_type: 'actual',
                store: 'regionsstr',
                entity: 'regions',
                handler: 'doDeleteParameter'
            }];
        }

    },
});