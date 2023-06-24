
/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.alteration.AlterationDrugsProductCertificateRelease', {
    extend: 'Ext.panel.Panel',
    xtype: 'alterationdrugsproductcertificaterelease',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',

    items: [
        {
            xtype: 'alterationproductcertificatereleasepnl',
            itemId:'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});

