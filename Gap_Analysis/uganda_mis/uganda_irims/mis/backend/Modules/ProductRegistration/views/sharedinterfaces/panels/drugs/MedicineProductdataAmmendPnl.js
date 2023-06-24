
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.MedicineProductdataAmmendPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'medicineproductdataammendpnl',
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
        xtype: 'drugsProductsDetailsFrm',
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