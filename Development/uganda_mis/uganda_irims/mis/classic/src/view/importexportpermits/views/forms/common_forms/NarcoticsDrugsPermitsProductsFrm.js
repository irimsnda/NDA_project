

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.NarcoticsDrugsPermitsProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'narcoticsdrugspermitsproductsfrm',
    itemId: 'narcoticsdrugspermitsproductsfrm',
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
        columnWidth: 0.33,
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
        value: 'tra_narcoticimport_products'
    },{
        xtype:'fieldcontainer',
        layout: {
            type: 'column',
            columns: 2
        },
        items:[{
            xtype: 'combo',
            fieldLabel: 'Narcotic',
            name: 'narcotics_product_id',
            forceSelection: true,
            columnWidth: 0.95,
            queryMode: 'local',
            labelAlign: 'top',
            valueField: 'id',
            displayField: 'name',bind: {
                readOnly: '{isReadOnly}'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'narcoticsproductsstr',
                  
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_controlled_drugsdetails'
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
            childXtype:'controlleddrugsfrm',
            width: '15%',
            table_name: 'par_controlled_drugsdetails',
            storeId: 'narcoticsproductsstr',
            bind: {
                disabled: '{isReadOnly}'  // negated
            }
        }]

},  {
        xtype: 'combo',
        fieldLabel: 'Common Names',
        name: 'common_name_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',allowBlank: true,
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'  // negated
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_common_names'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Dosage Form',
        name: 'dosage_form_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',allowBlank: true,
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'  // negated
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_dosage_forms'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        name: 'strength',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Product Strength',
    },{
        xtype: 'combo',
        fieldLabel: 'Specification',
        name: 'specification_type_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',allowBlank: true,
        displayField: 'name',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_specification_types'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
       
    }, {
        xtype: 'numberfield',
        name: 'quantity',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Quantity',
    },{
        xtype: 'textfield',
        name: 'pack_size',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Pack Size',
        
    },{
        xtype: 'combo',
        fieldLabel: 'Packaging Unit',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'packaging_unit_id',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_packaging_units',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'numberfield',
        name: 'authority_yearlyquantity',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Quantity Authorised(Per Year)',
    },{
        xtype: 'numberfield',
        name: 'quantity',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: ' Authorised Quantity',
    },{
        xtype: 'numberfield',
        name: 'unit_price',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Unit Price',
    },{
        xtype: 'combo',
        fieldLabel: ' Currency',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',bind: {
            readOnly: '{isReadOnly}'
        },
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
    }],
    buttons:[{
        text:'Save Permit Product Details',
        iconCls: 'fa fa-save',
        margin: 5,
        store:'narcoticspermitsproductsstr',
        action_url: 'importexportpermits/onSaveNarcoticsPermitProductsDetails',
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