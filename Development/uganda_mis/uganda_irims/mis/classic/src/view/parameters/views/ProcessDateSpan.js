Ext.define('Admin.view.parameters.ProcessDateSpan', {
    extend: 'Ext.panel.Panel',
    xtype: 'processDateSpan',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'processDateSpanParamGrid',
        }
    ]
});