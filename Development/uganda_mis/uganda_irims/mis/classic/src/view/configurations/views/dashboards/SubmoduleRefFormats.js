/**
 * Created by Kip on 5/9/2019.
 */
Ext.define('Admin.view.configurations.views.dashboards.SubmoduleRefFormats', {
    extend: 'Ext.container.Container',
    xtype: 'submodulerefformats',
    layout: 'responsivecolumn',
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    items: [
        {
            xtype: 'submodulerefformatspnl'
        }
    ]
});
