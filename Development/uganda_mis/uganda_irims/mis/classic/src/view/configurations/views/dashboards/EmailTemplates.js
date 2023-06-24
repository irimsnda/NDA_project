/**
 * Created by Kip on 2/19/2019.
 */
Ext.define('Admin.view.configurations.views.dashboards.EmailTemplates', {
    extend: 'Ext.container.Container',
    xtype: 'emailtemplates',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'emailtemplatespnl'
        }
    ]
});
