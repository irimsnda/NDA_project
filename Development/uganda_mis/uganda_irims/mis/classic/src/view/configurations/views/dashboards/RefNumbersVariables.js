/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.RefNumbersVariables', {
    extend: 'Ext.container.Container',
    xtype: 'refnumbersvariables',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'refnumbersvariablespnl'
        }
    ]
});
