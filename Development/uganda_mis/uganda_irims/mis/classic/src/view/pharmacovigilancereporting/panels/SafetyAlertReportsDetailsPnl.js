/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.panels.SafetyAlertReportsDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'safetyalertreportsdetailspnl',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    scrollable: true,
    items: [
        {
            xtype: 'safetyalertreportsdetailsfrm',
            title:'Safety Alert Reports Details'
        }
    ]
});