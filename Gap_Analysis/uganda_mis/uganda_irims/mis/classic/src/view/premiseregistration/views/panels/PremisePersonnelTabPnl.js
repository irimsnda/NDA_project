/**
 * Created by Kip on 4/25/2019.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremisePersonnelTabPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'premisepersonneltabpnl',
    margin: 3,
    items: [
       
        {
            title: 'Premises Technical Personnel',
            xtype: 'premisepersonneldetailsgrid'
        } ,{
            title: 'Contact Person',
            xtype: 'premisecontactpersonfrm',
            hidden: true,
            scrollable: true
        },
        {
            title: 'PROPRIETOR(S)/DIRECTORS(S)',
            xtype: 'premiseproprietorsdetailsgrid'
        }
    ]
});