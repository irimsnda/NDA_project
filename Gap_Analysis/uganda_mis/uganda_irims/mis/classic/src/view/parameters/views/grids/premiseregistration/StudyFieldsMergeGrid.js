Ext.define('Admin.view.parameters.views.grids.premiseregistration.StudyFieldsMergeGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersMergeGrid',
    alias: 'widget.studyfieldsmergegrid',
    title: 'Merge Study Fields',
    tbar: [{
        xtype: "button",
        itemId: "mergeBtn",
        text: "Merge StudyFields",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        store: 'studyfieldsstr',
        action_url: 'premiseregistration/parameters/studyfield/merge',
        action: 'merge',
        panel: 'studyfieldsmergegrid',
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
                grid = Ext.ComponentQuery.query('studyfieldsmergegrid')[0],
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
