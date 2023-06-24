/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.AtcCodeDefination', {
    extend: 'Ext.container.Container',
    xtype: 'atcCodeDefination',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'atcCodeDefinationPnl'
        }
    ]
});
