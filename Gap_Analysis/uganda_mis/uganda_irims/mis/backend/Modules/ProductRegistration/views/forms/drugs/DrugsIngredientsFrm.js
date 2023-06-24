
Ext.define('Admin.view.productregistration.views.forms.drugs.DrugsIngredientsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugsIngredientsFrm',
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    scrollable:true,
    height:600,
    defaults: {
        margin: 5,
        labelAlign: 'top',
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
        },{   
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_product_ingredients'
        }, {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            items:[{
                xtype: 'combo',
                name: 'ingredient_id',
               // allowBlank: true,
                labelAlign: 'top',
                fieldLabel: 'Name of Immunogen',
                queryMode: 'local',
                valueField: 'id', width: '85%',
                displayField: 'name',
                listeners: {
                    afterrender: {
                        fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId:'ingredientsDetailsstr',
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                                extraParams:{
                                    table_name: 'par_ingredients_details'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },{
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                handler:'funcAddProductApplicationParamter',
                section_id: 2,
                childXtype:'productingredientsfrm',
                width: '15%', margin:'28 0 0',
                table_name: 'par_ingredients_details',
                storeId: 'ingredientsDetailsstr'
            }]

    }, 
        {
            xtype: 'combo',
            name: 'specification_type_id',
            allowBlank: true,
            queryMode: 'local',
            fieldLabel: 'Reference/Monograph standard',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                            extraParams:{
                                table_name: 'par_specification_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'textfield',
            name: 'quantity',
            fieldLabel: 'Quantity /dosage unit'

        },  {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            items:[{
                xtype: 'combo',
                name: 'ingredientssi_unit_id',
                allowBlank: false,

                labelAlign: 'top',
                queryMode: 'local',width: '85%',
                fieldLabel: 'SI Units',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    afterrender: {
                        fn: 'setConfigCombosStore',
                        storeId:'ingredientssiunitsDetailsstr',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getRegistrationApplicationParameters',
                                extraParams:{
                                    table_name: 'par_si_units'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },{
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                handler:'funcAddProductApplicationParamter',
                section_id: 2,
                childXtype:'productsiunitsfrm',
                width: '15%', margin:'28 0 0',
                table_name: 'par_si_units',
                storeId: 'ingredientssiunitsDetailsstr'
            }]

    }, 

     {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            items:[{
                xtype: 'combo',
                name: 'excipient_id',
                allowBlank: true,
                labelAlign: 'top',
                fieldLabel: 'Excipient',
                queryMode: 'local',
                valueField: 'id', width: '85%',
                displayField: 'name',
                listeners: {
                    afterrender: {
                        fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId:'excipientDetailsstr',
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                                extraParams:{
                                    table_name: 'par_excipients_details'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            },{
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                handler:'funcAddProductApplicationParamter',
                section_id: 2,
                childXtype:'productexcipientsfrm',
                width: '15%', margin:'28 0 0',
                table_name: 'par_excipients_details',
                storeId: 'excipientDetailsstr'
            }]

    },


     {
            xtype: 'combo',
            name: 'inclusion_reason_id',
            allowBlank: true,
            hidden:true,
            fieldLabel: 'Reason for Inclusion',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams:{
                                table_name: 'par_inclusions_reasons'
                            }
                        }
                    },
                    isLoad: true
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
                text: 'Save Ingredients',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_product_ingredients',
                storeID: 'drugproductIngredientsstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});