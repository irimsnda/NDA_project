/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.StorageCondition', {
    extend: 'Ext.container.Container',
    xtype: 'storageCondition',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'storageConditionPnl'
        }
    ]
});
