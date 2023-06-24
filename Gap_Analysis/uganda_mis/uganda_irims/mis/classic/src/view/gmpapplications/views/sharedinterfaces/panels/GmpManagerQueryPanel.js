/**
 * Created by Kip on 1/7/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagerQueryPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'gmpmanagerquerypanel',
    layout: 'fit',
    items: [
        {
            xtype: 'gmpmanagerquerygrid'
        }
    ]
});