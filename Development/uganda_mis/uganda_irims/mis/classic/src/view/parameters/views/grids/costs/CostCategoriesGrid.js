Ext.define('Admin.view.parameters.views.grids.costs.CostCategoriesGrid', {
    extend: 'Admin.view.parameters.views.grids.costs.CostsGrid',
    alias: 'widget.costcategoriesgrid',
    title: 'Cost Categories',
    itemId: 'costcategoriesgrid',
    store: 'costcategoriesstr',
    tbar: [{
        xtype: "button",
        text: "Add Cost Category",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'costcategoryfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'costcategoriesstr',
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
            me.columns[me.columns.length - 1].widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                form: 'costcategoryfrm',
                action: 'edit',
                action_url: 'parameters/costcategory',
                entity: 'costcategories',
                store: 'costcategoriesstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_url: 'parameters/costcategory',
                action_type: 'enable',
                entity: 'costcategories',
                store: 'costcategoriesstr',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_url: 'parameters/costcategory',
                action_type: 'soft',
                store: 'costcategoriesstr',
                entity: 'regions',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'costcategoryfrm',
                action: 'delete',
                action_url: 'parameters/costcategory',
                action_type: 'actual',
                store: 'costcategoriesstr',
                entity: 'costcategories',
                handler: 'doDeleteParameter'
            }]
        }

    },
});