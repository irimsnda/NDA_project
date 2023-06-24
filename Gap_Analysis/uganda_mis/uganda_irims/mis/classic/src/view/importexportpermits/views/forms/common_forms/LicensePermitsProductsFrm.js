

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.LicensePermitsProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'licensepermitsproductsfrm',
    itemId: 'importexportpermitsproductsfrm',
    layout: {
        type: 'column',
        columns: 2
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.5,
        labelAlign: 'top',
        allowBlank: false,
        
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'product_id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_permits_products'
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
                xtype: 'textfield',
                name: 'permitbrand_name',
                columnWidth: 0.64,
                fieldLabel: 'Brand Name/Devices Name',
                readOnly: true
            }, 
            {
                xtype:'textfield',
               // readOnly: true,
                columnWidth: 0.34,
                fieldLabel:'Product Certificate No.',
                name:'product_registration_no',
                readOnly: true
            },
            
        ]
    },{
        xtype: 'combo',
        fieldLabel: 'Generic/Common Name',
        name: 'common_name_id',
        forceSelection: true,
        queryMode: 'local',
        allowBlank: true,
        valueField: 'id',allowBlank: true,
        displayField: 'name',
        readOnly: true,    
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_common_names',
                            is_enabled:1
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Classification',
        name: 'classification_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_classifications'
                        }
                    }
                },
                isLoad: true
            }
        },  readOnly: true
    },{
        xtype: 'combo',
        fieldLabel: 'Product Category',
        name: 'product_category_id',
        forceSelection: true,
        queryMode: 'local',
        allowBlank: true,
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',  readOnly: true,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_product_categories'
                        }
                    }
                },
                isLoad: true
            },change: function (cbo, value) {
                var form = cbo.up('form'),
                    product_subcategory = form.down('combo[name=product_subcategory_id]'),
                    filters = { product_category_id: value },
                    filters = JSON.stringify(filters),
                    store = product_subcategory.store;
                store.removeAll();
                store.load({ params: { filters: filters } });

            }
        },bind: {
            readOnly: '{isReadOnly}'  // negated
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Product Sub-category',
        name: 'product_subcategory_id',
        forceSelection: true,
        queryMode: 'local',
        allowBlank: true,
        valueField: 'id',
        allowBlank: true,
        displayField: 'name',
        readOnly: true,
        listeners: {
            afterrender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_subproduct_categories'
                        }
                    }
                },
                isLoad: false
            }
        },bind: {
           // readOnly: '{isReadOnly}',
            hidden: '{!showProdSubCategory}'
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Dosage Form(Medicines)',
        name: 'dosage_form_id',
        forceSelection: true,
        queryMode: 'local',readOnly: true,
        valueField: 'id',allowBlank: true,
        displayField: 'name',bind: {
           
            hidden: '{!showProdDosageForm}'
        },readOnly: true,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_dosage_forms',
                            is_enabled:1
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        fieldLabel:'Product Strength',
        name:'product_strength',allowBlank: true,
        xtype:'textfield',readOnly: true,
        bind: {
            readOnly: '{isReadOnly}'  // negated
        }
    },{
        xtype: 'textfield',
        name: 'productphysical_description',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Product Physical Description',
    },{
        xtype: 'combo',
        fieldLabel: 'Country of Origin',
        name: 'country_oforigin_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        readOnly: true,
        allowBlank: true,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_countries',
                            is_enabled:1
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
        items: [{
            fieldLabel:'Product Unit Pack(Single Unit)',
            name:'unitpack_size',columnWidth: 0.48,
            xtype:'textfield',
            readOnly: true
        },{
            xtype: 'combo',
            fieldLabel: 'Units',
            name: 'unitpack_unit_id',
            forceSelection: true,
            queryMode: 'local',columnWidth: 0.48,
            valueField: 'id',allowBlank: true,
            displayField: 'name',
            readOnly: true,
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_si_units',
                                is_enabled:1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }]
    },  {
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [
            {
                xtype: 'datefield',
                name: 'product_manufacturing_date',
                bind: {
                    readOnly: '{isReadOnly}'
                },
                columnWidth: 0.48,
                allowBlank: false,
                fieldLabel: 'Manufacturing Date',
            },
            {
                xtype: 'datefield',
                name: 'product_expiry_date',
                bind: {
                    readOnly: '{isReadOnly}'
                },
                columnWidth: 0.48,
                allowBlank: false,
                fieldLabel: 'Expiry Date',
            },
        ]
    },{
        xtype:'textarea',
        columnWidth: 0.99,
        allowBlank: false,
        fieldLabel: 'Product Batch Number(s)',
        name: 'product_batch_no'  
        
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [
            {
                xtype: 'numberfield',
                name: 'total_weight',
                bind: {
                    readOnly: '{isReadOnly}'
                },
                columnWidth: 0.48,
                allowBlank: true,
                fieldLabel: 'Total Weight',
            },
            {
                xtype: 'combo',
                fieldLabel: ' Weight Units',
                labelWidth: 80,
                columnWidth: 0.48,
                valueField: 'id',
                displayField: 'name',bind: {
                    readOnly: '{isReadOnly}'
                },
                allowBlank: true,
                forceSelection: true,
                name: 'weights_units_id',
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosSectionfilterStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getNonrefParameter',
                                extraParams: {
                                    table_name: 'par_weights_units',
                                    has_filter: 0
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }
        ]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [
            {
                xtype: 'numberfield',
                name: 'quantity',bind: {
                    readOnly: '{isReadOnly}'
                },
                columnWidth: 0.48,
                allowBlank: true,
                fieldLabel: 'Quantity',
            },{
                xtype: 'combo',
                fieldLabel: 'Packaging Unit',
                labelWidth: 80,
                width: 320,columnWidth: 0.48,
                valueField: 'id',
                displayField: 'name',
                allowBlank: true,
                forceSelection: true,
                name: 'packaging_unit_id',
                queryMode: 'local',bind: {
                    readOnly: '{isReadOnly}'
                },
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getNonrefParameter',
                                extraParams: {
                                    table_name: 'par_packaging_units',
                                    has_filter: 0
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }
        ]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [
            {
                xtype: 'numberfield',
                name: 'unit_price',
                bind: {
                    readOnly: '{isReadOnly}'
                },columnWidth: 0.48,
                allowBlank: false,
                fieldLabel: 'Unit Price',
            },
            {
                xtype: 'combo',
                fieldLabel: ' Currency',
                labelWidth: 80,
                columnWidth: 0.48,
                valueField: 'id',
                displayField: 'name',bind: {
                    readOnly: '{isReadOnly}'
                },
                allowBlank: false,
                forceSelection: true,
                name: 'currency_id',
                queryMode: 'local',
                listeners: {
                    beforerender: {
                        fn: 'setConfigCombosSectionfilterStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getNonrefParameter',
                                extraParams: {
                                    table_name: 'par_currencies',
                                    has_filter: 0
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }
        ]
    }],
    buttons:[{
        text:'Save Permit Product Details',
        iconCls: 'fa fa-save',
        margin: 5,
        store:'importexportpermitsproductsstr',
        action_url: 'importexportpermits/onSavePermitProductsDetails',
        action:'btn_savepermitproducts'
    },{
        text:'Close',
        iconCls: 'fa fa-window-close',
        handler:function(btn){
                var win = btn.up('window');

                    win.close();
        }
    }]
});