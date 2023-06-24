/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.revenuemanagement.views.containers.RetentionChargesInvoices', {
    extend: 'Ext.Container',
    xtype: 'retentionchargesinvoices',
    controller: 'revenuemanagementvctr',
    layout: 'border',
    items: [
        {
            xtype: 'retentionchargesinvoicespnl',
            region: 'center',
        }
    ]
});//medicaldevicesnoficationmanagerreview