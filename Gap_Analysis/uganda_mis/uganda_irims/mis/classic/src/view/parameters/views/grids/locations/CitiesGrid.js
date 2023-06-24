Ext.define('Admin.view.parameters.views.grids.locations.CitiesGrid', {
    extend: 'Admin.view.parameters.views.grids.locations.LocationsGrid',
    alias: 'widget.citiesgrid',

    title: 'Cities',
    itemId: 'citiesgrid',
    store: 'citiesstr',
    tbar: [{
        xtype: "button",
        text: "Add City",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'cityfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm',
    }, {
        xtype: "button",
        text: "Merge Cities",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        mergeGrid: 'citiesmergegrid',
        form: 'citymergefrm',
        ui: 'soft-green',
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'citiesstr',
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
            me.columns[3].hidden = false;
            me.columns[4].hidden = false;
            me.columns[5].hidden = false;
            me.columns[me.columns.length - 1].widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                form: 'cityfrm',
                action: 'edit',
                action_url: 'parameters/city',
                entity: 'cities',
                store: 'citiesstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_url: 'parameters/city',
                action_type: 'enable',
                entity: 'cities',
                store: 'citiesstr',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_url: 'parameters/city',
                action_type: 'soft',
                store: 'citiesstr',
                entity: 'regions',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'cityfrm',
                action: 'delete',
                action_url: 'parameters/city',
                store: 'citiesstr',
                action_type: 'actual',
                entity: 'cities',
                handler: 'doDeleteParameter'
            }]
        }

    },
});