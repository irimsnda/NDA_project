/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.PermitReasons', {
    extend: 'Ext.container.Container',
    xtype: 'permitreasons',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'permitreasonspnl'
        }
    ]
});
