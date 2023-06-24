/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.RegistrationExpiryTime_Span', {
    extend: 'Ext.container.Container',
    xtype: 'registrationexpirytime_span',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'registrationexpirytime_spanpnl'
        }
    ]
});
