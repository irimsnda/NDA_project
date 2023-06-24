Ext.define('Admin.view.parameters.AgeAnalysisDaysSpan', {
    extend: 'Ext.panel.Panel',
    xtype: 'ageAnalysisDaysSpan',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'ageAnalysisDaysSpanParamGrid',
        }
    ]
});