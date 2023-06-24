/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.AssessmentProcedure', {
    extend: 'Ext.container.Container',
    xtype: 'assessmentProcedure',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'assessmentProcedurePnl'
        }
    ]
});
