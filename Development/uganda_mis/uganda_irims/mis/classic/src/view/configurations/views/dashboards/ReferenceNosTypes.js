/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.configurations.views.dashboards.ReferenceNosTypes', {
    extend: 'Ext.container.Container',
    xtype: 'referencenostypes',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'referencenostypespnl'
        }
    ]
});
