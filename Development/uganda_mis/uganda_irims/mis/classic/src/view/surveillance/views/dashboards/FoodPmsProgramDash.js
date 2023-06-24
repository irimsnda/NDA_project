/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.FoodPmsProgramDash', {
    extend: 'Ext.container.Container',
    xtype: 'foodpmsprogramdash',
    layout: 'responsivecolumn',
    controller: 'surveillancevctr',
    viewModel: 'surveillancevm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'pmsprogrampnl'
        }
    ]
});
