/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.FoodGmpSchedulingDash', {
    extend: 'Ext.container.Container',
    xtype: 'foodgmpschedulingdash',
    layout: 'responsivecolumn',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 1
        },
        {
            xtype: 'inspectionschedulingpnl'
        }
    ]
});
