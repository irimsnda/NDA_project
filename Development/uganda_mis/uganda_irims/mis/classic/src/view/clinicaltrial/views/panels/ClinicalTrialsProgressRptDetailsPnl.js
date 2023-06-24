/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialsProgressRptDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialsprogressrptdetailspnl',
    autoScroll: true,
    items: [
        {
            xtype: 'clinicaltrialsprogressrptdetailsfrm'
        }
    ]
});