
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.AlterationdrugsProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'alterationdrugsproductsdetailspnl',
    layout: {//
        type: 'fit'
    },   
    itemId:'product_panel',
    defaults: {
        margin: 3
    }, viewModel: {
        type: 'productregistrationvm'
    },
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