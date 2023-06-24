/**
 * Created by Kip on 5/8/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.ManSitePersonnelTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'mansitepersonneltabpnl',
    margin: 3,
    items: [
        {
            title: 'Application Contact Person',
            xtype: 'premisecontactpersonfrm',
            scrollable: true
        },
        {
            title: 'Other Personnel',
            xtype: 'mansitepersonneldetailsgrid'
        }
    ]
});