/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.CosmeticsPmsProgramDash', {
    extend: 'Ext.container.Container',
    xtype: 'cosmeticspmsprogramdash',
    layout: 'responsivecolumn',
    controller: 'surveillancevctr',
    viewModel: 'surveillancevm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 3
        },
        {
            xtype: 'pmsprogrampnl'
        }
    ]
});
