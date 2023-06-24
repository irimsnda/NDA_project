/**
 * Created by Kip on 6/29/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagerQueryResponsePnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gmpmanagerqueryresponsepnl',
    layout: 'fit',
    items: [
        {
            xtype: 'gmpmanagerqueryresponsegrid'
        }
    ]
});