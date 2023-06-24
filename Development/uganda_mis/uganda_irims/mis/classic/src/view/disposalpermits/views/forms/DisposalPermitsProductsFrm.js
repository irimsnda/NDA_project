

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.DisposalPermitsProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'disposalpermitsproductsfrm',
    itemId: 'disposalpermitsproductsfrm',
    layout: {
        type: 'column',
        columns: 1
    },
    autoScroll: true,
    scrollable: true,
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
        name: 'product_id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_disposal_products'
    },{
        xtype: 'textfield',
        name: 'brand_name',
        fieldLabel: 'Brand Name/Devices Name',
    } , {
        xtype: 'textfield',
        name: 'brand_name',
        fieldLabel: 'Brand Name/Devices Name',
    } ,{
        xtype: 'textarea',
        name: 'common_name',
        allowBlank: true,
        fieldLabel: 'Common Name',
    } ,{
        xtype: 'textarea',
        name: 'product_strength',
        allowBlank: true,
        fieldLabel: 'Product Strength',
    } ,{
        xtype: 'textarea',
        name: 'dosage_form',
        allowBlank: true,
        fieldLabel: 'Dosage Form',
    } ,{
        xtype: 'textarea',
        name: 'pack_size',
        allowBlank: true,
        fieldLabel: 'Pack Size',
    } ,{
        xtype: 'textarea',
        name: 'batch_no',
        allowBlank: true,
        columnWidth: 1,
        fieldLabel: 'Batch Number',
    } ,{
        xtype: 'textarea',
        name: 'reason_for_disposal',
        allowBlank: true,  columnWidth: 1,
        fieldLabel: 'Reason for Disposal',
    } ,{
        xtype: 'numberfield',
        name: 'quantity',bind: {
            readOnly: '{isReadOnly}'
        },
        allowBlank: true,
        fieldLabel: 'Quantity',
    },{
        xtype: 'numberfield',
        name: 'estimated_value',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Estimated Value',
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
        store:'disposalpermitsproductsstr',
        action_url: 'importexportpermits/onSaveDisposalPermitProductsDetails',
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