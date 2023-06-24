
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.MedicineProductDataAmmendRequestPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'medicineproductdataammendrequestpnl',
    layout: {//
        type: 'fit'
    },
    defaults: {
        margin: 3
    }, viewModel: {
        type: 'productregistrationvm'
    },
    itemId:'product_panel',
    listeners: {
        tabchange: 'funcActiveProductsOtherInformationTab'
    },
    items: [{
        xtype: 'searchdrugsProductsDetailsFrm',
        title: 'Product Details'
    }, {
        xtype: 'drugsProductsOtherInformationFrm',
        title: 'Product Other Details',
    }, {
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});