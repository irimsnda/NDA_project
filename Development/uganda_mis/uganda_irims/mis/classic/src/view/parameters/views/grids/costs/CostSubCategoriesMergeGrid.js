Ext.define('Admin.view.parameters.views.grids.costs.CostSubCategoriesMergeGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersMergeGrid',
    alias: 'widget.costsubcategoriesmergegrid',
    title: 'Merge Cost Sub Categories',
    tbar: [{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge Cost Sub Categories",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        store: 'costsubcategoriesstr',
        action_url: 'parameters/costsubcategory/merge',
        action: 'merge',
        panel: 'costsubcategoriesmergegrid',
        ui: 'soft-green',
        disabled: true,
        handler: 'submitMergeFrm',
    }, {
        xtype: "button",
        text: "Reset",
        iconCls: 'fa fa-remove',
        margin: '0 5 5 5',
        handler: 'resetMergeGrid'
    }],
    columns: [
    {
            xtype: 'rownumberer'
    }, {
        xtype: 'checkcolumn',
        text: 'select',
        dataIndex: 'selected',
        listeners: {
            checkChange: function (cell, rowIdx, checked, record) {
                var store = record.store,
                disable = true,
                grid = Ext.ComponentQuery.query('costsubcategoriesmergegrid')[0],
                button = grid.down('button[itemId=mergeBtn]');
                if(checked) {
                    cell.disable();
                    button.enable();
                } else {
                    button.disable();
                }
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }
    ]

});
