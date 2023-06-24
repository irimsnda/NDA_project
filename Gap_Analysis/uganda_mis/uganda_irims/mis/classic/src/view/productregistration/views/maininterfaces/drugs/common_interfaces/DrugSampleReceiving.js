/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.common_interfaces.DrugSampleReceiving', {
    extend: 'Ext.form.Panel',
    xtype: 'drugproductsamplereceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items:[{
        xtype:'drugproductsamplereceivingpnl',
        viewModel: 'productregistrationvm',
    }]
});