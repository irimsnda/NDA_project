Ext.define('Admin.view.parameters.views.grids.ExchangeRatesMergeGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersMergeGrid',
    alias: 'widget.exchangeratesmergegrid',
    title: 'Merge ExchangeRates',
    tbar: [{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge ExchangeRates",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        store: 'exchangeratesstr',
        action_url: 'parameters/exchangerate/merge',
        action: 'merge',
        panel: 'exchangeratesmergegrid',
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
                grid = Ext.ComponentQuery.query('exchangeratesmergegrid')[0],
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
            dataIndex: 'currency_name',
            text: 'Currency',
            flex: 1
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'rate',
            text: 'Rate',
            flex: 1
        }
    ]

});
