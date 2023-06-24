
/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.DosageForm', {
    extend: 'Ext.container.Container',
    xtype: 'dosageForm',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'dosageFormPnl'
        }
    ]
});
