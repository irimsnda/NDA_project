

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.OrderSupplyDangerousGoodProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ordersupplydangerousgoodproductsfrm',
    itemId: 'importexportpermitsproductsfrm',
    layout: {
        type: 'column',
        columns: 1
    },
    bodyPadding: 5,

    autoScroll: true,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.49,
        labelAlign: 'top',
        allowBlank: false
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
        xtype: 'textfield',
        name: 'permitbrand_name',
        fieldLabel: 'Drug Name',
    }, {
        xtype: 'combo',
        fieldLabel: 'Controlled Drugs Substance',
        name: 'controlled_drugssubstances_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_controlled_drugssubstances',
                            is_enabled:1
                        }
                    }
                },
                isLoad: true
            }
        }
    },  {
        xtype: 'combo',
        fieldLabel: 'Dosage Form',
        name: 'dosage_form_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'
        },
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
    }, {
        xtype: 'textfield',
        name: 'product_strength',
        
        fieldLabel: 'Product Strength'
       
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
            xtype: 'numberfield',
            name: 'pack_unit',
            columnWidth: 0.49,
            fieldLabel: 'Unit Packaging Unit',
        },{
            xtype: 'combo',
            fieldLabel: 'Select Unit Pack',
            emptyText: 'Select Unit Pack',
            name: 'unitpack_unit_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            columnWidth: 0.49,
            allowBlank: true,
            displayField: 'name',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_si_units',
                                is_enabled:1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
            
        ]
    },{
        xtype: 'numberfield',
        name: 'quantity',
        fieldLabel: 'Item Quantity Ordered'
    }],
    buttons:[{
        text:'Save Permit Product Details',
        iconCls: 'fa fa-save',
        margin: 5,
        store:'ordersupplydangerousgoodproductsstr',
        action_url: 'importexportpermits/onSaveControlledDrugsPermitProductsDetails',
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