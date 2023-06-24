/**
 * Created by Softclans on 11/4/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseManagerCapaSubmissionPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'premisemanagercapasubmissionpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'premisemanagercapasubmissiongrid'
        }
    ]
});