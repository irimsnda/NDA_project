/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialsRegistryDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialsregistrydetailspnl',
    height: Ext.Element.getViewportHeight() - 118,
    scrollable: true,
    layout:'fit',
    autoScroll: true,
    items: [
        {
            xtype: 'clinicaltrialregistrydetailsfrm'
        }
    ]
});