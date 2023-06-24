/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.MedDevicesPmsProgramDash', {
    extend: 'Ext.container.Container',
    xtype: 'meddevicespmsprogramdash',
    layout: 'responsivecolumn',
    controller: 'surveillancevctr',
    viewModel: 'surveillancevm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 4
        },
        {
            xtype: 'pmsprogrampnl'
        }
    ]
});
