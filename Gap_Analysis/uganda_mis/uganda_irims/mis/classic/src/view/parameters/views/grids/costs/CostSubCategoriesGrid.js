Ext.define('Admin.view.parameters.views.grids.costs.CostSubCategoriesGrid', {
    extend: 'Admin.view.parameters.views.grids.costs.SubCostsGrid',
    alias: 'widget.costsubcategoriesgrid',

    title: 'Cost Sub Categories',
    itemId: 'costsubcategoriesgrid',
    store: 'costsubcategoriesstr',
    tbar: [{
        xtype: "button",
        text: "Add Cost Sub Category",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'costsubcategoryfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm',
    },{
        xtype: "button",
        text: "Merge Cost Sub Categories",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        form: 'costsubcategoriesmergefrm',
        mergeGrid: 'costsubcategoriesmergegrid',
        ui: 'soft-green',
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'costsubcategoriesstr',
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
                form: 'costsubcategoryfrm',
                action: 'edit',
                action_url: 'parameters/costsubcategory',
                entity: 'costsubcategory',
                store: 'costsubcategoriesstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_url: 'parameters/costsubcategory',
                action_type: 'enable',
                entity: 'costsubcategory',
                store: 'costsubcategoriesstr',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_url: 'parameters/costsubcategory',
                action_type: 'soft',
                store: 'costsubcategoriesstr',
                entity: 'costsubcategory',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete (actual)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'costsubcategoryfrm',
                action: 'delete',
                action_url: 'parameters/costsubcategory',
                action_type: 'actual',
                store: 'costsubcategoriesstr',
                entity: 'costsubcategory',
                handler: 'doDeleteParameter'
            }];
        }

    },
});