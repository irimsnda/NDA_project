/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.BatchRetentionInvoicesDash', {
    extend: 'Ext.Container',
    xtype: 'batchretentioninvoicesdash',
    layout: 'fit',
    items: [{
            xtype:'hiddenfield',
            name: 'module_id',
            value: 16
        },{
            xtype:'hiddenfield',
            name: 'sub_module_id',
            value: 63
        },
        {
            xtype: 'batchretentioninvoicesgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }
    ]
});