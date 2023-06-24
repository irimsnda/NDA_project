/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.RegistrationTimeSpantype', {
    extend: 'Ext.container.Container',
    xtype: 'registrationtimespantype',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'registrationtimespantypepnl'
        }
    ]
});
