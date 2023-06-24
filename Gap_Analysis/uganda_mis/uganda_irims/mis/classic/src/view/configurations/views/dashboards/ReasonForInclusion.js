/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ReasonForInclusion', {
    extend: 'Ext.container.Container',
    xtype: 'reasonForInclusion',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'reasonForInclusionPnl'
        }
    ]
});
