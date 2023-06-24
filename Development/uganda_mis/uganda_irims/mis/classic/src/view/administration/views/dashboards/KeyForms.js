/**
 * Created by Kip on 11/23/2018.
 */
Ext.define('Admin.view.administration.views.dashboards.KeyForms', {
    extend: 'Ext.container.Container',
    xtype: 'keyforms',
    layout: 'responsivecolumn',
    controller: 'administrationvctr',
    viewModel: 'administrationvm',
    items: [
        {
            xtype: 'keyformspnl'
        }
    ]
});
