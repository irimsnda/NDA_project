
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductManuctureringFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productManuctureringFrm',
    itemId: 'productManuctureringFrm',
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
        value: 1,
        name: 'manufacturer_type_id'
    },{
        xtype: 'hiddenfield',
        name: 'man_site_id' 
    },{
        xtype: 'hiddenfield',
        name: 'reg_site_id' 
    },{
        xtype: 'hiddenfield',
        name: 'gmp_application_code' 
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_product_manufacturers'
    },  {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            width: '70%',margin: 5,
            labelAlign: 'right',
            fieldLabel: 'Manufacturer',
            name: 'manufacturer_name',
            readOnly: true
        }, {
            text: 'Search Manufacturer',
            iconCls: 'fa fa-search',
            xtype: 'button',
            margin: 5,
            ui: 'soft-purple',
            handler: 'funcSearchProductManufacturer',
            ui: 'soft-green',
            childXtype: 'manufacturingDetailsGrid',
            winTitle: 'Manufacturer Information',
            winWidth: '90%',
            stores: '["manufacturingDetailsStr"]'
        }]
    }, {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            width: '70%',margin: 5,
            labelAlign: 'right',
            fieldLabel: 'Manufacturing Site',
            name: 'manufacturing_site',
            readOnly: true
        }, {
            text: 'Search Manufacturing Site',
            iconCls: 'fa fa-search',
            xtype: 'button',
            margin: 5,
            ui: 'soft-purple',
            handler: 'funcSearchProductManufacturerSite',
            ui: 'soft-green',
            childXtype: 'manufacturingSiteDetailsGrid',
            winTitle: 'Manufacturing Site Information',
            winWidth: '90%',
            stores: '["manufacturingSiteDetailsStr"]'
        }]
    },{
        xtype: 'textfield',
        name: 'physical_address',
        disabled: true, allowBlank: true,
        fieldLabel: 'Manufacturer Physical Address',
        readOnly: true
    }, {
        xtype: 'combo',
        name: 'manufacturer_role_id',
        allowBlank: true,
        fieldLabel: 'Manufacturing Role',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_manufacturing_roles'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textarea',
        name: 'manufacturing_activities',
        fieldLabel: 'Manufacturering Activities',
        
    }, {
        xtype: 'combo',
        name: 'has_beeninspected',
        allowBlank: true,
        fieldLabel: 'Has the Manufacturing Site been Inspected/Submitted Request for Inspection to the Rwanda FDA',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_confirmations'
                        }
                    }
                },
                isLoad: true
            },
            change:function(cbo, value){
                        

            }
        }
    }, {
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'textfield',
            width: '70%',margin: 5,
            labelAlign: 'right',
            allowBlank: true,
            fieldLabel: 'Manufacturing Site',
            name: 'inspected_site_name',
            readOnly: true
        },{
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
    },{
        xtype: 'combo',
        name: 'gmp_productline_id',
        allowBlank: true,
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
    }
    ],
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
                storeID: 'productManuctureringStr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});