/**
 * Created by Softclans on 11/4/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseManagerReinspectionSubmissionPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'premisemanagerreinspectionsubmissionpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'premisemanagerreinspectionsubmissiongrid'
        }
    ]
});