Ext.define('Admin.view.pv.views.dashboards.pvDashWrapperPnl', {
    extend: 'Ext.Container',
    xtype: 'pvDashWrapper',
	itemId:'pvDashWrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'pvdashPnl'
        }
    ]
});