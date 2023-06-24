/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.alteration.AlterationDrugsProductApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'alterationdrugsproductApproval',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'alterationproductapprovalpnl',
            itemId: 'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});

