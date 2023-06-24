Ext.define('Admin.view.parameters.PersonnelQualifications', {
    extend: 'Ext.panel.Panel',
    xtype: 'personnelqualifications',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'personnelqualificationsgrid'
        }
    ]
});