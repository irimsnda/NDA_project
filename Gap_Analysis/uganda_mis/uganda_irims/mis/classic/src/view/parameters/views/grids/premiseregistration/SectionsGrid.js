Ext.define('Admin.view.parameters.views.grids.premiseregistration.SectionsGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersGrid',
    alias: 'widget.sectionsgrid',
    title: 'Sections',
    itemId: 'sectionsgrid',
    store: 'sectionsstr',
    tbar: [{
        xtype: "button",
        text: "Add Section",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'sectionfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    },{
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'sectionsstr',
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
                form: 'sectionfrm',
                action: 'edit',
                action_url: 'premiseregistration/parameters/section',
                entity: 'sections',
                store: 'sectionsstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_url: 'premiseregistration/parameters/section',
                action_type: 'enable',
                entity: 'sections',
                store: 'sectionsstr',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_url: 'premiseregistration/parameters/section',
                action_type: 'soft',
                store: 'sectionsstr',
                entity: 'regions',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'sectionfrm',
                action: 'delete',
                action_url: 'premiseregistration/parameters/section',
                action_type: 'actual',
                store: 'sectionsstr',
                entity: 'sections',
                handler: 'doDeleteParameter'
            }]
        }

    },
});