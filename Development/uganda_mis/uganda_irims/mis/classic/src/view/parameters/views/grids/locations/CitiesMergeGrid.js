Ext.define('Admin.view.parameters.views.grids.locations.CitiesMergeGrid', {
    extend: 'Admin.view.parameters.views.grids.locations.LocationsMergeGrid',
    alias: 'widget.citiesmergegrid',
    title: 'Merge Cities',
    tbar: [{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge Cities",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        store: 'citiesstr',
        action_url: 'parameters/city/merge',
        action: 'merge',
        panel: 'citiesmergegrid',
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
                grid = Ext.ComponentQuery.query('citiesmergegrid')[0],
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
