/**
 * Created by Kip on 3/14/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.SampleIngredientsFrm', {
    extend: 'Ext.form.Panel',
    //extend: 'Admin.view.commoninterfaces.forms.ProductIngredientsCmnFrm',
    xtype: 'sampleingredientsfrm',
    controller: 'surveillancevctr',
    frame: true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 1,
        margin: 5,
        allowBlank: false
    },
    items:[
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'sample_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_pmssample_ingredients'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Ingredient',
            //store: 'masteringredientsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'ingredient_id',
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_ingredients_details',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Specification Type',
            //store: 'ingrespecificationtypestr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'specification_id',
            listeners: {
                beforerender: {
                    fn: 'setSurveillanceCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_specification_types',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Strength',
            layout: 'column',
            items: [
                {
                    xtype: 'textfield',
                    columnWidth: 0.7,
                    name: 'strength'
                },
                {
                    xtype: 'combo',
                    //store: 'siunitstr',
                    forceSelection: true,
                    queryMode: 'local',
                    columnWidth: 0.3,
                    valueField: 'id',
                    displayField: 'name',
                    name: 'si_unit_id',
                    listeners: {
                        beforerender: {
                            fn: 'setSurveillanceCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_si_units',
                                        has_filter: 0
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }
            ]
        },
        {
            xtype: 'combo',
            fieldLabel: 'Reason for Inclusion',
            store: 'impproductinclusionreasonstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'inclusion_reason_id'
        }
    ],
    buttons:[
        {
            xtype: 'button',
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            ui: 'soft-purple',
            formBind: true,
            handler: 'doCreateSurveillanceParamWin',
            action_url: 'surveillance/saveSurveillanceCommonData',
            table_name: 'tra_pmssample_ingredients',
            storeID: 'pmssampleingredientsstr'
        }
    ]
});