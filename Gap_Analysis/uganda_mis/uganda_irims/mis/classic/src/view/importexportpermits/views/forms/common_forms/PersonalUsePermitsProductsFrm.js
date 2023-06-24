

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.PersonalUsePermitsProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'personalusepermitsproductsfrm',
    itemId: 'personalusepermitsproductsfrm',
    layout: {
        type: 'column',
        columns: 1
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 1,
        labelAlign: 'top',
        allowBlank: false,
        bind: {
            readOnly: '{isReadOnly}'  // negated
        }
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_personalusepermits_products'
    },{
        xtype: 'textfield',
        name: 'permitbrand_name',
        fieldLabel: 'Brand Name/Devices Name',
    },{
        xtype: 'textfield',
        name: 'permitcommon_name',
        fieldLabel: 'Common Name',
    }, {
        xtype: 'numberfield',
        name: 'quantity',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Quantity',
    },{
        xtype: 'combo',
        fieldLabel: 'Packaging Unit',
        labelWidth: 80,
        width: 320,
        allowBlank: true,
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
    },{
        xtype: 'numberfield',
        name: 'unit_price',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
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
        allowBlank: true,
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
    },{
        xtype:'textarea',
        name:'batch_numbers',
        fieldLabel:'Batch Number',
        allowBlank: false,
        bind: {
            readOnly: '{isReadOnly}'
        }

    }],
    buttons:[{
        text:'Save Permit Product Details',
        iconCls: 'fa fa-save',
        margin: 5,
        store:'personalusepermitsproductsgridstr',
        action_url: 'importexportpermits/onSavePersonalUsePermitProductsDetails',
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