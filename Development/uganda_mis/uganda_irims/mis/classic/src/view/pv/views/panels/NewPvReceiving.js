Ext.define('Admin.view.pv.views.panels.NewPvReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'newPvReceiving',
    controller: 'pvvctr',
    viewModel: 'pvvm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'newPvReceivingWizard'
        }
    ]
});