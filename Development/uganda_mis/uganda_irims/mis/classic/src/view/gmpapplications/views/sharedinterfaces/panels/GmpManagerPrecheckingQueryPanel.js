/**
 * Created by Kip on 7/2/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagerPrecheckingQueryPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gmpmanagerprecheckingquerypanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gmpmanagerprecheckingquerygrid'
        }
    ]
});