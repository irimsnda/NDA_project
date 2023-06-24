/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.DrugsGmpSchedulingDash', {
    extend: 'Ext.container.Container',
    xtype: 'drugsgmpschedulingdash',
    layout: 'responsivecolumn',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'inspectionschedulingpnl'
        }
    ]
});
