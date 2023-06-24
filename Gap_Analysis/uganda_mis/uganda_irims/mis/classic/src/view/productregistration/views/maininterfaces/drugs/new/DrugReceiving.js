/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.new.DrugProductReceiving', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugproductreceiving',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    
    items: [
        {
            xtype: 'newdrugproductreceivingwizard'
        }
    ]
});