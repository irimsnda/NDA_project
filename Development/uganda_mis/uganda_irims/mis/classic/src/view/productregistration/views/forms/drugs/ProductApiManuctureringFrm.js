
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.ProductApiManuctureringFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productApiManuctureringFrm',
    itemId: 'productApiManuctureringFrm',
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        allowBlank: false,
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: 'manufacturer_id'
    }, {
        xtype: 'hiddenfield',
        value: 2,
        name: 'manufacturer_type_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_product_manufacturers'
    }, {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            width: '70%', margin: 5,
            labelAlign: 'right',
            fieldLabel: 'Product Manufacturer',
            name: 'manufacturer_name',
            readOnly: true
        }, {
            text: 'Search Manufacturer',
            iconCls: 'fa fa-search',
            xtype: 'button',
            margin: 5,
            handler: 'funcSearchProductManufacturer',
            ui: 'soft-green',
            childXtype: 'manufacturingDetailsAPIGrid',
            winTitle: 'API Manufacturer Information',
            winWidth: '90%',
            stores: '["manufacturingDetailsStr"]'
        }]
    }, {
        xtype: 'textfield',
        name: 'physical_address',
        disabled: true,
        fieldLabel: 'Manufacturer Physical Address',
        readOnly: true
    }, {
        xtype: 'combo',
        name: 'active_ingredient_id',
        allowBlank: false,
        fieldLabel: 'Active Ingredient',
        queryMode: 'local',
        valueField: 'active_ingredient_id',
        displayField: 'ingredient_name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosProductfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'productregistration/getProductActiveIngredients',
                        extraParams: {
                            table_name: 'tra_product_ingredients'
                        }
                    }
                },
                isLoad: true
            }
        }
    }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Manufacturer',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_product_manufacturers',
                storeID: 'productApiManuctureringStr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});