/**
 * Created by Kip on 4/29/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.IllegalityStockProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'illegalitystockproductsfrm',
    controller: 'premiseregistrationvctr',
    bodyPadding: 5,
    layout: 'column',
    frame: true,
    defaults:{
        margin: 5,
        margin: 5,columnWidth: 0.5,
        allowBlank: false,
        labelAlign: 'top',
        labelStyle: 'font-weight:bold'
    },
    items: [,
        {
            xtype: 'combo',
            fieldLabel: 'Type of Stock Illegalities',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            name: 'type_ofstockillegalities_id',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_type_ofstockillegalities'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },{
            xtype:'textfield',
            name:'brand_name',
            fieldLabel:'Product Name'

        }, {
            xtype: 'combo',
            fieldLabel: 'Common Name',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,allowBlank: true,
            name: 'common_name_id',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_common_names'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Manufacturer',
            items: [
                {
                    xtype: 'combo',
                    name: 'manufacturer_id',
                    forceSelection: true,
                    queryMode: 'local',
                    anyMatch: true,allowBlank: true,
                    valueField: 'manufacturer_id',
                    displayField: 'manufacturer_name',
                    columnWidth: 0.9,
                    listeners: {
                        beforerender: {
                            fn: 'setPremiseRegCombosStore',
                            config: {
                                pageSize: 1000,
                                storeId: 'manufacturersConfigStr',
                                proxy: {
                                    url: 'productregistration/onLoadManufacturersDetails'
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-plus',
                    columnWidth: 0.1,
                    tooltip: 'add manufacturer',
                    childXtype: 'manufacturerConfigFrm',
                    stores: 'manufacturersConfigStr',
                    winTitle: 'New Manufacturer Details',
                    winWidth: '70%',
                    handler: 'showAddConfigParamWinFrm'
                }
            ]
        },
        
        {
            xtype:'numberfield',
            name:'quantity',
            fieldLabel:'Quantity'

        },
        {
            xtype: 'combo',
            fieldLabel: 'Packaging Units',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            name: 'packaging_units_id',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_packaging_units'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'numberfield',
            name:'value',
            fieldLabel:'Value'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Currency',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            anyMatch: true,
            name: 'currency_id',
            listeners: {
                beforerender: {
                    fn: 'setPremiseRegCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams:{
                                table_name: 'par_currencies'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'textarea',columnWidth:1,allowBlank: true,
            name:'legalitystock_remarks',
            fieldLabel:'Remarks'
        }
    ],
    buttons:[
        {
            xtype: 'button',
            text: 'Save Legality Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            isCloseWin: true,
            storeID: 'legalityofstockprdgridstr',
            action_url: 'premiseregistration/savePremIllegalStockedProducts',
            table_name: 'tra_premillegalstocked_products',
            handler: 'saveLegalityofStockprdRemarks'
        }
    ]
});