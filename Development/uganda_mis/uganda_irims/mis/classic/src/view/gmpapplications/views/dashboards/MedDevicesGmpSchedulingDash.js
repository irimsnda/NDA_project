/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.MedDevicesGmpSchedulingDash', {
    extend: 'Ext.container.Container',
    xtype: 'meddevicesgmpschedulingdash',
    layout: 'responsivecolumn',
    controller: 'gmpapplicationsvctr',
    viewModel: 'gmpapplicationsvm',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 4
        },
        {
            xtype: 'inspectionschedulingpnl'
        }
    ]
});
