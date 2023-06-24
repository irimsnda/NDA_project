/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 19/05/2021
 */
 Ext.define('Admin.view.productrecallalert.views.grids.AllProductsRecallDetailsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'allproductsrecalldetailsgrid',
    controller: 'productRecallAlertVctr',
    height: Ext.Element.getViewportHeight() - 118,
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 50,
                storeId: 'allproductsstr',
                remoteFilter: true,
                enablePaging: true,
                proxy: {
                    url: 'api/thscp/getAllProductsForRecallingSearch'
                }
            },
            isLoad: true
        },
    },
    plugins: [{
            ptype: 'filterfield'
        }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore();

            store.getProxy().extraParams = {
                section_id: 2
            };
        }
    }],
    tbar: [{
        text: 'Double Click to select a recalled product'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'product_id',
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand_Name',
        width:150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_strength',
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        width:150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Form',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_classification',
        text: 'Classification Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product_manufacturer_name',
        text: 'Manufacturer Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_country_name',
        text: 'Manufacturer Country',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'registration_no',
        text: 'Certificate No',
        flex: 1,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'expiry_date',
        text: 'Expiry Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'registration_status',
        text: 'Registration Status',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'validity_status',
        text: 'Validity Status',
        flex: 1
    }]
});