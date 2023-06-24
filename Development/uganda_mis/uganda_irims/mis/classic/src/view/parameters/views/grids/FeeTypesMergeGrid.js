Ext.define('Admin.view.parameters.views.grids.FeeTypesMergeGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersMergeGrid',
    alias: 'widget.feetypesmergegrid',
    title: 'Merge Fee Types',
    tbar: [{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge Fee Types",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        store: 'feetypesstr',
        action_url: 'parameters/feetype/merge',
        action: 'merge',
        panel: 'feetypesmergegrid',
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
                grid = Ext.ComponentQuery.query('feetypesmergegrid')[0],
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
       dataIndex: 'gl_code',
       text: 'GL code',
       flex: 1
    }]

});
