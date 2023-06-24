/**
 * Created by Kip on 6/10/2019.
 */
Ext.define('Admin.view.configurations.views.dashboards.ApplicationSections', {
    extend: 'Ext.container.Container',
    xtype: 'applicationsections',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'applicationsectionspnl'
        }
    ]
});
