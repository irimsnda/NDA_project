/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.DrugsPmsProgramDash', {
    extend: 'Ext.container.Container',
    xtype: 'drugspmsprogramdash',
    layout: 'responsivecolumn',
    controller: 'surveillancevctr',
    viewModel: 'surveillancevm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'pmsprogrampnl'
        }
    ]
});
