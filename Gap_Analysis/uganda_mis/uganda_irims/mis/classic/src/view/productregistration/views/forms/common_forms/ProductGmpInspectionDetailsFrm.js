
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.ProductGmpInspectionDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productgmpinspectiondetailsFrm',
    itemId: 'productgmpinspectiondetailsFrm',
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
        name: 'reg_site_id'
    }, {
        xtype: 'hiddenfield',
        name: 'manufacturing_site_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_product_gmpinspectiondetails'
    }, {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            width: '70%', margin: 5,
            labelAlign: 'right',
            fieldLabel: 'GMP Site Name',
            name: 'manufacturer_name',
            readOnly: true
        }, {
            text: 'Search Manufacturer',
            iconCls: 'fa fa-search',
            xtype: 'button',
            margin: 5,
            handler: 'funcSearchGMPManufatcureingSite',
            ui: 'soft-green',
            childXtype: 'gmpInspectionDetailsGrid',
            winTitle: 'GMP Inspection Details',
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
        name: 'gmp_productline_id',
        allowBlank: false,
        fieldLabel: 'GMP product Line',
        queryMode: 'local',
        valueField: 'gmp_productline_id',
        displayField: 'gmpproduct_line',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosProductfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'productregistration/getGMPproductLinesDetails',
                        extraParams: {
                            table_name: 'manufacturing_site_id'
                        }
                    }
                },
                isLoad: false
            }
        }
    }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save GMP Manufacturing Site',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_product_gmpinspectiondetails',
                storeID: 'productGmpInspectionDetailsStr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});             
