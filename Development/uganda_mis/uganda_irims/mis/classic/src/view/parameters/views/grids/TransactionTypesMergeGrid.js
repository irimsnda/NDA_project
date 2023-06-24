Ext.define('Admin.view.parameters.views.grids.TransactionTypesMergeGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersMergeGrid',
    alias: 'widget.transactiontypesmergegrid',
    title: 'Merge Transaction Types',
    tbar: [{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge Transaction Types",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        store: 'transactiontypesstr',
        action_url: 'parameters/transactiontype/merge',
        action: 'merge',
        panel: 'transactiontypesmergegrid',
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
                grid = Ext.ComponentQuery.query('transactiontypesmergegrid')[0],
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
    }, {
       xtype: 'gridcolumn',
       dataIndex: 't_code',
       text: 'code',
       flex: 1
    }]

});
