/**
 * Created by Kip on 6/29/2019.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.PremiseManagerQueryResponsePnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'premisemanagerqueryresponsepnl',
    layout: 'fit',
    items: [
        {
            xtype: 'premisemanagerqueryresponsegrid'
        }
    ]
});