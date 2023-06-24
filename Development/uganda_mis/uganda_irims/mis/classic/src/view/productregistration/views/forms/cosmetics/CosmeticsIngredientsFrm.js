

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.cosmetics.CosmeticsIngredientsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'cosmeticsingredientsfrm',
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
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
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_product_ingredients'
    }, {
        xtype: 'combo',
        name: 'ingredient_id',
        allowBlank: true,
        fieldLabel: 'Ingredient',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_ingredients_details'
                        }
                    }
                },
                isLoad: true
            }
        }
    },
    {
        xtype: 'textfield',
        name: 'proportion',
        fieldLabel: 'Proportion'

    }, {
        xtype: 'combo',
        name: 'ingredientssi_unit_id',
        allowBlank: true,
        fieldLabel: 'Si-Units',
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
                        extraParams: {
                            table_name: 'par_si_units'
                        }
                    }
                },
                isLoad: true
            }
        }
    } ,{
        xtype: 'combo',
        name: 'inclusion_reason_id',
        allowBlank: true,
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
                        extraParams: {
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
                storeID: 'cosmeticsproductingredientsstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});