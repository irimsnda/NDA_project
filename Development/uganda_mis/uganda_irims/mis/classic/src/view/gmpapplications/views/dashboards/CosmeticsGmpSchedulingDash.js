/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.CosmeticsGmpSchedulingDash', {
    extend: 'Ext.container.Container',
    xtype: 'cosmeticsgmpschedulingdash',
    layout: 'responsivecolumn',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 3
        },
        {
            xtype: 'inspectionschedulingpnl'
        }
    ]
});
