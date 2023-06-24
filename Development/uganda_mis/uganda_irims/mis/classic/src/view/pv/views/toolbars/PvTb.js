Ext.define('Admin.view.pv.views.toolbars.PvTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'pvtb',
    ui: 'footer',
    defaults: {
        ui: 'soft-blue',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',ui:'soft-green',
            sec_dashboard:'pvdashPnl',
            name: 'pvHomeBtn'
        },
        {
            text: 'New Report',
            iconCls: 'x-fa fa-plus',
            ui:'soft-green',
            handler: 'showNewPv',
            app_type: 77
        }
    ]
});