/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.PreviewDrugsProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'previewdrugsProductsDetailsPnl',
    layout: {//
        type: 'fit'
    },autoScroll: true,
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
    items: [{
        xtype: 'panel',
        itemId:'product_detailspanel',
        title: 'Product Details',
        autoScroll: true,
        readOnly: true,
        items:[{
            xtype: 'drugsProductsDetailsFrm',
            readOnly: true,
            autoScroll: true,
        }]
    }, {
        xtype: 'drugsProductsOtherInformationFrm',
        title: 'Product Other Details',
        //disabled: true
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});