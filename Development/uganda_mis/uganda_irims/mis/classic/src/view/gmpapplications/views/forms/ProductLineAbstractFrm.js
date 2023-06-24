/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ProductLineAbstractFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productlineabstractfrm',
    controller: 'gmpapplicationsvctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'gmp_productline_details'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },{
            xtype: 'combo',
            fieldLabel: 'Product Line Category',
            name: 'category_id',
            store: 'gmpproductlinecategoriesstr',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStoreWithSectionFilter',
                    config: {
                        pageSize: 10000,
                        storeId: 'par_confirmationsStr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'gmp_product_categories'
                            }
                        }
                    },
                    isLoad: true
                }, change: function (cmbo, newVal) {
                        var form = cmbo.up('form'),
                        product_line = form.down('combo[name=product_line_id]'),
                        product_lineStr = product_line.getStore();

                        filter = {
                               gmp_product_categories_id: newVal
                        };
                        filter = JSON.stringify(filter);
                        product_lineStr.removeAll();
                        product_lineStr.load({params:{filters:filter}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Product Line',
            name: 'product_line_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStoreWithSectionFilter',
                    config: {
                        pageSize: 10000,
                        storeId: 'product_linestr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'gmp_product_lines'
                            }
                        }
                    },
                    isLoad: false
                },
            }
        }, 
        {
            xtype: 'combo',
            fieldLabel: 'Non beta Lactam',
            name: 'non_betalactam',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                afterrender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'non_betalactamstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: false
                },
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Beta Lactam',
            name: 'beta_lactam_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                afterrender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'beta_lactamstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_beta_lactams'
                            }
                        }
                    },
                    isLoad: false
                },
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Product Type',
            name: 'gmpproduct_type_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                afterrender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'beta_lactamstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_gmpproduct_types'
                            }
                        }
                    },
                    isLoad: false
                },
            }
        },  {
            xtype: 'textarea',
            fieldLabel: 'Product Line Description',
            allowBlank: false,
            name: 'prodline_description',
          
        },{
            xtype: 'combo',
            fieldLabel: 'Inspection Recommendation',
            name: 'prodline_inspectionstatus_id',
            store: 'gmpproductlinestatusstr',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'gmp_product_details',
            storeID: 'productlinedetailsstr',
            action_url: 'gmpapplications/saveGmpInspectionLineDetails',
            handler: 'doCreateGmpApplicationParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]

});