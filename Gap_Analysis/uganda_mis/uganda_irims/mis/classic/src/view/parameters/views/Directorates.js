Ext.define('Admin.view.parameters.Directorates', {
    extend: 'Ext.panel.Panel',
    xtype: 'directorates',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'directoratesgrid',
            addBtnText: 'Add Directorate',
            store: 'directoratesstr',
            form: 'directoratefrm',
            emptyText: 'No Directorate Available'
        }
    ]
});