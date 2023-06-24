/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.ManSiteDetailsWinTabPnl', {
    extend: 'Admin.view.gmpapplications.views.panels.ManSiteDetailsTabPnl',
    xtype: 'mansitedetailswintabpnl',
    items: [
        {
            title: 'Main Details',
            xtype: 'mansitedetailsfrm'
        },
        {
            title: 'Local Technical Rep',
            xtype: 'ltrfrm'
        },
        {
            title: 'Personnel Details',
            xtype: 'mansitepersonneltabpnl'//'mansitepersonneldetailswingrid'
        },
        {
            title: 'Manufacturing Site Blocks',
            xtype: 'mansiteblockdetailswingrid'
        },
        {
            title: 'Business Details',
            xtype: 'mansiteotherdetailswingrid'
        }
    ]
});