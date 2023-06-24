/**
 * Created by Kip on 11/21/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.OnlinePremiseDetailsWinTabPnl', {
    extend: 'Admin.view.premiseregistration.views.panels.PremiseDetailsTabPnl',
    xtype: 'onlinepremisedetailswintabpnl',
    items: [
        {
            title: 'Main Details',
            xtype: 'premisedetailsfrm'
        },
        {
            title: 'Personnel Details',
            xtype: 'premisepersonneltabpnl'//'premisepersonneldetailsonlinegrid'
        },
        {
            title: 'Business Details',
            xtype: 'premiseotherdetailsonlinegrid'
        }
    ]
});