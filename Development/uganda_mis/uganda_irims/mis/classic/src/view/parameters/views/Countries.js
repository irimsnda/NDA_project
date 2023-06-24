Ext.define('Admin.view.parameters.Countries', {
    extend: 'Ext.panel.Panel',
    xtype: 'countriesprev',
    controller: 'parametervctr',
    viewModel: 'locationvm',
    padding: '2 6 5 6',
    items: [
        {
            xtype: 'countriesgrid',
            addBtnText: 'Add Country',
            store: 'countriesstr',
            form: 'countryfrm',
            emptyText: 'No Countries Available'
        }
    ]
});