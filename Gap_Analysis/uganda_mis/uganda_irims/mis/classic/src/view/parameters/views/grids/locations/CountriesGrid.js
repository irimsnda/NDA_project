Ext.define('Admin.view.parameters.views.grids.locations.CountriesGridprev', {
    extend: 'Admin.view.parameters.views.grids.locations.LocationsGrid',
    alias: 'widget.countriesgridprev',

    title: 'Countries',
    itemId: 'countriesgrid',
    store: 'countriesstr',
    tbar: [{
        xtype: "button",
        text: "Add Country",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'countryfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm',
    },{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge Countries",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        mergeGrid: 'countriesmergegrid',
        ui: 'soft-green',
        disabled: true,
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'countriesstr',
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
                form: 'countryfrm',
                action: 'edit',
                action_url: 'parameters/country',
                entity: 'countries',
                store: 'countriesstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                form: 'countryfrm',
                action: 'enable',
                action_url: 'parameters/country',
                action_type: 'enable',
                store: 'countriesstr',
                entity: 'countries',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'countryfrm',
                action: 'delete',
                action_url: 'parameters/country',
                action_type: 'soft',
                store: 'countriesstr',
                entity: 'countries',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete (actual)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'countryfrm',
                action: 'delete',
                action_url: 'parameters/country',
                action_type: 'actual',
                store: 'countriesstr',
                entity: 'countries',
                handler: 'doDeleteParameter'
            }]
        }

    },
});