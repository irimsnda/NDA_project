Ext.define('Admin.view.parameters.views.grids.locations.DistrictsGrid', {
    extend: 'Admin.view.parameters.views.grids.locations.LocationsGrid',
    alias: 'widget.districtsgrid',

    title: 'Districts',
    itemId: 'districtsgrid',
    store: 'districtsstr',
    tbar: [{
        xtype: "button",
        text: "Add District",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'districtfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm',
    }, {
        xtype: "button",
        text: "Merge Districts",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        mergeGrid: 'districtsmergegrid',
        form: 'districtmergefrm',
        ui: 'soft-green',
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'districtsstr',
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
            me.columns[4].hidden = false;
            me.columns[5].hidden = false;
            me.columns[me.columns.length - 1].widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                form: 'districtfrm',
                action: 'edit',
                action_url: 'parameters/district',
                entity: 'districts',
                store: 'districtsstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_url: 'parameters/district',
                action_type: 'enable',
                entity: 'districts',
                store: 'districtsstr',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_url: 'parameters/district',
                action_type: 'soft',
                store: 'districtsstr',
                entity: 'districts',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'districtfrm',
                action: 'delete',
                action_type: 'actual',
                action_url: 'parameters/district',
                store: 'districtsstr',
                entity: 'districts',
                handler: 'doDeleteParameter'
            }]
        }

    },
});