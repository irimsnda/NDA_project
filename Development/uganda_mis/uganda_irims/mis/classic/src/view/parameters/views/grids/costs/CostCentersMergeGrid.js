Ext.define('Admin.view.parameters.views.grids.costs.CostCentersMergeGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersMergeGrid',
    alias: 'widget.costcentersmergegrid',
    title: 'Merge Cost Centers',
    tbar: [{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge Cost Centers",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        store: 'costcenterstr',
        action_url: 'parameters/costcenter/merge',
        action: 'merge',
        panel: 'costcentersmergegrid',
        ui: 'soft-green',
        disabled: true,
        handler: 'submitMergeFrm'
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
                grid = Ext.ComponentQuery.query('costcentersmergegrid')[0],
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
