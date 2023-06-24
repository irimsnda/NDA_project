/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ConsigneeOptions', {
    extend: 'Ext.container.Container',
    xtype: 'consigneeoptions',
    layout: 'fit',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'consigneeoptionspnl'
        }
    ]
});
