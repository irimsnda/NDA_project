/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.BatchApplicationInvoicesDash', {
    extend: 'Ext.Container',
    xtype: 'batchapplicationinvoicesdash',
    layout: 'fit',
    items: [{
            xtype:'hiddenfield',
            name: 'module_id',
            value: 16
        },{
            xtype:'hiddenfield',
            name: 'sub_module_id',
            value: 62
        },
        {
            xtype: 'batchapplicationinvoicesgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }
    ]
});